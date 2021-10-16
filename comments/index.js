const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    //if result is undefined (aka. the post id does not have any comments), then give the empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});

    //assign comments array back to commentsByPostId
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001.')
});
