import React from 'react';
import TimeAgo from 'react-timeago';
import { Post as PostType } from './App';

// A single blog post
type PostProps = { data: PostType; onDelete: () => void };
const Post = ({ data, onDelete }: PostProps) => {
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
    </div>
  );
};

export default Post;
