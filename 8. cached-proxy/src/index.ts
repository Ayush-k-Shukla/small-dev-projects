import express from 'express';

export const startServer = (port: number, origin: string) => {
  const app = express();
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
};

export const clearCache = () => {
  console.log('clear cache');
};
