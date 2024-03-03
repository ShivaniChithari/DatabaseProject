// Your existing server.js code
const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors()); 

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Table',
  password: 'B20EC048@Abc',
  port: 5432,
});

client.connect();

app.get('/', (req, res) => {
  res.send('Server Started.....');
});

app.get('/api/customers', async (req, res) => {
  const page = req.query.page || 1;
  let sort = req.query.sort || 'created_date';
  const search = req.query.search || '';
  const allowedSortColumns = ['sno','created_date', 'created_time'];
  if (!allowedSortColumns.includes(sort)) {
    sort = 'sno'; 
  }

  const offset = (page - 1) * 20;
  
  let customers;
  if (search) {
    customers = await client.query(`
      SELECT sno, CustomerName, age, phone, location,TO_CHAR(created_date, 'YYYY-MM-DD') AS created_date , created_time 
      FROM BookData
      WHERE CustomerName ILIKE $1 OR location ILIKE $1
      ORDER BY ${sort}
      LIMIT 20 OFFSET $2`, [`%${search}%`, offset]);
  } else {
    customers = await client.query(`
      SELECT sno, CustomerName, age, phone, location, TO_CHAR(created_date, 'YYYY-MM-DD') AS created_date , created_time 
      FROM BookData
      ORDER BY ${sort}
      LIMIT 20 OFFSET $1`, [offset]);
  }

  res.json(customers.rows);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
