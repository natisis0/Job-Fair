
--
-- PostgreSQL database dump
--

\restrict Yi2KrMogL1heOje8uVbFdPuef59DlDaaFFlT6b1CQ5P4AdaxRiWQuHBw0Yinvo7

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: candidates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.candidates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text,
    university text,
    field_of_study text,
    graduation_year integer,
    skills text[],
    resume_url text,
    qr_code text,
    status text DEFAULT 'inactive'::text,
    created_at timestamp without time zone DEFAULT now(),
    public_id text NOT NULL,
    CONSTRAINT candidates_status_check CHECK ((status = ANY (ARRAY['inactive'::text, 'active'::text])))
);


ALTER TABLE public.candidates OWNER TO postgres;

--
-- Name: candidates_shortcut_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.candidates_shortcut_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.candidates_shortcut_id_seq OWNER TO postgres;

--
-- Name: candidates_shortcut_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.candidates_shortcut_id_seq OWNED BY public.candidates.public_id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text,
    booth_slot text DEFAULT 'available'::text,
    status text DEFAULT 'inactive'::text,
    created_at timestamp without time zone DEFAULT now(),
    images text DEFAULT '/images/companyLogo.png'::text NOT NULL,
    clerk_user_id text,
    CONSTRAINT companies_status_check CHECK ((status = ANY (ARRAY['inactive'::text, 'active'::text])))
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- Name: company_candidates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_candidates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    company_id uuid,
    candidate_id uuid,
    scanned_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.company_candidates OWNER TO postgres;

--
-- Name: event_candidates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_candidates (
    event_id uuid NOT NULL,
    candidate_id uuid NOT NULL,
    registered_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.event_candidates OWNER TO postgres;

--
-- Name: event_companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_companies (
    event_id uuid NOT NULL,
    company_id uuid NOT NULL
);


ALTER TABLE public.event_companies OWNER TO postgres;

--
-- Name: event_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    image_url text NOT NULL
);


ALTER TABLE public.event_photos OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    organizer text,
    description text,
    event_type text,
    eligibility text,
    location text,
    venue text,
    event_date timestamp without time zone NOT NULL,
    hero_image text,
    status text DEFAULT 'active'::text,
    created_at timestamp without time zone DEFAULT now(),
    participants_count integer DEFAULT 0,
    available_tickets integer DEFAULT 100,
    event_time time without time zone
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: speakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.speakers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    name text NOT NULL,
    title text,
    image_url text,
    instagram text,
    linkedin text
);


ALTER TABLE public.speakers OWNER TO postgres;

