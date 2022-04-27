const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const ck = require('ckey');

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.registerUser = (req, res) => {
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
}

exports.loginUser = (req, res) => {
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
}

exports.getUserById = (req, res) => {
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
}

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.userId);
    if(id !== req.userId){
        return res.status(401).json({
            message: 'You are not authorized to perform this action'
        });
    }
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
}