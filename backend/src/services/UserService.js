const {User} = require("../models");
const UserRepository = require('../repositories/UserRepository');
const {errorMessages, httpCodes} = require("../errors/ExceptionErrors");
const {generateRandomPassword, generateRandomUsername} = require('../utils/StringUtils');
const {extractToken} = require("../utils/JWTUtil");
const BadActionException = require('../errors/BadActionException');
const Unauthenticated = require('../errors/Unauthenticated');
const jwt = require('jsonwebtoken');
const {auth, ipTrace} = require('../config/config');
const EntityMapper = require('./mapper/EntityMapper');
const {CommentUserDTO} = require('./dtos/User1DTO');
const EntityNotFound = require('../errors/EntityNotFound');
const bcrypt = require("bcrypt-nodejs");


module.exports = {

	async getOneByEmail(req) {
		const {email} = req.body;
		return await UserRepository.findByEmail(email);
	},
	async getOneByEmailAndPassword(req) {
		const {email, password} = req.body;
		return await UserRepository.findByEmailAndPassword(email, password);
	},

	async getOneByUsernameOrEmail(req) {
		const {username} = req.body;
		let user = await UserRepository.findByUsername(username);
		if (!user && username) {
			user = await UserRepository.findByEmail(username)
		}
		return user;
	},

	async doesOneExistsByUsernameOrEmail(req) {
		const {username, email} = req.body;
		let user = await UserRepository.findByUsername(username);
		if (!user) {
			user = await UserRepository.findByEmail(email)
		}
		return user;
	},

	async getAllUsers(){

		return  await UserRepository.getAllUsers();
	},

	async getAllUsersWithFollowersAndFollowing(id){

		const users = await UserRepository.findAllUsers();

		const users1 = [];
		for(var i in users){
			var newUser = await this.getOneByIdWithFollowersAndFollowing(users[i].id);
			users1.push(newUser);
		}

		return users1;

	},

	async setLastLogin(user, lastLogin) {
		console.log(lastLogin)
		user.previous_login = lastLogin ? lastLogin : null;
		user.last_login = new Date();
		await user.save();
	},
	async getOneByUsername(username) {
		return await UserRepository.findByUsername(username);
	},
	async handleAdminLogin(username,password) {
		const user = await UserRepository.findAdminByUsername(username);
		if(!user) {
			throw new EntityNotFound("User");
		}
		const verified = bcrypt.compareSync(password, user.password);
		if(!verified) {
			throw new Unauthenticated("Unauthenticated");
		}
		return user;
	},
	async getOneById(id) {
		const user = await UserRepository.findById(id);
		if (!user) {
			throw new EntityNotFound("User");
		}
		return user;
	},
	async getOneByIdWithFollowersAndFollowing(id){

		const user = await UserRepository.findByIdWithFollowerAndFollowing(id);
		user.following = user.following.map(user1 => EntityMapper.toDTO(user1, CommentUserDTO));
		user.followers = user.followers.map(user1 => EntityMapper.toDTO(user1, CommentUserDTO));
		if (!user) {
			throw new EntityNotFound("User");
		}
		return user;

	},

	async generateUniqueUsername() {
		let username = generateRandomUsername();
		let user = await this.getOneByUsername(username);
		while (user != null) {
			username = generateRandomUsername()
			user = await this.getOneByUsername(username);
		}
		return username;
	},

	createUser: async function (data, header) {
		const {email, first_name, last_name, username} = data;
		const user = await User.create({

			username: username,
			email: email ? email : null,
			password: generateRandomPassword(),
			first_name: first_name,
			last_name: last_name
		});

		return user;
	},

	async getLoggedUser(bearerToken, isRefreshToken = false) {
		const token = extractToken(bearerToken);
		const secret = isRefreshToken ? auth.refreshJwtSecret : auth.jwtSecret;
		const payload = jwt.verify(token, secret);
		const user = await this.getOneById(payload.id);
		if (!user) {
			throw new Unauthenticated("Unauthenticated");
		}
		return user;
	},
	async getLoggedUserIdByToken(bearerToken) {
		const token = extractToken(bearerToken);
		try {
			const payload = jwt.verify(token, auth.jwtSecret);
			return payload.id;
		} catch (e) {
			throw new Unauthenticated("Unauthenticated");
		}
	},

	async checkIfUserCanChangeUsername(user) {
		if (!(!user.username_changed_at )) {
			throw new BadActionException("Could not change username", httpCodes.BAD_REQUEST, true, errorMessages.CANT_CHANGE_USERNAME);
		}
	},
	async checkIfUsernameIsTaken(username, id, returnWithBoolean = false) {
		const existingUser = await UserRepository.findByUsernameExceptLoggedUser(username, id);
		if(returnWithBoolean) {
			return !existingUser;
		}
		if (existingUser) {
			throw new BadActionException("Username exists", httpCodes.BAD_REQUEST, true, errorMessages.USERNAME_EXISTS);
		}
	},
	async updateUsername(bearerToken, username) {
		let user = await this.getLoggedUser(bearerToken);
		await this.checkIfUsernameIsTaken(username, user.id);
		await this.checkIfUserCanChangeUsername(user);
		if (username !== user.username) {
			user.username_changed_at = Date.now();
		}
		user.username = username;
		user = await user.save();
		return user;
	},


}
