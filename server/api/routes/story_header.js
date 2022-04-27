const express = require('express');
const router = express.Router();
const storyHeaderController = require('../controllers/story_header');
const checkAuth = require('../auth/auth_jwt');
const checkAuthor = require('../auth/auth_author');

router.get('/', storyHeaderController.getAllStories);
router.post('/', checkAuth, storyHeaderController.addStory);
router.get('/:story', storyHeaderController.getStoryById);
router.patch('/:story', checkAuth, checkAuthor, storyHeaderController.updateStory);
router.delete('/:story', checkAuth, checkAuthor, storyHeaderController.deleteStory);
router.get('/from/:uploader', storyHeaderController.getStoriesFromUploader);

module.exports = router;