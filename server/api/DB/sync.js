const sequelize = require('./mysql_stories');


const User = require('./../models/user');
const StoryHeader = require('./../models/story_header');
const StoryBody = require('./../models/story_body');

User.hasMany(StoryHeader, {foreignKey: 'uploader'});
StoryHeader.belongsTo(User, {foreignKey: 'uploader'});
StoryHeader.hasMany(StoryBody, {foreignKey: 'story'});
StoryBody.belongsTo(StoryHeader, {foreignKey: 'story'});

sequelize.sync({ force: true })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    }
);