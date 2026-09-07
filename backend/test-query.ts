// test-query.ts
import { query } from './src/db';

async function test() {
  const result = await query('SELECT NOW() as time');
  console.log('✅ Query works!', result.rows[0]);
  process.exit();
}

test();