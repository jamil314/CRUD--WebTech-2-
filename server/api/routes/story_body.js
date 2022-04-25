const express = require('express');
const router = express.Router();
const StoryBody = require('../models/story_body');

router.get('/:story', (req, res, next) => {
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
});

router.post('/:story/:part', (req, res, next) => {
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
});


router.get('/:story/:part', (req, res, next) => {
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
});

router.patch('/:story/:part', (req, res, next) => {
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
            error: err
        });
    });
});

router.delete('/:story/:part', (req, res, next) => {
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
});

module.exports = router;