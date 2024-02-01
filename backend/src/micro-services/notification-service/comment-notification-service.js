const express = require('express');
const { Kafka } = require('kafkajs');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST'],
    credentials: true,
}));

const kafka = new Kafka({
    clientId: 'comment-notification-service',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'comment-notification-group' });

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3002',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'create-comment-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const comment = JSON.parse(message.value.toString());
            console.log('Received comment:', comment);

            console.log(comment.postOwnerId)
            if(comment.userId !== comment.postOwnerId)
            io.to(comment.postOwnerId).emit('newComment', { comment });
        },
    });
};

startConsumer();

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Comment Notification Service listening at http://localhost:${port}`);
});
