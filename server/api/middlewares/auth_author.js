const Story = require('../models/story')

module.exports = (req, res, next) => {
    const storeyId = req.params.story
    const author = req.userId
    Story.findByPk(storeyId)
        .then(story => {
            if (story.uploader !== author) {
                return res.status(403).json({
                    message: 'You do not have permission to update/delete this story!'
                })
            }
            next()
        })
        .catch(err => {
            res.status(500).json({
                error: "Could not find story's author"
            })
        })
}