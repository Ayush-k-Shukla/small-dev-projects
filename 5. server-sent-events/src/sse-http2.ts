import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  const path = headers[':path'];
  if (path === '/events') {
    console.log('Client connected to SSE');
    const origin = headers['origin'] || '*';
    stream.respond({
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'access-control-allow-origin': origin,
      ':status': 200,
      'access-control-allow-credentials': 'true'
    });

    const sendEvent = (data: any) => {
      stream.write(`event: customEvent\n`);
      stream.write(`data: ${JSON.stringify(data)}\n`);
    };

    let cnt = 0;
    const interval = setInterval(() => {
      sendEvent({ message: `Hello from SSE! ${cnt}` });
      cnt++;
    }, 1000);

    stream.on('close', () => {
      clearInterval(interval);
    });
  } else {
    stream.respond({
      ':status': 404
    });
    stream.end();
  }
});

server.listen(4000, () => {
  console.log('Stream Server started on 4000 Port');
});
