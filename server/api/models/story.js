const Sequelize = require('sequelize');
const sequelize = require('../DB/mysql_stories');

const Story = sequelize.define('story', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uploaded_on: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    last_edited: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    uploader: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    uploader_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    upvote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downvote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Story;