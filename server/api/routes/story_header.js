const express = require('express');
const router = express.Router();
const User = require('../models/user');
const StoryHeader = require('../models/story_header');



router.get('/', (req, res, next) => {
    StoryHeader.findAll()
        .then(storyHeaders => {
            res.status(200).json(storyHeaders);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const uploader = req.body.uploader
    StoryHeader.create({
        title: req.body.title,
        uploader: req.body.uploader,
        parts: req.body.parts,
        uploaded_on: req.body.uploaded_on
    }).then(storyHeader => {
        res.status(201).json({
            message: 'StoryHeader created successfully with id: ' + storyHeader.id
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:storeyId', (req, res, next) => {
    const id = req.params.storeyId;
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
});

router.patch('/:storyId', (req, res, next) => {
    const id = req.params.storyId;
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
});

router.delete('/:storyId', (req, res, next) => {
    const id = req.params.storyId;
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
});

router.get('/from/:uploader', (req, res, next) => {
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
});

module.exports = router;