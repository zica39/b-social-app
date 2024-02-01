const EntityNotFound = require("../errors/EntityNotFound");
const Unauthenticated = require("../errors/Unauthenticated");
const BadActionException = require("../errors/BadActionException");
const ExternalServiceError = require("../errors/ExternalServiceError");
const RequestHandler = require("../utils/RequestHandler");
const {errorMessages, httpCodes} = require("../errors/ExceptionErrors");

const isExistingException = (exception) => {
	return exception instanceof EntityNotFound ||
		exception instanceof Unauthenticated ||
		exception instanceof ExternalServiceError ||
		exception instanceof BadActionException;
}

module.exports = {
	validateRequest(schema, req) {
		let validatedError = null;
		const {error, value} = schema.validate(req.body);
		if(error) {
			validatedError = {
				message: error.details[0].message
			};
		}
		return validatedError;
	},
	sendErrorMessage(res, exception) {
		if (isExistingException(exception)){
			RequestHandler.sendResponse(res, exception.message, exception.statusCode);
		}
		else{
			RequestHandler.sendResponse(res, errorMessages.SERVER_ERROR, httpCodes.SERVER_ERROR);
		}
	},

}