const BaseError = require("./BaseError");
const {httpCodes, errorMessages} = require("./ExceptionErrors");

class BadActionException extends BaseError {
	constructor(name, statusCode = httpCodes.BAD_REQUEST, isOperational = true, message = errorMessages.BAD_REQUEST, description = "BadActionException") {
		super(name, statusCode, isOperational, description);
		this.message = message;
	}
}

module.exports = BadActionException;