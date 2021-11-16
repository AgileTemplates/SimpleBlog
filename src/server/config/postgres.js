import postgres from 'postgres';

export default function () {
  const ssl = { rejectUnauthorized: false };
  const connectionString = process.env.DATABASE_URL;
  return postgres(connectionString, { ssl });
}
