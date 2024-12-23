const mysql = require("mysql");

require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

con.connect((err) => {
  if (err) {
    console.error(`Error connecting to the database: ${err}`);
  } else {
    con.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, result) => {
      if (err) {
        console.error(`Error creating ${DB_NAME} database: ${err}`);
      }
    });

    console.log(`Database connected on port ${DB_PORT}...`);
  }
});
