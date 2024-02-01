// repositories/LikeRepository.js
const { Like } = require('../models');

class LikeRepository {
    static async findLike(user_id, post_id) {
        return await Like.findOne({
            where: { user_id, post_id },
        });
    }

    static async createLike(user_id, post_id) {
        return await Like.create({ user_id, post_id });
    }

    static async deleteLike(likeId) {
        const like = await Like.findByPk(likeId);
        await Like.destroy({
            where: { id: likeId },
        });
        return like;
    }
}

module.exports = LikeRepository;
