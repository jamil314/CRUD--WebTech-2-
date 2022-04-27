const Sequelize = require('sequelize');
const sequelize = require('../DB/mysql_stories');

const StoryHeader = sequelize.define('story_header', {
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
    parts: {
        type: Sequelize.INTEGER,
        default: 1
    },
    uploader: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = StoryHeader;