import axios from 'axios';
import { createWebServer } from '../src';
import { HttpStatusCodes } from '../src/core/constant';
import { HttpServer } from '../src/server';

describe('Testing Server', () => {
  const mockServer: HttpServer = createWebServer(undefined, 5000);
  const baseUrl = `http://${mockServer.host}:${mockServer.port}`;

  beforeAll(() => {
    mockServer.startServer();
  });

  test('Single GET request test', async () => {
    const path = '/';
    const url = baseUrl + path;
    const res = await axios.get(url);

    expect(res.data).toBe(`Requested path : ${path}`);
    expect(res.status).toBe(HttpStatusCodes.OK);
  });

  test('Internal Server error test', async () => {
    const path = '/break-server';
    const url = baseUrl + path;
    const res = await axios.get(url, { validateStatus: () => true });
    expect(res.status).toBe(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  });

  test('Invalid path error test', async () => {
    const path = '/some-invalid-path';
    const url = baseUrl + path;
    const res = await axios.get(url, { validateStatus: () => true });
    expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
  });

  test('Multiple concurrent GET request test', async () => {
    const path = '/';
    const url = baseUrl + path;

    const requests = Array.from({ length: 5 }, async () => axios.get(url));
    const responses = await Promise.all(requests);

    responses.forEach((res) => {
      expect(res.status).toBe(HttpStatusCodes.OK);
    });
  });

  afterAll(() => {
    mockServer.stopServer();
  });
});
