# Redis Clone (Minimal)

## Overview

Lightweight Redis clone in TypeScript. The server listens on port 6379 and speaks the RESP (Redis Serialization Protocol).

## Features Implemented

- `PING`: Returns `PONG`.
- `ECHO [message]`: Returns the message.
- `SET [key] [value]`: Stores a key-value pair.
- `GET [key]`: Retrieves a value.
- `DEL [key]`: Deletes a key.

## How to run

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Install dependencies

```sh
npm install
```

### Start the server

```sh
npm run dev
```

The server will start on port 6379.

### Test

First build

```sh
npm run build
```

```sh
node dist/client-test.js
```
