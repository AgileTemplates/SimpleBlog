import React, { useEffect, useState } from 'react';
import Post from './Post';
import Form from './Form';
import './App.css';
const API = `/.netlify/functions`;

// Define types
export type Post = { id: number; date: string; title: string; content: string };
export type AddArgs = { title: string; content: string };
export type DeleteArgs = { id: number };

// State for loading, error and posts
const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  // When the component renders for the first time, fetch all the posts
  useEffect(() => {
    getPosts();
  }, []);
  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch(`${API}/get-posts`);
      const { posts, error } = await response.json();
      if (error) throw new Error(error);
      setPosts(posts);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Add or delete posts
  async function addPost({ title, content }: AddArgs) {
    try {
      if (!title || !content) return;
      setLoading(true);
      const body = JSON.stringify({ title, content });
      await fetch(`${API}/add-post`, { method: 'POST', body });
      return getPosts(); // Refresh all posts
    } catch (error: any) {
      setError(error);
    }
  }
  async function deletePost({ id }: DeleteArgs) {
    try {
      setLoading(true);
      const body = JSON.stringify({ id });
      await fetch(`${API}/delete-post`, { method: 'POST', body });
      return getPosts(); // Refresh all posts
    } catch (error: any) {
      setError(error);
    }
  }

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of Posts
  return (
    <div className="App">
      <header>SimpleBlog</header>
      <Form
        onAdd={({ title, content }: AddArgs) => addPost({ title, content })}
      />
      <div>
        {posts.map((post) => (
          <Post data={post} onDelete={() => deletePost({ id: post.id })} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
