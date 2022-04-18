const express = require('express')
const app = express()
const cors = require('cors')
const DbHandler = require('./DbHandler')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

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
            DbHandler.loginUser(req.body.username, req.body.password, (success) => {
                if(success) {
                    const token = jwt.sign(
                        { 
                            username: req.body.username 
                        }, 'verysecretkey', { 
                            expiresIn: '30s' 
                        }
                        )
                    res.json({code: 200, message: 'login sucessful', token: token})
                }
                else res.json({ code:403, message: 'login failed!! wrong password' })
            })
        }
        else res.json({ status: 'login failed!! user not found' })
    })
})


app.post('/api/validateUsername', (req, res) => {
    console.log(req.body)
    DbHandler.userExists(req.body.username, (exists) => {
        console.log(exists)
        if(exists) res.json({code: 409, message: 'username already exists'})
        else res.json({ code:200, message: 'username available' })
    })
})

app.get('/hello', (req, res) => {
    console.log("hello")
    res.send('server is working')
})

app.listen(3001, () => {
    console.log('Server Started on port 3001!!')
})