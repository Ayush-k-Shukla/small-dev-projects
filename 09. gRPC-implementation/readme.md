# gRPC Implementation in TypeScript

This project demonstrates how to implement **gRPC** using **TypeScript** with support for both client and server.
It uses [`@grpc/grpc-js`](https://www.npmjs.com/package/@grpc/grpc-js), [`ts-proto`](https://www.npmjs.com/package/ts-proto), and [`grpc-tools`](https://www.npmjs.com/package/grpc-tools) for seamless code generation and communication.

---

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Code gen

Run the following command to generate TypeScript definitions and service stubs:

```
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./proto/user.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true
```

## Run the Server

`npm run dev:server`

- This starts the gRPC server and listens on a specified port (e.g. localhost:50051).

## Run the Client

`npm run dev:client`
