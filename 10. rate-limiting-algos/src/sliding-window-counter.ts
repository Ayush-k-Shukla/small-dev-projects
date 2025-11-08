class SlidingWindowCounter {
  private windowSize: number; // size of window in seconds
  private maxRequest: number; // max request possible per window
  private currentWindowRequest: number;
  private oldWindowRequest: number;
  private currentActiveWindow: number; // in seconds

  public constructor(maxRequest: number, windowSize: number) {
    this.maxRequest = maxRequest;
    this.windowSize = windowSize;
    this.currentWindowRequest = 0;
    this.oldWindowRequest = 0;
    this.currentActiveWindow = this.currentWindow();
  }

  public allowRequest(): boolean {
    const window: number = this.currentWindow();
    const now = Math.floor(Date.now() / 1000);

    if (this.currentActiveWindow !== window) {
      this.oldWindowRequest = this.currentWindowRequest;
      this.currentActiveWindow = window;
      this.currentWindowRequest = 0;
    }

    const windowElapsed =
      (now - this.currentActiveWindow * this.windowSize) / this.windowSize;

    const weight =
      (1 - windowElapsed) * this.oldWindowRequest + this.currentWindowRequest;

    if (weight < this.maxRequest) {
      this.currentWindowRequest += 1;
      return true;
    }

    return false;
  }

  private currentWindow(): number {
    const timeInS = Math.floor(Date.now() / 1000);
    return Math.floor(timeInS / this.windowSize);
  }
}

const limiter = new SlidingWindowCounter(5, 10); // max 5 reqs per 10 seconds

let i4 = 1;
const interval = setInterval(() => {
  const ok = limiter.allowRequest();
  console.log(ok ? `✅ allowed ${i4++}` : `❌ denied ${i4++}`);
}, 1000);
