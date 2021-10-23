import React from 'react';
import TimeAgo from 'react-timeago';
import { Box, Divider, Heading, Text, Button, Stack } from '@chakra-ui/react';

// A single blog post
const Post = ({ data, onDelete }) => {
  return (
    <Box marginY={8}>
      <Stack>
        <Divider />
        <Box paddingTop={4}>
          <Heading size="md">{data.title}</Heading>

          {/* Timeago is a cool library that lets us show relative dates 
        (https://www.npmjs.com/package/react-timeago) */}
          <Text color="gray">
            <TimeAgo date={data.date} />
          </Text>

          <Text>{data.content}</Text>
        </Box>
        <Button width={32} colorScheme="red" onClick={onDelete}>
          delete
        </Button>
      </Stack>
    </Box>
  );
};

export default Post;
