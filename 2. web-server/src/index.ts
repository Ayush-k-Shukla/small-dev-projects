import { IHttpRequest } from './request';
import { HttpServer } from './server';

export const startWebServer = (
  host: string = '127.0.0.1',
  port: number = 4000
): HttpServer => {
  const myServer: HttpServer = new HttpServer(host, port);

  myServer.get('/', (req: IHttpRequest): void => {
    req.send(`Requested path : ${req.path}`);
  });

  myServer.get('/test', (req: IHttpRequest): void => {
    req.send(`Requested path : ${req.path}`);
  });

  myServer.get('/get-error', () => {
    throw new Error('Some error occurred');
  });

  myServer.startServer();

  // need to test
  // myServer.stopServer();
  return myServer;
};

// Done for local testing purposes
startWebServer();
