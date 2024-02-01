const BaseError = require('./BaseError');
const {httpCodes, errorMessages} = require("./ExceptionErrors");

class EntityNotFound extends BaseError {
	constructor(name, statusCode = httpCodes.NOT_FOUND, isOperational = true, message = errorMessages.NOT_FOUND, description = "Entity not found") {
		super(name, statusCode, isOperational, description);
		this.message = message;
	}
}

module.exports = EntityNotFound;