const PostRepository = require('../repositories/PostRepository'); // Assuming you have a PostRepository

class PostService {
    static async createPost(postData) {
        try {
            // Add any additional business logic here before creating the post
            const createdPost = await PostRepository.createPost(postData);
            return createdPost;
        } catch (error) {
            throw error;
        }
    }


    static async getAllUserLikedPosts(userId) {
        try {
            return  await PostRepository.getAllUserLikedPosts(userId);
        } catch (error) {
            throw error;
        }
    }

    static async getAllUserPosts(userId) {
        try {
            const posts = await PostRepository.getAllUserPosts(userId);
            return posts;
        } catch (error) {
            throw error;
        }
    }

    static async getUserFeed(userId, options) {
        try {
            return  await PostRepository.getUserFeed(userId, options);
        } catch (error) {
            throw error;
        }
    }

    static async getAllPosts(userId) {
        try {
            return  await PostRepository.getAllPosts(userId);;
        } catch (error) {
            throw error;
        }
    }

    static async getSinglePost(postId) {
        try {
            return await PostRepository.getSinglePost(postId);
        } catch (error) {
            throw error;
        }
    }

    static async deletePost(postId) {
        try {
            // Add any additional business logic here before deleting the post
           return  await PostRepository.deletePost(postId);
        } catch (error) {
            throw error;
        }
    }

    static async updatePost(postId, updatedPostData) {
        try {
            // Add any additional business logic here before updating the post
            const updatedPost = await PostRepository.updatePost(postId, updatedPostData);
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostService;
