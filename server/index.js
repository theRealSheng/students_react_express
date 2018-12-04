const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// // MSQL Client Setup
// const mysql = require('mysql');
// const consql = mysql.createConnection({
//   host: keys.mysqlHost,
//   user: keys.mysqlUser,
//   password: keys.mysqlPassword,
//   database: keys.mysqlDatabase
// });

// consql.connect();

// const sql = `CREATE TABLE students 
//   (firstName VARCHAR(255),
//   lastName VARCHAR(255), 
//   birthday VARCHAR(255), 
//   hobbies VARCHAR(255), 
//   photo VARCHAR(255)
//   )`;

// consql.query(sql, (err, result) => {
//   if(err) console.log('********', err, '********');
//   if(result) console.log("Table created");
// })

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

const queryText =
  `CREATE TABLE IF NOT EXISTS
      reflections(
        email PRIMARY KEY,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        birthday VARCHAR(128) NOT NULL,
        hobbies VARCHAR(128) NOT NULL,
        photo VARCHAR(128)
      )`;

pgClient
  .query(queryText)
  .catch(err => console.log(err));

// Express route handlers
app.get('/students', async (req, res) => {
  try {
    const values = await pgClient.query('SELECT * from students');
    
    return res.send(values.rows);
  
  } catch(err){
    return res.status(403);
  }
});

app.post('/add-student', async (req, res) => {
  try {
    const values = req.body.data;
    
    const sql = `INSERT INTO students (email, name, lastName, birthday, hobbies, photo) VALUES (${values})`;
    const response = await pgClient.query(sql, (err, result) => {
      if(err) throw err;
    });

    if (response) {
      return res.send({ working: true });
    }

  } catch(err) {
    return res.status(403);
  }
});

app.post('/delete-student/', async (req, res) => {
  try {
    const value = req.body.data;
    const sql = `DELETE FROM students WHERE 'email'=${value})`;
    pgClient.query(sql, (err, result) => {
      if(err) throw err;
  
      res.send({ working: true });
    });

  } catch(err){
    return res.status(403);
  }
});

app.listen(5000, err => {
  console.log('Listening');
});
