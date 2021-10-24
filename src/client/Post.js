import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import { API } from './App';

// A single blog post
const Post = ({ data, onDelete }) => {
  const [comments, setComments] = useState();

  // List all of the comments when the user clicks 'show comments'
  async function getComments() {
    const response = await fetch(`${API}/get-comments?post_id=${data.id}`);
    const { comments } = await response.json();
    setComments(comments);
  }

  // Allow user to add a new comment
  async function addComment() {
    const comment = prompt('Enter your comment');
    if (!comment) return;
    const body = JSON.stringify({ comment, post_id: data.id });
    await fetch(`${API}/add-comment`, { method: 'POST', body });
    return getComments(); // Refresh comments
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

      {/* Comments button and list */}
      {!comments && <button onClick={getComments}>show comments</button>}
      {comments && (
        <>
          <div>
            <h4>Comments:</h4>
            {comments.map((comment) => (
              <p key={comment.id}>{comment.comment}</p>
            ))}
          </div>
          {!comments.length && <p>No comments yet!</p>}
          <button onClick={addComment}>add comment</button>
        </>
      )}
    </div>
  );
};

export default Post;
