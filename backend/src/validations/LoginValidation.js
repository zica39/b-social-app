const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require('../errors/ExceptionErrors')
const Joi = require('joi');
const ExceptionTranslator = require('../errors/ExceptionTranslator');

module.exports = {
	validateLoginRequest(req, res, next) {
		const schema = Joi.object({
			username: Joi.string().required(),//email().allow(null, ""),
			password: Joi.string().required()
		})
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}
