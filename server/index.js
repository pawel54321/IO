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
    .query('CREATE TABLE IF NOT EXISTS Uzytkownik (index SERIAL PRIMARY KEY, imie VARCHAR(255), nazwisko VARCHAR(255), login VARCHAR(255), haslo VARCHAR(255), czy_admin BOOL)')
    .catch((error) => {
        console.log(error);
    });

// Express route handlers

app.get('/', (req, res) => {
    res.send('Hi');
});


app.get('/Uzytkownik/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from Uzytkownik');

    res.send(values.rows);
});



app.post('/Uzytkownik', async (req, res) => {


    const imie = req.body.imie;
    const nazwisko = req.body.nazwisko;
    const login = req.body.login;
    const haslo = req.body.haslo;
    const czy_admin = true;

    /*if(pgClient.query('SELECT login FROM Uzytkownik')!=1)*/
    pgClient.query('INSERT INTO Uzytkownik(imie, nazwisko, login, haslo, czy_admin) VALUES($1,$2,$3,$4,$5)', [imie,nazwisko,login,haslo,czy_admin]);


    res.send({
        imie : req.body.imie,
        nazwisko : req.body.nazwisko,
        login : req.body.login,
        haslo : req.body.haslo,
        working: true
    });
});



app.listen(5000, error => {
    console.log('Listening on port 5000');
});