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

pgClient
    .query('CREATE TABLE IF NOT EXISTS Atrakcja (index SERIAL PRIMARY KEY, nazwa VARCHAR(255), adres VARCHAR(255), liczba_miejsc INT, godzina_otwarcia TIME, godzina_zamkniecia TIME, cena NUMERIC (5, 2), index_miejscowosc INT)')
    .catch((error) => {
        console.log(error);
    });

pgClient
    .query('CREATE TABLE IF NOT EXISTS Miejscowosc (index SERIAL PRIMARY KEY, nazwa VARCHAR(255))')
    .catch((error) => {
        console.log(error);
    });

pgClient
    .query('CREATE TABLE IF NOT EXISTS Tabela_Posrednia (index SERIAL PRIMARY KEY, index_uzytkownik INT, index_atrakcja INT)')
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

    const zapytanie2 = await pgClient.query("SELECT COUNT(*) FROM Uzytkownik WHERE login='"+login+"' AND haslo='"+haslo+"'")
    .catch((error) => {
        console.log(error);
    });

    const tablica = zapytanie2.rows;
    //console.log(tablica[0]);

    if(tablica[0].count==1)
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




app.post('/Uzytkownik/PanelAdmina', async (req, res) => {

    const nazwa= req.body.nazwa;
    const adres= req.body.adres;
    const liczba_miejsc= req.body.liczba_miejsc;
    const godzina_otwarcia= req.body.godzina_otwarcia;
    const godzina_zamkniecia= req.body.godzina_zamkniecia;
    const cena= req.body.cena;
    const index_miejscowosc= req.body.index_miejscowosc;

    const zapytanie = await pgClient.query("SELECT COUNT(nazwa) FROM Atrakcja WHERE nazwa='"+nazwa+"'")
    console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);
    var czy_stworzono = false;

    if(tablica[0].count==0)
    {

        // min = "0" naprawic zeby nie bylo duplikacji sprawdzac SELECT (zmienic na liste rozwijana zamiast int tekst)
        //dodawanie miejscowosci tylko przez liste rozwijana 

        pgClient.query('INSERT INTO Atrakcja(nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, index_miejscowosc) VALUES($1,$2,$3,$4,$5,$6,$7)', 
        [nazwa,adres,liczba_miejsc,godzina_otwarcia,godzina_zamkniecia,cena,index_miejscowosc])
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
        nazwa:req.body.nazwa,
        adres:req.body.adres  ,          
        liczba_miejsc:req.body.liczba_miejsc,
        godzina_otwarcia:req.body.godzina_otwarcia,
        godzina_zamkniecia:req.body.godzina_zamkniecia,
        cena:req.body.cena,
        index_miejscowosc:req.body.index_miejscowosc,

        zwracam_czy_poprawnie_dodalem_atrakcje: czy_stworzono
  
    });
    
});


app.post('/Uzytkownik/PanelAdmina2', async (req, res) => {

    const nazwaMiejscowosc= req.body.nazwaMiejscowosc;

    const zapytanie = await pgClient.query("SELECT COUNT(nazwa) FROM Miejscowosc WHERE nazwa='"+nazwaMiejscowosc+"'")
    console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);
    var czy_stworzono = false;

    if(tablica[0].count==0)
    {

        pgClient.query('INSERT INTO Miejscowosc(nazwa) VALUES($1)',[nazwaMiejscowosc])
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
        nazwa:req.body.nazwa,

        zwracam_czy_poprawnie_dodalem_miejscowosc: czy_stworzono
  
    });
    
});

/*
app.post('/Uzytkownik/Panel_Admina/Zwroc_Tabele_Atrakcja', async (req, res) => {

    
 
    const zapytanie = await pgClient.query("SELECT * FROM Atrakcja")
   // console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica);

    res.send({
        daneAtrakcja: tablica
    });
    
});
*/

app.listen(5000, error => {
    console.log('Listening on port 5000');
});