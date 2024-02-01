const jwt = require('jsonwebtoken');
const config = require('../config/config');
const SecurityService = require('../services/security/SecurityService');
const Unauthenticated = require('../errors/Unauthenticated');
const {sendErrorMessage} = require("../errors/ExceptionTranslator");
const BadActionException = require('../errors/BadActionException');
const {httpCodes, errorMessages} = require("../errors/ExceptionErrors");

module.exports = {
	async isAdmin(req, res, next) {
		try{
			const bearerToken = req.headers["authorization"];
			jwt.verify(bearerToken.substr(7), config.auth.jwtSecret);
			const user = await SecurityService.getAdminUser(res, bearerToken);
			if(!user) {
				sendErrorMessage(res, new BadActionException(
					"Access forbidden",
					httpCodes.ACCESS_FORBIDDEN,
					true,
					errorMessages.ACCESS_FORBIDDEN
				));
				return;
			}
			return next();
		}catch (e) {
			sendErrorMessage(res, new Unauthenticated());
		}
	}
}