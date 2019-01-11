--
-- PostgreSQL database data
--

--
-- Data for Name: atrakcja; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.atrakcja (id, nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc, wycofana) VALUES 
(7,	'Stare Miasto',	'ul. Świętojańska',	35,	'08:00:00',	'17:00:00',	24.00,	1,	'Nie'),
(6,	'Zamek na Wawelu',	'ul. Podzamcze', 	45,	'06:00:00',	'21:00:00',	60.00,	3,	'Nie'),
(5,	'Kościół Mariacki',	'plac Mariacki',	7,	'07:00:00',	'10:00:00',	40.00,	3,	'Nie'),
(4,	'Muzeum Zamkowe',	'ul. Starościńska',	2,	'10:00:00',	'17:00:00',	35.00,	4,	'Nie'),
(2,	'Stok narciarski',	'ul. Ludwika Pasteura',	20,	'10:00:00',	'19:00:00',	30.00,	2,	'Nie'),
(3,	'Park Narodowy „Ujście Warty”',	'ul. Górzyca',	5,	'10:00:00',	'17:00:00',	5.00,	6,	'Nie'),
(1,	'Żywe Muzeum Piernika',	'ul. Rabiańska',	10,	'10:00:00',	'20:00:00',	20.00,	5,	'Tak');



--
-- Data for Name: bilety; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.bilety (id, data, id_atrakcja, id_uzytkownik) VALUES 
(6,	'2019-01-09',	1,	2),
(9,	'2019-01-09',	1,	2),
(10,	'2019-01-09',	1,	2),
(11,	'2019-01-09',	1,	2),
(12,	'2019-01-09',	1,	2),
(13,	'2019-01-10',	1,	2),
(14,	'2019-01-10',	1,	2),
(16,	'2019-01-12',	1,	2),
(17,	'2019-02-01',	1,	2),
(19,	'2019-01-10',	1,	2),
(20,    '2019-01-10',	1,	2),
(21,	'2019-01-10',	1,	2),
(22,	'2019-01-10',	1,	2),
(23,	'2019-01-10',	1,	2),
(24,	'2019-01-10',	1,	2),
(26,	'2019-01-10',	2,	2),
(27,	'2019-01-10',	2,	3),
(28,	'2019-01-19',	7,	2),
(29,	'2019-02-01',	7,	2),
(30,	'2019-01-11',	2,	2),
(31,	'2019-01-11',	7,	2),
(32,	'2019-01-11',	7,	2),
(33,	'2019-01-11',	7,	2),
(34,	'2019-01-11',	7,	2),
(35,	'2019-01-11',	7,	2),
(36,	'2019-01-11',	7,	2),
(37,	'2019-01-11',	7,	2),
(38,	'2019-01-11',	7,	2),
(39,	'2019-01-11',	7,	2),
(40,	'2019-01-11',	7,	2),
(41,	'2019-01-11',	7,	2),
(42,	'2019-01-11',	7,	2);



--
-- Data for Name: dostepnosc; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dostepnosc (id, data, wolne_miejsca, id_atrakcja) VALUES 
(1,	'2019-01-17',	8,	1),
(2,	'2019-01-09',	0,	1),
(4,	'2019-01-12',	9,	1),
(5,	'2019-02-01',	9,	1),
(3,	'2019-01-10',	0,	1),
(6,	'2019-01-11',	9,	1),
(7,	'2019-01-10',	18,	2),
(8,	'2019-01-19',	34,	7),
(9,	'2019-02-01',	34,	7),
(10,	'2019-01-11',	19,	2),
(11,	'2019-01-11',	23,	7),
(12,	'2019-01-11',	0,	4),
(13,	'2019-01-12',	1,	4);



--
-- Data for Name: miejscowosc; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.miejscowosc (id, nazwamiejscowosc, kraj) VALUES
(1,	'Warszawa',	'Polska'),
(2,	'Przemyśl',	'Polska'),
(3,	'Kraków',	'Polska'),
(4,	'Malbork',	'Polska'),
(5,	'Toruń',	'Polska'),
(6,	'Chyrzyno',	'Polska');



--
-- Data for Name: uzytkownik; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.uzytkownik (id, imie, nazwisko, login, haslo, stan) VALUES
(1,	'admin',	'admin',	'admin',	'admin',	'Admin'),
(2,	'user',	    'user',	    'user',	    'user',	    'User'),
(3,	'user2',	'user2',	'user2',	'user2',	'User'),
(4,	'user3',	'user3',	'user3',	'user3',	'User');

