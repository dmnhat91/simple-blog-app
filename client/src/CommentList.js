import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
    //API will return an array of comments, hence we know we are working with array and set default value as empty array
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return <ul>
        {renderedComments}
    </ul>
};

export default CommentList;