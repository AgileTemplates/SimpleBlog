import React from 'react';

const Form = ({ onAdd }) => {
  // Store the user input in state variables
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  return (
    <div style={styles.container}>
      <input
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder={'Content'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      />

      {/* When the user clicks the button, call the onAdd prop */}
      <button onClick={() => onAdd({ title, content })}>Post</button>
      <hr />
    </div>
  );
};

// (Some styles for the form)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: '32px auto 0 auto',
  },
  textarea: {
    margin: '8px 0',
  },
};

export default Form;
