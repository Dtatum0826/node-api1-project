// BUILD YOUR SERVER HERE

const express = require('express')
const Users = require('./users/model')

const server = express()
server.use(express.json())


server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else
                res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.post('/api/users', (req, res) => {
    const user = req.body
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })

    } else {
        Users.insert(user)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            })

    }
})

server.delete('/api/users/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (!user) {
        res.status(404).json({ 
            message: "The user with the specified ID does not exist" 
    })
    } else {
        const deleted = await Users.remove(req.params.id)
        res.status(200).json(deleted)
    }
    // .then(user => {
    //     res.json(user)
    // })
    //     .catch(err => {
    //         res.status(500).json({ message: "The user could not be removed" })
    //     })
})




server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found... yet'
    })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
