import pg from 'pg';
import "dotenv/config";

async function testInsert() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new pg.Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🚀 Testing raw PG insert...');
    // Try to insert a dummy user
    const id = 'test-' + Math.random().toString(36).substring(7);
    await pool.query(
      'INSERT INTO "User" (id, email, password, "firstName", "lastName", role, "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [id, `test-${id}@example.com`, 'password', 'Test', 'User', 'USER']
    );
    console.log('✅ Raw PG insert successful!');
    
    // Clean up
    await pool.query('DELETE FROM "User" WHERE id = $1', [id]);
    console.log('🧹 Cleaned up test user');
  } catch (error: any) {
    console.error('❌ Raw PG insert failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await pool.end();
  }
}

testInsert();
