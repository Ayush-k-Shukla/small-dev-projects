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
}
