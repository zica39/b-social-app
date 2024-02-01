// services/LikeService.js
const LikeRepository = require('../repositories/LikeRepository');
const PostRepository = require("../repositories/PostRepository");
const entityMapper = require("../services/mapper/EntityMapper");
const PostDTO = require('../services/dtos/PostDTO');

class LikeService {
    static async toggleLike(userId, postId) {
        const existingLike = await LikeRepository.findLike(userId, postId);

        if (existingLike) {
            const likeData =  await LikeRepository.deleteLike(existingLike.id);
            const post = await PostRepository.getSinglePost(likeData.post_id);

            return {message: 'Disliked', data: entityMapper.toDTO(post, PostDTO)};
        } else {
            const likeData =  await LikeRepository.createLike(userId, postId);
            const post = await PostRepository.getSinglePost(likeData.post_id);

           return  {message:"Liked", data : entityMapper.toDTO(post, PostDTO)};
        }
    }
}

module.exports = LikeService;
