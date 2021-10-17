// import React, {useState, useEffect} from 'react';
import React from 'react';
// import axios from 'axios';

// const CommentList = ({postId}) => {
const CommentList = ({comments}) => {
    //API will return an array of comments, hence we know we are working with array and set default value as empty array
    // const [comments, setComments] = useState([]);

    // const fetchData = async () => {
    //     const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    //     setComments(res.data);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const renderedComments = comments.map(comment => {
        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending'){
            content = 'This comment is awaiting moderation';
        }

        if (comment.status === 'rejected'){
            content = 'This comment has been rejected';
        }


        // return <li key={comment.id}>{comment.content}</li>;
        return <li key={comment.id}>{content}</li>;
    });

    return <ul>
        {renderedComments}
    </ul>
};

export default CommentList;