/**
 * Sliding window log
 * - store everything as timestamp log
 * - when a new request come check how many logs present in window size (logs in given seconds)
 * - if present logs is less than max request allow else fail
 * - it is different from fixed window as here actual time stamps are stored rather than window of multiple seconds
 */

class SlidingWindowLog {
  private windowSize: number; // size of window in seconds
  private maxRequest: number; // max request possible per window
  private logsTimestamp: number[];

  public constructor(maxRequest: number, windowSize: number) {
    this.maxRequest = maxRequest;
    this.windowSize = windowSize;
    this.logsTimestamp = [];
  }

  public allowRequest(): boolean {
    const now = Date.now() / 1000;
    const windowStart = now - this.windowSize;

    this.logsTimestamp = this.logsTimestamp.filter((f) => f > windowStart);

    if (this.logsTimestamp.length < this.maxRequest) {
      this.logsTimestamp.push(now);
      return true;
    }

    return false;
  }

  public debug() {
    return this.logsTimestamp.map(
      (ts) => (Date.now() / 1000 - ts).toFixed(2) + 's ago'
    );
  }
}
const bucket3 = new SlidingWindowLog(6, 2);
let i2 = 1;
setInterval(() => {
  const accepted = bucket3.allowRequest();
  console.log(
    `${accepted ? '✅' : '❌'} Req ${i2++} | Logs: [${bucket3
      .debug()
      .join(', ')}]`
  );
}, 200);
