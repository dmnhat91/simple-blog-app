const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto'); //require randomBytes from 'crypto' package to generate new id so we can assign to the posts
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//create an object to store post object we have already created
const posts = {};

//create routes associated with app
app.get('/posts', (req, res) => {
    res.send(posts); //whenever someone get post via GET request, send back all the posts
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex'); //generate a hex id length 4 bytes
    const {title} = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    //print out the type of event (aka. the 'type' property of the body)
    console.log('Received Event:', req.body.type);

    // send back an empty obj - just to say: "yeah, i got the event"
    res.send({});
});

//set up listening port
app.listen(4000, () => {
    console.log('v55');
    console.log('Listening on 4000')
});