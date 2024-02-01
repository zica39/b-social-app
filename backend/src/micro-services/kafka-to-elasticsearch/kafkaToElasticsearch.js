const express = require('express');
const { Kafka } = require('kafkajs');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const port = 3003;

const kafka = new Kafka({
    clientId: 'kafka-to-elasticsearch',
    brokers: ['localhost:9092'],
});

const kafkaConsumer = kafka.consumer({ groupId: 'kafka-to-elasticsearch-group' });
const elasticsearchClient = new Client({
    node: 'http://localhost:9200',
    headers: {
        'Content-Type': 'application/json',
    }
});

const topics = ['create-comment-topic', 'create-post-topic', 'user-registration-topic'];

const run = async () => {
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({ topics });

    await kafkaConsumer.run({
        eachMessage: async ({ topic, message }) => {
            const jsonString = message.value.toString();
            const data = JSON.parse(jsonString);

            const index = topic.replace(/-/g, '_');

            await elasticsearchClient.index({
                index,
                body: data
            });

            console.log(`Message from topic ${topic} stored in Elasticsearch:`, data);
        },
    });
};

run().catch(console.error);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
