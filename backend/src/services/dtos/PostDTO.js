const {CommentUserDTO} = require('./User1DTO');
const CommentDTO = require('./CommentDTO');
const entityMapper = require("../mapper/EntityMapper");


class PostDTO {
    constructor(post) {
        this._id = post.id;
        this.content = post.content;
        this.likes = {
            likeCount: post.likeCount || post?.dataValues?.likeCount,
            likedBy: post?.likes?.length ? post.likes.map(like =>  new CommentUserDTO(like.user)) : [],
            dislikedBy: []
        };
        this.comments = post.comments.length ?  entityMapper.toDTOList(post.comments, CommentDTO) : [];
        this.user = post.user ?  new CommentUserDTO(post.user): undefined;
        this.username = this.user ? this.user.username: "";
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
        }
}

module.exports = PostDTO;
