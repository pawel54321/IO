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
    .query('CREATE TABLE IF NOT EXISTS Uzytkownik (id SERIAL PRIMARY KEY, imie VARCHAR(255), nazwisko VARCHAR(255), login VARCHAR(255), haslo VARCHAR(255), stan VARCHAR(255))')
    .catch((error) => {
        console.log(error);
    });

pgClient
    .query('CREATE TABLE IF NOT EXISTS Atrakcja (id SERIAL PRIMARY KEY, nazwa VARCHAR(255), adres VARCHAR(255), liczba_miejsc INT, godzina_otwarcia TIME, godzina_zamkniecia TIME, cena NUMERIC (5, 2), id_miejscowosc INT)')
    .catch((error) => {
        console.log(error);
    }); // DODAC czy_wycofana

pgClient
    .query('CREATE TABLE IF NOT EXISTS Miejscowosc (id SERIAL PRIMARY KEY, nazwaMiejscowosc VARCHAR(255),kraj VARCHAR(255))') // DODAC kraj
    .catch((error) => {
        console.log(error);
    });

/*pgClient
    .query('CREATE TABLE IF NOT EXISTS Tabela_Posrednia (index SERIAL PRIMARY KEY, index_uzytkownik INT, index_atrakcja INT)')
    .catch((error) => {
        console.log(error);
    });*/

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
    var stanstan = '';

    const zapytanie2 = await pgClient.query("SELECT COUNT(*) FROM Uzytkownik WHERE login='" + login + "' AND haslo='" + haslo + "'")
        .catch((error) => {
            console.log(error);
        });

    const tablica = zapytanie2.rows;
    //console.log(tablica[0]);
    const stan = await pgClient.query("SELECT stan FROM Uzytkownik WHERE login='" + login + "'")
    const tablica2 = stan.rows;

    if (tablica[0].count == 1)
    {
        czy_poprawne = true;
        stanstan = tablica2[0].stan;
    }
    else
        czy_poprawne = false;

    res.send({
        login: req.body.login,
        haslo: req.body.haslo,

        zwracam_czy_poprawne: czy_poprawne,
        jaki_user: stanstan

    });

});


app.post('/Uzytkownik/Rejestracja', async (req, res) => {


    const imie = req.body.imie;
    const nazwisko = req.body.nazwisko;
    const login = req.body.login;
    const haslo = req.body.haslo;
    var stan = 'Admin'; //'User' 'Admin'

    const czyjestjuzadmin = await pgClient.query("SELECT COUNT(login) FROM Uzytkownik")
    const tablicaczyjestjuzadmin = czyjestjuzadmin.rows;

    console.log(tablicaczyjestjuzadmin[0].count);

    if (tablicaczyjestjuzadmin[0].count > 0) {
        stan = 'User';
    }

    const zapytanie = await pgClient.query("SELECT COUNT(login) FROM Uzytkownik WHERE login='" + login + "'")
    //console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);
    var czy_stworzono = false;




    if (tablica[0].count == 0) {
        pgClient.query('INSERT INTO Uzytkownik(imie, nazwisko, login, haslo, stan) VALUES($1,$2,$3,$4,$5)', [imie, nazwisko, login, haslo, stan])
            .catch((error) => {
                console.log(error);
            });
        czy_stworzono = true;
    }
    else {
        czy_stworzono = false;
    }

    res.send({
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        login: req.body.login,
        haslo: req.body.haslo,

        zwracam_czy_stworzono: czy_stworzono

    });
});




