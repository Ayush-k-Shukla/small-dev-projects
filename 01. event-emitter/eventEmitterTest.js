const EventEmitter = require('./eventEmitter');

// Instantiate a new EventEmitter object.
const emitter = new EventEmitter();

// Register a listener for the "test" event.
emitter.on('test', (arg1, arg2) => {
  console.log(`Received test event with arguments ${arg1} and ${arg2}`);
});

// Emit the "test" event with some arguments.
emitter.emit('test', 'hello', 'world');

// Register a one-time listener for the "one-time" event.
emitter.once('one-time', () => {
  console.log(`Received one-time event`);
});

// Emit the "one-time" event twice to test that the one-time listener is removed after the first call.
emitter.emit('one-time');
emitter.emit('one-time');

// Test the listenersCount() method.
console.log(
  `Number of listeners for "test" event: ${emitter.listenersCount('test')}`
);

// Test the rawListeners() method.
const listeners = emitter.rawListeners('test');
console.log(`Number of raw listeners for "test" event: ${listeners}`);

// Remove the previously registered "test" listener.
emitter.off('test', (arg1, arg2) => {
  console.log(`Received test event with arguments ${arg1} and ${arg2}`);
});

// Test that the listener was actually removed by emitting the "test" event again.
emitter.emit('test', 'hello', 'world');
