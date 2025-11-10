function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

onmessage = (e) => {
  const result = fib(e.data);
  postMessage(result);
};
