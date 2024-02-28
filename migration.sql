-- Clear the table if they exist
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS clients;

-- Create the clients table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    other_details TEXT,
    hourly_rate NUMERIC(5,2)
);
-- Create the table
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    duration INTERVAL,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    client_id INTEGER REFERENCES clients(id),
    comments TEXT
);

-- Add the unique constraint to prevent duplicate record entries via POST method
ALTER TABLE clients ADD UNIQUE (first_name, last_name);



