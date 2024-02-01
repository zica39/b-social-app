
module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define('Follow', {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            follower_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            following_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
        },
        {
            tableName: 'follows'
        })

    Follow.associate = models => {

        Follow.belongsTo(models.User, { foreignKey: 'follower_id', as: 'follower' });
        Follow.belongsTo(models.User, { foreignKey: 'following_id', as: 'following' });

    }


    return Follow;
}
