--
-- PostgreSQL database dump
--

\restrict Ew88jSIUnUw4mcfpZY24xoGC5LHV1S05f99Apvt0ewMvpQqLIKlNoSFAhUOgL4g

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: alquileres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alquileres (
    id integer NOT NULL,
    apero_id integer NOT NULL,
    socio_id integer NOT NULL,
    trabajador_id integer NOT NULL,
    fecha_inicio timestamp without time zone NOT NULL,
    fecha_fin timestamp without time zone NOT NULL,
    precio_total double precision,
    estado character varying(20),
    observaciones character varying(300),
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.alquileres OWNER TO postgres;

--
-- Name: alquileres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alquileres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alquileres_id_seq OWNER TO postgres;

--
-- Name: alquileres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alquileres_id_seq OWNED BY public.alquileres.id;


--
-- Name: anotaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anotaciones (
    id integer NOT NULL,
    parcela_id integer NOT NULL,
    usuario_id integer NOT NULL,
    texto character varying(1000) NOT NULL,
    foto_url character varying(500),
    lat double precision,
    lon double precision,
    synced boolean,
    device_ts timestamp without time zone,
    uuid character varying(36),
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.anotaciones OWNER TO postgres;

--
-- Name: anotaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anotaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.anotaciones_id_seq OWNER TO postgres;

--
-- Name: anotaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anotaciones_id_seq OWNED BY public.anotaciones.id;


--
-- Name: aperos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aperos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    tipo character varying(50) NOT NULL,
    descripcion character varying(300),
    precio_dia double precision NOT NULL,
    disponible boolean,
    imagen_url character varying(500)
);


ALTER TABLE public.aperos OWNER TO postgres;

--
-- Name: aperos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aperos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aperos_id_seq OWNER TO postgres;

--
-- Name: aperos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aperos_id_seq OWNED BY public.aperos.id;


--
-- Name: aportaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aportaciones (
    id integer NOT NULL,
    socio_id integer NOT NULL,
    trabajador_id integer NOT NULL,
    producto character varying(100) NOT NULL,
    kg double precision NOT NULL,
    precio_kg double precision,
    total double precision,
    fecha timestamp without time zone DEFAULT now(),
    notas character varying(300)
);


ALTER TABLE public.aportaciones OWNER TO postgres;

--
-- Name: aportaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aportaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aportaciones_id_seq OWNER TO postgres;

--
-- Name: aportaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aportaciones_id_seq OWNED BY public.aportaciones.id;


--
-- Name: fichajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fichajes (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    tipo character varying(10) NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now(),
    lat double precision,
    lon double precision,
    notas character varying(200)
);


ALTER TABLE public.fichajes OWNER TO postgres;

--
-- Name: fichajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fichajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fichajes_id_seq OWNER TO postgres;

--
-- Name: fichajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fichajes_id_seq OWNED BY public.fichajes.id;


--
-- Name: lecturas_sensor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lecturas_sensor (
    id integer NOT NULL,
    device_id character varying(50) NOT NULL,
    "timestamp" bigint NOT NULL,
    temp_aire double precision,
    hum_aire double precision,
    hum_suelo double precision,
    temp_suelo double precision,
    luz_lux double precision,
    lluvia_raw integer,
    nivel_agua_cm double precision,
    ph_suelo double precision
);


ALTER TABLE public.lecturas_sensor OWNER TO postgres;

--
-- Name: lecturas_sensor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lecturas_sensor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lecturas_sensor_id_seq OWNER TO postgres;

--
-- Name: lecturas_sensor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lecturas_sensor_id_seq OWNED BY public.lecturas_sensor.id;


--
-- Name: lineas_venta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lineas_venta (
    id integer NOT NULL,
    venta_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL,
    precio_ud double precision NOT NULL,
    subtotal double precision NOT NULL
);


ALTER TABLE public.lineas_venta OWNER TO postgres;

--
-- Name: lineas_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lineas_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lineas_venta_id_seq OWNER TO postgres;

--
-- Name: lineas_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lineas_venta_id_seq OWNED BY public.lineas_venta.id;


--
-- Name: mensajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes (
    id integer NOT NULL,
    de_id integer NOT NULL,
    para_id integer NOT NULL,
    texto character varying(1000) NOT NULL,
    foto_url character varying(500),
    leido boolean,
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.mensajes OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_id_seq OWNER TO postgres;

--
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;


--
-- Name: parcelas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parcelas (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    superficie_ha double precision NOT NULL,
    cultivo character varying(100) NOT NULL,
    municipio character varying(100),
    provincia character varying(100),
    descripcion text,
    geojson text,
    agricultor_id integer,
    lat double precision,
    lon double precision
);


ALTER TABLE public.parcelas OWNER TO postgres;

--
-- Name: parcelas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parcelas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parcelas_id_seq OWNER TO postgres;

--
-- Name: parcelas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parcelas_id_seq OWNED BY public.parcelas.id;


--
-- Name: planes_accion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planes_accion (
    id integer NOT NULL,
    socio_id integer NOT NULL,
    ingeniero_id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    descripcion text NOT NULL,
    estado character varying(20),
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.planes_accion OWNER TO postgres;

--
-- Name: planes_accion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planes_accion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.planes_accion_id_seq OWNER TO postgres;

--
-- Name: planes_accion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.planes_accion_id_seq OWNED BY public.planes_accion.id;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre_es character varying(200) NOT NULL,
    nombre_en character varying(200) NOT NULL,
    descripcion_es text NOT NULL,
    descripcion_en text NOT NULL,
    precio double precision NOT NULL,
    unidad character varying(20),
    categoria character varying(50) NOT NULL,
    stock integer,
    stock_minimo integer,
    imagen_url character varying(500),
    destacado boolean,
    origen character varying(100),
    certificado character varying(100),
    activo boolean
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_id_seq OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50) NOT NULL,
    activo boolean,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: ventas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ventas (
    id integer NOT NULL,
    socio_id integer,
    trabajador_id integer NOT NULL,
    fecha timestamp without time zone DEFAULT now(),
    total double precision NOT NULL,
    ticket_pdf_url character varying(500)
);


ALTER TABLE public.ventas OWNER TO postgres;

--
-- Name: ventas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ventas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ventas_id_seq OWNER TO postgres;

--
-- Name: ventas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ventas_id_seq OWNED BY public.ventas.id;


--
-- Name: alquileres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alquileres ALTER COLUMN id SET DEFAULT nextval('public.alquileres_id_seq'::regclass);


--
-- Name: anotaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anotaciones ALTER COLUMN id SET DEFAULT nextval('public.anotaciones_id_seq'::regclass);


--
-- Name: aperos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aperos ALTER COLUMN id SET DEFAULT nextval('public.aperos_id_seq'::regclass);


--
-- Name: aportaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aportaciones ALTER COLUMN id SET DEFAULT nextval('public.aportaciones_id_seq'::regclass);


--
-- Name: fichajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fichajes ALTER COLUMN id SET DEFAULT nextval('public.fichajes_id_seq'::regclass);


--
-- Name: lecturas_sensor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecturas_sensor ALTER COLUMN id SET DEFAULT nextval('public.lecturas_sensor_id_seq'::regclass);


--
-- Name: lineas_venta id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas_venta ALTER COLUMN id SET DEFAULT nextval('public.lineas_venta_id_seq'::regclass);


--
-- Name: mensajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- Name: parcelas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas ALTER COLUMN id SET DEFAULT nextval('public.parcelas_id_seq'::regclass);


--
-- Name: planes_accion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_accion ALTER COLUMN id SET DEFAULT nextval('public.planes_accion_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Name: ventas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas ALTER COLUMN id SET DEFAULT nextval('public.ventas_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
afdca0d5d6e0
\.


--
-- Data for Name: alquileres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alquileres (id, apero_id, socio_id, trabajador_id, fecha_inicio, fecha_fin, precio_total, estado, observaciones, creado_en) FROM stdin;
\.


--
-- Data for Name: anotaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.anotaciones (id, parcela_id, usuario_id, texto, foto_url, lat, lon, synced, device_ts, uuid, creado_en) FROM stdin;
\.


--
-- Data for Name: aperos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aperos (id, nombre, tipo, descripcion, precio_dia, disponible, imagen_url) FROM stdin;
\.


--
-- Data for Name: aportaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aportaciones (id, socio_id, trabajador_id, producto, kg, precio_kg, total, fecha, notas) FROM stdin;
1	5	3	Almendras Marcona	850	2.8	2380	2026-02-26 12:40:45.056959	Primera entrega temporada 2025
2	5	3	Almendras Marcona	620	2.8	1736	2026-02-18 12:40:45.057205	Segunda entrega temporada 2025
3	7	3	Aceite Blanqueta	1200	0.45	540	2026-01-17 12:40:45.117269	Entrega almazara octubre 2025
4	8	3	Almendras Largueta	950	2.5	2375	2026-01-27 12:40:45.203908	Cosecha 2025
5	9	3	Uva Monastrell	2100	0.65	1365	2026-01-20 12:40:45.257288	Vendimia septiembre 2025
6	10	3	Almendras Guara	1450	2.6	3770	2026-01-19 12:40:45.318186	Temporada 2025
7	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-03-29 12:40:45.395661	Producción ecológica certificada
8	12	3	Naranjas Navel	3200	0.35	1120	2026-02-02 12:40:45.458808	Primera recogida diciembre 2025
9	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-01-17 12:40:45.537833	Cosecha parcela El Tossal
10	14	3	Garrofas	1800	0.4	720	2026-02-11 12:40:45.616999	Entrega cooperativa 2025
11	15	3	Verduras variadas	450	1.2	540	2026-02-28 12:40:45.707554	Huerta temporada otoño
12	5	3	Almendras Marcona	850	2.8	2380	2026-03-21 12:50:28.923708	Primera entrega temporada 2025
13	5	3	Almendras Marcona	620	2.8	1736	2026-03-29 12:50:28.924114	Segunda entrega temporada 2025
14	7	3	Aceite Blanqueta	1200	0.45	540	2026-01-19 12:50:29.005586	Entrega almazara octubre 2025
15	8	3	Almendras Largueta	950	2.5	2375	2026-03-24 12:50:29.084832	Cosecha 2025
16	9	3	Uva Monastrell	2100	0.65	1365	2026-03-19 12:50:29.17193	Vendimia septiembre 2025
17	10	3	Almendras Guara	1450	2.6	3770	2026-02-02 12:50:29.243658	Temporada 2025
18	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-04-04 12:50:29.332445	Producción ecológica certificada
19	12	3	Naranjas Navel	3200	0.35	1120	2026-04-12 12:50:29.413184	Primera recogida diciembre 2025
20	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-02-22 12:50:29.482288	Cosecha parcela El Tossal
21	14	3	Garrofas	1800	0.4	720	2026-01-24 12:50:29.570401	Entrega cooperativa 2025
22	15	3	Verduras variadas	450	1.2	540	2026-03-07 12:50:29.641432	Huerta temporada otoño
23	5	3	Almendras Marcona	850	2.8	2380	2026-02-27 10:34:26.10388	Primera entrega temporada 2025
24	5	3	Almendras Marcona	620	2.8	1736	2026-01-23 10:34:26.104209	Segunda entrega temporada 2025
25	7	3	Aceite Blanqueta	1200	0.45	540	2026-01-17 10:34:26.183024	Entrega almazara octubre 2025
26	8	3	Almendras Largueta	950	2.5	2375	2026-04-03 10:34:26.244378	Cosecha 2025
27	9	3	Uva Monastrell	2100	0.65	1365	2026-03-14 10:34:26.323548	Vendimia septiembre 2025
28	10	3	Almendras Guara	1450	2.6	3770	2026-03-03 10:34:26.404616	Temporada 2025
29	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-01-22 10:34:26.486848	Producción ecológica certificada
30	12	3	Naranjas Navel	3200	0.35	1120	2026-01-23 10:34:26.584003	Primera recogida diciembre 2025
31	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-02-28 10:34:26.664617	Cosecha parcela El Tossal
32	14	3	Garrofas	1800	0.4	720	2026-02-25 10:34:26.74271	Entrega cooperativa 2025
33	15	3	Verduras variadas	450	1.2	540	2026-02-08 10:34:26.803118	Huerta temporada otoño
34	5	3	Almendras Marcona	850	2.8	2380	2026-03-16 10:37:49.574817	Primera entrega temporada 2025
35	5	3	Almendras Marcona	620	2.8	1736	2026-03-27 10:37:49.575013	Segunda entrega temporada 2025
36	7	3	Aceite Blanqueta	1200	0.45	540	2026-02-21 10:37:49.650772	Entrega almazara octubre 2025
37	8	3	Almendras Largueta	950	2.5	2375	2026-02-21 10:37:49.721222	Cosecha 2025
38	9	3	Uva Monastrell	2100	0.65	1365	2026-03-07 10:37:49.793271	Vendimia septiembre 2025
39	10	3	Almendras Guara	1450	2.6	3770	2026-02-24 10:37:49.875159	Temporada 2025
40	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-03-18 10:37:49.941685	Producción ecológica certificada
41	12	3	Naranjas Navel	3200	0.35	1120	2026-03-15 10:37:50.023803	Primera recogida diciembre 2025
42	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-02-10 10:37:50.094169	Cosecha parcela El Tossal
43	14	3	Garrofas	1800	0.4	720	2026-04-13 10:37:50.156545	Entrega cooperativa 2025
44	15	3	Verduras variadas	450	1.2	540	2026-03-08 10:37:50.243081	Huerta temporada otoño
45	5	3	Almendras Marcona	850	2.8	2380	2026-03-25 10:41:18.597682	Primera entrega temporada 2025
46	5	3	Almendras Marcona	620	2.8	1736	2026-03-17 10:41:18.597941	Segunda entrega temporada 2025
47	7	3	Aceite Blanqueta	1200	0.45	540	2026-02-28 10:41:18.682793	Entrega almazara octubre 2025
48	8	3	Almendras Largueta	950	2.5	2375	2026-01-23 10:41:18.765426	Cosecha 2025
49	9	3	Uva Monastrell	2100	0.65	1365	2026-04-12 10:41:18.834939	Vendimia septiembre 2025
50	10	3	Almendras Guara	1450	2.6	3770	2026-01-23 10:41:18.917273	Temporada 2025
51	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-03-24 10:41:18.994511	Producción ecológica certificada
52	12	3	Naranjas Navel	3200	0.35	1120	2026-01-31 10:41:19.064369	Primera recogida diciembre 2025
53	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-21 10:41:19.134479	Cosecha parcela El Tossal
54	14	3	Garrofas	1800	0.4	720	2026-04-04 10:41:19.194509	Entrega cooperativa 2025
55	15	3	Verduras variadas	450	1.2	540	2026-04-15 10:41:19.282078	Huerta temporada otoño
56	5	3	Almendras Marcona	850	2.8	2380	2026-04-01 10:45:43.328812	Primera entrega temporada 2025
57	5	3	Almendras Marcona	620	2.8	1736	2026-02-28 10:45:43.329052	Segunda entrega temporada 2025
58	7	3	Aceite Blanqueta	1200	0.45	540	2026-03-31 10:45:43.418496	Entrega almazara octubre 2025
59	8	3	Almendras Largueta	950	2.5	2375	2026-03-28 10:45:43.480334	Cosecha 2025
60	9	3	Uva Monastrell	2100	0.65	1365	2026-03-26 10:45:43.560408	Vendimia septiembre 2025
61	10	3	Almendras Guara	1450	2.6	3770	2026-02-25 10:45:43.62811	Temporada 2025
62	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-03-12 10:45:43.714271	Producción ecológica certificada
63	12	3	Naranjas Navel	3200	0.35	1120	2026-04-13 10:45:43.79708	Primera recogida diciembre 2025
64	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-04 10:45:43.861285	Cosecha parcela El Tossal
65	14	3	Garrofas	1800	0.4	720	2026-03-26 10:45:43.921031	Entrega cooperativa 2025
66	15	3	Verduras variadas	450	1.2	540	2026-04-02 10:45:43.980811	Huerta temporada otoño
67	5	3	Almendras Marcona	850	2.8	2380	2026-03-30 10:49:34.71133	Primera entrega temporada 2025
68	5	3	Almendras Marcona	620	2.8	1736	2026-02-05 10:49:34.711561	Segunda entrega temporada 2025
69	7	3	Aceite Blanqueta	1200	0.45	540	2026-02-04 10:49:34.792053	Entrega almazara octubre 2025
70	8	3	Almendras Largueta	950	2.5	2375	2026-03-30 10:49:34.879631	Cosecha 2025
71	9	3	Uva Monastrell	2100	0.65	1365	2026-01-18 10:49:34.954126	Vendimia septiembre 2025
72	10	3	Almendras Guara	1450	2.6	3770	2026-04-09 10:49:35.035983	Temporada 2025
73	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-04-05 10:49:35.113411	Producción ecológica certificada
74	12	3	Naranjas Navel	3200	0.35	1120	2026-04-06 10:49:35.195516	Primera recogida diciembre 2025
75	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-08 10:49:35.271241	Cosecha parcela El Tossal
76	14	3	Garrofas	1800	0.4	720	2026-03-22 10:49:35.351994	Entrega cooperativa 2025
77	15	3	Verduras variadas	450	1.2	540	2026-03-02 10:49:35.432346	Huerta temporada otoño
78	5	3	Almendras Marcona	850	2.8	2380	2026-03-03 10:51:31.282036	Primera entrega temporada 2025
79	5	3	Almendras Marcona	620	2.8	1736	2026-02-19 10:51:31.282321	Segunda entrega temporada 2025
80	7	3	Aceite Blanqueta	1200	0.45	540	2026-04-14 10:51:31.354221	Entrega almazara octubre 2025
81	8	3	Almendras Largueta	950	2.5	2375	2026-02-09 10:51:31.431536	Cosecha 2025
82	9	3	Uva Monastrell	2100	0.65	1365	2026-03-18 10:51:31.522616	Vendimia septiembre 2025
83	10	3	Almendras Guara	1450	2.6	3770	2026-02-19 10:51:31.59498	Temporada 2025
84	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-01-29 10:51:31.672825	Producción ecológica certificada
85	12	3	Naranjas Navel	3200	0.35	1120	2026-02-17 10:51:31.760282	Primera recogida diciembre 2025
86	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-16 10:51:31.825098	Cosecha parcela El Tossal
87	14	3	Garrofas	1800	0.4	720	2026-04-06 10:51:31.911278	Entrega cooperativa 2025
88	15	3	Verduras variadas	450	1.2	540	2026-02-07 10:51:32.003418	Huerta temporada otoño
89	5	3	Almendras Marcona	850	2.8	2380	2026-02-05 10:55:18.591751	Primera entrega temporada 2025
90	5	3	Almendras Marcona	620	2.8	1736	2026-02-17 10:55:18.592103	Segunda entrega temporada 2025
91	7	3	Aceite Blanqueta	1200	0.45	540	2026-04-03 10:55:18.682422	Entrega almazara octubre 2025
92	8	3	Almendras Largueta	950	2.5	2375	2026-03-25 10:55:18.754968	Cosecha 2025
93	9	3	Uva Monastrell	2100	0.65	1365	2026-03-11 10:55:18.833539	Vendimia septiembre 2025
94	10	3	Almendras Guara	1450	2.6	3770	2026-04-04 10:55:18.914626	Temporada 2025
95	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-02-15 10:55:18.993585	Producción ecológica certificada
96	12	3	Naranjas Navel	3200	0.35	1120	2026-03-28 10:55:19.071014	Primera recogida diciembre 2025
97	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-02-01 10:55:19.151954	Cosecha parcela El Tossal
98	14	3	Garrofas	1800	0.4	720	2026-02-06 10:55:19.232089	Entrega cooperativa 2025
99	15	3	Verduras variadas	450	1.2	540	2026-01-21 10:55:19.313273	Huerta temporada otoño
100	5	3	Almendras Marcona	850	2.8	2380	2026-02-09 10:57:37.804743	Primera entrega temporada 2025
101	5	3	Almendras Marcona	620	2.8	1736	2026-02-21 10:57:37.804979	Segunda entrega temporada 2025
102	7	3	Aceite Blanqueta	1200	0.45	540	2026-04-09 10:57:37.893868	Entrega almazara octubre 2025
103	8	3	Almendras Largueta	950	2.5	2375	2026-04-04 10:57:38.06155	Cosecha 2025
104	9	3	Uva Monastrell	2100	0.65	1365	2026-01-29 10:57:38.258636	Vendimia septiembre 2025
105	10	3	Almendras Guara	1450	2.6	3770	2026-02-20 10:57:38.366472	Temporada 2025
106	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-02-04 10:57:38.443761	Producción ecológica certificada
107	12	3	Naranjas Navel	3200	0.35	1120	2026-01-23 10:57:38.531354	Primera recogida diciembre 2025
108	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-01-26 10:57:38.668523	Cosecha parcela El Tossal
109	14	3	Garrofas	1800	0.4	720	2026-04-16 10:57:38.750477	Entrega cooperativa 2025
110	15	3	Verduras variadas	450	1.2	540	2026-03-25 10:57:38.831599	Huerta temporada otoño
111	5	3	Almendras Marcona	850	2.8	2380	2026-03-25 12:26:36.88712	Primera entrega temporada 2025
112	5	3	Almendras Marcona	620	2.8	1736	2026-04-11 12:26:36.887255	Segunda entrega temporada 2025
113	7	3	Aceite Blanqueta	1200	0.45	540	2026-02-16 12:26:36.953208	Entrega almazara octubre 2025
114	8	3	Almendras Largueta	950	2.5	2375	2026-02-23 12:26:37.028451	Cosecha 2025
115	9	3	Uva Monastrell	2100	0.65	1365	2026-02-06 12:26:37.086722	Vendimia septiembre 2025
116	10	3	Almendras Guara	1450	2.6	3770	2026-03-06 12:26:37.167447	Temporada 2025
117	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-01-31 12:26:37.242717	Producción ecológica certificada
118	12	3	Naranjas Navel	3200	0.35	1120	2026-01-30 12:26:37.316951	Primera recogida diciembre 2025
119	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-10 12:26:37.398203	Cosecha parcela El Tossal
120	14	3	Garrofas	1800	0.4	720	2026-02-13 12:26:37.465414	Entrega cooperativa 2025
121	15	3	Verduras variadas	450	1.2	540	2026-04-12 12:26:37.554457	Huerta temporada otoño
122	5	3	Almendras Marcona	850	2.8	2380	2026-02-12 23:46:31.300563	Primera entrega temporada 2025
123	5	3	Almendras Marcona	620	2.8	1736	2026-03-13 23:46:31.300766	Segunda entrega temporada 2025
124	7	3	Aceite Blanqueta	1200	0.45	540	2026-03-28 23:46:31.37042	Entrega almazara octubre 2025
125	8	3	Almendras Largueta	950	2.5	2375	2026-04-23 23:46:31.431181	Cosecha 2025
126	9	3	Uva Monastrell	2100	0.65	1365	2026-03-02 23:46:31.490524	Vendimia septiembre 2025
127	10	3	Almendras Guara	1450	2.6	3770	2026-03-02 23:46:31.550775	Temporada 2025
128	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-03-13 23:46:31.610458	Producción ecológica certificada
129	12	3	Naranjas Navel	3200	0.35	1120	2026-02-07 23:46:31.673183	Primera recogida diciembre 2025
130	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-03-05 23:46:31.731543	Cosecha parcela El Tossal
131	14	3	Garrofas	1800	0.4	720	2026-03-21 23:46:31.791772	Entrega cooperativa 2025
132	15	3	Verduras variadas	450	1.2	540	2026-04-15 23:46:31.852567	Huerta temporada otoño
133	5	3	Almendras Marcona	850	2.8	2380	2026-03-26 22:53:54.654192	Primera entrega temporada 2025
134	5	3	Almendras Marcona	620	2.8	1736	2026-04-14 22:53:54.654339	Segunda entrega temporada 2025
135	7	3	Aceite Blanqueta	1200	0.45	540	2026-01-30 22:53:54.713934	Entrega almazara octubre 2025
136	8	3	Almendras Largueta	950	2.5	2375	2026-02-05 22:53:54.7749	Cosecha 2025
137	9	3	Uva Monastrell	2100	0.65	1365	2026-02-10 22:53:54.837145	Vendimia septiembre 2025
138	10	3	Almendras Guara	1450	2.6	3770	2026-02-12 22:53:54.895194	Temporada 2025
139	11	3	Aceite Ecológico	800	0.55	440.00000000000006	2026-01-25 22:53:54.95568	Producción ecológica certificada
140	12	3	Naranjas Navel	3200	0.35	1120	2026-02-24 22:53:55.014327	Primera recogida diciembre 2025
141	13	3	Almendras Marcona	720	2.8	2015.9999999999998	2026-02-19 22:53:55.074122	Cosecha parcela El Tossal
142	14	3	Garrofas	1800	0.4	720	2026-02-18 22:53:55.138125	Entrega cooperativa 2025
143	15	3	Verduras variadas	450	1.2	540	2026-04-01 22:53:55.204355	Huerta temporada otoño
\.


--
-- Data for Name: fichajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fichajes (id, usuario_id, tipo, "timestamp", lat, lon, notas) FROM stdin;
1	1	entrada	2026-04-23 10:16:31.932934	\N	\N	1
2	1	entrada	2026-04-25 20:12:06.907861	\N	\N	\N
3	1	salida	2026-04-25 20:12:13.353326	\N	\N	\N
\.


--
-- Data for Name: lecturas_sensor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lecturas_sensor (id, device_id, "timestamp", temp_aire, hum_aire, hum_suelo, temp_suelo, luz_lux, lluvia_raw, nivel_agua_cm, ph_suelo) FROM stdin;
\.


--
-- Data for Name: lineas_venta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lineas_venta (id, venta_id, producto_id, cantidad, precio_ud, subtotal) FROM stdin;
1	1	4	3	12	36
2	1	3	2	11.5	23
3	2	7	1	3.5	3.5
4	3	1	1	8.5	8.5
5	4	2	4	7.8	31.2
6	5	3	2	11.5	23
7	6	8	3	4.5	13.5
8	6	5	2	14	28
9	7	1	2	8.5	17
10	7	6	3	10	30
11	7	2	1	7.8	7.8
12	8	5	2	14	28
13	8	2	3	7.8	23.4
14	9	3	2	11.5	23
15	9	1	4	8.5	34
16	9	2	1	7.8	7.8
17	10	1	2	8.5	17
18	11	4	1	12	12
19	11	6	4	10	40
20	12	3	3	11.5	34.5
21	13	6	2	10	20
22	13	4	1	12	12
23	13	7	3	3.5	10.5
24	14	5	4	14	56
25	14	3	2	11.5	23
26	15	6	3	10	30
27	15	7	2	3.5	7
28	15	1	3	8.5	25.5
29	16	18	1	18.5	18.5
30	16	17	4	8	32
31	16	13	2	9	18
32	17	18	4	18.5	74
33	17	15	3	2.5	7.5
34	18	13	2	9	18
35	18	14	2	7.5	15
36	18	15	2	2.5	5
37	19	9	1	4	4
38	19	10	1	3.8	3.8
39	19	12	1	8.5	8.5
40	20	16	4	2	8
41	20	14	3	7.5	22.5
42	20	10	4	3.8	15.2
43	21	16	1	2	2
44	21	12	2	8.5	17
45	21	17	2	8	16
46	22	10	4	3.8	15.2
47	22	13	4	9	36
48	23	9	3	4	12
49	23	13	4	9	36
50	23	18	4	18.5	74
51	24	15	3	2.5	7.5
52	25	16	3	2	6
53	25	11	1	7.8	7.8
54	25	13	2	9	18
55	26	9	3	4	12
56	26	14	1	7.5	7.5
57	26	17	2	8	16
58	27	16	3	2	6
59	27	12	2	8.5	17
60	27	18	3	18.5	55.5
61	28	10	1	3.8	3.8
62	28	18	1	18.5	18.5
63	28	11	3	7.8	23.4
64	29	17	1	8	8
65	30	15	3	2.5	7.5
66	31	23	4	6.5	26
67	32	3	2	11.5	23
68	32	19	1	24	24
69	33	3	2	11.5	23
70	34	21	3	12	36
71	34	4	3	12	36
72	34	22	3	8.5	25.5
73	35	20	1	32	32
74	35	5	3	14	42
75	36	4	1	12	12
76	36	23	2	6.5	13
77	37	3	3	11.5	34.5
78	37	23	4	6.5	26
79	38	5	2	14	28
80	39	20	4	32	128
81	40	20	1	32	32
82	40	19	1	24	24
83	41	8	3	4.5	13.5
84	41	23	3	6.5	19.5
85	41	20	3	32	96
86	42	20	1	32	32
87	42	5	1	14	14
88	43	23	4	6.5	26
89	43	22	4	8.5	34
90	44	2	2	7.8	15.6
91	44	5	4	14	56
92	45	23	4	6.5	26
93	46	23	4	6.5	26
94	47	9	1	4	4
95	48	9	2	4	8
96	48	22	1	8.5	8.5
97	48	6	4	10	40
98	49	21	3	12	36
99	49	13	4	9	36
100	50	13	2	9	18
101	51	22	3	8.5	25.5
102	51	19	2	24	48
103	52	6	2	10	20
104	52	20	1	32	32
105	52	1	1	8.5	8.5
106	53	1	2	8.5	17
107	53	21	3	12	36
108	54	7	1	3.5	3.5
109	54	13	2	9	18
110	55	7	2	3.5	7
111	55	19	2	24	48
112	56	20	4	32	128
113	56	21	1	12	12
114	57	9	2	4	8
115	57	1	4	8.5	34
116	57	21	1	12	12
117	58	6	2	10	20
118	59	21	3	12	36
119	59	13	2	9	18
120	60	22	2	8.5	17
121	60	9	3	4	12
122	60	23	1	6.5	6.5
123	61	3	3	11.5	34.5
124	61	21	3	12	36
125	61	4	4	12	48
126	62	19	1	24	24
127	62	14	1	7.5	7.5
128	62	23	3	6.5	19.5
129	63	14	1	7.5	7.5
130	64	14	3	7.5	22.5
131	65	12	2	8.5	17
132	65	16	1	2	2
133	65	4	4	12	48
134	66	21	3	12	36
135	67	3	2	11.5	23
136	67	12	3	8.5	25.5
137	68	4	1	12	12
138	69	3	1	11.5	11.5
139	70	23	4	6.5	26
140	71	21	3	12	36
141	72	3	1	11.5	11.5
142	73	23	2	6.5	13
143	73	12	4	8.5	34
144	73	14	1	7.5	7.5
145	74	4	2	12	24
146	74	3	4	11.5	46
147	74	20	2	32	64
148	75	12	4	8.5	34
149	75	3	3	11.5	34.5
150	75	14	4	7.5	30
151	76	19	2	24	48
152	76	21	2	12	24
153	76	2	1	7.8	7.8
154	77	21	3	12	36
155	78	8	3	4.5	13.5
156	79	21	3	12	36
157	79	2	1	7.8	7.8
158	79	8	3	4.5	13.5
159	80	23	1	6.5	6.5
160	80	22	2	8.5	17
161	81	2	3	7.8	23.4
162	82	19	4	24	96
163	83	7	1	3.5	3.5
164	83	20	1	32	32
165	84	20	2	32	64
166	85	8	1	4.5	4.5
167	86	16	4	2	8
168	87	21	3	12	36
169	87	5	1	14	14
170	88	20	2	32	64
171	88	23	3	6.5	19.5
172	89	23	2	6.5	13
173	89	21	3	12	36
174	90	2	1	7.8	7.8
175	90	7	2	3.5	7
176	90	22	1	8.5	8.5
177	91	23	3	6.5	19.5
178	92	22	4	8.5	34
179	92	16	3	2	6
180	92	8	3	4.5	13.5
181	93	20	3	32	96
182	93	19	4	24	96
183	94	8	4	4.5	18
184	94	7	4	3.5	14
185	95	20	1	32	32
186	95	7	4	3.5	14
187	95	5	2	14	28
188	96	19	1	24	24
189	96	23	4	6.5	26
190	96	21	1	12	12
191	97	22	3	8.5	25.5
192	98	16	1	2	2
193	98	20	1	32	32
194	99	8	3	4.5	13.5
195	99	5	3	14	42
196	100	5	1	14	14
197	101	23	4	6.5	26
198	102	2	3	7.8	23.4
199	103	23	1	6.5	6.5
200	103	20	2	32	64
201	103	22	2	8.5	17
202	104	23	2	6.5	13
203	104	20	2	32	64
204	105	16	2	2	4
205	106	5	3	14	42
206	106	22	1	8.5	8.5
207	106	19	2	24	48
208	107	7	3	3.5	10.5
209	107	23	4	6.5	26
210	107	8	3	4.5	13.5
211	108	5	4	14	56
212	108	2	3	7.8	23.4
213	108	16	2	2	4
214	109	8	4	4.5	18
215	110	2	4	7.8	31.2
216	110	21	3	12	36
217	111	2	3	7.8	23.4
218	112	2	3	7.8	23.4
219	112	19	2	24	48
220	112	16	3	2	6
221	113	8	3	4.5	13.5
222	113	2	3	7.8	23.4
223	113	20	3	32	96
224	114	21	4	12	48
225	115	20	2	32	64
226	115	7	1	3.5	3.5
227	115	5	2	14	28
228	116	16	2	2	4
229	116	23	3	6.5	19.5
230	116	22	3	8.5	25.5
231	117	21	2	12	24
232	117	7	1	3.5	3.5
233	117	22	3	8.5	25.5
234	118	23	3	6.5	19.5
235	119	21	4	12	48
236	119	8	4	4.5	18
237	120	2	4	7.8	31.2
238	120	7	3	3.5	10.5
239	121	21	1	12	12
240	121	19	4	24	96
241	122	7	4	3.5	14
242	123	16	2	2	4
243	123	7	4	3.5	14
244	123	22	4	8.5	34
245	124	7	1	3.5	3.5
246	124	8	3	4.5	13.5
247	125	20	2	32	64
248	125	5	4	14	56
249	125	23	1	6.5	6.5
250	126	8	4	4.5	18
251	126	20	2	32	64
252	127	21	1	12	12
253	128	20	4	32	128
254	129	5	4	14	56
255	129	19	2	24	48
256	130	2	2	7.8	15.6
257	131	23	3	6.5	19.5
258	131	8	2	4.5	9
259	131	20	2	32	64
260	132	22	1	8.5	8.5
261	132	23	2	6.5	13
262	133	21	1	12	12
263	133	7	4	3.5	14
264	133	20	1	32	32
265	134	7	4	3.5	14
266	135	7	1	3.5	3.5
267	136	8	2	4.5	9
268	136	7	2	3.5	7
269	137	5	2	14	28
270	137	22	1	8.5	8.5
271	137	16	1	2	2
272	138	5	1	14	14
273	138	8	2	4.5	9
274	139	2	2	7.8	15.6
275	140	8	1	4.5	4.5
276	140	20	3	32	96
277	141	8	1	4.5	4.5
278	142	20	4	32	128
279	143	22	4	8.5	34
280	143	2	3	7.8	23.4
281	143	20	1	32	32
282	144	5	1	14	14
283	144	19	4	24	96
284	144	21	3	12	36
285	145	2	4	7.8	31.2
286	145	7	2	3.5	7
287	145	5	1	14	14
288	146	21	3	12	36
289	146	5	1	14	14
290	146	19	4	24	96
291	147	23	2	6.5	13
292	147	8	2	4.5	9
293	148	16	1	2	2
294	148	20	2	32	64
295	148	21	4	12	48
296	149	21	3	12	36
297	149	23	1	6.5	6.5
298	150	2	2	7.8	15.6
299	151	19	2	24	48
300	151	7	4	3.5	14
301	151	22	2	8.5	17
302	152	16	1	2	2
303	153	23	3	6.5	19.5
304	154	5	1	14	14
305	155	22	1	8.5	8.5
306	156	23	2	6.5	13
307	157	22	2	8.5	17
308	157	16	2	2	4
309	158	8	4	4.5	18
310	158	20	1	32	32
311	158	19	2	24	48
312	159	21	4	12	48
313	160	7	2	3.5	7
314	160	19	4	24	96
315	160	2	3	7.8	23.4
316	161	21	3	12	36
317	161	19	4	24	96
318	162	2	3	7.8	23.4
319	162	19	1	24	24
320	163	22	1	8.5	8.5
321	163	5	3	14	42
322	164	5	4	14	56
323	165	21	4	12	48
324	165	16	4	2	8
325	165	19	3	24	72
326	166	1	4	8.5	34
327	166	21	1	12	12
328	166	19	2	24	48
329	167	20	3	32	96
330	168	19	4	24	96
331	168	7	3	3.5	10.5
332	169	23	2	6.5	13
333	169	5	4	14	56
334	170	2	1	7.8	7.8
335	170	1	4	8.5	34
336	170	21	3	12	36
337	171	7	2	3.5	7
338	171	19	4	24	96
339	172	5	1	14	14
340	172	1	3	8.5	25.5
341	173	1	4	8.5	34
342	173	22	2	8.5	17
343	173	2	4	7.8	31.2
344	174	8	1	4.5	4.5
345	174	1	1	8.5	8.5
346	174	5	4	14	56
347	175	5	2	14	28
348	175	2	2	7.8	15.6
349	176	5	2	14	28
350	176	7	4	3.5	14
351	177	22	2	8.5	17
352	178	2	2	7.8	15.6
353	178	21	1	12	12
354	178	1	4	8.5	34
355	179	20	4	32	128
356	179	19	2	24	48
357	180	23	3	6.5	19.5
358	181	7	1	3.5	3.5
359	181	8	1	4.5	4.5
360	181	1	3	8.5	25.5
361	182	21	2	12	24
362	183	22	3	8.5	25.5
363	184	20	4	32	128
364	185	2	2	7.8	15.6
365	186	2	1	7.8	7.8
366	186	5	3	14	42
367	186	19	1	24	24
368	187	7	4	3.5	14
369	187	22	2	8.5	17
370	188	8	3	4.5	13.5
371	188	21	2	12	24
372	188	7	2	3.5	7
373	189	23	4	6.5	26
374	190	7	3	3.5	10.5
375	190	19	2	24	48
376	190	1	2	8.5	17
377	191	21	1	12	12
378	191	23	4	6.5	26
379	192	8	3	4.5	13.5
380	192	5	1	14	14
381	193	7	4	3.5	14
382	193	19	2	24	48
383	194	20	1	32	32
384	194	7	1	3.5	3.5
385	195	8	3	4.5	13.5
386	195	21	4	12	48
387	195	19	4	24	96
\.


--
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes (id, de_id, para_id, texto, foto_url, leido, fecha) FROM stdin;
\.


--
-- Data for Name: parcelas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parcelas (id, nombre, superficie_ha, cultivo, municipio, provincia, descripcion, geojson, agricultor_id, lat, lon) FROM stdin;
1	La Hoya	3.5	Almendros	Agost	Alicante	Parcela principal con almendros centenarios variedad Marcona.	\N	5	\N	\N
2	El Campet	2.1	Olivos	Agost	Alicante	Olivar tradicional con variedades Blanqueta y Arbequina.	\N	7	\N	\N
3	Les Eres	4.2	Almendros	Monforte	Alicante	Finca en ladera con riego por goteo instalado en 2022.	\N	8	\N	\N
4	El Barranquet	1.8	Viña	Agost	Alicante	Viña de monastrell de más de 40 años.	\N	9	\N	\N
5	La Solana	5	Almendros	Tibi	Alicante	Gran finca con almendros Guara y Lauranne.	\N	10	\N	\N
6	El Pinar	2.8	Olivos	Agost	Alicante	Olivar en terreno pedregoso con producción ecológica.	\N	11	\N	\N
7	Les Tancades	1.5	Cítricos	Mutxamel	Alicante	Naranjas y limones con sistema de riego automatizado.	\N	12	\N	\N
8	El Tossal	3.2	Almendros	Agost	Alicante	Parcela en zona alta con vistas al embalse.	\N	13	\N	\N
9	La Devesa	2.4	Garrofers	Agost	Alicante	Garroferal con árboles de más de 80 años.	\N	14	\N	\N
10	El Molí	0.8	Horta	Agost	Alicante	Huerta familiar con verduras de temporada.	\N	15	\N	\N
11	La Escandella	3.5	Uva de Mesa	Agost	Alicante	Uva de Mesa variedad Aledo	\N	\N	\N	\N
\.


--
-- Data for Name: planes_accion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planes_accion (id, socio_id, ingeniero_id, titulo, descripcion, estado, fecha) FROM stdin;
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre_es, nombre_en, descripcion_es, descripcion_en, precio, unidad, categoria, stock, stock_minimo, imagen_url, destacado, origen, certificado, activo) FROM stdin;
19	Podón de Mango Largo	Long Handle Pruning Hook			24	ud	herramientas	0	2	/images/podonmangolargo.jpg	f			t
20	Injertador Profesional	Professional Grafting Tool			32	ud	herramientas	0	2	/images/injertador.jpg	f			t
21	Abono Orgánico Compostado	Composted Organic Fertilizer			12	saco 25kg	abonos	0	10	/images/abonoorganicocompost.jpg	f		ECO	t
22	Sulfato de Cobre	Copper Sulfate			8.5	kg	abonos	3	8	/images/sulfatocobre.jpg	f		ECO	t
7	Garrofas Secas	Dried Carob Pods			3.5	kg	frutos_secos	220	30	/images/algarroba.jpg	f			t
23	Azufre Mojable	Wettable Sulfur			6.5	kg	abonos	0	8	/images/azufremojable.jpg	f		ECO	t
16	Semillas de Pimiento Rojo	Red Pepper Seeds			2	sobre 1g	semillas	110	15	/images/semillaspimientorojo.jpg	f			t
2	Aceite de Oliva Virgen Extra Arbequina	Extra Virgin Olive Oil Arbequina			7.8	botella 500ml	aceite	14	10	/images/aceiteextraarbequina.jpg	f		DOP	t
4	Almendras Marcona Crudas	Raw Marcona Almonds			12	kg	frutos_secos	180	20	/images/almendracruda.jpg	t			t
1	Aceite de Oliva Virgen Extra Blanqueta	Extra Virgin Olive Oil Blanqueta			8.5	botella 500ml	aceite	76	10	/images/aceiteextrablanqueta.png	t		DOP	t
24	Nitrofoska - 5 kg	Nitrophoska	Nitrógeno, Fósforo y Calcio	Nitrogen, Phosphorus and Calcium	15	kg	abonos	20	5	/images/nitrofoska.jpg	f			t
5	Almendras Marcona Tostadas	Toasted Marcona Almonds			14	kg	frutos_secos	77	15	/images/almendratostada.jpg	f			t
8	Aceitunas Negras en Aceite	Black Olives in Oil			4.5	tarro 350g	conservas	21	10	/images/aceitunasnegrasaceite.jpg	f			t
10	Mermelada de Naranja Amarga	Bitter Orange Marmalade			3.8	tarro 250g	conservas	50	8	/images/mermeladanaranjamarga.jpg	f			t
11	Miel de Romero	Rosemary Honey			7.8	tarro 500g	miel	41	5	/images/mielromero.jpg	t			t
17	Plántulas de Almendro Marcona	Marcona Almond Seedlings			8	ud	semillas	41	5	/images/plantulamarcona.jpg	f			t
15	Semillas de Tomate Valenciano	Valencian Tomato Seeds			2.5	sobre 1g	semillas	189	20	/images/semillasvalenciano.jpg	f			t
6	Almendras Largueta Crudas	Raw Largueta Almonds			10	kg	frutos_secos	160	15	/images/almendralargueta.jpg	f			t
13	Vino Tinto Monastrell	Monastrell Red Wine			9	botella 750ml	vino	36	6	/images/vinomonastrell.jpg	t		DOP Alicante	t
14	Vino Rosado Monastrell	Monastrell Rosé Wine			7.5	botella 750ml	vino	32	6	/images/vinorosadomonastrell.jpg	f		DOP Alicante	t
3	Aceite de Oliva Ecológico	Organic Olive Oil			11.5	botella 500ml	aceite	8	5	/images/aceiteecologico.jpg	t		ECO	t
9	Aceitunas Verdes Aliñadas	Seasoned Green Olives			4	tarro 350g	conservas	60	10	/images/aceitunaalinada.jpg	f			t
18	Tijeras de Poda Profesionales	Professional Pruning Shears			18.5	ud	herramientas	12	3	/images/tijeraspoda.jpg	f			t
12	Miel de Azahar	Orange Blossom Honey			8.5	tarro 500g	miel	17	5	/images/mielazahar.jpg	f			t
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, rol, activo, creado_en) FROM stdin;
1	Admin Arrels	admin@arrels.coop	$2b$12$iJtz/MkCtkTDDmkqwRgXwOggwN0guOLNEbWDuULvd3uOQEgJagEam	admin	t	2026-04-15 07:19:36.246898
2	Director Arrels	director@arrels.coop	$2b$12$yIrzpburx6UUoDNA09cVxOAeB/qLujfI.9fLxbzDm/8HaMO8VTcC.	director	t	2026-04-15 07:19:36.246898
3	Trabajador Arrels	trabajador@arrels.coop	$2b$12$GaJ/kDwGwxW/ktekwxY2Hu10bF.x7WKTO6ivewz891Bx3MC1m.SQW	trabajador	t	2026-04-15 07:19:36.246898
4	Ingeniero Arrels	ingeniero@arrels.coop	$2b$12$yaXoEXGIQZWISferjOKRnOCsjnnQIvGJXC4ugFK.BhVi.xG2z5w8G	ingeniero	t	2026-04-15 07:19:36.246898
5	Socio Arrels	socio@arrels.coop	$2b$12$VQ8r9U4PQXSglthDgdQrteUTiH6svL20at7oBfngc62ZFRCcbxd2u	socio	t	2026-04-15 07:19:36.246898
6	Usuario Web	usuario@arrels.coop	$2b$12$MILL8o0dljI7kT0970YI2eY31ZQuScCUZMT/fgvDAVxgdM8AdBYyq	usuario_web	t	2026-04-15 07:19:36.246898
7	Josep Miralles Tort	josep@arrels.coop	$2b$12$ky45bc3RGFEHZzJkgut/ueapvMQSgbtHwJGnmLQTpmXJgK9Cb8Zjq	socio	t	2026-04-16 10:40:36.611986
8	Maria Antònia Pérez	maria@arrels.coop	$2b$12$TuRbxfX0ELJrdWhpFU9rHe4GInDtjMGLG2kwyvCYpgxolAsrGECam	socio	t	2026-04-16 10:40:36.611986
9	Francesc Navarro Blasco	francesc@arrels.coop	$2b$12$neYoTfG9n8s//jFNIdJy3uZfCQq6qA/FJis7zl2LpZOKCbAlBaTzG	socio	t	2026-04-16 10:40:36.611986
10	Rosa Martínez Sanz	rosa@arrels.coop	$2b$12$2pi1oT5k38V4RRjAm1o0g.qv/jtg3Sj99vPVlOlC.n9ul9hG.1Kw2	socio	t	2026-04-16 10:40:36.611986
11	Antoni Lloret Giner	antoni@arrels.coop	$2b$12$gezCexpvHd36SzxZElp8O.j41X95QLEKg7uQBA4w97FpLH2fZkrgi	socio	t	2026-04-16 10:40:36.611986
12	Consuelo Ibáñez Prats	consuelo@arrels.coop	$2b$12$mVX6dqF7jaNsrZze4y76puDGcaamqxmwNv5mH5nd1kt/NRZwD62NO	socio	t	2026-04-16 10:40:36.611986
13	Miquel Ferrer Esteve	miquel@arrels.coop	$2b$12$ibUSswWHRL6LmR5KI4kNBufLwyxWYZBQDV9ccHYsz.dgmw80bVqAK	socio	t	2026-04-16 10:40:36.611986
14	Dolors Castillo Vidal	dolors@arrels.coop	$2b$12$iz1pwAOQeFEPmaPPBKxekeTjId04Xd8/bFz9otVBnVDpEP3ofqWQK	socio	t	2026-04-16 10:40:36.611986
15	Vicent Soria Campos	vicent@arrels.coop	$2b$12$YDZxFxR9E8DZZGQtxG58k.Jn5G48nCmKsQSnIVNwgIVXuo9uhwrXK	socio	t	2026-04-16 10:40:36.611986
16	Carmen Ruiz Almela	carmen@arrels.coop	$2b$12$7P7BW2RgRa1M1lqiY6GATO7yQBBKe7p0SbNtmKUuSX63HE8DKWiXS	socio	t	2026-04-16 10:40:36.611986
17	Pau Giménez Reig	pau@arrels.coop	$2b$12$w9jfZwmyGHGJKn45WrfZneZw61eLOqnBW26icrv0mS/v/MiQjApoS	trabajador	t	2026-04-16 10:40:36.611986
18	Neus Carbonell Molina	neus@arrels.coop	$2b$12$bGA2FWdk43xm4Y3cNVuUmuuG36By8Temth796.NvdRBUd2cde7hBu	trabajador	t	2026-04-16 10:40:36.611986
19	Enric Mira Castelló	enric@arrels.coop	$2b$12$h9LoSfKUEgPlbTGBaUoaNuHVaCq59fTId1O5GWfW3hRQ3Ny9JBDJq	socio	t	2026-04-25 21:01:01.320175
\.


--
-- Data for Name: ventas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ventas (id, socio_id, trabajador_id, fecha, total, ticket_pdf_url) FROM stdin;
1	9	3	2026-04-16 12:40:46.296427	59	\N
2	11	3	2026-03-17 12:40:46.468869	3.5	\N
3	15	3	2026-02-26 12:40:46.925997	8.5	\N
4	12	3	2026-03-18 12:40:47.327882	31.2	\N
5	5	3	2026-03-04 12:40:47.697674	23	\N
6	9	3	2026-03-20 12:40:48.018191	41.5	\N
7	14	3	2026-04-02 12:40:48.447438	54.8	\N
8	15	3	2026-04-04 12:40:48.809178	51.4	\N
9	5	3	2026-04-02 12:40:49.281325	64.8	\N
10	13	3	2026-02-23 12:40:49.725411	17	\N
11	11	3	2026-02-20 12:40:50.15413	52	\N
12	16	3	2026-02-28 12:40:50.528052	34.5	\N
13	15	3	2026-03-25 12:40:50.914422	42.5	\N
14	12	3	2026-03-10 12:40:51.242406	79	\N
15	14	3	2026-02-24 12:40:51.671794	62.5	\N
16	9	3	2026-03-21 12:50:30.222565	68.5	\N
17	5	3	2026-02-23 12:50:30.574414	81.5	\N
18	11	3	2026-02-19 12:50:31.241638	38	\N
19	10	3	2026-02-20 12:50:31.850368	16.3	\N
20	8	3	2026-03-17 12:50:32.470749	45.7	\N
21	12	3	2026-03-11 12:50:33.043839	35	\N
22	15	3	2026-02-22 12:50:33.58381	51.2	\N
23	11	3	2026-02-15 12:50:34.094503	122	\N
24	15	3	2026-03-02 12:50:34.493395	7.5	\N
25	8	3	2026-03-15 12:50:34.97293	31.8	\N
26	14	3	2026-03-24 12:50:35.389351	35.5	\N
27	14	3	2026-03-28 12:50:35.886267	78.5	\N
28	8	3	2026-03-20 12:50:36.358022	45.7	\N
29	11	3	2026-04-02 12:50:36.855721	8	\N
30	8	3	2026-02-16 12:50:37.362148	7.5	\N
31	11	3	2026-04-06 10:34:27.392301	26	\N
32	7	3	2026-02-16 10:34:27.54393	47	\N
33	13	3	2026-04-05 10:34:27.964717	23	\N
34	7	3	2026-04-16 10:34:28.394747	97.5	\N
35	15	3	2026-03-06 10:34:28.897821	74	\N
36	7	3	2026-04-09 10:34:29.443561	25	\N
37	5	3	2026-03-06 10:34:30.025053	60.5	\N
38	15	3	2026-03-26 10:34:30.505852	28	\N
39	16	3	2026-03-17 10:34:30.99126	128	\N
40	16	3	2026-02-28 10:34:31.303607	56	\N
41	10	3	2026-03-23 10:34:31.741201	129	\N
42	7	3	2026-03-18 10:34:32.114696	46	\N
43	14	3	2026-04-05 10:34:32.690674	60	\N
44	13	3	2026-02-27 10:34:33.155724	71.6	\N
45	13	3	2026-04-05 10:34:33.624133	26	\N
46	14	3	2026-03-27 10:37:50.724158	26	\N
47	13	3	2026-03-15 10:37:50.873056	4	\N
48	7	3	2026-03-14 10:37:51.228196	56.5	\N
49	12	3	2026-03-10 10:37:51.603006	72	\N
50	13	3	2026-04-14 10:37:52.005046	18	\N
51	12	3	2026-04-06 10:37:52.407827	73.5	\N
52	13	3	2026-03-01 10:37:52.695294	60.5	\N
53	16	3	2026-04-08 10:37:53.12134	53	\N
54	15	3	2026-02-16 10:37:53.561935	21.5	\N
55	11	3	2026-03-03 10:37:54.001115	55	\N
56	11	3	2026-04-04 10:37:54.361897	140	\N
57	10	3	2026-03-03 10:37:54.809256	54	\N
58	12	3	2026-03-11 10:37:55.108902	20	\N
59	11	3	2026-04-05 10:37:55.563675	54	\N
60	15	3	2026-02-17 10:37:55.834499	35.5	\N
61	5	3	2026-04-17 10:41:19.798528	118.5	\N
62	15	3	2026-03-29 10:41:19.934551	51	\N
63	10	3	2026-02-19 10:41:20.435668	7.5	\N
64	7	3	2026-02-28 10:41:20.914562	22.5	\N
65	7	3	2026-03-25 10:41:21.174751	67	\N
66	12	3	2026-02-16 10:41:21.52456	36	\N
67	14	3	2026-02-24 10:41:21.996284	48.5	\N
68	5	3	2026-02-23 10:41:22.296244	12	\N
69	13	3	2026-03-26 10:41:22.713958	11.5	\N
70	12	3	2026-03-20 10:41:23.02001	26	\N
71	14	3	2026-04-15 10:41:23.320923	36	\N
72	5	3	2026-03-07 10:41:23.645702	11.5	\N
73	11	3	2026-03-18 10:41:24.01284	54.5	\N
74	9	3	2026-03-13 10:41:24.355892	134	\N
75	7	3	2026-04-05 10:41:24.814427	98.5	\N
76	13	3	2026-02-17 10:45:44.519782	79.8	\N
77	5	3	2026-03-12 10:45:44.71335	36	\N
78	5	3	2026-04-15 10:45:45.191706	13.5	\N
79	15	3	2026-03-27 10:45:45.650692	57.3	\N
80	15	3	2026-03-08 10:45:46.000567	23.5	\N
81	13	3	2026-02-23 10:45:46.521251	23.4	\N
82	15	3	2026-04-03 10:45:46.930975	96	\N
83	5	3	2026-04-13 10:45:47.242024	35.5	\N
84	8	3	2026-03-01 10:45:47.638577	64	\N
85	16	3	2026-03-22 10:45:48.040021	4.5	\N
86	12	3	2026-03-12 10:45:48.370421	8	\N
87	12	3	2026-03-27 10:45:48.690339	50	\N
88	15	3	2026-04-02 10:45:49.000903	83.5	\N
89	12	3	2026-04-04 10:45:49.435592	49	\N
90	8	3	2026-04-05 10:45:49.800161	23.3	\N
91	16	3	2026-03-12 10:49:36.061845	19.5	\N
92	13	3	2026-03-23 10:49:36.233128	53.5	\N
93	7	3	2026-03-17 10:49:36.649947	192	\N
94	8	3	2026-03-31 10:49:37.392732	32	\N
95	12	3	2026-02-23 10:49:37.715623	74	\N
96	12	3	2026-04-03 10:49:38.11452	62	\N
97	7	3	2026-02-21 10:49:38.518154	25.5	\N
98	11	3	2026-03-03 10:49:39.075131	34	\N
99	14	3	2026-02-24 10:49:39.748153	55.5	\N
100	11	3	2026-03-25 10:49:40.081195	14	\N
101	9	3	2026-02-26 10:49:40.591837	26	\N
102	15	3	2026-04-01 10:49:41.004098	23.4	\N
103	16	3	2026-02-20 10:49:41.441104	87.5	\N
104	12	3	2026-02-20 10:49:41.760843	77	\N
105	12	3	2026-03-04 10:49:42.170934	4	\N
106	7	3	2026-02-18 10:51:32.544928	98.5	\N
107	9	3	2026-02-21 10:51:32.715066	50	\N
108	15	3	2026-03-16 10:51:33.192413	83.4	\N
109	15	3	2026-03-11 10:51:33.673711	18	\N
110	12	3	2026-04-07 10:51:34.225288	67.2	\N
111	16	3	2026-02-20 10:51:34.738712	23.4	\N
112	7	3	2026-02-19 10:51:35.154365	77.4	\N
113	5	3	2026-03-01 10:51:35.573877	132.9	\N
114	11	3	2026-03-20 10:51:36.081137	48	\N
115	12	3	2026-03-13 10:51:36.485813	95.5	\N
116	5	3	2026-03-18 10:51:36.83256	49	\N
117	13	3	2026-04-08 10:51:37.345176	53	\N
118	9	3	2026-03-04 10:51:37.838641	19.5	\N
119	12	3	2026-02-22 10:51:38.429727	66	\N
120	10	3	2026-04-08 10:51:38.885373	41.7	\N
121	11	3	2026-03-10 10:55:19.874093	108	\N
122	16	3	2026-04-08 10:55:20.041441	14	\N
123	11	3	2026-03-01 10:55:20.366755	52	\N
124	11	3	2026-04-06 10:55:20.831814	17	\N
125	9	3	2026-03-26 10:55:21.51175	126.5	\N
126	9	3	2026-02-24 10:55:21.913278	82	\N
127	13	3	2026-03-01 10:55:22.403213	12	\N
128	7	3	2026-03-02 10:55:22.801459	128	\N
129	15	3	2026-03-06 10:55:23.199949	104	\N
130	7	3	2026-02-21 10:55:23.440193	15.6	\N
131	13	3	2026-04-01 10:55:23.913535	92.5	\N
132	7	3	2026-03-01 10:55:24.234282	21.5	\N
133	10	3	2026-04-07 10:55:24.712309	58	\N
134	7	3	2026-02-27 10:55:25.045196	14	\N
135	14	3	2026-04-04 10:55:25.553059	3.5	\N
136	7	3	2026-03-17 10:57:39.692696	16	\N
137	14	3	2026-03-16 10:57:40.10184	38.5	\N
138	8	3	2026-03-30 10:57:40.829715	23	\N
139	15	3	2026-03-16 10:57:41.535416	15.6	\N
140	15	3	2026-02-18 10:57:42.006188	100.5	\N
141	16	3	2026-03-16 10:57:42.52647	4.5	\N
142	7	3	2026-02-17 10:57:42.970478	128	\N
143	12	3	2026-04-03 10:57:43.445083	89.4	\N
144	14	3	2026-04-01 10:57:43.67162	146	\N
145	9	3	2026-03-21 10:57:44.205489	52.2	\N
146	7	3	2026-02-22 10:57:44.886735	146	\N
147	8	3	2026-02-28 10:57:45.426925	22	\N
148	7	3	2026-04-02 10:57:45.985461	114	\N
149	13	3	2026-04-10 10:57:46.553152	42.5	\N
150	5	3	2026-02-24 10:57:47.293506	15.6	\N
151	7	3	2026-03-02 12:26:38.068357	79	\N
152	10	3	2026-04-18 12:26:38.239376	2	\N
153	15	3	2026-03-15 12:26:38.669914	19.5	\N
154	10	3	2026-04-06 12:26:38.934941	14	\N
155	13	3	2026-02-23 12:26:39.287126	8.5	\N
156	13	3	2026-02-28 12:26:39.568209	13	\N
157	5	3	2026-04-19 12:26:39.937642	21	\N
158	8	3	2026-03-23 12:26:40.25031	98	\N
159	9	3	2026-03-18 12:26:40.695331	48	\N
160	14	3	2026-03-14 12:26:41.04656	126.4	\N
161	13	3	2026-03-30 12:26:41.347987	132	\N
162	9	3	2026-02-26 12:26:41.719053	47.4	\N
163	14	3	2026-03-11 12:26:42.017476	50.5	\N
164	5	3	2026-03-20 12:26:42.406314	56	\N
165	5	3	2026-03-06 12:26:42.815719	128	\N
166	13	3	2026-03-29 23:46:32.280318	94	\N
167	5	3	2026-03-11 23:46:32.40261	96	\N
168	12	3	2026-03-29 23:46:32.755321	106.5	\N
169	13	3	2026-04-08 23:46:32.932173	69	\N
170	7	3	2026-03-28 23:46:33.219649	77.8	\N
171	8	3	2026-03-07 23:46:33.502818	103	\N
172	12	3	2026-04-20 23:46:33.800394	39.5	\N
173	8	3	2026-04-02 23:46:34.040077	82.2	\N
174	5	3	2026-02-23 23:46:34.321096	69	\N
175	11	3	2026-04-20 23:46:34.711006	43.6	\N
176	11	3	2026-04-06 23:46:35.060842	42	\N
177	11	3	2026-04-13 23:46:35.353962	17	\N
178	12	3	2026-03-27 23:46:35.629904	61.6	\N
179	11	3	2026-02-28 23:46:35.84896	176	\N
180	10	3	2026-03-04 23:46:36.267157	19.5	\N
181	10	3	2026-03-12 22:53:55.623812	33.5	\N
182	15	3	2026-04-02 22:53:55.744681	24	\N
183	13	3	2026-03-11 22:53:56.174062	25.5	\N
184	16	3	2026-04-04 22:53:56.413729	128	\N
185	16	3	2026-03-13 22:53:56.654928	15.6	\N
186	7	3	2026-03-26 22:53:56.893071	73.8	\N
187	13	3	2026-04-13 22:53:57.134594	31	\N
188	9	3	2026-02-28 22:53:57.49388	44.5	\N
189	11	3	2026-03-10 22:53:57.853767	26	\N
190	10	3	2026-04-11 22:53:58.15296	75.5	\N
191	12	3	2026-03-27 22:53:58.393622	38	\N
192	15	3	2026-04-13 22:53:58.704392	27.5	\N
193	16	3	2026-04-01 22:53:58.892954	62	\N
194	13	3	2026-04-21 22:53:59.204362	35.5	\N
195	14	3	2026-03-04 22:53:59.503156	157.5	\N
\.


--
-- Name: alquileres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alquileres_id_seq', 1, false);


--
-- Name: anotaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anotaciones_id_seq', 1, false);


--
-- Name: aperos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aperos_id_seq', 1, false);


--
-- Name: aportaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aportaciones_id_seq', 143, true);


--
-- Name: fichajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fichajes_id_seq', 3, true);


--
-- Name: lecturas_sensor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lecturas_sensor_id_seq', 1, false);


--
-- Name: lineas_venta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lineas_venta_id_seq', 387, true);


--
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_id_seq', 1, false);


--
-- Name: parcelas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parcelas_id_seq', 11, true);


--
-- Name: planes_accion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planes_accion_id_seq', 1, false);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 24, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 19, true);


--
-- Name: ventas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ventas_id_seq', 195, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: alquileres alquileres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_pkey PRIMARY KEY (id);


--
-- Name: anotaciones anotaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anotaciones
    ADD CONSTRAINT anotaciones_pkey PRIMARY KEY (id);


--
-- Name: anotaciones anotaciones_uuid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anotaciones
    ADD CONSTRAINT anotaciones_uuid_key UNIQUE (uuid);


--
-- Name: aperos aperos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aperos
    ADD CONSTRAINT aperos_pkey PRIMARY KEY (id);


--
-- Name: aportaciones aportaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aportaciones
    ADD CONSTRAINT aportaciones_pkey PRIMARY KEY (id);


--
-- Name: fichajes fichajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fichajes
    ADD CONSTRAINT fichajes_pkey PRIMARY KEY (id);


--
-- Name: lecturas_sensor lecturas_sensor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecturas_sensor
    ADD CONSTRAINT lecturas_sensor_pkey PRIMARY KEY (id);


--
-- Name: lineas_venta lineas_venta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas_venta
    ADD CONSTRAINT lineas_venta_pkey PRIMARY KEY (id);


--
-- Name: mensajes mensajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (id);


--
-- Name: parcelas parcelas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas
    ADD CONSTRAINT parcelas_pkey PRIMARY KEY (id);


--
-- Name: planes_accion planes_accion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_accion
    ADD CONSTRAINT planes_accion_pkey PRIMARY KEY (id);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: ventas ventas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id);


