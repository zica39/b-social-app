// services/FollowService.js
const FollowRepository = require('../repositories/FollowRepository');
const UserService = require('../services/UserService');


class FollowService {
    static async followUser(followerId, followingId) {
        const follow = await  FollowRepository.followUser(followerId, followingId);
        follow.follower = await UserService.getOneByIdWithFollowersAndFollowing(follow.follower.id);

        return follow;
    }

    static async unfollowUser(followerId, followingId) {
        const follow = await FollowRepository.unfollowUser(followerId, followingId);
        follow.follower = await UserService.getOneByIdWithFollowersAndFollowing(follow.follower.id);
        return follow;
    }

    static async getFollowers(userId) {
        return FollowRepository.getFollowers(userId);
    }

    static async getFollowing(userId) {
        return FollowRepository.getFollowing(userId);
    }
}

module.exports = FollowService;
