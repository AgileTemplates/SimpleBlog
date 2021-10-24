import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { API } from './App';

// A single blog post
const Post = ({ data, onDelete }) => {
  const [comments, setComments] = useState();

  async function getComments() {
    const response = await fetch(`${API}/get-comments?post_id=${data.id}`);
    const { comments } = await response.json();
    setComments(comments);
  }
  return (
    <div style={{ marginBottom: 24 }}>
      <hr />
      <div>
        <h3>{data.title}</h3>

        {/* Timeago is a cool library that lets us show relative dates 
        (https://www.npmjs.com/package/react-timeago) */}
        <TimeAgo date={data.date} />

        <p>{data.content}</p>
      </div>
      <button onClick={onDelete}>delete</button>

      {/* Show a button to fetch them */}
      {!comments && <button onClick={getComments}>get comments</button>}

      {/* When the user clicks the button, list all of the comments  */}
      {comments && (
        <>
          <div>
            <h4>Comments:</h4>
            {comments.map((comment) => (
              <p key={comment.id}>{comment.comment}</p>
            ))}
          </div>
          {!comments.length && <p>No comments yet!</p>}
        </>
      )}
    </div>
  );
};

export default Post;