app.post('/Uzytkownik/PanelAdmina', async (req, res) => {

    const nazwa = req.body.nazwa;
    const adres = req.body.adres;
    const liczba_miejsc = req.body.liczba_miejsc;
    const godzina_otwarcia = req.body.godzina_otwarcia;
    const godzina_zamkniecia = req.body.godzina_zamkniecia;
    const cena = req.body.cena;
    const id_miejscowosc = req.body.id_miejscowosc;

    //Czy istnieje w tabeli Miejscowosc 'ten' indeks = to idziemy dalej
    const zapytaniesprawdzaczyjestindeks = await pgClient.query("SELECT COUNT(nazwaMiejscowosc) FROM Miejscowosc WHERE id='" + id_miejscowosc + "'")
    const tabliczapytaniesprawdzaczyjestindeks = zapytaniesprawdzaczyjestindeks.rows;
    console.log(tabliczapytaniesprawdzaczyjestindeks[0].count);
    if (tabliczapytaniesprawdzaczyjestindeks[0].count == 1) {
        //czy duplikat?
        const zapytanie = await pgClient.query("SELECT COUNT(nazwa) FROM Atrakcja WHERE nazwa='" + nazwa + "'")
        console.log(zapytanie.rows);
        const tablica = zapytanie.rows;
        //console.log(tablica[0].count);
        var czy_stworzono = false;

        var czy_stworzonoBrakPodanejMiejscowosci = true;

        if (tablica[0].count == 0) {

            // min = "0" naprawic zeby nie bylo duplikacji sprawdzac SELECT (zmienic na liste rozwijana zamiast int tekst)
            //dodawanie miejscowosci tylko przez liste rozwijana 

            pgClient.query('INSERT INTO Atrakcja(nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc) VALUES($1,$2,$3,$4,$5,$6,$7)',
                [nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc])
                .catch((error) => {
                    console.log(error);
                });

            czy_stworzono = true;
        }
        else {
            czy_stworzono = false;
        }
    }
    else
        czy_stworzonoBrakPodanejMiejscowosci = false;

    res.send({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        liczba_miejsc: req.body.liczba_miejsc,
        godzina_otwarcia: req.body.godzina_otwarcia,
        godzina_zamkniecia: req.body.godzina_zamkniecia,
        cena: req.body.cena,
        id_miejscowosc: req.body.id_miejscowosc,

        zwracam_czy_poprawnie_dodalem_atrakcje: czy_stworzono,
        zwracam_czy_stworzonoBrakPodanejMiejscowosci: czy_stworzonoBrakPodanejMiejscowosci

    });

});


app.post('/Uzytkownik/PanelAdmina2', async (req, res) => {

    const nazwaMiejscowosc = req.body.nazwaMiejscowosc;
    const kraj = req.body.kraj;

    const zapytanie = await pgClient.query("SELECT COUNT(nazwaMiejscowosc) FROM Miejscowosc WHERE nazwaMiejscowosc='" + nazwaMiejscowosc + "'")
    console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);
    var czy_stworzono = false;

    if (tablica[0].count == 0) {

        pgClient.query('INSERT INTO Miejscowosc(nazwaMiejscowosc,kraj) VALUES($1,$2)', [nazwaMiejscowosc,kraj])
            .catch((error) => {
                console.log(error);
            });

        czy_stworzono = true;
    }
    else {
        czy_stworzono = false;
    }

    res.send({
        nazwaMiejscowosc: req.body.nazwaMiejscowosc,
        kraj: req.body.kraj,

        zwracam_czy_poprawnie_dodalem_miejscowosc: czy_stworzono

    });

});


app.post('/Uzytkownik/Panel_Admina/Zwroc_Tabele_Atrakcja', async (req, res) => {



    const zapytanie = await pgClient.query("SELECT * FROM Atrakcja")
    // console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica);

    res.send({
        daneAtrakcja: tablica
    });

});

app.post('/Uzytkownik/Panel_Admina/Zwroc_Atrakcje_Z_Miejscowosci', async (req, res) => {

    const miejscowosc = req.body.miejscowosc;
    //console.log(miejscowosc);
    const zapytanie = await pgClient.query("SELECT * FROM Atrakcja a, Miejscowosc m WHERE m.nazwamiejscowosc='"+miejscowosc+"' AND m.id=a.id_miejscowosc")
    // console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica);

    res.send({
        daneAtrakcja: tablica
    });

});



app.post('/Uzytkownik/Panel_Admina/Zwroc_Tabele_Miejscowosc', async (req, res) => {



    const zapytanie = await pgClient.query("SELECT * FROM Miejscowosc")
    // console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica);

    res.send({
        daneMiejscowosc: tablica
    });

});




app.listen(5000, error => {
    console.log('Listening on port 5000');
});

