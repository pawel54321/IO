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

/*
app.get('/Uzytkownik/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from Uzytkownik');

    res.send(values.rows);
});
*/


app.post('/Uzytkownik/Logowanie', async (req, res) => {

    //Brak zabezpieczenia SQL Inject
    const login = req.body.login;
    const haslo = req.body.haslo; // Moze hashowanie?

    var czy_poprawne = false;

    const zapytanie = pgClient.query("SELECT * FROM Uzytkownik WHERE login='"+login+"' AND haslo='"+haslo+"'")
    .catch((error) => {
        console.log(error);
    });

    if(zapytanie.rows[0]==1)
        czy_poprawne = true;
    else
        czy_poprawne = false;

    res.send({
        login : req.body.login,
        haslo : req.body.haslo,

        zwracam_czy_poprawne: czy_poprawne
  
    });
});

app.post('/Uzytkownik/Rejestracja', async (req, res) => {


    const imie = req.body.imie;
    const nazwisko = req.body.nazwisko;
    const login = req.body.login;
    const haslo = req.body.haslo;
    const czy_admin = false;

    const zapytanie = await pgClient.query("SELECT COUNT(login) FROM Uzytkownik WHERE login='"+login+"'")
    //console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);
    var czy_stworzono = false;

    if(tablica[0].count==0)
    {
        pgClient.query('INSERT INTO Uzytkownik(imie, nazwisko, login, haslo, czy_admin) VALUES($1,$2,$3,$4,$5)', [imie,nazwisko,login,haslo,czy_admin])
        .catch((error) => {
            console.log(error);
        });
        czy_stworzono = true;
    }
    else
    {
        czy_stworzono = false;
    }

    res.send({
        imie : req.body.imie,
        nazwisko : req.body.nazwisko,
        login : req.body.login,
        haslo : req.body.haslo,

        zwracam_czy_stworzono: czy_stworzono
  
    });
});



app.listen(5000, error => {
    console.log('Listening on port 5000');
});