interface IReq {
  id: number;
  next: () => void;
  fail: () => void;
}

interface IQueue {
  resolve: () => void;
  reject: (err: Error) => void;
  timeoutId?: NodeJS.Timeout;
}

const onNext = (id: number) => {
  console.log('Request success: ', id);
};
const onFail = (id: number) => {
  console.log('Request fail: ', id);
};

class TokenBucket {
  private fillRate: number; // per second
  private capacity: number;
  private availableTokens: number;
  private intervalId: NodeJS.Timeout;
  private waitingQueue: IQueue[];

  public constructor(capacity: number, fillRate: number) {
    this.fillRate = fillRate;
    this.availableTokens = capacity;
    this.capacity = capacity;
    this.waitingQueue = [];
    this.intervalId = setInterval(() => {
      if (this.capacity > this.availableTokens) {
        this.availableTokens += this.fillRate;
      }
      this.processQueue();
    }, 1000);
  }

  public acquire(timeout = 3000): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.availableTokens > 0) {
        this.availableTokens -= 1;
        resolve();
        return;
      }

      const waiter = {
        resolve,
        reject,
        createdAt: Date.now(),
        timeoutId: undefined as NodeJS.Timeout | undefined
      };

      waiter.timeoutId = setTimeout(() => {
        const index = this.waitingQueue.indexOf(waiter);
        if (index !== -1) this.waitingQueue.splice(index, 1);
        reject(new Error('Token acquire timeout'));
      }, timeout);

      this.waitingQueue.push(waiter);
    });
  }

  public close() {
    clearInterval(this.intervalId);
    for (const waiter of this.waitingQueue) {
      if (waiter.timeoutId) clearTimeout(waiter.timeoutId);
      waiter.reject(new Error('Bucket closed'));
    }
    this.waitingQueue = [];
  }

  private processQueue() {
    while (this.waitingQueue.length > 0 && this.availableTokens > 0) {
      const r: IQueue | undefined = this.waitingQueue.shift();
      if (r) {
        this.availableTokens -= 1;
        if (r.timeoutId) clearTimeout(r.timeoutId);
        r.resolve();
      }
    }
  }
}
const bucket = new TokenBucket(5, 1);

async function makeRequest(id: number) {
  try {
    await bucket.acquire(3000);
    console.log('✅ Request processed:', id);
  } catch (err) {
    console.log('❌ Request failed:', id, '-', (err as Error).message);
  }
}

for (let i = 0; i < 10; i++) {
  makeRequest(i + 1);
}

setTimeout(() => bucket.close(), 4000);
