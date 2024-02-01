const UserService = require('../UserService');
const Unauthenticated = require('../../errors/Unauthenticated');
const {ADMIN} = require("../../constants/RoleConstants");
module.exports = {
	async getAuthenticatedUser(res, bearerToken, isRefreshToken = false) {
		try{
			return await UserService.getLoggedUser(bearerToken, isRefreshToken);
		}catch (e) {
			throw new Unauthenticated("Unauthenticated");
		}
	},
	async getAdminUser(res, bearerToken, isRefreshToken = false) {
		try{
			const user = await UserService.getLoggedUser(bearerToken, isRefreshToken);
			if(user.role_id !== ADMIN.id){
				return false;
			}
			return user;
		}catch (e) {
			throw new Unauthenticated("Unauthenticated");
		}
	}
}