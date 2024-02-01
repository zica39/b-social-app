// kafkaService.js

const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'bSocial-app',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function connectToKafka() {
    await producer.connect();
    console.log('Connected to Kafka');
}

async function sendMessage(topic, message) {
    try {
        await producer.send({
            topic,
            messages: [{ value: message }],
        });
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = {
    connectToKafka,
    sendMessage,
};
