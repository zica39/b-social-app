// controllers/LikeController.js
const RequestHandler = require('../utils/RequestHandler');
const { httpCodes } = require('../errors/ExceptionErrors');
const LikeService = require('../services/LikeService');

class LikeController {
    static async toggleLike(req, res) {
        try {
            const userId = req.user.id;
            const postId = parseInt(req.params.postId);

            const result = await LikeService.toggleLike(userId, postId);

            return RequestHandler.sendResponse(res, result, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    }
}

module.exports = LikeController;
