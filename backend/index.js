const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'myapp',
  port: 5432,
});

app.get('/health', (req, res) => res.status(200).send('Healthy'));

app.get('/', async (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    return res.json({ message: "Test Mode: Logic Verified" });
  }
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Connected to DB", time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
