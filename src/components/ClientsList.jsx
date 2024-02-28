import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClientsList() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clients');
                console.log('Fetched clients:', response.data); // Log fetched clients
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div>
            <h2>Clients List</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <Link to={`/clients/${client.id}`}>{client.first_name} {client.last_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default ClientsList;
