const mysql = require("mysql2/promise");
require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

// Create a connection pool.
const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
});

// Function to initialize the database.
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`Database connected on port ${DB_PORT}...`);

    const userTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sub VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        email_verified BOOLEAN NOT NULL,
        name VARCHAR(255),
        nickname VARCHAR(255),
        given_name VARCHAR(255),
        picture TEXT,
        updated_at DATETIME,
        sid VARCHAR(255),
        nonce VARCHAR(255),
        iss VARCHAR(255),
        aud VARCHAR(255),
        iat DATETIME,
        exp DATETIME
      );
    `;

    await connection.query(userTableQuery);
    console.log("User table created or already exists.");

    connection.release();
  } catch (err) {
    console.error(`Error initializing the database: ${err}`);
    process.exit(1); // Exit the process if database initialization fails.
  }
};

// Initialize the database.
initializeDatabase();

module.exports = pool;
