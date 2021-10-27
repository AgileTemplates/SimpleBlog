import React, { useEffect, useState } from 'react';
import Note from './Note';
import Form from './Form';
import './App.css';
const API = `/.netlify/functions`;

// State for loading, error and notes
const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);

  // When the component renders for the first time, fetch all the notes
  useEffect(() => {
    getNotes();
  }, []);
  async function getNotes() {
    try {
      setLoading(true);
      const response = await fetch(`${API}/get-notes`);
      const { notes, error } = await response.json();
      if (error) throw new Error(error);
      setNotes(notes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Add or delete notes
  async function addNote({ title, content }) {
    try {
      if (!title || !content) return;
      setLoading(true);
      const body = JSON.stringify({ title, content });
      await fetch(`${API}/add-note`, { method: 'POST', body });
      return getNotes(); // Refresh all notes
    } catch (error) {
      setError(error);
    }
  }
  async function deleteNote({ id }) {
    try {
      setLoading(true);
      const body = JSON.stringify({ id });
      await fetch(`${API}/delete-note`, { method: 'POST', body });
      return getNotes(); // Refresh all notes
    } catch (error) {
      setError(error);
    }
  }

  // If error or loading, show a message
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  // Otherwise, show the Form and a list of notes
  return (
    <div className="App">
      <header>SimpleNotes</header>
      <Form onAdd={({ title, content }) => addNote({ title, content })} />
      <div>
        {notes?.map((note) => (
          <Note data={note} onDelete={() => deleteNote({ id: note.id })} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
