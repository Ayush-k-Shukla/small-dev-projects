import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/events', (req, res) => {
  res.setHeader('Content-type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`data: Initial data connection\n`);

  let cnt = 0;
  const id = setInterval(() => {
    cnt++;
    res.write(`event: customEvent\n`);
    res.write(`data: This is a custom event message ${cnt}\n\n`);
  }, 1000);

  req.on('close', () => {
    clearInterval(id);
    res.end();
  });
});

app.listen(4001, () => {
  console.log('Server started on 4001 Port');
});
