const RequestHandler = require('../utils/RequestHandler');
const { httpCodes } = require('../errors/ExceptionErrors');
const Joi = require('joi');
const ExceptionTranslator = require('../errors/ExceptionTranslator');

module.exports = {
    validatePost(req, res, next) {
        const schema = Joi.object({
            content: Joi.string().required(),
        });

        const error = ExceptionTranslator.validateRequest(schema, req);
        if (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
        }

        next();
    },

    validateUpdatePost(req, res, next) {
        const schema = Joi.object({
            content: Joi.string().required()
        });

        const error = ExceptionTranslator.validateRequest(schema, req);
        if (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.UNPROCESSABLE_ENTITY);
        }

        next();
    },
};
