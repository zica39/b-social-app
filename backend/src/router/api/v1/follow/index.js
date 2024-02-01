
const router = require('express').Router();
const FollowValidator = require('../../../../validations/FollowValidator');
const FollowController = require('../../../../controllers/FollowController');

const AuthMiddleware = require('../../../../middleware/AuthMiddleware');

router.use(AuthMiddleware.verifyToken);

router.post('/follow/:userId', FollowValidator.validateFollowRequest, FollowController.followUser);
router.delete('/unfollow/:userId', FollowController.unfollowUser);
router.get('/followers/:userId', FollowController.getFollowers);
router.get('/following/:userId', FollowController.getFollowing);

module.exports = router;
