const router = require('express').Router();
const AuthMiddleware = require('../../../../middleware/AuthMiddleware');
const PostValidation = require('../../../../validations/PostValidation'); // Changed validation name
const PostController = require('../../../../controllers/PostController'); // Changed controller name

router.use(AuthMiddleware.verifyToken);

// Route for creating a post
router.post(
	'/create-post',
	PostValidation.validatePost, // Changed validation name
	PostController.createPost // Changed controller name
);

// Route for retrieving all posts
router.get(
	'/get-all-user-posts',
	PostController.getAllUserPosts // Changed controller name
);

router.get(
	'/get-user-feed',
	PostController.getUserFeed // Changed controller name
);

router.get(
	'/get-all-user-liked-posts',
	PostController.getAllUserLikedPosts // Changed controller name
);

router.get(
	'/get-all-posts',
	PostController.getAllPosts // Changed controller name
);

// Route for retrieving a single post
router.get(
	'/post/:id',
	PostController.getSinglePost // Changed controller name
);

// Route for deleting a post
router.delete(
	'/delete-post/:id',
	PostController.deletePost // Changed controller name
);

// Route for updating a post
router.put(
	'/update-post/:id',
	PostValidation.validateUpdatePost, // Changed validation name
	PostController.updatePost // Changed controller name
);

module.exports = router;