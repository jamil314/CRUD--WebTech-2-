const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./api/routes/user');
const storyRoutes = require('./api/routes/story');
const errorHandler = require('./api/middlewares/errorHandler');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const catchAsync = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {next(err);});
}

app.use('/user', catchAsync(userRoutes));
app.use('/story', catchAsync(storyRoutes));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use(errorHandler);

module.exports = app;