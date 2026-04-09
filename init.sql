CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS candidates (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name text,
    last_name text,
    email text,
    phone text,
    university text,
    field_of_study text,
    graduation_year integer,
    skills text[],
    resume_url text,
    qr_code text,
    status text,
    created_at timestamp without time zone DEFAULT now(),
    public_id text
);

CREATE TABLE IF NOT EXISTS companies (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text,
    email text,
    booth_slot text,
    status text,
    created_at timestamp without time zone DEFAULT now(),
    images text,
    clerk_user_id text
);

CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text,
    organizer text,
    description text,
    event_type text,
    eligibility text,
    location text,
    venue text,
    hero_image text,
    status text,
    created_at timestamp without time zone DEFAULT now(),
    participants_count integer DEFAULT 0,
    available_tickets integer,
    event_date timestamp without time zone,
    event_time time without time zone
);

CREATE TABLE IF NOT EXISTS company_candidates (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id uuid REFERENCES companies(id),
    candidate_id uuid REFERENCES candidates(id),
    scanned_at timestamp without time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS event_candidates (
    event_id uuid REFERENCES events(id),
    candidate_id uuid REFERENCES candidates(id),
    registered_at timestamp without time zone DEFAULT now(),
    PRIMARY KEY (event_id, candidate_id)
);

CREATE TABLE IF NOT EXISTS event_companies (
    event_id uuid REFERENCES events(id),
    company_id uuid REFERENCES companies(id),
    PRIMARY KEY (event_id, company_id)
);

CREATE TABLE IF NOT EXISTS event_photos (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id uuid REFERENCES events(id),
    image_url text
);

CREATE TABLE IF NOT EXISTS speakers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id uuid REFERENCES events(id),
    name text,
    title text,
    image_url text,
    instagram text,
    linkedin text
);
