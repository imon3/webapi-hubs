const express = require('express');

const db = require('./data/db.js');

const server = express();

// MIDDLEWARE
server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hellow World');
});

server.get('/now', (req, res) => {
    const date = new Date().toUTCString();
    res.send(date);
});



// RETURN in CRUD
server.get('/hubs', (req, res) => {
    db.hubs
        .find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch((code, message) => {
            res.status(code).json({
                success: false,
                message
            })
        })
});

// CREATE in CRUD
server.post('/hubs', (req, res) => {
    const hubInfo = req.body

    db.hubs
        .add(hubInfo)
        .then(hub => {
            res.status(201).json({
                success: true,
                hub
            })
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            })
        });
})

//DELETE IN CRUD
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

    db.hubs
        .remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            })
        })
})

//UPDATE IN CRUD
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.hubs
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({
                    success: true,
                    updated
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'I cannot find that id'
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            })
        })
})

// RETURN 1 ITEM
server.get('/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.hubs
        .findById(id)
        .then(hub => {
            if (hub) {
                res.status(200).json({
                    success: true,
                    hub
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'cannot find hub'
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            })
        })
})


// PORT LISTENER
server.listen(4000, () => {
    console.log('server Running on http://localhost:4000')
});