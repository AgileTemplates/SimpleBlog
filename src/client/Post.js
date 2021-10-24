import React from 'react';
import TimeAgo from 'react-timeago';
import Filter from 'bad-words';

// A single blog post
const Post = ({ data, onDelete, censorBadWords }) => {
  const filter = new Filter();
  const title = censorBadWords ? filter.clean(data.title) : data.title;
  const content = censorBadWords ? filter.clean(data.content) : data.content;
  return (
    <div style={{ marginBottom: 24 }}>
      <hr />
      <div>
        <h3>{title}</h3>

        {/* Timeago is a cool library that lets us show relative dates 
        (https://www.npmjs.com/package/react-timeago) */}
        <TimeAgo date={data.date} />

        <p>{content}</p>
      </div>
      <button onClick={onDelete}>delete</button>
    </div>
  );
};

export default Post;
