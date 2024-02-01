const router = require('express').Router();
const CommentValidator = require('../../../../validations/CommentValidator');
const CommentController = require('../../../../controllers/CommentController');
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');

router.use(AuthMiddleware.verifyToken);

router.post('/comment', CommentValidator.validateCommentRequest, CommentController.addComment);
router.delete('/comment/:commentId', CommentController.deleteComment);
router.get('/comments/:postId', CommentController.getAllCommentsForPost);

module.exports = router;
