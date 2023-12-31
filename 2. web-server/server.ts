import * as net from 'net';
import path from 'path';

path.join(__dirname, '');

interface IHttpServer {
  host: string;
  port: number;
  server: net.Server;
  startServer(): void;
  stopServer(): void;
  get(path: string, cb: () => void): void;
}

export class HttpServer implements IHttpServer {
  readonly host: string;
  readonly port: number;
  readonly server;
  readonly listeners;

  constructor(host = '127.0.0.1', port = 80) {
    this.host = host;
    this.port = port;
    this.server = new net.Server();
    this.listeners = new Map<string, () => void>();
  }

  startServer(): void {
    // server is already started
    if (this.server.listening) {
      return;
    }
  }

  stopServer(): void {}

  get(path: string, cb: () => void): void {}
}
