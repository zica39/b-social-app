const entityMapper = require("../mapper/EntityMapper");

class User1DTO {
    constructor(user) {
        this._id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.bio =  "Margeting and Sales Enginneer";
        this.website =  "https://margeting/sales/name.com",
        this.avatarUrl = "https://res.cloudinary.com/dgoldjr3g/image/upload/v1686804933/NegProjects/SocialMedia/62_qogeol.jpg",
        this.bookmarks =  [];
        this.followers = user.followers ?? [];
        this.following =  user.following ?? [];
    }
}


class CommentUserDTO {
    constructor(user) {
        this._id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.firstname = user.first_name;
        this.lastname = user.last_name;
        this.avatarUrl = user.avatarUrl || "https://res.cloudinary.com/dgoldjr3g/image/upload/v1686804933/NegProjects/SocialMedia/62_qogeol.jpg";

    }
}

module.exports = {User1DTO, CommentUserDTO};
