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


app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');

    res.send(values.rows);
});



app.post('/values', async (req, res) => {
    const index = req.body.index;

    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({
        working: true
    });
});



app.listen(5000, error => {
    console.log('Listening on port 5000');
});