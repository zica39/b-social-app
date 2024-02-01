const router = require('express').Router();
const ProfileController = require('../../../../controllers/ProfileController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const ChangeUsernameValidation = require('../../../../validations/ChangeUsernameValidation');
router.use(AuthMiddleware.verifyToken);

router.post(
	'/change-username',
	ChangeUsernameValidation.validateUsername,
	ProfileController.changeUserName
);

router.get(
	'/me',
	ProfileController.me
);
router.get(
	'/get-all-users',
	ProfileController.getAllUsersWithFollowersAndFollowing
);
router.get(
	'/user/:id',
	ProfileController.getUserProfile
);

router.post(
	'/check-username-availability',
	ChangeUsernameValidation.validateUsername,
	ProfileController.checkUsernameAvailability
);

module.exports = router;