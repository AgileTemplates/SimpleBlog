import React from 'react';
import Post from './Post';

// A list of all posts
const Posts = ({ posts, deletePost }) => (
  <div>
    {posts.map((post) => (
      <Post data={post} onDelete={() => deletePost({ id: post.id })} />
    ))}
  </div>
);

export default Posts;
