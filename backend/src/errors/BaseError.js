const {httpCodes, errorMessages} = require("./ExceptionErrors");

class BaseError extends Error {
	constructor(name, statusCode = httpCodes.SERVER_ERROR, isOperational, description) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this)
	}
}

module.exports = BaseError;