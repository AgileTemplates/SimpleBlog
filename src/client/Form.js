import React, { useState } from 'react';
import { Input, Textarea, Button, Stack } from '@chakra-ui/react';

// New Post form
const Form = ({ onAdd }) => {
  // Store the input in state variables when the user types
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Stack>
      <Input
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder={'Content'}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* When the user clicks the button, call the onAdd prop */}
      <Button colorScheme="green" onClick={() => onAdd({ title, content })}>
        Post
      </Button>
    </Stack>
  );
};

export default Form;
