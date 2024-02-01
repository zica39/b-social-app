const RequestHandler = require('../utils/RequestHandler');
const { httpCodes } = require('../errors/ExceptionErrors');
const PostService = require('../services/PostService'); // Assuming you have a PostService
const PostDTO = require('../services/dtos/PostDTO');
const entityMapper = require("../services/mapper/EntityMapper");
const kafkaService = require("../services/kafka/KafkaService");

module.exports = {
    async createPost(req, res) {
        try {
            req.body.user_id = req.user.id;
            const post = await PostService.createPost(req.body);

            const message = {
                username: post.user.username,
                email: post.user.username,
                userId: post.user.id,
                timeStamp: new Date().toISOString(),
                id: post.id,
                content: post.content
            };

            const stringifyMsg = JSON.stringify(message);

            await kafkaService.sendMessage(
                'create-post-topic',
                stringifyMsg
            );

            return RequestHandler.sendResponse(res, entityMapper.toDTO(post, PostDTO), httpCodes.HTTP_CREATED);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async getAllUserPosts(req, res) {
        try {
            const posts = await PostService.getAllUserPosts(req.user.id);

            return RequestHandler.sendResponse(res, entityMapper.toDTOList(posts, PostDTO), httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async getUserFeed(req, res) {
        try {
            let { page = 1, pageSize = 10 } = req.query;
            page = parseInt(page);
            pageSize = parseInt(pageSize)

            const posts = await PostService.getUserFeed(req.user.id,  { page, pageSize });
            posts.rows = entityMapper.toDTOList(posts.rows, PostDTO)

            return RequestHandler.sendResponse(res, posts, httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async getAllUserLikedPosts(req, res) {
        try {
            const posts = await PostService.getAllUserLikedPosts(req.user.id);

            return RequestHandler.sendResponse(res, entityMapper.toDTOList(posts, PostDTO), httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },



    async getAllPosts(req, res) {
        try {
            const posts = await PostService.getAllPosts(req.user.id);

            return RequestHandler.sendResponse(res, entityMapper.toDTOList(posts, PostDTO), httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async getSinglePost(req, res) {
        try {
            const postId = req.params.id;
            const post = await PostService.getSinglePost(postId);
            return RequestHandler.sendResponse(res,  entityMapper.toDTO(post, PostDTO), httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async deletePost(req, res) {
        try {
            const postId =req.params.id;
           const deletedPost =  await PostService.deletePost(postId);
            return RequestHandler.sendResponse(res, entityMapper.toDTO(deletedPost, PostDTO), httpCodes.HTTP_OK); // null, httpCodes.NO_CONTENT
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },

    async updatePost(req, res) {
        try {
            const postId = parseInt(req.params.id);
            const updatedPost = await PostService.updatePost(postId, req.body);
            return RequestHandler.sendResponse(res, entityMapper.toDTO(updatedPost, PostDTO), httpCodes.HTTP_OK);
        } catch (error) {
            return RequestHandler.sendResponse(res, error, httpCodes.SERVER_ERROR);
        }
    },
};