--
-- Data for Name: candidates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.candidates (id, first_name, last_name, email, phone, university, field_of_study, graduation_year, skills, resume_url, qr_code, status, created_at, public_id) FROM stdin;
e7293bd3-65a0-43ee-bce0-d74b81168317	jncj	jjnx	w@e	382938	njnxn	njxn	4	{jnxn}	https://resend.com/emails	\N	active	2026-04-01 00:39:39.812097	kzTuW4eb6f
3bc6f85f-529a-425e-8fd4-f666973fb385	mbc	m,cnmk	tsinat@check.com	occ	iojic	iodihj	1	{nckjn}		data:image/png;base64,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	active	2026-04-03 11:20:35.027842	h6uvtyFOlf
79d58145-df6d-4aff-a410-d3313c864791	 xn	 x	a@a	x 	 xmx	mkx	1	{mxen}	jsnw	data:image/png;base64,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	active	2026-04-01 00:56:31.913503	-jFg7gRqAL
28c46319-eb42-4848-8f1c-d1cc5d100e1d	vvv	v	v@w	091	jjzsnb	znwz	2	{jns}	https://drive.google.com/file/d/11NlO4RFlgKCtWyVFLgySLDn-WLsCec7N/view?usp=drive_link	data:image/png;base64,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	active	2026-03-28 23:31:41.009822	cand_CL37_PqPL8
04eae4f8-bbbc-40d4-abc3-8cb869279e0e	check	che	ravam59358@agoalz.com	909	uhcu	jbc	76786	{nxnjcn}		data:image/png;base64,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	active	2026-04-06 10:29:29.577057	CtdzNsS_Vy
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, email, booth_slot, status, created_at, images, clerk_user_id) FROM stdin;
a04bbd84-caf8-48db-8713-8b3a604e8480	nmm	n@W	available	active	2026-03-13 23:34:32.607011	/images/companyLogo.png	\N
a4fd154f-383c-4255-8203-b65f9f5efcdd	hi	h@W	available	active	2026-03-13 23:41:01.657294	/images/companyLogo.png	\N
2939bcde-2110-4437-a6d3-a4c701f1d94a	x	h@r	available	active	2026-03-13 23:45:48.564429	/images/companyLogo.png	\N
f8cc76de-cfb4-4ec8-8156-446166f9093a	h	h@we.co	available	inactive	2026-04-01 00:09:28.048955	/logos/1774991365064-Screenshot-2025-10-02-155942.png	user_3Bj8xml2S36D1R1H8ay3kTdApqe
b7bd775f-7fca-469f-a3a5-23a433314cc2	n k jk	nmkmi@er.bo	available	inactive	2026-04-01 00:12:00.448277	/logos/1774991517085-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(2).png	user_3Bj9H1laWXwkiCfRWllAwLSnHpj
55fa7ef6-8c85-4af8-a04d-0102d9682156	tsinat	tsinat@check.com	available	inactive	2026-04-03 11:19:03.645679	/logos/1775204341266-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(5).png	user_3Bq6dl5NzhV9gBDXWhgOYosmZwa
b7c8f515-7be1-495d-8ecd-ec5504db032f	jhccn	ckjvnj@gmail.com	available	inactive	2026-04-03 11:27:32.645172	/logos/1775204847935-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(1).png	user_3Bq7fkqm3F3OuTHbiGMGUsLU7RG
b86cef7b-b869-488e-9f25-bac1240bf1d5	hello	hello@w	available	active	2026-03-14 23:05:56.304893	/images/companyLogo.png	\N
fd988790-0d08-4439-9e20-fb389ac508de	llllllllllllllllllllll	llllllllllllllll@w.co	available	inactive	2026-04-04 21:51:40.865709	/logos/1775328697855-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(2).png	user_3BuAhNx01BdzznxW4ULBpY893Gj
e57d4d7b-78ad-4f04-b41f-e67fc8b464f2	gmail	bxuih@gmail.com	available	inactive	2026-04-04 22:23:17.469858	/logos/1775330595012-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(2).png	user_3BuEXjSqd6ci2CcMuHMqT4Gz78I
cbebbb36-1af2-4519-a18b-e047e3e38c83	mck	eryj@fgf.com	available	inactive	2026-04-04 22:29:23.769755	/logos/1775330961209-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(2).png	user_3BuFHwzDvSSM5gkpQf37rtMrCQS
6e5a3ba5-7fd7-4b7a-ba7c-6960b39e04e1	v	EERF@Em.co	available	inactive	2026-04-04 22:31:06.381434	/logos/1775331064208-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(1).png	user_3BuFUjNRQ0pA4l5Cb5w8qymb0p8
00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd	check	c@e	available	active	2026-03-16 16:22:53.659982	/logos/1773667373610-2.jpg	user_3B1TFnYlrNQvt4vHrOtOMNaOxc3
2e938b57-8682-4bd0-aaa7-2d415df7dcde	ethiojobs	qqqqqqqqqq@nvv.com	available	inactive	2026-04-06 10:23:30.954115	/logos/1775460207771-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(1).png	user_3ByTFu05f5nCf51reDOYGrnOqlu
f867d4a8-fec9-4208-b7c2-f36bd334951b	t	t@r	available	active	2026-03-20 14:59:59.395314	/logos/1774007999221-fa264054b6a53d1c84b80cd982d40d80.jpg	\N
45999069-af57-4808-b4b7-0a58b254bccb	sw	a@WW	available	active	2026-03-20 14:59:40.937023	/logos/1774007980921-fa264054b6a53d1c84b80cd982d40d80.jpg	\N
f5b83874-a57c-4474-83e2-a0767db2d5c1	a	a@W	available	active	2026-03-20 14:59:12.942293	/logos/1774007975508-fa264054b6a53d1c84b80cd982d40d80.jpg	\N
c9b278e6-10b5-4f42-a720-d949e4e379d6	hi	h@ert	available	active	2026-03-13 23:50:15.777879	/images/companyLogo.png	\N
e54f4573-091d-4c04-910f-eec56a91638c	g	g@w	available	active	2026-03-20 15:01:14.215396	/logos/1774008074083-2.jpg	\N
a262c0dd-a58d-4b10-8a3c-fc2e9941581b	gggg	h@e	available	active	2026-03-20 15:01:31.670352	/logos/1774008091569-images.jpg	\N
54ffa1d2-d7bb-4d9a-b99b-9c7067e9e583	jjwiox	njxk@w	available	active	2026-03-20 15:01:48.386435	/logos/1774008108224-HD-wallpaper-game-over-hacker-setup.jpg	\N
fdc45d37-013c-4536-96c1-a021bf24202d	 nmz	mm@e	available	active	2026-03-20 15:02:08.408364	/logos/1774008128243-HD-wallpaper-game-over-hacker-setup.jpg	\N
bc00289a-3e5a-4a02-8ffd-16a9c3bba6df	test-1	test-1@gmail.com	available	active	2026-03-23 14:25:01.923719	/logos/1774265101816-Screenshot-2025-10-04-091341.png	\N
d846be32-919c-41e1-8bb1-edcceb390a65	jhgsdeafnw	d@W	available	inactive	2026-03-23 14:24:39.302785	/logos/1774274740421-Screenshot-2025-10-02-155942.png	\N
26702ec9-5560-4b0a-9310-5e9f2afa9cc7	n	d@Www	available	active	2026-03-23 17:05:53.199555	/logos/1774274752986-Screenshot-2025-10-02-155942.png	\N
27af3c79-fda4-49e1-82b1-c8e0f9ba1b18	m,nm	h@wraa	a	active	2026-03-24 00:27:54.193552	/images/CompaniesLogo/1774301273928-452777074-Screenshot 2025-10-04 091341.png	\N
d2609506-f511-42e0-acdb-edfb696de34e	ravaem	ravam59358@agoalz.com	available	inactive	2026-04-06 10:26:43.143304	/logos/1775460400112-Gemini_Generated_Image_7ku9sr7ku9sr7ku9-(1).png	user_3ByTe3aEXeI2eGiIK8MJm6ixm4T
0a4866ce-53c6-48bd-adfd-8716450d9a3c	nmk	nn@wrt	A	inactive	2026-03-24 00:29:02.597356	/images/CompaniesLogo/1774301342467-983753419-Gemini_Generated_Image_7ku9sr7ku9sr7ku9 (2).png	\N
6ea08713-e416-46d3-b58c-915b6d5595d3	credi	check@mailsac.com	available	inactive	2026-03-31 23:41:04.134614	/logos/1774989660534-Screenshot-2025-10-02-155942.png	user_3Bj5VgeoWLl3kNBIizSq3wSMU2e
c44a04f7-d86d-4e1e-bb7e-b0edfe0bbd56	checkcred2	cjcjn@w.com	available	inactive	2026-03-31 23:48:30.461873	/logos/1774990451015-Screenshot-2025-10-10-140636.png	user_3Bj6PkHDIDoRHu3vecF0XzEq0SG
\.


