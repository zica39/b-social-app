const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require('../errors/ExceptionErrors')
const Joi = require('joi');
const ExceptionTranslator = require('../errors/ExceptionTranslator');
const {password} = require("../config/database");

module.exports = {
	validateRegisterRequest(req, res, next) {
		const schema = Joi.object({
			email: Joi.string().email().allow(null, ""),
			password: Joi.string().required(),
			username: Joi.string().required(),
			first_name: Joi.string().required(),
			last_name: Joi.string().required()
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}
