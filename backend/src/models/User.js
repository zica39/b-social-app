const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const {USER} = require("../constants/RoleConstants");

function hashPassword(user) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

const userAttributes = [
    'id',
    'email',
    'first_name',
    'last_name',
    'role_id',
    'username',
    'last_login',
    'previous_login',
    'password',

];


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: USER.id
        },

        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },

        last_login: {
            type: DataTypes.DATE,
            allowNull: true
        },
        previous_login: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        username_changed_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users',
        scopes: {
            activeUsers: {
                where: {
                    is_active: true
                },
                attributes: userAttributes
            }
        },
        defaultScope: {
            where: {
                is_active: true
            },
            attributes: {userAttributes},
        },
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password);
    }



    User.associate = models => {

            User.hasMany(models.Post, {
                foreignKey: 'user_id',
                onDelete: 'cascade',
                onUpdate: 'cascade',
                as: 'posts',
            });

        User.hasMany(models.Follow, { foreignKey: 'follower_id', as: 'followers' });
        User.hasMany(models.Follow, { foreignKey: 'following_id', as: 'following' });
    }





    return User
}
