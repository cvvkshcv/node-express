const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'jwt-auth-tutorial',
  host: 'localhost',
  port: 5432
});

module.exports = pool;