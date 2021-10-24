export default async (database) => {
  const query = `
    -- Delete the tables if they exists
    drop table if exists comments;
    drop table if exists posts;

    -- Create the tables
    create table posts (
        id serial primary key,
        title text not null,
        content text not null,
        date timestamp without time zone
    );
    create table comments (
        id serial primary key,
        comment text not null,
        date timestamp without time zone,
        post_id integer,
        foreign key (post_id) references posts(id) on delete cascade
    );
    
    -- Add some data
    insert into posts (title, content, date)
    values ('My first post', 'I am going to start a blog.', '2021-10-18 15:22:35'),
    ('I had lunch', 'It was a sandwich.', '2021-10-19 15:22:35'),
    ('My holiday', 'The sun was shining and I was happy.', '2021-10-20 15:22:35');

    insert into comments (post_id, comment, date)
    values (3, 'Great post', '2021-10-21 15:22:35'),
    (3, 'Sounds fun', '2021-10-22 15:22:35'),
    (2, 'What was in the sandwich?', '2021-10-23 15:22:35');
    `;
  await database.query(query);
  await database.end();
};
