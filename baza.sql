
--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1 (Debian 11.1-1.pgdg90+1)
-- Dumped by pg_dump version 11.1 (Debian 11.1-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: atrakcja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.atrakcja (
    id integer NOT NULL,
    nazwa character varying(255),
    adres character varying(255),
    liczba_miejsc integer,
    godzina_otwarcia time without time zone,
    godzina_zamkniecia time without time zone,
    cena numeric(5,2),
    id_miejscowosc integer,
    wycofana character varying(255)
);


ALTER TABLE public.atrakcja OWNER TO postgres;

--
-- Name: atrakcja_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.atrakcja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.atrakcja_id_seq OWNER TO postgres;

--
-- Name: atrakcja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.atrakcja_id_seq OWNED BY public.atrakcja.id;


--
-- Name: bilety; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bilety (
    id integer NOT NULL,
    data date,
    id_atrakcja integer,
    id_uzytkownik integer
);


ALTER TABLE public.bilety OWNER TO postgres;

--
-- Name: bilety_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bilety_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bilety_id_seq OWNER TO postgres;

--
-- Name: bilety_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bilety_id_seq OWNED BY public.bilety.id;


--
-- Name: dostepnosc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dostepnosc (
    id integer NOT NULL,
    data date,
    wolne_miejsca integer,
    id_atrakcja integer
);


ALTER TABLE public.dostepnosc OWNER TO postgres;

--
-- Name: dostepnosc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dostepnosc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dostepnosc_id_seq OWNER TO postgres;

--
-- Name: dostepnosc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dostepnosc_id_seq OWNED BY public.dostepnosc.id;


--
-- Name: miejscowosc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.miejscowosc (
    id integer NOT NULL,
    nazwamiejscowosc character varying(255),
    kraj character varying(255)
);


ALTER TABLE public.miejscowosc OWNER TO postgres;

--
-- Name: miejscowosc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.miejscowosc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.miejscowosc_id_seq OWNER TO postgres;

--
-- Name: miejscowosc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.miejscowosc_id_seq OWNED BY public.miejscowosc.id;


--
-- Name: uzytkownik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uzytkownik (
    id integer NOT NULL,
    imie character varying(255),
    nazwisko character varying(255),
    login character varying(255),
    haslo character varying(255),
    stan character varying(255)
);


ALTER TABLE public.uzytkownik OWNER TO postgres;

--
-- Name: uzytkownik_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uzytkownik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uzytkownik_id_seq OWNER TO postgres;

--
-- Name: uzytkownik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uzytkownik_id_seq OWNED BY public.uzytkownik.id;


--
-- Name: atrakcja id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atrakcja ALTER COLUMN id SET DEFAULT nextval('public.atrakcja_id_seq'::regclass);


--
-- Name: bilety id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilety ALTER COLUMN id SET DEFAULT nextval('public.bilety_id_seq'::regclass);


--
-- Name: dostepnosc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dostepnosc ALTER COLUMN id SET DEFAULT nextval('public.dostepnosc_id_seq'::regclass);


--
-- Name: miejscowosc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miejscowosc ALTER COLUMN id SET DEFAULT nextval('public.miejscowosc_id_seq'::regclass);


--
-- Name: uzytkownik id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownik ALTER COLUMN id SET DEFAULT nextval('public.uzytkownik_id_seq'::regclass);


--
-- Data for Name: atrakcja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.atrakcja (id, nazwa, adres, liczba_miejsc, godzina_otwarcia, godzina_zamkniecia, cena, id_miejscowosc, wycofana) FROM stdin;
7	Stare Miasto	ul. Świętojańska	35	08:00:00	17:00:00	24.00	1	Nie
6	Zamek na Wawelu	ul. Podzamcze 	45	06:00:00	21:00:00	60.00	3	Nie
5	Kościół Mariacki	plac Mariacki	7	07:00:00	10:00:00	40.00	3	Nie
4	Muzeum Zamkowe	ul. Starościńska	2	10:00:00	17:00:00	35.00	4	Nie
2	Stok narciarski	ul. Ludwika Pasteura	20	10:00:00	19:00:00	30.00	2	Nie
3	Park Narodowy „Ujście Warty”	ul. Górzyca	5	10:00:00	17:00:00	5.00	6	Nie
1	Żywe Muzeum Piernika	ul. Rabiańska	10	10:00:00	20:00:00	20.00	5	Tak
\.


--
-- Data for Name: bilety; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bilety (id, data, id_atrakcja, id_uzytkownik) FROM stdin;
6	2019-01-09	1	2
9	2019-01-09	1	2
10	2019-01-09	1	2
11	2019-01-09	1	2
12	2019-01-09	1	2
13	2019-01-10	1	2
14	2019-01-10	1	2
16	2019-01-12	1	2
17	2019-02-01	1	2
19	2019-01-10	1	2
20	2019-01-10	1	2
21	2019-01-10	1	2
22	2019-01-10	1	2
23	2019-01-10	1	2
24	2019-01-10	1	2
26	2019-01-10	2	2
27	2019-01-10	2	3
28	2019-01-19	7	2
29	2019-02-01	7	2
30	2019-01-11	2	2
31	2019-01-11	7	2
32	2019-01-11	7	2
33	2019-01-11	7	2
34	2019-01-11	7	2
35	2019-01-11	7	2
36	2019-01-11	7	2
37	2019-01-11	7	2
38	2019-01-11	7	2
39	2019-01-11	7	2
40	2019-01-11	7	2
41	2019-01-11	7	2
42	2019-01-11	7	2
\.


--
-- Data for Name: dostepnosc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dostepnosc (id, data, wolne_miejsca, id_atrakcja) FROM stdin;
1	2019-01-17	8	1
2	2019-01-09	0	1
4	2019-01-12	9	1
5	2019-02-01	9	1
3	2019-01-10	0	1
6	2019-01-11	9	1
7	2019-01-10	18	2
8	2019-01-19	34	7
9	2019-02-01	34	7
10	2019-01-11	19	2
11	2019-01-11	23	7
12	2019-01-11	0	4
13	2019-01-12	1	4
\.


--
-- Data for Name: miejscowosc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.miejscowosc (id, nazwamiejscowosc, kraj) FROM stdin;
1	Warszawa	Polska
2	Przemyśl	Polska
3	Kraków	Polska
4	Malbork	Polska
5	Toruń	Polska
6	Chyrzyno	Polska
\.


--
-- Data for Name: uzytkownik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uzytkownik (id, imie, nazwisko, login, haslo, stan) FROM stdin;
1	admin	admin	admin	admin	Admin
2	user	user	user	user	User
3	user2	user2	user2	user2	User
4	user3	user3	user3	user3	User
\.


--
-- Name: atrakcja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.atrakcja_id_seq', 7, true);


--
-- Name: bilety_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bilety_id_seq', 45, true);


--
-- Name: dostepnosc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dostepnosc_id_seq', 13, true);


--
-- Name: miejscowosc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.miejscowosc_id_seq', 6, true);


--
-- Name: uzytkownik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uzytkownik_id_seq', 5, true);


--
-- Name: atrakcja atrakcja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.atrakcja
    ADD CONSTRAINT atrakcja_pkey PRIMARY KEY (id);


--
-- Name: bilety bilety_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bilety
    ADD CONSTRAINT bilety_pkey PRIMARY KEY (id);


--
-- Name: dostepnosc dostepnosc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dostepnosc
    ADD CONSTRAINT dostepnosc_pkey PRIMARY KEY (id);


--
-- Name: miejscowosc miejscowosc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.miejscowosc
    ADD CONSTRAINT miejscowosc_pkey PRIMARY KEY (id);


--
-- Name: uzytkownik uzytkownik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uzytkownik
    ADD CONSTRAINT uzytkownik_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

