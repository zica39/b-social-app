// controllers/CommentController.js
const RequestHandler = require('../utils/RequestHandler');
const { httpCodes } = require('../errors/ExceptionErrors');
const CommentService = require('../services/CommentService');
const kafkaService = require("../services/kafka/KafkaService");

class CommentController {
    static async addComment(req, res) {
        try {
            const userId = req.user.id;
            const { postId, content } = req.body;

            const createdComment = await CommentService.addComment(userId, postId, content);

            const message = {
                email: createdComment.user.username,
                userId: createdComment.user.id,
                timeStamp: new Date().toISOString(),
                postId: createdComment.post.id,
                postOwnerId: createdComment.post.user_id,
                id: createdComment.id,
                content: createdComment.content
            };

            const stringifyMsg = JSON.stringify(message);

            await kafkaService.sendMessage(
                'create-comment-topic',
                stringifyMsg
            );


            return RequestHandler.sendResponse(res, createdComment, httpCodes.HTTP_CREATED);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }

    static async deleteComment(req, res) {
        try {
            const commentId = parseInt(req.params.commentId, 10);
            await CommentService.deleteComment(commentId);

            return RequestHandler.sendResponse(res, { message: 'Comment deleted successfully' }, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }

    static async getAllCommentsForPost(req, res) {
        try {
            const postId = req.params.postId;
            const comments = await CommentService.getAllCommentsForPost(postId);

            return RequestHandler.sendResponse(res, comments, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }
}

module.exports = CommentController;
