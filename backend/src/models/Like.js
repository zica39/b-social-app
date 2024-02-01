
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
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
        }
    },
    {
        tableName: 'likes'
    })

    Like.associate = models => {
        Like.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'user',
        });

        Like.belongsTo(models.Post, {
            foreignKey: 'post_id',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            as: 'post',
        });

    }


    return Like;
}
