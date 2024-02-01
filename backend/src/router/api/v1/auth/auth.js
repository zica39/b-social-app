const router = require('express').Router();

const AuthenticationController = require('../../../../controllers/AuthenticationController');

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const LoginValidation = require('../../../../validations/LoginValidation');
const RegisterValidation = require('../../../../validations/RegisterValidation');

router.post(
	'/login',
	LoginValidation.validateLoginRequest,
	AuthenticationController.login
)

router.post(
	'/register',
	RegisterValidation.validateRegisterRequest,
	AuthenticationController.register
)

router.post(
	'/refresh-token',
	// LoginValidation.validateLoginRequest,
	AuthenticationController.refreshToken
)

router.get('/current-time', AuthenticationController.getCurrentServerTime);

module.exports = router;