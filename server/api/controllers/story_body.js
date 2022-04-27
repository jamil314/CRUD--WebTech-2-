const StoryBody = require('../models/story_body');

exports.getFullStory = (req, res) => {
    const story = req.params.story;
    StoryBody.findAll({
        where: {story: story}
    }).then(storyBody => {
        res.status(200).json(storyBody);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.addStoryPart = (req, res) => {
    const story = req.params.story;
    const part = req.params.part;
    console.log(story, part, req.body.content);
    StoryBody.create({
        story: story,
        part: part,
        body: req.body.body

    }).then(() => {
        res.status(201).json({
            message: 'StoryBody created successfully ',
            story,
            part
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.getStoryPart = (req, res) => {
    const story = req.params.story;
    const part = req.params.part;
    StoryBody.findAll({
        where: {story: story, part: part}
    }).then(storyBody => {
        res.status(200).json(storyBody);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.updateStoryPart = (req, res) => {
    const story = req.params.story;
    const part = req.params.part;
    StoryBody.update({
        body: req.body.body
    }, {
        where: {story: story, part: part}
    }).then(() => {
        res.status(201).json({
            message: 'StoryBody updated successfully with id: ' + story + ' ' + part
        });
    }).catch(err => {
        res.status(500).json({
            error: "Could not update story body"
        });
    });
}

exports.deleteStoryPart = (req, res) => {
    const story = req.params.story;
    const part = req.params.part;
    StoryBody.destroy({
        where: {story: story, part: part}
    }).then(() => {
        res.status(200).json({
            message: 'StoryBody deleted successfully with id: ' + story + ' ' + part
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}