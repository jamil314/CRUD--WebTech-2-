const Sequelize = require('sequelize');
const sequelize = require('../DB/mysql_stories');

const StoryBody = sequelize.define('story_body', {
    part: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    body: {
        type: Sequelize.TEXT
    },
    
    story: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    }
});

module.exports = StoryBody;