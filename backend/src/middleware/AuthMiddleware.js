const jwt = require('jsonwebtoken');
const config = require('../config/config');
const SecurityService = require('../services/security/SecurityService');
const Unauthenticated = require('../errors/Unauthenticated');
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
module.exports = {
	async verifyToken(req, res, next) {
		const bearerToken = req.headers["authorization"];
		if(!bearerToken){
			sendErrorMessage(res, new Unauthenticated());
			return;
		}
		try{
			jwt.verify(bearerToken.substr(7), config.auth.jwtSecret);
			const user = await SecurityService.getAuthenticatedUser(res, bearerToken);
			if(user) {
				req.user = user;
				return next();
			}
		}catch (e) {
			sendErrorMessage(res, new Unauthenticated());
		}
	}
}