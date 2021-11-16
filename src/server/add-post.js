import postgres from './config/postgres';

export async function handler(req) {
  //
  // Get params
  const record = JSON.parse(req.body);
  const database = postgres();

  try {
    // Add a new post
    await database`insert into posts ${database(record, 'title', 'content')}`;

    // End the connection and return a success (200) response
    await database.end();
    return { statusCode: 200 };

    // If error, return error
  } catch (err) {
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
