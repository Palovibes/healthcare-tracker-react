// import './App.css'
import express from 'express';
import React from 'react';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const app = express();

// Define the DB URL, either from my enviroment var or a default value 
// const DB_URL = process.env.REMOTE_URL
// console.log(`Database URL: ${DB_URL}`);

// Initialize a new pool using the DB URL
const client = new pg.Pool({ 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
await client.connect(); // Connect to the DB

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing    
app.use(express.static('public')); // Serve static files from the 'public' directory 

// Routes/CRUD Operations

// POST route to add a new client
app.post('/api/clients', async (req, res) => { // Define a new POST route
    try {
        // Extract client data from the request body
        const { first_name, last_name, email, phone_number, other_details } = req.body; // extract client data from the request body

        // Validate client data
        if (!first_name || !last_name || !email || !other_details || Number.isNaN(phone_number)) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Insert the new client into the DB
        const result = await client.query(
            `INSERT INTO clients (first_name, last_name, email, phone_number, other_details) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, email, phone_number, other_details] // pass the client data as parameters
        );

        // send back the newly created client
        const newClient = result.rows[0]; // extract the new client from the query result
        delete newClient.id; // remove the ID field from the response
        res.json(newClient); // send the new client as a JSON response
    }
    catch (error) {
        console.error('Error in adding a new client:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
});


// DELETE route to delete a client
app.delete('api/clients/:clientId', async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId); // extract the client ID from the request parameters

        // Validate client ID
        if (!Number.isInteger(clientId) || clientId <= 0) {
            return res.status(400).json({ error: 'Please provide a valid client ID' });
        }

        const result = await client.query('DELETE FROM clients WHERE id = $1', [clientId]); // delete the client from the DB

        if (result.rowCount > 0) {
            res.json({ message: 'Client deleted successfully' }); // send a success message
        }
        else {
            res.status(404).json({ error: 'Client not found' }); // send a not found error
        }
    }
    catch {
        console.error('Error in deleting a client:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
})

// GET route to fetch all clients
app.get('api/clients', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM clients'); // fetch all clients from the DB
        console.log(`All clients: \n, ${JSON.stringify(result.rows, null, 2)}`);
        res.json(result.rows); // send the clients as a JSON response
    }
    catch (error) {
        console.error('Error fetching clients:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
});

// GET route to fetch a single client 
app.get('api/clients/:cliendId', async (req, res) => {
    try {
        const clientId = Number.parseInt(req.params.clientId); // extract the client ID from the request parameters
        const result = await client.query(`
        SELECT id, fist_name, last_name, email, phone_number, other_details
        FROM clients
        WHERE id = $1
        `, [clientId]); // fetch the client from the DB

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Client not found' }); // send a not found error
        }
        console.log("Using clientId: ", clientId);
        res.json(result.rows[0]); // send the client as a JSON response
    }
    catch (error) {
        console.error('Error fetching client:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
})


// GET Route to fetch all sessions
app.get('/api/sessions', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM sessions'); // fetch all sessions from the DB
        console.log(`All sessions: \n, ${JSON.stringify(result.rows, null, 2)}`);
        res.json(result.rows); // send the sessions as a JSON response
    }
    catch (error) {
        console.error('Error fetching sessions:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
})


// PATCH route to update only fields user wants to update
app.patch('/api/clients/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params; // extract the client ID from the request parameters
        const { first_name, last_name, email, phone_number, other_details } = req.body; // extract client data from the request body

        // Check if at least one field is provided for the update
        if (!(first_name || last_name || email || phone_number || other_details)) {
            return res.status(400).json({ error: 'Please provide at least one field to update' });
        }

        // SQL query to update the client
        // COALESCE function is used to update only the fields that are provided
        const query = `
        UPDATE clients
        SET first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            phone_number = COALESCE($4, phone_number),
            other_details = COALESCE($5, other_details)
        WHERE id = $6
        RETURNING *
        `;
        const values = [first_name, last_name, email, phone_number, other_details, clientId]; // pass the client data as parameters
        const result = await client.query(query, values); // update the client in the DB

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Client not found' }); // send a not found error
        }
        res.status(200).json(result.rows[0]); // send the updated client as a JSON response
    }
    catch (error) {
        console.error('Error updating client:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
})

// PUT route to replace entire client information
app.put('/api/clients/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params; // extract the client ID from the request parameters
        const updatedClient = req.body; // extract the updated client data from the request body

        // Validate incoming data 
        if (!updatedClient || !updatedClient.first_name || !updatedClient.last_name || !updatedClient.email || !updatedClient.other_details || Number.isNaN(updatedClient.phone_number)) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Build SQL query for UPDATE
        const query = `
        UPDATE clients
        SET first_name = $1,
            last_name = $2,
            email = $3,
            phone_number = $4,
            other_details = $5
        WHERE id = $6
        RETURNING *
        `;
        const values = [updatedClient.first_name, updatedClient.last_name, updatedClient.email, updatedClient.phone_number, updatedClient.other_details, clientId]; // pass the client data as parameters   

        // Execute query and handle response
        const result = await client.query(query, values); // update the client in the DB

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Client not found' }); // send a not found error
        }
        res.status(200).json(result.rows[0]); // send the updated client as a JSON response
    }
    catch (error) {
        console.error('Error updating client:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
});


// Route for recording hours of health care (POST)
app.post('/api/hours', async (req, res) => {
    try {
        // extract data from request body
        const { client_id, duration, started_at, ended_at, comments } = req.body;
        // validate incoming data
        if (!client_id || !duration || !started_at || !ended_at) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        // Inset the recorded hours into the sessions table
        const query = 'INSERT INTO sessions (client_id, duration, started_at, ended_at, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [client_id, duration, started_at, ended_at, comments];
        const result = await client.query(query, values); // insert the session into the DB
        // Respond with success message
        res.status(201).json({ message: 'Hours recorded successfully', recorded_hours: result.rows[0] });
    }
    catch (error) {
        console.error('Error recording hours:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
    finally {
        await client.end(); // close the DB connection
    }
});

// Define a GET route for calculating earnings for a client 
app.get('/api/clients/:clientId/earnings', async (req, res) => {
    try {
        const clientId = Number.parseInt(req.params.clientId); // extract the client ID from the request parameters

        const result = await client.query(`
            SELECT 
                c.id, 
                c.first_name, 
                c.last_name, 
                '$' || ROUND(SUM(EXTRACT(epoch FROM s.duration) / 3600 * c.hourly_rate), 2) AS total_earnings
            FROM clients c
            JOIN sessions s ON c.id = s.client_id
            WHERE c.id = $1
            GROUP BY c.id
        `, [clientId]); // calculate the client earnings from the DB

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Client not found or no sessions recorded' }); // send a not found error
        } else {
            res.json(result.rows[0]); // send the client earnings as a JSON response
        }
    } catch (error) {
        console.error('Error fetching client earnings:', error); // log error for debugging
        res.status(500).json({ error: 'Something went wrong' }); // send back a generic error message
    }
});



// test port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
