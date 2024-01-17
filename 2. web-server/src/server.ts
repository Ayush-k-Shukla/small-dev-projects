import * as net from 'net';
import path from 'path';
import { HttpStatusCodes } from './core/constant';
import { createKeyFromMethodAndPath } from './core/helper';
import { HttpRequest, IHttpRequest } from './request';

path.join(__dirname, '');

export interface IHttpServer {
  /**
   * Represents the host of the net.Server instance
   *
   * @type {string}
   * @memberof IHttpServer
   */
  host: string;

  /**
   * Represents the port of the net.Server instance
   *
   * @type {number}
   * @memberof IHttpServer
   */
  port: number;

  /**
   * Represents the net.Server instance
   *
   * @type {net.Server}
   * @memberof IHttpServer
   */
  server: net.Server;

  /**
   * Starts listening on the given host and port.
   *
   * @memberof IHttpServer
   */
  startServer(): void;

  /**
   * Stops listening to the net.Server instance.
   *
   * @memberof IHttpServer
   */
  stopServer(): void;

  /**
   * This method is exposed to the user for adding GET routes with the callback function.
   *
   * @param {string} path
   * @param {(req: IHttpRequest) => void} cb
   * @memberof IHttpServer
   */
  get(path: string, cb: (req: IHttpRequest) => void): void;
}

export class HttpServer implements IHttpServer {
  readonly host: string;
  readonly port: number;
  readonly server;
  readonly listeners;

  constructor(host: string = '127.0.0.1', port: number = 80) {
    this.host = host;
    this.port = port;
    this.server = new net.Server();
    this.listeners = new Map<string, (req: IHttpRequest) => void>();
  }

  /**
   * Starts the server
   *
   * @return {*}  {void}
   * @memberof HttpServer
   */
  startServer(): void {
    // server is already started
    if (this.server.listening) {
      return;
    }

    // Start a TCP connection
    this.server.listen(this.port, this.host, () => {
      console.log(`Server started listening on ${this.host}:${this.port}`);
    });

    // emitted when a new connection is established
    this.server.on('connection', (sock) => {
      sock.on('data', (data: any) => {
        const input = data.toString();
        console.log('Got input on connection link -> \n', input);

        const request = this.parseRequestData(sock, input);

        this.forwardRequestToListener(request);
      });

      sock.on('send', () => {});
    });
  }

  /**
   * Stops the server
   *
   * @returns {*} {void}
   * @memberof HttpServer
   */
  stopServer(): void {
    this.server.close();
  }

  /**
   * Get function to register incoming request to listener
   *
   * @param {string} path
   * @param {(req: IHttpRequest) => void} cb
   * @memberof HttpServer
   */
  get(path: string, cb: (req: IHttpRequest) => void): void {
    const key = createKeyFromMethodAndPath('GET', path);
    this.listeners.set(key, cb);
  }

  /* ------------------------------- Private Helpers ------------------------------------------- */

  /**
   * Forward incoming request to listener
   * If no listener is registered then the server will respond with 404 status code
   * If any error is encountered during callback execution then respond with 500 status code
   *
   * @private
   * @param {IHttpRequest} request
   * @return {*}
   * @memberof HttpServer
   */
  private forwardRequestToListener(request: IHttpRequest): void {
    const key = createKeyFromMethodAndPath(request.method, request.path);

    if (this.listeners.has(key)) {
      try {
        const cb = this.listeners.get(key)!;
        cb(request); // Process request callback
      } catch (err) {
        console.log(err);
        request.send(undefined, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      return;
    }

    request.send(undefined, HttpStatusCodes.NOT_FOUND);
  }

  /**
   * Parse the rquest data given
   * extract method, path, http-version and headers from the request
   *
   * @private
   * @param {net.Socket} sock
   * @param {string} data
   * @return {*}  {IHttpRequest}
   * @memberof HttpServer
   */
  private parseRequestData(sock: net.Socket, data: string): IHttpRequest {
    const lines = data.split(/\r\n|\n/);
    console.log(lines);
    const elements = lines[0].split(' ');

    const method = elements[0];
    const path = elements[1];
    const httpVersion = elements[2];
    const headers = this.parseRequestHeaders(lines);

    return new HttpRequest(sock, method, path, headers, httpVersion);
  }

  /**
   * Populates the request headers in key value format
   *
   * @private
   * @param {string[]} elements
   * @return {*}  {Map<string, string>}
   * @memberof HttpServer
   */
  private parseRequestHeaders(elements: string[]): Map<string, string> {
    const headers = new Map<string, string>();

    // Setting up all headers in key-value format
    for (let i = 1; i < elements.length; i++) {
      const elem = elements[i].split(':');
      headers.set(elem[0], elem[1]);
    }
    return headers;
  }
}
