const Like = require("./Like");
const {Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'posts'
    })

    Post.addScope('withLikeCount', {
        attributes: {
            include: [
                [
                    Sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM \`likes\`
                    WHERE \`likes\`.\`post_id\` = \`Post\`.\`id\`
                )`),
                    'likeCount',
                ],
            ],
        },
        include: [],
    });

    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'user',
        });

        Post.hasMany(models.Like, {
            foreignKey: 'post_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'likes',
        });

        Post.hasMany(models.Comment, {
            foreignKey: 'post_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'comments',
        });

    }


    return Post;
}
