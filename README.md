# BSocial - Job Application Project

BSocial is a full-stack application developed for a job application process. The project consists of a backend written in Node.js and a frontend using React.

## Prerequisites

Ensure you have Node.js version 16.20.2 installed.

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend application:

```bash
npm start
```

## Backend Setup

1. Create a database named `bsocial`.

2. Start Kafka and Elasticsearch using Docker Compose:

```bash
docker-compose up -d
```

3. Navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Start the main backend application:

```bash
npm start
```

## Microservices Setup

### Notification Service

Navigate to the notification service directory:

```bash
cd backend/src/micro-services/notification-service
```

Install dependencies:

```bash
npm install
```

Start the notification service:

```bash
npm start
```

### Kafka to Elasticsearch Microservice

Navigate to the Kafka to Elasticsearch microservice directory:

```bash
cd backend/src/micro-services/kafka-to-elasticsearch
```

Install dependencies:

```bash
npm install
```

Start the Kafka to Elasticsearch microservice:

```bash
npm start
```

## Postman Collection

Exported Postman collection: [BSocial API-s.postman_collection](path/to/BSocial%20API-s.postman_collection.json)

Feel free to adjust the configuration or customize the project according to your needs. For any questions, contact the project author: Zeljko Ivanovic.
