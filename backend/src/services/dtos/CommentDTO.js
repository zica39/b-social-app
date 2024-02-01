const {CommentUserDTO} = require('./User1DTO');

class CommentDTO {
    constructor(comment) {
        this._id = comment.id;
        this.content = comment.content;
        this.user =  new CommentUserDTO(comment.user);
        this.post_id = comment.post_id;
        this.createdAt = comment.createdAt;
        this.updatedAt = comment.updatedAt;
    }
}

module.exports = CommentDTO;
