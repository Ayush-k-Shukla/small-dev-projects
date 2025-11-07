import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import Cache from './redis';

export const proxyMiddleWare = (origin: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.method}:${req.url}`;

    console.group('CACHING PROXY START');
    console.time();
    console.info('url: ', req.url);

    const cache = new Cache();
    await cache.connect();
    const data = await cache.get(key);
    if (data) {
      console.info('SUCCESS');
      console.timeEnd();
      console.groupEnd();

      res.set('X-Cache', 'Hit');
      res.send(data);
    }

    try {
      const response = await axios.get(origin);
      await cache.set(key, response.data);
      res.set('X-Cache', 'Miss');
      res.send(response.data);

      console.info('SUCCESS');
      console.timeEnd();
      console.groupEnd();
    } catch (error) {
      console.error('[error] .cacheMiddleware: ', error);
      // return res.status(500).send('Error fetching from origin server');
    }
  };
};
