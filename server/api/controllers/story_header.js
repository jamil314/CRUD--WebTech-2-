const StoryHeader = require('../models/story_header');

exports.getAllStories = (req, res) => {
    StoryHeader.findAll()
        .then(storyHeaders => {
            res.status(200).json(storyHeaders);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.addStory = (req, res) => {
    StoryHeader.create({
        title: req.body.title,
        uploader: req.userId,
        parts: req.body.parts,
        uploaded_on: new Date().getTime()
    }).then(storyHeader => {
        res.status(201).json({
            message: 'StoryHeader created successfully with id: ' + storyHeader.id
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.getStoryById = (req, res) => {
    const id = req.params.story;
    StoryHeader.findByPk(id)
        .then(storyHeader => {
            res.status(200).json(storyHeader);
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            });
        }
        );
}

exports.updateStory = (req, res) => {
    const id = req.params.story;
    StoryHeader.update({
        title: req.body.title,
        parts: req.body.parts,
        last_edited: req.body.last_edited
    }, {
        where: {id: id}
    }).then(() => {
        res.status(200).json({
            message: 'StoryHeader updated successfully'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.deleteStory = (req, res) => {
    const id = req.params.story;
    StoryHeader.destroy({
        where: {id: id}
    }).then(() => {
        res.status(200).json({
            message: 'StoryHeader deleted successfully'
        });
    }
    ).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.getStoriesFromUploader = (req, res) => {
    const uploader = req.params.uploader;
    StoryHeader.findAll({
        where: {
            uploader: uploader
        }
    }).then(storyHeaders => {
        res.status(200).json(storyHeaders);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}