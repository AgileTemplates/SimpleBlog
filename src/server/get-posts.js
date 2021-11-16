import postgres from './config/postgres';
import generateDB from './config/generateDB';

export async function handler(req) {
  //
  // Make sure the DATABASE_URL is set in the .env file
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'No database found (see .env.example file)',
      }),
    };
  }

  const database = postgres();
  try {
    // Fetch all posts
    const posts = await database`
      SELECT * FROM posts ORDER BY date desc;`;
    await database.end();
    return { statusCode: 200, body: JSON.stringify({ posts }) };

    // If there is no table, create one with some mock data
  } catch (err) {
    if (err.message === `relation "posts" does not exist`) {
      generateDB(database);
      return await handler(req);
    }

    // If error, return error
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