--
-- Name: ix_device_ts; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_device_ts ON public.lecturas_sensor USING btree (device_id, "timestamp");


--
-- Name: ix_lecturas_sensor_device_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_lecturas_sensor_device_id ON public.lecturas_sensor USING btree (device_id);


--
-- Name: ix_productos_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_productos_categoria ON public.productos USING btree (categoria);


--
-- Name: ix_usuarios_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_usuarios_email ON public.usuarios USING btree (email);


--
-- Name: alquileres alquileres_apero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_apero_id_fkey FOREIGN KEY (apero_id) REFERENCES public.aperos(id);


--
-- Name: alquileres alquileres_socio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_socio_id_fkey FOREIGN KEY (socio_id) REFERENCES public.usuarios(id);


--
-- Name: alquileres alquileres_trabajador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alquileres
    ADD CONSTRAINT alquileres_trabajador_id_fkey FOREIGN KEY (trabajador_id) REFERENCES public.usuarios(id);


--
-- Name: anotaciones anotaciones_parcela_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anotaciones
    ADD CONSTRAINT anotaciones_parcela_id_fkey FOREIGN KEY (parcela_id) REFERENCES public.parcelas(id);


--
-- Name: anotaciones anotaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anotaciones
    ADD CONSTRAINT anotaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: aportaciones aportaciones_socio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aportaciones
    ADD CONSTRAINT aportaciones_socio_id_fkey FOREIGN KEY (socio_id) REFERENCES public.usuarios(id);