--
-- Data for Name: company_candidates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company_candidates (id, company_id, candidate_id, scanned_at) FROM stdin;
3df73841-e5a1-4d68-97dc-3d28099d709e	00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd	28c46319-eb42-4848-8f1c-d1cc5d100e1d	2026-04-04 21:41:26.255333
4402cc56-7997-484d-baee-b59d77bffe16	00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd	3bc6f85f-529a-425e-8fd4-f666973fb385	2026-04-04 23:23:37.647406
48bf6154-d1ef-44c5-b010-ed5c21cebfb3	d2609506-f511-42e0-acdb-edfb696de34e	04eae4f8-bbbc-40d4-abc3-8cb869279e0e	2026-04-06 10:30:07.554513
\.


--
-- Data for Name: event_candidates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_candidates (event_id, candidate_id, registered_at) FROM stdin;
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	e7293bd3-65a0-43ee-bce0-d74b81168317	2026-04-01 00:39:39.862819
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	28c46319-eb42-4848-8f1c-d1cc5d100e1d	2026-04-01 00:49:17.521337
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	28c46319-eb42-4848-8f1c-d1cc5d100e1d	2026-04-01 00:53:32.100878
01b7fab3-ca3d-4cc8-8357-c6169b167228	28c46319-eb42-4848-8f1c-d1cc5d100e1d	2026-04-01 00:55:38.920255
01b7fab3-ca3d-4cc8-8357-c6169b167228	79d58145-df6d-4aff-a410-d3313c864791	2026-04-01 00:56:31.960808
101024d0-e48d-4ff1-a2b9-b41167c5e612	79d58145-df6d-4aff-a410-d3313c864791	2026-04-01 00:57:50.523868
70f9f1ad-8be0-4b75-8bc6-91a7c1b6f7d4	79d58145-df6d-4aff-a410-d3313c864791	2026-04-01 00:59:23.614034
6449a3fe-f80b-4cb8-b0af-7db6302e6944	79d58145-df6d-4aff-a410-d3313c864791	2026-04-01 01:02:38.024834
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	3bc6f85f-529a-425e-8fd4-f666973fb385	2026-04-03 11:20:35.059653
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	79d58145-df6d-4aff-a410-d3313c864791	2026-04-04 20:45:39.270841
3aebf7b9-b1dc-4919-b07c-c44192689179	79d58145-df6d-4aff-a410-d3313c864791	2026-04-04 23:27:48.563029
3aebf7b9-b1dc-4919-b07c-c44192689179	28c46319-eb42-4848-8f1c-d1cc5d100e1d	2026-04-04 23:28:10.061383
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	04eae4f8-bbbc-40d4-abc3-8cb869279e0e	2026-04-06 10:29:29.590642
\.


