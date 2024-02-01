const JWTUtil = require('../utils/JWTUtil');
const {User1DTO} = require('../services/dtos/User1DTO');
const UserService = require('../services/UserService');
const RequestHandler = require('../utils/RequestHandler');
const {errorMessages, httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const SecurityService = require("../services/security/SecurityService");
const {sendResponse} = require("../utils/RequestHandler");
const kafkaService = require('../services/kafka/KafkaService');




module.exports = {
    async login(req, res) {
        try {
            let user = await UserService.getOneByUsernameOrEmail(req);
            if(user == null){
                RequestHandler.sendResponse(res, errorMessages.INVALID_CREDENTIALS, httpCodes.BAD_REQUEST);
                return;
            }
            let lastLogin = user.last_login;
            await UserService.setLastLogin(user, lastLogin);
            const userDTO = new User1DTO(user);
            const responseData = {
                access_token: JWTUtil.jwtSignUser({
                    id: userDTO._id,
                    username: userDTO.username,
                    email: userDTO.email
                }),
                refresh_token: JWTUtil.jwtSignUser({
                    id: userDTO._id,
                    username: userDTO.username,
                    email: userDTO.email
                }, true),
                user: userDTO,
                firstTimeLogin: false
            };
            RequestHandler.sendResponse(res, responseData, httpCodes.HTTP_OK);
        } catch (err) {
            console.log(err);
            RequestHandler.sendResponse(res, errorMessages.SERVER_ERROR, httpCodes.SERVER_ERROR);
        }
    },

    async register(req, res) {
        try {
            const existingUser = await UserService.doesOneExistsByUsernameOrEmail(req);
            if (existingUser) {
                RequestHandler.sendResponse(res, errorMessages.USER_ALREADY_EXISTS, httpCodes.CONFLICT);
                return;
            }

             let  user = await UserService.createUser(req.body, req.headers['x-forwarded-for']);

            let lastLogin = user.last_login;
            await UserService.setLastLogin(user, lastLogin);
            const userDTO = new User1DTO(user);
            const responseData = {
                access_token: JWTUtil.jwtSignUser({
                    id: userDTO._id,
                    username: userDTO.username,
                    email: userDTO.email
                }),
                refresh_token: JWTUtil.jwtSignUser({
                    id: userDTO._id,
                    username: userDTO.username,
                    email: userDTO.email
                }, true),
                user: userDTO,
                firstTimeLogin: true
            };

            const message = {
                user: userDTO,
                registrationDate: new Date().toISOString(),
            };

            const stringifyMsg = JSON.stringify(message);

            await kafkaService.sendMessage(
              'user-registration-topic',
                stringifyMsg
            );


            RequestHandler.sendResponse(res, responseData, httpCodes.HTTP_CREATED);
        } catch (err) {
            console.log(err);
            RequestHandler.sendResponse(res, errorMessages.SERVER_ERROR, httpCodes.SERVER_ERROR);
        }
    },

    async refreshToken(req, res) {
        const {refreshToken} = req.body;
        try {
            const user = await SecurityService.getAuthenticatedUser(res, "Bearer " + refreshToken, true);
            const data = {
                access_token: JWTUtil.jwtSignUser({id: user.id, username: user.username, email: user.email}),
                refresh_token: JWTUtil.jwtSignUser({
                    id: user.id,
                    username: user.username,
                    email: user.email
                }, true),
            };
            sendResponse(res, data, httpCodes.HTTP_OK);
        } catch (e) {
            sendErrorMessage(res, e);
        }
    },

    async getCurrentServerTime(req, res) {
        try {
            sendResponse(res, {currentDateTime: new Date()}, httpCodes.HTTP_OK);
        } catch (e) {
            sendErrorMessage(res, e);
        }
    }
}
