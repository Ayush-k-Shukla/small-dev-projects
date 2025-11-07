# Server Sent Events

We have implemented SSE with http1 and http2 both. In http1 max limit of connection is 6 so we use http2 for more scenario.

## Extra setup needed for HTTP2

Install mkcert to generate locally truted SSL certificates and then run

```sh
choco install mkcert

mkcert -install

mkcert localhost
```

## Commands

### Start Http1

```sh
npm run dev:http1
```

### Start Http2

```sh
npm run dev:http2
```
