const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const ck = require('ckey');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({msg:"Internal server error"});
    }

}

exports.registerUser = async (req, res) => {
    try{
        if(invalidEmail(req.body.email) || invalidUsername(req.body.username) || invalidPassword(req.body.password))
            res.status(400).json({msg:"Invalid input"});
        else{
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
            });
            res.status(201).json({id:user.id});
        }
    }catch(err){
        if(err.parent.errno === 1062) res.status(409).json({msg:"username/email already exists"});
        else res.status(500).json({msg:"Internal server error"});
    }
}

exports.loginUser = async (req, res) => {
    try{
        const user = await User.scope('withPassword').findOne({
            where: {username: req.body.username}
        });
        if(user){
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
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
                    message: 'Invalid credentials'
                });
            }
        } else {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch(err){
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.getUserById = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.userId);
        user? res.status(200).json(user): res.status(404).json({msg:"User not found"});
    } catch(err){
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.updateUser = async (req, res) => {
    try{
        if(invalidEmail(req.body.email)) res.status(400).json({msg:"Invalid email"});
        else{
            await User.update({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                birth_day: req.body.DOB,
                phone_number: req.body.phone
            }, { where: {id: req.userId} });
            res.status(204).json({msg:"User updated"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.authUser = (req, res) => {
    res.status(200).json({
        message: 'You are authenticated',
        username: req.userName,
        id: req.userId
    });
}

exports.userNameAvailable = async (req, res) => {
    try{
        const user = await User.findOne({
            where: {username: req.body.username}
        });
        user? res.status(409).json({msg:"Username already exists"}): res.status(200).json({msg:"Username available"});
    } catch(err){
        res.status(500).json({msg:"Internal server error"});
    }
}

exports.changePass = async (req, res) => {
    try{
        const user = await User.scope('withPassword').findByPk(req.userId);
        if(user){
            console.log(user);
            console.log(req.body.oldPassword, user.password);
            const result = await bcrypt.compare(req.body.oldPassword, user.password);
            if(result){
                console.log(result);
                const hash = await bcrypt.hash(req.body.newPassword, saltRounds);
                await User.update({
                    password: hash
                }, { where: {id: req.userId} });
                res.status(204).json({msg:"Password changed"});
            } else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }
    } catch(err){
        res.status(500).json({msg:"Internal server error"});
    }
}

const invalidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
}
const invalidUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{6,25}$/;
    return !re.test(username);
}
const invalidPassword = (password) => {
    const re = /^[a-zA-Z0-9_]{6,25}$/;
    return !re.test(password);
}