const userService = require('../services/UserService');
const {sendResponse} = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
const {sendErrorMessage} = require('../errors/ExceptionTranslator');
const {User1DTO} = require('../services/dtos/User1DTO');
const entityMapper = require("../services/mapper/EntityMapper");

module.exports = {
	async changeUserName(req, res) {
		try{
			const {username} = req.body;
			const user = await userService.updateUsername(req.headers['authorization'], username);
			sendResponse(res, new User1DTO(user), httpCodes.HTTP_CREATED);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async checkUsernameAvailability(req, res) {
		try {
			const {username} = req.body;
			const bearerToken = req.headers['authorization'];
			const existingUser = await userService.checkIfUsernameIsTaken(
				username,
				await userService.getLoggedUserIdByToken(bearerToken),
				true
			);
			sendResponse(res, {available: existingUser}, httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	},

	async me(req, res) {
		try {
			const user = await userService.getOneByIdWithFollowersAndFollowing(req.user.id);
			sendResponse(res, new User1DTO(user), httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async getAllUsers(req, res) {
		try {
			const users = await userService.getAllUsers();
			sendResponse(res, entityMapper.toDTOList(users, User1DTO), httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},
	async getAllUsersWithFollowersAndFollowing(req, res) {
		try {
			const users = await userService.getAllUsersWithFollowersAndFollowing(req.user.id);
			sendResponse(res, entityMapper.toDTOList(users, User1DTO), httpCodes.HTTP_OK);
		}catch (e) {
			console.log(e);
			sendErrorMessage(res, e);
		}
	},

	async getUserProfile(req, res) {
		try {
			const user = await userService.getOneById(parseInt(req.params.id));
			sendResponse(res, entityMapper.toDTO(user, User1DTO), httpCodes.HTTP_OK);
		}catch (e) {
			sendErrorMessage(res, e);
		}
	}

}