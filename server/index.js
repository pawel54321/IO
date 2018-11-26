const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// express app setup
const appHandlers = [
    cors(), 
    bodyParser.json()
];

const app = express();
app.use(appHandlers);

// postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', () => {
    console.log('Lost PG connection');
});

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((error) => {
        console.log(error);
    });

// Express route handlers

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(5000, error => {
    console.log('Listening on port 5000');
});