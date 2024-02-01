const jwt = require("jsonwebtoken");
const config = require("../config/config");
const{a2b} = require('../utils/StringUtils');

module.exports = {
	jwtSignUser(user, isRefreshToken = false) {
		const secret = isRefreshToken ? config.auth.refreshJwtSecret : config.auth.jwtSecret;
		const ttl = isRefreshToken ? config.auth.refreshJwtTTL : config.auth.jwtTTL;
		return jwt.sign(user, secret, {
			expiresIn: ttl
		})
	},
	extractToken(bearerToken) {
		return bearerToken.substr(7);
	},
	getTokenPayload(token) {
		const encodedPayload = token.split('.')[1];
		return JSON.parse(a2b(encodedPayload));
	}
}