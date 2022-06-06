// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model.js');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
    Users.find().then(users => {
        if(users == null) {
            res.status(500).json('The users information could not be retrieved');
            return;
        }
        res.json(users);
    })
})

server.get('/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if(user == null) {
            res.status(400).json("The user with the specified ID does not exist");
            return;
        }
        res.json(user);
    })
})

server.post('/users', (req, res) => {
    Users.insert(req.body)
    .then(result => {
        // console.log(result)
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(400).json({ message: "There was an error while saving the user to the database" });
    })
})

server.delete('/users/:id', (req, res) => {
    Users.remove(req.params.id).then(result => {
        if(result == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" });
            return;
        }
        res.json(result);
    })
    .catch(err => {
        res.status(500).json({ message: "The user could not be removed" });
    })
})

server.put('/users/:id', (req, res) => {
    Users.update(req.params.id, req.body).then(result => {
        if(result == null) {
            res.status(404).json({ message: "Please provide name and bio for the user" });
            return;
        }
        res.json(result);
    })
    .catch(err => {
        res.status(500).json({ message: "The user information could not be updated" });
    })
})

module.exports = server;
