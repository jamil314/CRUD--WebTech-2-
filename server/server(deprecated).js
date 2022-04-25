const express = require('express')
const app = express()
const cors = require('cors')
const DbHandler = require('./DbHandler')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

app.listen(3001, () => {
    console.log('Server Started on port 3001!!')
})

getId = (token, secret) =>{
    try {
        if(jwt.verify(token, secret)){
            const decoded = jwt.decode(token, secret)
            return decoded.id
        }else {
            return -1;
        }
    } catch (TokenExpiredError) {
        return -1;
    }
}

app.get('/api/auth', (req, res) =>{
    const token = req.headers['x-access-token']
    const id = getId(token, 'verysecretkey')
    if(id === -1) res.json({code: 403, message: 'Invalid Token'})
    else res.json({code: 200, id})
})

app.post('/api/validateUsername', (req, res) => {
    console.log(req.body)
    DbHandler.userExists(req.body.username, (exists) => {
        console.log(exists)
        if(exists) res.json({code: 409, message: 'username already exists'})
        else res.json({ code:200, message: 'username available' })
    })
})

app.post('/api/register', (req, res) => {
    console.log(req.body)
    DbHandler.userExists(req.body.username, (exists) => {
        console.log(exists)
        if(!exists) {
            DbHandler.registerUser(req.body.name, req.body.email, req.body.username, req.body.password, (err, results) => {
                if(err) throw err;
                else res.json({ status: 'ok' })
            })
        }
        else res.json({ status: 'failed!! user exists' })
    })
})

app.post('/api/login', (req, res) => {
    console.log(req.body)
    DbHandler.userExists(req.body.username, (exists) => {
        console.log(exists)
        if(exists) {
            DbHandler.loginUser(req.body.username, req.body.password, (id) => {
                if(id !== -1) {
                    const token = jwt.sign(
                        { 
                            username: req.body.username,
                            id: id 
                        }, 'verysecretkey', { 
                            expiresIn: '3000s' 
                        }
                        )
                        res.json({code: 200, message: 'login sucessful', token: token, id: id})
                    }
                    else res.json({ code:403, message: 'login failed!! wrong password' })
                })
            }
        else res.json({ status: 'login failed!! user not found' })
    })
})

app.post('/api/verifypassword', (req, res) => {
    const token = req.headers['x-access-token']
    const id = getId(token, 'verysecretkey')
    console.log("onGoing Pass verification for: ", id," with passWord: ", req.body.password)
    DbHandler.verifyPassword(id, req.body.password, (exists) => {
        console.log("Password Correct: ", exists)
        if(exists === 1) res.json({ code:200, message: 'Correct Password' })
        else res.json({code: 409, message: 'Wrong password'})
    })
})

app.post('/api/editprofile', (req, res) =>{
    const token = req.headers['x-access-token']
    const id = getId(token, 'verysecretkey')
    DbHandler.updateProfile(req.body.name, req.body.email, id, (success) => {
        console.log(success)
    })
    res.json({response:'updated', code:200})
})

app.post('/api/changepassword', (req, res) =>{
    const token = req.headers['x-access-token']
    const id = getId(token, 'verysecretkey')
    DbHandler.changePassword(id, req.body.password, (success) => {
        console.log(success)
    })
    res.json({response:'updated', code:200})
})

app.post('/api/getprofile', (req, res) => {
    const id = req.body.owner
    DbHandler.fetchProfile(id, (profile) => {
        res.json({data:profile})
    })
})

app.post('/api/createstory', (req, res) =>{
    const token = req.headers['x-access-token']
    const decoded = jwt.decode(token, 'verysecterkey')
    const id = decoded.id
    const name = decoded.username
    console.log('Creating: ', id, name, req.body.title, req.body.body)
    DbHandler.createStory(id, name, req.body.title, req.body.body, (success) => {
        console.log(success)
    })
    res.json({response:'created', code:200})
    
})

app.post('/api/editstory', (req, res) =>{
    DbHandler.updateStory(req.body.id, req.body.title, req.body.body, (success) => {
        console.log(success)
    })
    res.json({response:'updated', code:200})
})

app.get('/api/getsories', (req, res) => {
    console.log('fetching stories');
    DbHandler.fetchStory((stories) => {
        res.json({data:stories})
    })
})

app.post('/api/getsoriesfrom', (req, res) => {
    const id = req.body.owner
    DbHandler.fetchStoryFrom(id, (stories) => {
        res.json({data:stories})
    })
})

app.post('/api/deletestory', (req, res) =>{
    const id = req.body.id
    console.log('Deleting post with id: ', id);
    DbHandler.removeStory(id, (success) => {
        console.log(success)
    })
    res.json({response:'deleted', code:200})
    
})
