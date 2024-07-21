const express = require('express');
const mysql = require('mysql');

require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create a middleware to attach the MySQL connection pool to the request object
app.use((req, res, next) => {
    req.db = pool;
    next();
});

/*
// Example route that uses the MySQL connection
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    req.db.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

*/