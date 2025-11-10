// Simple web worker
const fibInput = document.getElementById('fibInput');
const fibBtn = document.getElementById('fibBtn');
const fibResult = document.getElementById('fibResult');

const webWorker = new Worker('web-worker.js');

fibBtn.onclick = () => {
  const i = parseInt(fibInput.value);
  if (isNaN(i)) return alert('Enter a number!');
  fibResult.textContent = 'Calculating...';
  webWorker.postMessage(i);
};
webWorker.onmessage = (e) => {
  fibResult.textContent = `Fibonacci(${fibInput.value}) = ${e.data}`;
};

// Shared worker
const incBtn = document.getElementById('incBtn');
const sharedCount = document.getElementById('sharedCount');

const sharedWorker = new SharedWorker('shared-worker.js');

sharedWorker.port.start();

incBtn.onclick = () => {
  sharedWorker.port.postMessage('increment');
};

sharedWorker.port.onmessage = (e) => {
  sharedCount.textContent = e.data.count;
};

// Service worker
const swStatus = document.getElementById('swStatus');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .then(() => {
      swStatus.textContent = 'Registered';
    })
    .catch(() => {
      swStatus.textContent = 'Failed to register';
    });
}

const fetchBtn = document.getElementById('fetchData');
const apiResult = document.getElementById('apiResult');

fetchBtn.onclick = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await res.json();
    apiResult.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    apiResult.textContent = 'Failed to fetch (maybe offline)';
  }
};
