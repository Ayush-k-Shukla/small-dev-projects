import net from 'net';

export interface IHttpRequest {
  method: string;
  path: string;
  headers: Map<string, string>;
  httpVersion: string;
  send: (data?: string, statusCode?: number) => void;
  sendFile: (path: string) => void;
}

export class HttpRequest implements IHttpRequest {
  readonly method: string;
  readonly path: string;
  readonly headers: Map<string, string>;
  readonly httpVersion: string;
  private sock: net.Socket;

  constructor(
    sock: net.Socket,
    method: string,
    path: string,
    headers: Map<string, string> = new Map<string, string>(),
    httpVersion: string
  ) {
    this.sock = sock;
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.httpVersion = httpVersion;
  }

  send(data = '', statusCode = 200): void {}

  sendFile(path: string) {}
}