--
-- Name: aportaciones aportaciones_trabajador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aportaciones
    ADD CONSTRAINT aportaciones_trabajador_id_fkey FOREIGN KEY (trabajador_id) REFERENCES public.usuarios(id);


--
-- Name: fichajes fichajes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fichajes
    ADD CONSTRAINT fichajes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: lineas_venta lineas_venta_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas_venta
    ADD CONSTRAINT lineas_venta_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);


--
-- Name: lineas_venta lineas_venta_venta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lineas_venta
    ADD CONSTRAINT lineas_venta_venta_id_fkey FOREIGN KEY (venta_id) REFERENCES public.ventas(id);


--
-- Name: mensajes mensajes_de_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_de_id_fkey FOREIGN KEY (de_id) REFERENCES public.usuarios(id);


--
-- Name: mensajes mensajes_para_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_para_id_fkey FOREIGN KEY (para_id) REFERENCES public.usuarios(id);


--
-- Name: parcelas parcelas_agricultor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcelas
    ADD CONSTRAINT parcelas_agricultor_id_fkey FOREIGN KEY (agricultor_id) REFERENCES public.usuarios(id);


--
-- Name: planes_accion planes_accion_ingeniero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_accion
    ADD CONSTRAINT planes_accion_ingeniero_id_fkey FOREIGN KEY (ingeniero_id) REFERENCES public.usuarios(id);


--
-- Name: planes_accion planes_accion_socio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planes_accion
    ADD CONSTRAINT planes_accion_socio_id_fkey FOREIGN KEY (socio_id) REFERENCES public.usuarios(id);


--
-- Name: ventas ventas_socio_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_socio_id_fkey FOREIGN KEY (socio_id) REFERENCES public.usuarios(id);


--
-- Name: ventas ventas_trabajador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_trabajador_id_fkey FOREIGN KEY (trabajador_id) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Ew88jSIUnUw4mcfpZY24xoGC5LHV1S05f99Apvt0ewMvpQqLIKlNoSFAhUOgL4g

