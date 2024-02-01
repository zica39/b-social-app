const Joi = require('joi');
const ExceptionTranslator = require('../errors/ExceptionTranslator');
const RequestHandler = require('../utils/RequestHandler');
const {httpCodes} = require("../errors/ExceptionErrors");
module.exports = {
	validateUsername(req, res, next) {
		const schema = Joi.object({
			username: Joi.string().required().min(6).max(60)
		});
		const error = ExceptionTranslator.validateRequest(schema, req);
		if(error) {
			return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
		}
		next();
	}
}