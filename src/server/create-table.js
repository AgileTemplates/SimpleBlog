export default async (database) => {
  const query = `-- Drop the table if it exists.
DROP TABLE IF EXISTS POSTS;

-- Create the table
CREATE TABLE posts (
    id serial primary key,
    title text not null,
    content text not null,
    date timestamp without time zone
);
--
--
-- Insert some data, too.  Not part of the schema.
--
--
-- Add some data!
insert into posts (
        title,
        content,
        date
    )
values ('My first post', 'I am going to start a blog.', '2021-10-18 15:22:35'),
    ('I had lunch', 'It was a sandwich.', '2021-10-19 15:22:35'),
    ('My holiday', 'The sun was shining and I was happy.', '2021-10-20 15:22:35');`;
  await database.query(query);
  await database.end();
};
