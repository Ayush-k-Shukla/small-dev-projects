class SnowFlake {
  private static readonly MACHINE_ID_BITS = 10n;
  private static readonly EPOCH = 1740825666n; // Custom(Mar 1, 2025)
  private static readonly SEQUENCE_BITS = 12n;
  private static readonly MAX_POSSIBLE_MACHINE_ID =
    (1n << SnowFlake.MACHINE_ID_BITS) - 1n;
  private static readonly MAX_POSSIBLE_SEQUENCE =
    (1n << SnowFlake.SEQUENCE_BITS) - 1n;

  private machineId: bigint;
  private lastTimeStamp: bigint = -1n;
  private sequence: bigint = 0n;
  private cacheIds: bigint[] = [];
  private cacheSize: bigint = 0n;

  constructor(machineId: number, cacheSize: number) {
    if (
      machineId < 0 ||
      machineId > Number(SnowFlake.MAX_POSSIBLE_MACHINE_ID)
    ) {
      throw new Error(
        `Machine ID must be between 0 and ${SnowFlake.MAX_POSSIBLE_MACHINE_ID}`
      );
    }
    this.machineId = BigInt(machineId);
    this.cacheSize = BigInt(cacheSize);
  }

  private currentTimeStamp(): bigint {
    // Current time w.r.t. to EPOCH (offset from fixed epoch)
    return BigInt(Date.now()) - SnowFlake.EPOCH;
  }

  private waitForNextMilliSecond(timestamp: bigint) {
    while (timestamp <= this.lastTimeStamp) {
      timestamp = this.currentTimeStamp();
    }
    return timestamp;
  }

  private generateNewId() {
    let timestamp = this.currentTimeStamp();

    if (timestamp < this.lastTimeStamp) {
      throw new Error('Clock moved backwards. Refusing to generate ID');
    }

    if (timestamp == this.lastTimeStamp) {
      this.sequence = (this.sequence + 1n) & SnowFlake.MAX_POSSIBLE_SEQUENCE;

      if (this.sequence === 0n) {
        this.waitForNextMilliSecond(timestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimeStamp = timestamp;

    // [ 41-bit Timestamp ][ 10-bit Machine ID ][ 12-bit Sequence ]
    const id =
      (timestamp << (SnowFlake.MACHINE_ID_BITS + SnowFlake.SEQUENCE_BITS)) |
      (this.machineId << SnowFlake.SEQUENCE_BITS) |
      this.sequence;

    return id;
  }

  private refillCache() {
    let c = this.cacheSize;
    while (c--) {
      this.cacheIds.push(this.generateNewId());
    }
  }

  public generateId(): bigint {
    if (this.cacheIds.length === 0) {
      this.refillCache();
    }
    return this.cacheIds.shift()!;
  }
}

export default SnowFlake;
