import * as net from 'net';

const client = new net.Socket();

client.connect(6379, '127.0.0.1', () => {
  console.log('Connected to Redis Clone');

  /**
   * Converting command into resp format, like redis uses
   */
  const sendCommand = (cmd: string[]) => {
    let resp = `*${cmd.length}\r\n`;
    for (const arg of cmd) {
      resp += `$${arg.length}\r\n${arg}\r\n`;
    }
    client.write(resp);
  };

  const commands = [
    ['PING'],
    ['ECHO', 'Hello World'],
    ['SET', 'mykey', 'myvalue'],
    ['GET', 'mykey'],
    ['DEL', 'mykey'],
    ['GET', 'mykey']
  ];

  let index = 0;

  const sendNext = () => {
    if (index < commands.length) {
      console.log(`Sending: ${commands[index].join(' ')}`);
      sendCommand(commands[index]);
      index++;
    } else {
      client.end();
    }
  };

  sendNext();

  client.on('data', (data) => {
    console.log('Received:', JSON.stringify(data.toString()));
    setTimeout(sendNext, 100);
  });

  client.on('close', () => {
    console.log('Connection closed');
  });
});
