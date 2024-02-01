// repositories/FollowRepository.js
const { Follow, User, Post} = require('../models');

class FollowRepository {
    static async followUser(follower_id, following_id) {

        const existsFollow = await Follow.findOne({
            where: {
                follower_id: follower_id,
                following_id: following_id,
            },
        });
        const createdFollow = existsFollow ? existsFollow : await Follow.create({ follower_id, following_id });
        return await Follow.findByPk(createdFollow.id, {
            include: [
                {
                    model: User,
                    as: 'follower',
                },
                {
                    model: User,
                    as: 'following',
                },
            ],
        });
    }
    static async unfollowUser(follower_id, following_id) {
        const follow = await Follow.findOne({
            where: { follower_id, following_id },
            include: [
                {
                    model: User,
                    as: 'follower',
                },
                {
                    model: User,
                    as: 'following',
                },
            ],
        })
        await Follow.destroy({
            where: { follower_id, following_id },
        });

        return follow;
    }

    static async getFollowers(user_id) {
        const followers = await Follow.findAll({
            where: { following_id: user_id },
            include: [{ model: User, as: 'follower' }],
        });

        return followers.map(follow => follow.follower);
    }

    static async getFollowing(user_id) {
        const following = await Follow.findAll({
            where: { follower_id: user_id },
            include: [{ model: User, as: 'following' }],
        })

        return following.map(follow => follow.following);
    }
}

module.exports = FollowRepository;
