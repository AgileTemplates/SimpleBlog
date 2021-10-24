import { Pool } from 'pg';

export async function handler(req) {
  //
  // Get params
  const { post_id } = req.queryStringParameters;

  // Connect to database
  const ssl = { rejectUnauthorized: false };
  const connectionString = process.env.DATABASE_URL;
  const database = new Pool({ connectionString, ssl });

  try {
    // Add a new post
    const result = await database.query(
      `select * from comments where post_id = $1`,
      [post_id]
    );

    // End the connection and return a success (200) response
    await database.end();
    return { statusCode: 200, body: JSON.stringify({ comments: result.rows }) };

    // If error, return error
  } catch (err) {
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
