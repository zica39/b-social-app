module.exports = {
	httpCodes: {
		HTTP_OK: 200,
		HTTP_CREATED: 201,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHENTICATED: 401,
		ACCESS_FORBIDDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		UNPROCESSABLE_ENTITY: 422,
		SERVER_ERROR: 500,
	},
	errorMessages: {

		UNAUTHENTICATED: {
			code: "E100",
			message: "Unauthenticated"
		},
		NOT_FOUND: {
			code: "E101",
			message: "Entity not found"
		},
		SERVER_ERROR: {
			code: "E102",
			message: "Server error"
		},
		BAD_REQUEST: {
			code: "E103",
			message: "Bad action"
		},
		USERNAME_EXISTS: {
			code: "E104",
			message: "Username already exists"
		},
		INVALID_CREDENTIALS: {
			code: "E105",
			message: "Invalid email or password"
		},
		CANT_CHANGE_USERNAME: {
			code: "E106",
			message: "You are not allowed to change Your username."
		},
		EXTERNAL_SERVICE_FAILED: {
			code: "E107",
			message: "External api has failed"
		},
		USER_ALREADY_EXISTS:{
			code: "E108",
			message: "User with this email or username already exists."
		} ,

		SOMETHING_WENT_WRONG: {
			code: "E114",
			message: "Something went wrong. Try again later."
		},
		ACCESS_FORBIDDEN: {
			code: "E117",
			message: "Access forbidden."
		},
		INVALID_JWT_AND_PROVIDER: {
			code: "E118",
			message: "ProviderId does not belong to current user."
		}
	}
}
