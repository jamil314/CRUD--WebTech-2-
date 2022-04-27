const express = require('express');
const router = express.Router();
const storyBodyController = require('../controllers/story_body');
const checkAuth = require('../auth/auth_jwt');
const checkAuthor = require('../auth/auth_author');

router.get('/:story', storyBodyController.getFullStory);
router.post('/:story/:part', checkAuth, checkAuthor, storyBodyController.addStoryPart);
router.get('/:story/:part', storyBodyController.getStoryPart);
router.patch('/:story/:part', checkAuth, checkAuthor, storyBodyController.updateStoryPart);
router.delete('/:story/:part', checkAuth, checkAuthor, storyBodyController.deleteStoryPart);

module.exports = router;