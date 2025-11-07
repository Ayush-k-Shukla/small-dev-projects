import fs from 'fs';
import net from 'net';
import { HttpStatusCodes } from './core/constant';

export interface IHttpRequest {
  /**
   * Represents the method of incoming HTTP request
   *
   * @type {string}
   * @memberof IHttpRequest
   */
  method: string;

  /**
   * Represents the path of the incoming HTTP request
   *
   * @type {string}
   * @memberof IHttpRequest
   */
  path: string;

  /**
   * Represents the headers of the incoming HTTP request
   *
   * @type {Map<string, string>}
   * @memberof IHttpRequest
   */
  headers: Map<string, string>;

  /**
   * Represents the body of the incoming HTTP request version
   *
   * @type {string}
   * @memberof IHttpRequest
   */
  httpVersion: string;

  /**
   * Send function to send data back
   *
   * @memberof IHttpRequest
   */
  send: (data?: string, statusCode?: number) => void;

  /**
   * Sends file to client
   * Can be used to server html files
   *
   * @memberof IHttpRequest
   */
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

  send(data = '', statusCode = HttpStatusCodes.OK): void {
    this.sock.emit('send', this, data, statusCode);
  }

  sendFile(path: string) {
    if (fs.existsSync(path)) {
      const fileData = fs.readFileSync(path, 'utf-8');
      this.sock.emit('send', this, fileData, HttpStatusCodes.OK);
      return;
    }

    this.sock.emit('send', this, 'File not Found', HttpStatusCodes.NOT_FOUND);
  }
}
