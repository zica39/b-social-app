const request = require('supertest');
const express = require('express');
const UserController = require('../controllers/AuthenticationController');
const UserService = require('../services/UserService');
const JWTUtil = require('../utils/JWTUtil');
const kafkaService = require('../services/kafka/KafkaService');

jest.mock('../services/UserService');
jest.mock('../services/kafka/KafkaService');
jest.mock('../utils/JWTUtil');

const app = express();
app.use(express.json());

app.post('/login', UserController.login);
app.post('/register', UserController.register);
app.post('/refresh-token', UserController.refreshToken);
app.get('/current-server-time', UserController.getCurrentServerTime);

describe('UserController Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        test('should return HTTP_OK and access token on successful login', async () => {
            UserService.getOneByUsernameOrEmail.mockResolvedValueOnce({
                // mock user data
            });
            UserService.setLastLogin.mockResolvedValueOnce();
            JWTUtil.jwtSignUser.mockReturnValueOnce('mocked-access-token');

            const response = await request(app)
                .post('/login')
                .send(/* mock request data */);

            expect(UserService.getOneByUsernameOrEmail).toHaveBeenCalled();
            expect(UserService.setLastLogin).toHaveBeenCalled();
            expect(JWTUtil.jwtSignUser).toHaveBeenCalled();
            expect(response.statusCode).toBe(200);
            expect(response.body.access_token).toBe('mocked-access-token');
        });

        // add more tests for different scenarios
    });

    describe('register', () => {
        test('should return HTTP_CREATED and send message to Kafka on successful registration', async () => {
            UserService.createUser.mockResolvedValueOnce({
                // mock user data
            });
            UserService.setLastLogin.mockResolvedValueOnce();
            JWTUtil.jwtSignUser.mockReturnValueOnce('mocked-access-token');
            kafkaService.sendMessage.mockResolvedValueOnce();

            const response = await request(app)
                .post('/register')
                .send(/* mock request data */);

            expect(UserService.createUser).toHaveBeenCalled();
            expect(UserService.setLastLogin).toHaveBeenCalled();
            expect(JWTUtil.jwtSignUser).toHaveBeenCalled();
            expect(kafkaService.sendMessage).toHaveBeenCalled();
            expect(response.statusCode).toBe(201);
            expect(response.body.access_token).toBe('mocked-access-token');
        });

    });

});