--
-- Data for Name: event_companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_companies (event_id, company_id) FROM stdin;
e54fc2e0-8a03-44f1-89eb-789e6d1d28d2	a04bbd84-caf8-48db-8713-8b3a604e8480
e54fc2e0-8a03-44f1-89eb-789e6d1d28d2	a4fd154f-383c-4255-8203-b65f9f5efcdd
e54fc2e0-8a03-44f1-89eb-789e6d1d28d2	2939bcde-2110-4437-a6d3-a4c701f1d94a
e54fc2e0-8a03-44f1-89eb-789e6d1d28d2	c9b278e6-10b5-4f42-a720-d949e4e379d6
4be6c7b9-a007-4805-9d80-482966ba4385	b86cef7b-b869-488e-9f25-bac1240bf1d5
4be6c7b9-a007-4805-9d80-482966ba4385	00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd
4be6c7b9-a007-4805-9d80-482966ba4385	c9b278e6-10b5-4f42-a720-d949e4e379d6
4be6c7b9-a007-4805-9d80-482966ba4385	a4fd154f-383c-4255-8203-b65f9f5efcdd
4be6c7b9-a007-4805-9d80-482966ba4385	2939bcde-2110-4437-a6d3-a4c701f1d94a
4be6c7b9-a007-4805-9d80-482966ba4385	a04bbd84-caf8-48db-8713-8b3a604e8480
4be6c7b9-a007-4805-9d80-482966ba4385	f5b83874-a57c-4474-83e2-a0767db2d5c1
4be6c7b9-a007-4805-9d80-482966ba4385	45999069-af57-4808-b4b7-0a58b254bccb
4be6c7b9-a007-4805-9d80-482966ba4385	f867d4a8-fec9-4208-b7c2-f36bd334951b
4be6c7b9-a007-4805-9d80-482966ba4385	e54f4573-091d-4c04-910f-eec56a91638c
4be6c7b9-a007-4805-9d80-482966ba4385	a262c0dd-a58d-4b10-8a3c-fc2e9941581b
4be6c7b9-a007-4805-9d80-482966ba4385	54ffa1d2-d7bb-4d9a-b99b-9c7067e9e583
4be6c7b9-a007-4805-9d80-482966ba4385	fdc45d37-013c-4536-96c1-a021bf24202d
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	d846be32-919c-41e1-8bb1-edcceb390a65
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	bc00289a-3e5a-4a02-8ffd-16a9c3bba6df
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	26702ec9-5560-4b0a-9310-5e9f2afa9cc7
6449a3fe-f80b-4cb8-b0af-7db6302e6944	a04bbd84-caf8-48db-8713-8b3a604e8480
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	6ea08713-e416-46d3-b58c-915b6d5595d3
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	c44a04f7-d86d-4e1e-bb7e-b0edfe0bbd56
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	f8cc76de-cfb4-4ec8-8156-446166f9093a
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	b7bd775f-7fca-469f-a3a5-23a433314cc2
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	55fa7ef6-8c85-4af8-a04d-0102d9682156
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	b7c8f515-7be1-495d-8ecd-ec5504db032f
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	fd988790-0d08-4439-9e20-fb389ac508de
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	e57d4d7b-78ad-4f04-b41f-e67fc8b464f2
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	e57d4d7b-78ad-4f04-b41f-e67fc8b464f2
101024d0-e48d-4ff1-a2b9-b41167c5e612	e57d4d7b-78ad-4f04-b41f-e67fc8b464f2
101024d0-e48d-4ff1-a2b9-b41167c5e612	cbebbb36-1af2-4519-a18b-e047e3e38c83
101024d0-e48d-4ff1-a2b9-b41167c5e612	6e5a3ba5-7fd7-4b7a-ba7c-6960b39e04e1
101024d0-e48d-4ff1-a2b9-b41167c5e612	00b5f383-54e5-4fc8-afe7-c09ed3a0d7fd
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	2e938b57-8682-4bd0-aaa7-2d415df7dcde
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	d2609506-f511-42e0-acdb-edfb696de34e
\.


