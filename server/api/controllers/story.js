const Story = require('../models/story');

exports.getAllStories = async (req, res) => {
    try {
        const stories = await Story.findAll({attributes:['id']});
        res.status(200).json(stories);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}


exports.addStory = async (req, res) => {
    try {
        const story = await Story.create({
            title: req.body.title,
            uploader: req.userId,
            uploader_name: req.userName,
            body: req.body.body,
            uploaded_on: new Date().getTime()
        });
        res.status(201).json({id: story.id});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}



exports.getStoryById = async (req, res) => {
    const id = req.params.story;
    try {
        const story = await Story.findByPk(id);
        story? res.status(200).json(story) : res.status(404).json({error:"Story not found"});
    } catch (error) {
        res.status(500).json({error:"Internal server error"});    
    }
}

exports.updateStory = async (req, res) => {
    const id = req.params.story;
    try {
        await Story.update({
            title: req.body.title,
            body: req.body.body
        }, { where: {id}});
        res.status(204).json({message: 'Story updated successfully'});
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
}

exports.deleteStory = async (req, res) => {
    const id = req.params.story;
    try {
        await Story.destroy({ where: {id} });
        res.status(204).json({message: 'Story deleted successfully'});
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
}

exports.getStoriesFromUploader = async (req, res) => {
    const uploader = req.params.uploader;
    try {
        const stories = await Story.findAll({
            attributes:['id'],
            where: {uploader}
        });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
    }
}