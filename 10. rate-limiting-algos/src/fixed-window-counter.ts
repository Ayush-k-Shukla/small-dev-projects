class FixedWindowCounter {
  private windowSize: number; // size of window in seconds
  private maxRequest: number; // max request possible per window
  private currentWindowRequestCount: number;
  private currentActiveWindow: number; // in seconds

  public constructor(maxRequest: number, windowSize: number) {
    this.maxRequest = maxRequest;
    this.windowSize = windowSize;
    this.currentActiveWindow = this.currentWindow();
    this.currentWindowRequestCount = 0;
  }

  public allowRequest(): boolean {
    const window: number = this.currentWindow();

    console.log('win: ', window, Date.now());
    if (this.currentActiveWindow === window) {
      if (this.currentWindowRequestCount < this.maxRequest) {
        this.currentWindowRequestCount += 1;
        return true;
      }
      return false;
    }
    this.currentWindowRequestCount = 1;
    this.currentActiveWindow = window;
    return true;
  }

  private currentWindow(): number {
    const timeInS = Math.floor(Date.now() / 1000);

    return Math.floor(timeInS / this.windowSize);
  }
}
const bucket2 = new FixedWindowCounter(2, 1);
let i1 = 1;
setInterval(() => {
  const accepted = bucket2.allowRequest();
  console.log(
    accepted ? '✅ Request accepted: ' + i1++ : '❌ Request dropped: ' + i1++
  );
}, 200);
