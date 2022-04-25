const express = require('express');
const app = express();
const morgan = require('morgan');

const userRoutes = require('./api/routes/user');
const storyHeaderRoutes = require('./api/routes/story_header');
const storyBodyRoutes = require('./api/routes/story_body');

app.use(morgan('dev'));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/story/header', storyHeaderRoutes);
app.use('/story/body', storyBodyRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;