// controllers/FollowController.js
const RequestHandler = require('../utils/RequestHandler');
const { httpCodes } = require('../errors/ExceptionErrors');
const FollowService = require('../services/FollowService');
const entityMapper = require("../services/mapper/EntityMapper");
const FollowDTO = require("../services/dtos/FollowDTO");

class FollowController {
    static async followUser(req, res) {
        try {
            const followerId = req.user.id;
            const followingId = parseInt (req.params.userId, 10);

            const data = await FollowService.followUser(followerId, followingId);

            return RequestHandler.sendResponse(res, {data: entityMapper.toDTO(data, FollowDTO) , message: 'User followed successfully' }, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }

    static async unfollowUser(req, res) {
        try {
            const followerId = req.user.id;
            const followingId  = parseInt (req.params.userId, 10);

            const data =  await FollowService.unfollowUser(followerId, followingId);

            return RequestHandler.sendResponse(res, {data: entityMapper.toDTO(data, FollowDTO), message: 'User unfollowed successfully' }, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }

    static async getFollowers(req, res) {
        try {
            const userId =parseInt (req.params.userId, 10);
            const followers = await FollowService.getFollowers(userId);

            return RequestHandler.sendResponse(res, followers, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }

    static async getFollowing(req, res) {
        try {
            const userId = parseInt (req.params.userId, 10);
            const following = await FollowService.getFollowing(userId);

            return RequestHandler.sendResponse(res, following, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }
}

module.exports = FollowController;
