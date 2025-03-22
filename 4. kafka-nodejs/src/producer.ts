import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('producer connected');

  for (let i = 0; i < 5; i++) {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: `${i} Hello Kafka from Node.js!` }]
    });
  }
  console.log('Message sent!');
  await producer.disconnect();
};

runProducer().catch(console.error);
