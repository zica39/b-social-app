const { Post, User, Like, Comment, Follow } = require('../models');
const db = require('../models/index');
const {Sequelize, Op} = require("sequelize");
const sequelize = require("sequelize");
const {fa} = require("faker/lib/locales");

class PostRepository {
    static async createPost(postData, userId) {
        try {
            const createdPost = await Post.create(postData);

            const postWithUser = await Post.scope('withLikeCount').findByPk(createdPost.id, {
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });

            return postWithUser;
        } catch (error) {
            throw error;
        }
    }

    static async getAllPosts(userId) {
        try {
            const posts = await Post.scope('withLikeCount').findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });
            return posts;
        } catch (error) {
            throw error;
        }
    }

    static async getUserFeed(userId, { page , pageSize }) {
        try {
            const userFeed = await Post.scope('withLikeCount').findAndCountAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
                where: {
                    [Op.or]: [
                        { user_id: userId },
                        { user_id: { [Op.in]: sequelize.literal(`(SELECT following_id FROM Follows WHERE follower_id = ${userId})`) } },
                    ],
                },
                offset: (page - 1) * pageSize,
                limit: pageSize,
                subQuery: false
            });


            return userFeed;

        } catch (error) {
            throw error;
        }
    }

    static async getAllUserLikedPosts(userId) {
        try {
            const userLikes = await Like.findAll({
                where: {
                    user_id: userId,
                },
            });

            const postIds = userLikes.map(like => like.post_id);

            const posts = await Post.scope('withLikeCount').findAll({
                where: {
                    id: postIds,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });

            return posts;
        } catch (error) {
            throw error;
        }
    }


    static async getAllUserPosts(userId) {
        try {
            const posts = await Post.scope('withLikeCount').findAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                    },{
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });
            return posts;
        } catch (error) {
            throw error;
        }
    }

    static async getSinglePost(postId) {
        try {
            const post = await Post.scope('withLikeCount').findByPk(postId, {
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Like,
                        as: 'likes',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        include: [
                            {
                                model: User,
                                as: 'user',
                            },
                        ],
                    },
                ],
            });
            return post;
        } catch (error) {
            throw error;
        }
    }

    static async deletePost(postId) {
        try {
            const postToDelete =  await PostRepository.getSinglePost(postId);

            if (postToDelete) {
                await Post.destroy({
                    where: {
                        id: postId,
                    },
                });

                return postToDelete;
            } else {
                throw new Error("Post not found");
            }
        } catch (error) {
            throw error;
        }
    }


    static async updatePost(postId, updatedPostData) {
        try {
            const transaction = await db.sequelize.transaction();

            try {
                const existingPost = await Post.scope('withLikeCount').findByPk(postId, {
                    include: [
                        {
                            model: User,
                            as: 'user',
                        },
                        {
                            model: Like,
                            as: 'likes',
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                },
                            ],
                        },
                        {
                            model: Comment,
                            as: 'comments',
                            include: [
                                {
                                    model: User,
                                    as: 'user',
                                },
                            ],
                        },
                    ],
                    transaction,
                });

                if (!existingPost) {
                    throw new Error('Post not found');
                }


                const likeCount = existingPost.dataValues.likeCount;
                await existingPost.update(updatedPostData, { transaction });
                await transaction.commit();

                existingPost.likeCount = likeCount;
                return existingPost.get();
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostRepository;
