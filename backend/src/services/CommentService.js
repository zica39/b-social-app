// services/CommentService.js
const CommentRepository = require('../repositories/CommentRepository');

class CommentService {
    static async addComment(userId, postId, content) {
        return CommentRepository.createComment(userId, postId, content);
    }

    static async deleteComment(commentId) {
        return CommentRepository.deleteComment(commentId);
    }

    static async getAllCommentsForPost(postId) {
        return CommentRepository.getAllCommentsForPost(postId);
    }
}

module.exports = CommentService;
