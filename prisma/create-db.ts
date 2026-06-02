import pg from 'pg';
import "dotenv/config";

async function createDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  // Connect to the default 'postgres' database to create the new one
  const pool = new pg.Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🚀 Attempting to create "carbonflow" database...');
    await pool.query('CREATE DATABASE carbonflow');
    console.log('✅ Database "carbonflow" created successfully!');
  } catch (error: any) {
    if (error.code === '42P04') {
      console.log('ℹ️ Database "carbonflow" already exists.');
    } else {
      console.error('❌ Error creating database:', error.message);
    }
  } finally {
    await pool.end();
  }
}

createDatabase();
