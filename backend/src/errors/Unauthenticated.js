const BaseError = require("./BaseError");
const {httpCodes, errorMessages} = require("./ExceptionErrors");

class Unauthenticated extends BaseError {
	constructor(name, statusCode = httpCodes.UNAUTHENTICATED, isOperational = true, message = errorMessages.UNAUTHENTICATED, description = "Unauthenticated") {
		super(name, statusCode, isOperational, description);
		this.message = message;
	}
}

module.exports = Unauthenticated;