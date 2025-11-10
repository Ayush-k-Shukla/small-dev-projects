let count = 0;
const ports = [];

onconnect = (e) => {
  let port = e.ports[0];
  ports.push(port);

  console.log(ports);

  port.postMessage({ count });

  port.onmessage = (event) => {
    if (event.data === 'increment') {
      count++;
      ports.forEach((p) => p.postMessage({ count }));
    }
  };
};