--
-- Data for Name: event_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_photos (id, event_id, image_url) FROM stdin;
0ccb1601-a8cd-466d-b5d5-e99170a6f747	4be6c7b9-a007-4805-9d80-482966ba4385	/images/event.png
6ce2792d-3afb-4f06-bc4d-a3aa2d2aca03	4be6c7b9-a007-4805-9d80-482966ba4385	/images/event.png
50346d00-3bb5-4fa6-9d7d-9ca636616c27	4be6c7b9-a007-4805-9d80-482966ba4385	/images/event.png
29c410d3-5c42-4676-9346-3dfdba8918f4	4be6c7b9-a007-4805-9d80-482966ba4385	/images/event.png
841efcfa-d745-48f1-bea2-2f95cb6a3b29	4be6c7b9-a007-4805-9d80-482966ba4385	/images/event.png
b808b854-e83f-4fcf-b1b2-e59d9687db51	6449a3fe-f80b-4cb8-b0af-7db6302e6944	/images/Machine Learning Conferences/1773987647540-2.jpg
c69b2e67-3d21-479f-ba36-aebc038ab5d1	6449a3fe-f80b-4cb8-b0af-7db6302e6944	/images/Machine Learning Conferences/1773987996371-fa264054b6a53d1c84b80cd982d40d80.jpg
64cbb703-eef6-4f83-a8be-64790907b437	6449a3fe-f80b-4cb8-b0af-7db6302e6944	/images/Machine Learning Conferences/1773987996381-HD-wallpaper-game-over-hacker-setup.jpg
f2a432b1-4a24-40fc-940f-8e20e5eff0fc	6449a3fe-f80b-4cb8-b0af-7db6302e6944	/images/Machine Learning Conferences/1773987996388-images.jpg
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, organizer, description, event_type, eligibility, location, venue, event_date, hero_image, status, created_at, participants_count, available_tickets, event_time) FROM stdin;
45fd03cb-f2d2-4d02-ab51-a7dd37d6f25c	Civil Engineering Career Fair	Civil Engineering Department	Career networking event for engineering students	Job Event	All university students can join	Addis Ababa	AAU Main Hall	2026-06-17 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	26	300	09:00:00
122fbab3-7217-40dc-9e9c-301cbefbb1d6	Technology Innovation Expo	Tech Association	Discover new innovations in technology	Tech Event	All students welcome	Addis Ababa	Innovation Center	2026-07-10 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	54	250	10:30:00
0f9f64fd-40b4-40e4-b5e6-6c84dae7be8b	Mechanical Engineering Summit	Mechanical Engineering Department	Engineering leaders sharing industry insights	Conference	Engineering students	Addis Ababa	AAU Engineering Hall	2026-08-11 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	65	300	09:30:00
4be6c7b9-a007-4805-9d80-482966ba4385	Digital Marketing Workshop	Business Department	Learn modern marketing strategies	Workshop	All students	Addis Ababa	Business School Hall	2026-04-18 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	35	120	14:00:00
8e6508aa-1b6c-4766-9d8e-dfc37ed94e6a	Women in Technology	Women Tech Community	Empowering women in technology careers	Conference	All students	Addis Ababa	Unity Hall	2026-07-22 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	48	180	13:30:00
a0633812-57b6-45f6-9234-b25873d5dc61	Cybersecurity Bootcamp	Cyber Security Club	Hands-on cybersecurity training	Bootcamp	Computer science students	Addis Ababa	Tech Lab	2026-09-01 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	22	90	10:00:00
6c17fd97-958f-4ff2-8388-5dfa881d8bcd	Startup Pitch Day	Entrepreneur Club	Students pitch startup ideas	Competition	University students	Addis Ababa	Innovation Hub	2026-07-05 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	70	150	15:00:00
ed7d1c7c-6049-4930-b4c4-de610dd3df3c	Robotics Expo	Robotics Club	Robotics demonstrations and workshops	Expo	All students	Addis Ababa	Tech Center	2026-10-15 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	55	220	11:30:00
9a4690ad-3aeb-4a46-8da7-28f627e395f2	Web Development Bootcamp	Software Engineering Club	Learn full stack web development	Bootcamp	All students	Addis Ababa	Coding Lab	2026-08-03 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	44	160	10:15:00
01b7fab3-ca3d-4cc8-8357-c6169b167228	AI and Future Jobs	Computer Science Department	Discussion on AI and the future of work	Seminar	All university students	Addis Ababa	AAU Auditorium	2026-06-05 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	42	150	11:00:00
3aebf7b9-b1dc-4919-b07c-c44192689179	Green Energy Summit	Energy Department	Renewable energy innovations	Conference	Engineering students	Addis Ababa	Energy Hall	2026-09-10 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	35	140	09:45:00
101024d0-e48d-4ff1-a2b9-b41167c5e612	Civil Engineering Padurg	Civil Engineering Department	Industry professionals meeting students	Job Event	All universities students	Addis Ababa	Engineering Auditorium	2026-06-30 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	61	200	12:00:00
1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	Startup Networking Night	Entrepreneur Club	Meet startup founders and investors	Networking	University students	Addis Ababa	Skylight Hotel	2026-05-20 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	80	200	18:00:00
e54fc2e0-8a03-44f1-89eb-789e6d1d28d2	Fintech Meetup	Finance Club	Financial technology networking	Meetup	Business students	Addis Ababa	Finance Center	2026-06-14 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	37	130	17:30:00
281f61be-493e-4de6-9ee7-184a2dd54674	Data Science Day	Data Science Club	Talks and data science competitions	Conference	All students	Addis Ababa	Science Auditorium	2026-09-18 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	51	210	12:30:00
8d7499c7-c83c-44cd-a5d0-746d634b3b4c	Engineering Networking Night	Engineering Faculty	Connect with engineering companies	Networking	Engineering students	Addis Ababa	Engineering Lounge	2026-10-01 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	67	190	18:30:00
70f9f1ad-8be0-4b75-8bc6-91a7c1b6f7d4	Cloud Computing Workshop	Tech Association	Hands-on cloud development	Workshop	Developers and students	Addis Ababa	Innovation Lab	2026-07-28 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	43	150	14:30:00
6449a3fe-f80b-4cb8-b0af-7db6302e6944	Machine Learning Conferences	AI Research Group	Latest machine learning trends	Conference	CS students	Addis Ababa	Science Hall	2026-10-29 00:00:00	/images/hero-1773989577961-2.jpg	active	2026-03-13 11:28:25.245429	59	200	13:00:00
c1fd7eb1-b18e-43fb-8afa-ecafcf38a90c	Leadership Summit	Student Union	Leadership and management skills	Seminar	All students	Addis Ababa	Main Conference Hall	2026-05-12 00:00:00	/images/event.png	active	2026-03-13 11:28:25.245429	100	100	16:00:00
\.


