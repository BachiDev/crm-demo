-- V1: baseline schema. Generated from pg_dump --schema-only of the production
-- database (which Hibernate ddl-auto:update created), stripped of Neon/example
-- specific bits (roles, default privileges, session SETs). Plain DDL only so it
-- runs identically on local Postgres (Docker) and Neon.
-- Fresh databases migrate V1 -> V2. Non-empty databases (existing prod) are
-- baselined at V1 via spring.flyway.baseline-on-migrate (see application.yml).

CREATE TABLE public.accounts (
    account_id uuid NOT NULL,
    account_name character varying(255) NOT NULL,
    address_line1 character varying(255),
    city character varying(100),
    country character varying(100),
    date_created timestamp(6) with time zone NOT NULL,
    industry character varying(100),
    last_updated timestamp(6) with time zone NOT NULL,
    metadata text,
    phone character varying(20),
    postal_code character varying(20),
    state character varying(50),
    website character varying(255),
    owner_id uuid
);

CREATE TABLE public.activities (
    activity_id uuid NOT NULL,
    activity_type character varying(50) NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    due_date timestamp(6) with time zone,
    last_updated timestamp(6) with time zone NOT NULL,
    status character varying(50) NOT NULL,
    subject character varying(255) NOT NULL,
    owner_id uuid
);

CREATE TABLE public.activity_relations (
    id bigint NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    last_updated timestamp(6) with time zone NOT NULL,
    account_id uuid,
    activity_id uuid,
    contact_id uuid,
    opportunity_id uuid
);

CREATE TABLE public.campaigns (
    campaign_id uuid NOT NULL,
    campaign_name character varying(255) NOT NULL,
    campaign_type character varying(50),
    date_created timestamp(6) with time zone NOT NULL,
    end_date timestamp(6) with time zone,
    last_updated timestamp(6) with time zone NOT NULL,
    start_date timestamp(6) with time zone,
    status character varying(20),
    owner_id uuid
);

CREATE TABLE public.contacts (
    contact_id uuid NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    email character varying(100),
    first_name character varying(50) NOT NULL,
    is_lead boolean,
    job_title character varying(100),
    last_name character varying(50) NOT NULL,
    last_updated timestamp(6) with time zone NOT NULL,
    metadata text,
    phone character varying(20),
    account_id uuid,
    owner_id uuid
);

CREATE TABLE public.memoes (
    memo_id uuid NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    last_updated timestamp(6) with time zone NOT NULL,
    memo_text text NOT NULL,
    related_to_id uuid NOT NULL,
    related_to_type character varying(50) NOT NULL,
    user_id uuid
);

CREATE TABLE public.opportunities (
    opportunity_id uuid NOT NULL,
    amount numeric(15,2),
    close_date date,
    date_created timestamp(6) with time zone NOT NULL,
    last_updated timestamp(6) with time zone NOT NULL,
    opportunity_name character varying(255) NOT NULL,
    stage character varying(50) NOT NULL,
    account_id uuid,
    contact_id uuid,
    owner_id uuid
);

CREATE SEQUENCE public.primary_sequence
    START WITH 10000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.products (
    product_id uuid NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    description text,
    last_updated timestamp(6) with time zone NOT NULL,
    price numeric(10,2),
    product_name character varying(255) NOT NULL,
    sku character varying(50) NOT NULL
);

CREATE TABLE public.users (
    user_id uuid NOT NULL,
    date_created timestamp(6) with time zone NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    last_updated timestamp(6) with time zone NOT NULL,
    password_hash character varying(255) NOT NULL,
    username character varying(50) NOT NULL
);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (activity_id);

ALTER TABLE ONLY public.activity_relations
    ADD CONSTRAINT activity_relations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (campaign_id);

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (contact_id);

ALTER TABLE ONLY public.memoes
    ADD CONSTRAINT memoes_pkey PRIMARY KEY (memo_id);

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT opportunities_pkey PRIMARY KEY (opportunity_id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY public.activity_relations
    ADD CONSTRAINT fk10vrght6mym0ixfxyqnxeks4j FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(opportunity_id);

ALTER TABLE ONLY public.activity_relations
    ADD CONSTRAINT fk5avo7bcboran6kvo87ncr36q3 FOREIGN KEY (contact_id) REFERENCES public.contacts(contact_id);

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT fk5gqptcylo65yohtvwxgxoiks2 FOREIGN KEY (contact_id) REFERENCES public.contacts(contact_id);

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT fk7cst2sq5afrt5q20ncfl3lfur FOREIGN KEY (owner_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.activity_relations
    ADD CONSTRAINT fk94xe54d9m3029yx4jte7vbd2n FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);

ALTER TABLE ONLY public.memoes
    ADD CONSTRAINT fk9fqst7ejdjlbmhgou7ipker2c FOREIGN KEY (user_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT fkeyutus9ng4fxunsxib6elbxrt FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);

ALTER TABLE ONLY public.activity_relations
    ADD CONSTRAINT fkfg7rpi98rg7yc7h1tvfsrshvm FOREIGN KEY (activity_id) REFERENCES public.activities(activity_id);

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT fkjln86358moqf5k5pw89oiq8ur FOREIGN KEY (owner_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT fkl4tvq8qk7x11e16v2cnp1mja8 FOREIGN KEY (account_id) REFERENCES public.accounts(account_id);

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT fkoiutkp49h48d50yr005tf2klm FOREIGN KEY (owner_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT fkppm1bi09wp1gwlyi876acgbn FOREIGN KEY (owner_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT fkspu9vhmjqtqa0x4lf3orn48x2 FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
