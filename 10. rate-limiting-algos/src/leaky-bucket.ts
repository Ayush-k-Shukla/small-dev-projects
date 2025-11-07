class LeakyBucket {
  private leakRate: number; // per second
  private capacity: number;
  private lastLeak: number;
  private pendingRequests: number;

  public constructor(capacity: number, leakRate: number) {
    this.leakRate = leakRate;
    this.capacity = capacity;
    this.lastLeak = Date.now();
    this.pendingRequests = 0;
  }

  private leak() {
    const elapsedTimeInSecondsSinceLastLeak =
      (Date.now() - this.lastLeak) / 1000;
    const leaked = elapsedTimeInSecondsSinceLastLeak * this.leakRate;
    this.pendingRequests = Math.max(0, this.pendingRequests - leaked);
    this.lastLeak = Date.now();
  }

  public tryAddRequest(): boolean {
    this.leak();
    if (this.pendingRequests < this.capacity) {
      this.pendingRequests++;
      return true;
    } else {
      return false;
    }
  }
}

const bucket1 = new LeakyBucket(5, 2);

let i = 1;
setInterval(() => {
  const accepted = bucket1.tryAddRequest();
  console.log(
    accepted ? '✅ Request accepted: ' + i++ : '❌ Request dropped: ' + i++
  );
}, 200);