--
-- Data for Name: speakers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.speakers (id, event_id, name, title, image_url, instagram, linkedin) FROM stdin;
7be02367-a7cc-4f61-b76a-0c1f89e9794d	6449a3fe-f80b-4cb8-b0af-7db6302e6944	Emily clark	Product Manager	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
df28516b-1277-4d1e-be9c-113a7e6ec1dc	01b7fab3-ca3d-4cc8-8357-c6169b167228	Alice Johnson	AI Researcher	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
36c35f0d-c79e-4673-822e-4eb62d8d5c5e	0f9f64fd-40b4-40e4-b5e6-6c84dae7be8b	David Kim	Cloud Architect	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
3579ebd8-86d0-4b05-98d1-b4e97a01fd13	101024d0-e48d-4ff1-a2b9-b41167c5e612	Maria Garcia	Data Scientist	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
dca870d0-cfba-4a95-9e9d-89eb208e958a	122fbab3-7217-40dc-9e9c-301cbefbb1d6	James Smith	Cybersecurity Expert	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
9205ee13-eb65-4c88-9be2-b7c3645cb5dd	1dbc6f7f-13d8-47da-b6d4-e286a9f131f3	Fatima Noor	Machine Learning Engineer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
a1d5eaf4-0acb-45c2-8172-67c43d1f7359	281f61be-493e-4de6-9ee7-184a2dd54674	Daniel Lee	DevOps Engineer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
a0783cdd-c544-4ddd-af2c-8dee849716ff	3aebf7b9-b1dc-4919-b07c-c44192689179	Sarah Brown	Frontend Architect	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
f589fa0a-3d09-4297-97b4-0435fe1c5842	45fd03cb-f2d2-4d02-ab51-a7dd37d6f25c	Michael Chen	Blockchain Developer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
cb6eb84c-f777-4833-8c5c-f2fe931ef0c7	6c17fd97-958f-4ff2-8388-5dfa881d8bcd	Carlos Rivera	Backend Engineer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
22ef0c7d-1ba6-4dc6-b15a-4f7ec8ad1d08	70f9f1ad-8be0-4b75-8bc6-91a7c1b6f7d4	Linda Park	UX Designer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
20d23866-0e1d-444c-8b1d-c51be48eb9c0	8d7499c7-c83c-44cd-a5d0-746d634b3b4c	Robert Wilson	Tech Lead	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
a38d95f9-650c-4db4-a84f-d30117e6a02f	8e6508aa-1b6c-4766-9d8e-dfc37ed94e6a	Priya Sharma	Full Stack Developer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
b7e3f16b-7e8b-496c-9af1-93d2749df6d5	4be6c7b9-a007-4805-9d80-482966ba4385	Alice Johnson	AI Researcher	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
746ddd1e-457c-4a89-a327-12d4f1e8734f	4be6c7b9-a007-4805-9d80-482966ba4385	Maria Garcia	Data Scientist	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
4ec391c6-7c57-415c-bb35-bfe198983116	4be6c7b9-a007-4805-9d80-482966ba4385	James Smith	Cybersecurity Expert	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
fb9cba19-bffd-4962-8b25-0cc9b3bb54d8	4be6c7b9-a007-4805-9d80-482966ba4385	Fatima Noor	Machine Learning Engineer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
7997f564-ce0e-49e6-8ca4-3b442ec67563	4be6c7b9-a007-4805-9d80-482966ba4385	Daniel Lee	DevOps Engineer	/images/speaker.png	https://instagram.com/dummy_user	https://linkedin.com/in/dummy_user
\.


