const {CommentUserDTO, User1DTO} = require('./User1DTO');
const {flatten} = require("express/lib/utils");

class FollowDTO {
    constructor(follow) {
        this._id = follow.id;
        this.follower =  new User1DTO(follow.follower);
        this.following = new CommentUserDTO(follow.following);
        this.createdAt = follow.createdAt;
        this.updatedAt = follow.updatedAt;
    }
}

module.exports = FollowDTO;
