import { createClient, RedisClientType } from 'redis';

class Cache {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      socket: {
        host: 'localhost',
        port: 6379
      }
    });
    this.redisClient.on('error', (err) => {
      console.log('Error connecting to redis client', err);
    });
  }

  async connect() {
    await this.redisClient.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    const d = await this.redisClient.get(key);
    return d ? JSON.parse(d) : null;
  }

  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), {
      EX: 600
    });
  }

  async clear(key?: string): Promise<void> {
    if (key) {
      await this.redisClient.del(key);
    } else {
      await this.redisClient.flushAll();
    }
  }
}

export default Cache;
