// repositories/CommentRepository.js
const { Comment, User, Post } = require('../models');

class CommentRepository {
    static async createComment(user_id, post_id, content) {
        const new_comment = await Comment.create({ user_id, post_id, content });
        const comment = await Comment.findByPk(new_comment.id, {
            include: [
                { model: User, as: 'user' },
                { model: Post, as: 'post' },
            ],
        });
        return comment;
    }

    static async deleteComment(commentId) {
        return Comment.destroy({
            where: { id: commentId },
        });
    }

    static async getAllCommentsForPost(post_id) {
        return Comment.findAll({
            where: { post_id },
            order: [['createdAt', 'DESC']], // Sortiranje po datumu
        });
    }
}

module.exports = CommentRepository;
