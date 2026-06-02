import pg from 'pg';
import "dotenv/config";

async function fixPermissions() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const pool = new pg.Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🚀 Fixing permissions on "public" schema...');
    await pool.query('GRANT ALL ON SCHEMA public TO public');
    await pool.query('GRANT ALL ON SCHEMA public TO postgres');
    console.log('✅ Permissions fixed!');
  } catch (error: any) {
    console.error('❌ Error fixing permissions:', error.message);
  } finally {
    await pool.end();
  }
}

fixPermissions();
