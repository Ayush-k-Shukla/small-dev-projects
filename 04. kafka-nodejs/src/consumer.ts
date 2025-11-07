import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'test-group' });

const runConsumer = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, partition, topic }) => {
      console.log(
        `Received message: ${message?.value?.toString()} on partition ${partition} for topic ${topic}`
      );
    }
  });
};

runConsumer().catch(console.error);
