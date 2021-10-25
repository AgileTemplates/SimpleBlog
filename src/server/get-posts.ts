import { Pool } from 'pg';
import { HandlerEvent } from '@netlify/functions';
import generateDB from './config/generateDB';

// const handler: Handler = async (req) => {
export async function handler(req: HandlerEvent): Promise<any> {
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

  // Connect to the database
  const ssl = { rejectUnauthorized: false };
  const connectionString = process.env.DATABASE_URL;
  const database = new Pool({ connectionString, ssl });

  try {
    // Fetch all posts
    const result = await database.query(
      'SELECT * FROM posts ORDER BY date desc;'
    );

    // Close the connection and return the result
    await database.end();
    return { statusCode: 200, body: JSON.stringify({ posts: result.rows }) };

    // If there is no table, create one with some mock data
  } catch (err: any) {
    if (err.message === `relation "posts" does not exist`) {
      generateDB(database);
      return (await handler(req)) as any;
    }

    // If error, return error
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

// export default handler;
