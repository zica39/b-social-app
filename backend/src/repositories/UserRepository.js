const {sequelize, User, Follow} = require("../models");
const {Op, QueryTypes, Sequelize} = require("sequelize");
const {ADMIN} = require("../constants/RoleConstants");
const {compareSync} = require("bcrypt-nodejs");
const FollowRepository = require("../repositories/FollowRepository");

module.exports = {
	async findById(id) {
		return await User.findByPk(id);
	},

	async findByIdWithFollowerAndFollowing(id) {
		const user = await User.findByPk(id);

        const following = await FollowRepository.getFollowing(user.id);
		const followers = await FollowRepository.getFollowers(user.id);
		user.followers = followers;
		user.following = following;
		return await user;
	},

	async findByEmail(email) {
		return await User.findOne({
			where: {
				email: email
			}
		});
	},
	async findByEmailAndPassword(email, password) {

		const user = await User.findOne({
			where: {
				email: email
			}
		});

		if (!user || !compareSync(password, user.password)) {
			return null;
		}

		return user;
	},

	async findByUsername(username) {
		return await User.findOne({
			where: {
				username: username
			},
		});
	},
	async findAdminByUsername(username) {
		return await User.findOne({
			where: {
				username: username,
				role_id: ADMIN.id
			},
		});
	},
	async findByUsernameExceptLoggedUser(username, userId) {
		return await User.findOne({
			where: {
				username: username,
				id: {
					[Op.ne] : userId
				}
			},
		});
	},

	async findAllUsers(options) {
		return await User.findAll(options);
	},
	async getAllUsers(){
		return await User.findAll();
	},
	async getAllUsersWithFollowersAndFollowing(id) {
		return await User.findAll({

			include: [
				{
					model: Follow,
					as: 'followers',
					include: [
						{
							model: User,
							as: 'follower',
						},
					],
				},
				{
					model: Follow,
					as: 'following',
					include: [
						{
							model: User,
							as: 'following',
						},
					],
				},
			],
		});
	},
}
