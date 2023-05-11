// BUILD YOUR SERVER HERE

const express = require('express')
const Users = require('./users/model')

const server = express()



server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else
            res.json(user)
        })
        .catch(err => {
          { }
        })
})




server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found... yet'
    })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
