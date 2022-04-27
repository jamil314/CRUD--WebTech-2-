const Sequelize = require('sequelize');
const sequelize = require('../DB/mysql_stories');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stories: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    last_posted: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    defaultScope: {
        attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: { },
        }
    }
});

module.exports = User;