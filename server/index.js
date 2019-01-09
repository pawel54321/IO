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
    .query('CREATE TABLE IF NOT EXISTS Atrakcja (id SERIAL PRIMARY KEY, nazwa VARCHAR(255), adres VARCHAR(255), liczba_miejsc INT, godzina_otwarcia TIME, godzina_zamkniecia TIME, cena NUMERIC (5, 2), id_miejscowosc INT, wycofana VARCHAR(255))')
    .catch((error) => {
        console.log(error);
    }); // DODAC czy_wycofana

pgClient
    .query('CREATE TABLE IF NOT EXISTS Miejscowosc (id SERIAL PRIMARY KEY, nazwaMiejscowosc VARCHAR(255), kraj VARCHAR(255))') // DODAC kraj
    .catch((error) => {
        console.log(error);
    });

pgClient
    .query('CREATE TABLE IF NOT EXISTS Dostepnosc (id SERIAL PRIMARY KEY, data DATE, wolne_miejsca INT, id_atrakcja INT)')
    .catch((error) => {
        console.log(error);
    });

pgClient
    .query('CREATE TABLE IF NOT EXISTS Bilety (id SERIAL PRIMARY KEY, data DATE, id_atrakcja INT, id_uzytkownik INT)')
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
    const miejscowosc = req.body.nazwamiejscowosc;

    //Czy istnieje w tabeli Miejscowosc 'ten' indeks = to idziemy dalej
    //const zapytaniesprawdzaczyjestindeks = await pgClient.query("SELECT COUNT(nazwaMiejscowosc) FROM Miejscowosc WHERE id='" + id_miejscowosc + "'")
    //const tabliczapytaniesprawdzaczyjestindeks = zapytaniesprawdzaczyjestindeks.rows;
    //console.log(tabliczapytaniesprawdzaczyjestindeks[0].count);
    //if (tabliczapytaniesprawdzaczyjestindeks[0].count == 1) {
        //czy duplikat?
        //const zapytanie = await pgClient.query("SELECT COUNT(nazwa) FROM Atrakcja WHERE nazwa='" + nazwa + "'")
        //console.log(zapytanie.rows);
        //const tablica = zapytanie.rows;
        //console.log(tablica[0].count);
        var czy_stworzono = false;

        //var czy_stworzonoBrakPodanejMiejscowosci = true;

        //if (tablica[0].count == 0) {

            // min = "0" naprawic zeby nie bylo duplikacji sprawdzac SELECT (zmienic na liste rozwijana zamiast int tekst)
            //dodawanie miejscowosci tylko przez liste rozwijana

            const zapytanie = await pgClient.query("SELECT COUNT(nazwaMiejscowosc) FROM Miejscowosc WHERE nazwaMiejscowosc='" + miejscowosc + "'")
            //console.log(zapytanie.rows);
            const tablica = zapytanie.rows;

            if (tablica[0].count == 0) {
                pgClient.query("INSERT INTO Miejscowosc(nazwaMiejscowosc,kraj) VALUES ('"+miejscowosc+"','niezdefiniowany')");
            }
            const id_m = await pgClient.query("SELECT id FROM Miejscowosc WHERE nazwaMiejscowosc='" + miejscowosc + "'");
            //console.log(id_m.rows);
            const id_tab = id_m.rows;
            const id_miejscowosc = id_tab[0].id;
            //console.log(id_miejscowosc);

            pgClient.query("INSERT INTO Atrakcja(nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc, wycofana) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
                [nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc, 'Nie'])
                .catch((error) => {
                    console.log(error);
                });

            czy_stworzono = true;
        //}
        //else {
        //    czy_stworzono = false;
        //}
    //}
    //else
    //    czy_stworzonoBrakPodanejMiejscowosci = false;

    res.send({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        liczba_miejsc: req.body.liczba_miejsc,
        godzina_otwarcia: req.body.godzina_otwarcia,
        godzina_zamkniecia: req.body.godzina_zamkniecia,
        cena: req.body.cena,
        id_miejscowosc: req.body.id_miejscowosc,

        zwracam_czy_poprawnie_dodalem_atrakcje: czy_stworzono,
        //zwracam_czy_stworzonoBrakPodanejMiejscowosci: czy_stworzonoBrakPodanejMiejscowosci

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

    const zapytanie = await pgClient.query("SELECT a.id, a.nazwa, a.adres, a.liczba_miejsc, to_char(a.godzina_otwarcia,'HH:MM') as godzina_otwarcia, to_char(a.godzina_zamkniecia,'HH:MM') as godzina_zamkniecia, a.cena, m.nazwaMiejscowosc, a.wycofana FROM Atrakcja a, Miejscowosc m WHERE m.id=a.id_miejscowosc");
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
    const zapytanie = await pgClient.query("SELECT a.id, a.nazwa, a.adres, a.liczba_miejsc, to_char(a.godzina_otwarcia,'HH:MM') as godzina_otwarcia, to_char(a.godzina_zamkniecia,'HH:MM') as godzina_zamkniecia, a.cena FROM Atrakcja a, Miejscowosc m WHERE m.nazwamiejscowosc='"+miejscowosc+"' AND m.id=a.id_miejscowosc AND a.wycofana='Nie'")
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

app.post('/Uzytkownik/Panel_Uzytkownika/Zwroc_Tabele_Bilety', async (req, res) => {
    const login = req.body.login;

    const zapytanie = await pgClient.query("SELECT b.id, to_char(b.data,'YYYY-MM-DD') as data, a.nazwa, a.cena FROM Bilety b, Uzytkownik u, Atrakcja a WHERE u.login='" + login + "' AND u.id=b.id_uzytkownik AND a.id=b.id_atrakcja");
    //console.log(zapytanie);
    const tablica = zapytanie.rows;
    //console.log(tablica);

    res.send({
        daneBilet: tablica
    });

});

app.post('/Uzytkownik/Panel_Admina3', async (req, res) => {

    const id_m = req.body.id;
    const nazwa = req.body.nazwamiejscowosc;
    const kr = req.body.kraj;

    pgClient.query("UPDATE Miejscowosc SET nazwaMiejscowosc = $1, kraj = $2 WHERE id = $3",[nazwa,kr,id_m])
    .catch((error) => {
        console.log(error);
    });

    res.send({
        id: req.body.id,
        nazwaMiejscowosc: req.body.nazwamiejscowosc,
        kraj: req.body.kraj
    });

});


app.post('/Uzytkownik/Panel_Admina4', async (req, res) => {

    const id = req.body.id;
    const nazwa = req.body.nazwa;
    const adres = req.body.adres;
    const liczba_miejsc = req.body.liczba_miejsc;
    const godzina_otwarcia = req.body.godzina_otwarcia;
    const godzina_zamkniecia = req.body.godzina_zamkniecia;
    const cena = req.body.cena;
    const miejscowosc = req.body.nazwamiejscowosc;

    const countmiejsc = await pgClient.query("SELECT COUNT(nazwamiejscowosc) FROM Miejscowosc WHERE nazwaMiejscowosc='"+miejscowosc+"'");
    const wynik = countmiejsc.rows;

    if (wynik[0].count == 0) {
        pgClient.query("INSERT INTO Miejscowosc(nazwaMiejscowosc,kraj) VALUES ('"+miejscowosc+"','niezdefiniowany')");
    }
    const id_m = await pgClient.query("SELECT id FROM Miejscowosc WHERE nazwaMiejscowosc='" + miejscowosc + "'");
    //console.log(id_m.rows);
    const id_tab = id_m.rows;
    const id_miejscowosc = id_tab[0].id;

    pgClient.query("UPDATE Atrakcja SET nazwa = $1, adres = $2, liczba_miejsc = $3, godzina_otwarcia = $4, godzina_zamkniecia = $5, cena = $6, id_miejscowosc = $7 WHERE id = $8",
        [nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc, id])
        .catch((error) => {
            console.log(error);
        }
    );

    res.send({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        liczba_miejsc: req.body.liczba_miejsc,
        godzina_otwarcia: req.body.godzina_otwarcia,
        godzina_zamkniecia: req.body.godzina_zamkniecia,
        cena: req.body.cena,
        id_miejscowosc: id_miejscowosc,

        //zwracam_czy_poprawnie_dodalem_atrakcje: czy_stworzono,
        //zwracam_czy_stworzonoBrakPodanejMiejscowosci: czy_stworzonoBrakPodanejMiejscowosci

    });

});

app.post('/Uzytkownik/Rezerwacja', async (req, res) => {

    const idAtrakcja = req.body.idAtrakcja;
    const dzien = req.body.dzien;
    const uzytkownik = req.body.uzytkownik;
    //console.log(idAtrakcja+" "+dzien+" "+uzytkownik);
    let zarezerwowano = false;

    const zapytanie = await pgClient.query("SELECT COUNT(d.data) FROM Dostepnosc d, Atrakcja a WHERE d.data='" + dzien + "' AND d.id_atrakcja='" + idAtrakcja + "' AND d.id_atrakcja=a.id");
    //console.log(zapytanie.rows);
    const tablica = zapytanie.rows;
    //console.log(tablica[0].count);

    if (tablica[0].count == 0) {
        const il_m = await pgClient.query("SELECT liczba_miejsc FROM Atrakcja WHERE id='" + idAtrakcja + "'");
        //console.log(il_m.rows);
        const il_tab = il_m.rows;
        const wm = il_tab[0].liczba_miejsc;

        pgClient.query('INSERT INTO Dostepnosc(data, wolne_miejsca, id_atrakcja) VALUES($1,$2,$3)', [dzien,wm,idAtrakcja])
            .catch((error) => {
                console.log(error);
        });
    }

    const lm = await pgClient.query("SELECT wolne_miejsca FROM Dostepnosc WHERE id_atrakcja='" + idAtrakcja + "' AND data='" + dzien + "'");
    //console.log(lm.rows);
    const lm_tab = lm.rows;
    const wolneMiejsca = lm_tab[0].wolne_miejsca;

    if(wolneMiejsca > 0) {
        const id = await pgClient.query("SELECT id FROM Uzytkownik WHERE login='" + uzytkownik + "'");
        //console.log(id.rows);
        const id_tab = id.rows;
        const idUzytkownik = id_tab[0].id;

        pgClient.query('INSERT INTO Bilety(data, id_atrakcja, id_uzytkownik) VALUES($1,$2,$3)', [dzien,idAtrakcja,idUzytkownik])
            .catch((error) => {
                console.log(error);
        });

        const wolneMiejsca2 = wolneMiejsca - 1;
        pgClient.query("UPDATE Dostepnosc SET wolne_miejsca = '" + wolneMiejsca2 +"' WHERE id_atrakcja='" + idAtrakcja + "' AND data='" + dzien + "'")
            .catch((error) => {
                console.log(error);
        });
        zarezerwowano = true;
    }

    res.send({
        idAtrakcja: req.body.idAtrakcja,
        dzien: req.body.dzien,
        uzytkownik: req.body.uzytkownik,
        czy_zarezerwowano: zarezerwowano
    });

});

app.post('/Uzytkownik/Anulowanie', async (req, res) => {

    const idBilet = req.body.idBilet;

    const id_a = await pgClient.query("SELECT id_atrakcja, data FROM Bilety WHERE id='" + idBilet + "'");
    //console.log(id_d.rows);
    const id_a_tab = id_a.rows;
    const idAtr = id_a_tab[0].id_atrakcja;
    const dz = id_a_tab[0].data;

    pgClient.query("DELETE FROM Bilety WHERE id='" + idBilet + "'")
        .catch((error) => {
            console.log(error);
    });

    const lm = await pgClient.query("SELECT wolne_miejsca FROM Dostepnosc WHERE id_atrakcja='" + idAtr + "' AND data='" + dz + "'");
    //console.log(id_d.rows);
    const lm_tab = lm.rows;
    const wolneMiejsca = lm_tab[0].wolne_miejsca + 1;

    pgClient.query("UPDATE Dostepnosc SET wolne_miejsca = '" + wolneMiejsca + "' WHERE id_atrakcja='" + idAtr + "' AND data='" + dz + "'")
        .catch((error) => {
            console.log(error);
    });

    res.send({
        usunieto: 'true',
        wolneMiejsca: wolneMiejsca
    });

});

app.post('/Uzytkownik/Wycofanie', async (req, res) => {

    const idAtrakcja = req.body.idAtrakcja;

    pgClient.query("UPDATE Atrakcja SET wycofana = 'Tak' WHERE id='" + idAtrakcja + "'")
        .catch((error) => {
            console.log(error);
    });

    res.send({
        wycofano: 'true'
    });

});

app.post('/ZwrocIdAtrakcji', async (req, res) => {

    const nazwa = req.body.nazwaAtrakcji;

    const id = await pgClient.query("SELECT id FROM Atrakcja WHERE nazwa='" + nazwa + "'");
    const id_tab = id.rows;
    const idAtr = id_tab[0].id;

    res.send({
        id: idAtr,
        nazwa: nazwa
    });

});

app.post('/ZwrocAtrakcje', async (req, res) => {

    const id = req.body.id;

    const result = await pgClient.query("SELECT * FROM Atrakcja WHERE id='" + id + "'");
    const tab = result.rows;
    const atrakcja = tab[0];

    res.send({
        atrakcja: atrakcja
    });

});


app.listen(5000, error => {
    console.log('Listening on port 5000');
});
