const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    //if result is undefined (aka. the post id does not have any comments), then give the empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});

    //assign comments array back to commentsByPostId
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001.')
});
