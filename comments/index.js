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

    comments.push({id: commentId, content, status: 'pending'});

    //assign comments array back to commentsByPostId
    commentsByPostId[req.params.id] = comments;

    // await axios.post('http://localhost:4005/events', {
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Event Received:', req.body.type);

    const {type, data} = req.body;

    if (type === 'CommentModerated'){
        //get postId, id, status from data
        const {postId, id, status, content} = data;

        const comments = commentsByPostId[postId];

        //find the comment that has the given id (aka. the id from the event)
        const comment = comments.find(comment => {
            return comment.id === id;
        });

        //update the comment status - don't need to insert back to the comments array as it is pointing to the same object
        comment.status = status;

        // await axios.post('http://localhost:4005/events', {
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on 4001.')
});
