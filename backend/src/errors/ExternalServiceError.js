const BaseError = require('./BaseError');
const {httpCodes, errorMessages} = require("./ExceptionErrors");

class ExternalServiceError extends BaseError {
	constructor(name, statusCode = httpCodes.UNPROCESSABLE_ENTITY, isOperational = true, message = errorMessages.EXTERNAL_SERVICE_FAILED, description = "External service failed") {
		super(name, statusCode, isOperational, description);
		this.message = message;
	}
}

module.exports = ExternalServiceError;