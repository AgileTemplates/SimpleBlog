import React, { useEffect, useState } from 'react';

// New Post form
const Form = ({ onAdd, postToEdit, onEditSave, onEditCancel }) => {
  // Store the input in state variables when the user types
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // If we are editing a post, set the state variables to the post's values
  useEffect(() => {
    setTitle(postToEdit?.title || '');
    setContent(postToEdit?.content || '');
  }, [postToEdit]);

  return (
    <form>
      <input
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder={'Content'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* When the user clicks the button, call the onAdd prop */}
      {!postToEdit ? (
        <button onClick={() => onAdd({ title, content })}>Post</button>
      ) : (
        <>
          <button
            onClick={() => onEditSave({ id: postToEdit.id, title, content })}
          >
            Save
          </button>
          <button onClick={() => onEditCancel()}>Cancel</button>
        </>
      )}

      <hr />
    </form>
  );
};

export default Form;
