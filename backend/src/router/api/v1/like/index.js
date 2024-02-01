const router = require('express').Router();
const LikeValidator = require('../../../../validations/LikeValidator');
const LikeController = require('../../../../controllers/LikeController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');

router.use(AuthMiddleware.verifyToken);

router.post('/like/:postId', LikeValidator.validateLikeRequest, LikeController.toggleLike);

module.exports = router;
