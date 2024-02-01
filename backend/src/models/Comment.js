
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
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
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            }
    },
    {
        tableName: 'comments'
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'user',
        });

        Comment.belongsTo(models.Post, {
            foreignKey: 'post_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'post',
        });

    }


    return Comment;
}
