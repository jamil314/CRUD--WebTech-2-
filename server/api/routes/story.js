const express = require('express');
const router = express.Router();

const storyController = require('../controllers/story');
const checkAuth = require('../middlewares/auth_jwt');
const checkAuthor = require('../middlewares/auth_author');

router.get('/', storyController.getAllStories);
router.post('/', checkAuth, storyController.addStory);
router.get('/:story', storyController.getStoryById);
router.patch('/:story', checkAuth, checkAuthor, storyController.updateStory);
router.delete('/:story', checkAuth, checkAuthor, storyController.deleteStory);
router.get('/from/:uploader', storyController.getStoriesFromUploader);

module.exports = router;