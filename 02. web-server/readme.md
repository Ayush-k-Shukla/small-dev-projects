# Own Web Server

This challenge corresponds to the Coding Challenges https://codingchallenges.fyi/challenges/challenge-webserver

## Description

The webserver is a basic implementation and It current handles only GET requests and supports normal and file response.

It also handles common basic status responses.

## Usage

You can directly import the HttpServer class from the `server.ts` file and use it as follows:

```typescript
import { HttpServer } from './server';

const HOST = '127.0.0.1';
const PORT = 8000;
const debugMode = false;

const myServer = newHttpServer(HOST, PORT, debugMode);

// GET requests
myServer.get('/', (req) => {
  res.send('Hello World!');
});

// Serve a HTML file
myServer.get('/index.html', (req) => {
  req.sendFile('Html file serving');
});

// Start the server
webServer.startServer();
```

## Run tests

To run the tests for the webserver, go to the folder `2. web-server` and run

```bash

npm run test
```
