import React from 'react';
import Post from './Post';
import Form from './Form';
import './App.css';
import usePosts from './hooks/usePosts';

// State for loading, error and posts
const App = () => {
  const { posts, loading, error, client } = usePosts();

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of Posts
  return (
    <div className="App">
      <header>SimpleBlog</header>
      <Form onAdd={({ title, content }) => client.add({ title, content })} />
      <div>
        {posts.map((post) => (
          <Post data={post} onDelete={() => client.delete({ id: post.id })} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
