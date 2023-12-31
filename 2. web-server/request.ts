import net from 'net';

interface IHttpRequest {
  method: string;
  path: string;
  headers: Map<string, string>;
  httpVersion: string;
  send: (data?: string, statusCode?: number) => void;
  sendFile: (path: string) => void;
}

class HttpRequest implements IHttpRequest {
  readonly method: string;
  readonly path: string;
  readonly headers: Map<string, string>;
  readonly httpVersion: string;
  private sock: net.Socket;

  send: (data?: string, statusCode?: number) => void;

  sendFile: (path: string) => void;
}

export { HttpRequest, IHttpRequest };
