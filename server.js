require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 5432,
});

app.post('/query', async (req, res) => {
    try {
        const result = await pool.query(req.body.sql);
        const response = {
            records: result.rows,
            rowsAffected: result.rowCount,
            fields: result.fields
        };
        res.json(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 5479;
app.listen(PORT, () => console.log(`PostgreSQL REST proxy running on port ${PORT}`));