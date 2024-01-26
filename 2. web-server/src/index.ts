import path from 'path';
import { IHttpRequest } from './request';
import { HttpServer } from './server';

export const createWebServer = (
  host: string = '127.0.0.1',
  port: number = 4000,
  debugMode: boolean = false
): HttpServer => {
  const myServer: HttpServer = new HttpServer(host, port, debugMode);

  myServer.get('/', (req: IHttpRequest): void => {
    req.send(`Requested path : ${req.path}`);
  });

  myServer.get('/index.html', (req: IHttpRequest): void => {
    req.sendFile(path.join(__dirname, './public/index.html'));
  });

  myServer.get('/break-server', () => {
    throw new Error('Some error occurred');
  });

  myServer.startServer();

  return myServer;
};

// To test server locally uncomment
// createWebServer(undefined, undefined, true);
