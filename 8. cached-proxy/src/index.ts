import express from 'express';
import { proxyMiddleWare } from './proxyMiddleware';

export const startServer = (port: number, origin: string) => {
  const app = express();
  app.use(proxyMiddleWare(origin));
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

export const clearCache = () => {
  console.log('clear cache');
};