--
-- Name: candidates_shortcut_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.candidates_shortcut_id_seq', 2, true);


--
-- Name: candidates candidates_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_email_key UNIQUE (email);


--
-- Name: candidates candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (id);


--
-- Name: candidates candidates_shortcut_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_shortcut_id_key UNIQUE (public_id);


--
-- Name: companies companies_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_email_key UNIQUE (email);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: company_candidates company_candidates_company_id_candidate_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_candidates
    ADD CONSTRAINT company_candidates_company_id_candidate_id_key UNIQUE (company_id, candidate_id);


--
-- Name: company_candidates company_candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_candidates
    ADD CONSTRAINT company_candidates_pkey PRIMARY KEY (id);


--
-- Name: event_candidates event_candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_candidates
    ADD CONSTRAINT event_candidates_pkey PRIMARY KEY (event_id, candidate_id);


--
-- Name: event_companies event_companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_companies
    ADD CONSTRAINT event_companies_pkey PRIMARY KEY (event_id, company_id);


--
-- Name: event_photos event_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_photos
    ADD CONSTRAINT event_photos_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: speakers speakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.speakers
    ADD CONSTRAINT speakers_pkey PRIMARY KEY (id);


--
-- Name: companies unique_company_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT unique_company_email UNIQUE (email);


--
-- Name: company_candidates company_candidates_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_candidates
    ADD CONSTRAINT company_candidates_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) ON DELETE CASCADE;


--
-- Name: company_candidates company_candidates_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_candidates
    ADD CONSTRAINT company_candidates_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: event_candidates event_candidates_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_candidates
    ADD CONSTRAINT event_candidates_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) ON DELETE CASCADE;


--
-- Name: event_candidates event_candidates_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_candidates
    ADD CONSTRAINT event_candidates_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_companies event_companies_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_companies
    ADD CONSTRAINT event_companies_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE CASCADE;


--
-- Name: event_companies event_companies_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_companies
    ADD CONSTRAINT event_companies_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: event_photos event_photos_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_photos
    ADD CONSTRAINT event_photos_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: speakers speakers_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.speakers
    ADD CONSTRAINT speakers_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Yi2KrMogL1heOje8uVbFdPuef59DlDaaFFlT6b1CQ5P4AdaxRiWQuHBw0Yinvo7

