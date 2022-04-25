const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const ck = require('ckey');

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            User.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
            })
                .then(user => {
                    res.status(201).json(user.id);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/login', (req, res, next) => {
    User.scope('withPassword').findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            userId: user.id
                        }, ck.JWT_KEY, {
                            expiresIn: '1h'
                        });
                        res.status(200).json({
                            message: 'Authentication successful!',
                            id: user.id,
                            token: token
                        });
                    } else {
                        res.status(401).json({
                            message: 'Authentication failed!'
                        });
                    }
                });
            } else {
                res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "error mathcing email"
            });
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findByPk(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    //validate the id
    User.update({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        birth_day: req.body.birth_day,
        phone_number: req.body.phone_number
    }, {
        where: {id: id}
    }).then(() => {
        res.status(200).json({
            message: 'User updated successfully'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;