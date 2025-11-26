import * as net from 'net';
import { CommandHandler } from './commands';
import { RespParser } from './resp-parser';

const PORT = 6379;
const HOST = '127.0.0.1';

const parser = new RespParser();
const handler = new CommandHandler();

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    try {
      const commands = parser.parse(data);
      for (const command of commands) {
        const result = handler.handle(command);
        const response = parser.serialize(result);
        socket.write(response);
      }
    } catch (err) {
      console.error('Error processing data:', err);
      socket.write(parser.serializeError('ERR internal server error'));
    }
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Redis clone server listening on ${HOST}:${PORT}`);
});
