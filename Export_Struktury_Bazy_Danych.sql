--
-- PostgreSQL database dump (no data)
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

