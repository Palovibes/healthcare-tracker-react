import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClientDetails() {
    const { clientId } = useParams();
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/clients/${clientId}`);
                setClient(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };
        fetchClient();
    }, [clientId]);

    if (!client) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Client Details</h2>
            <p>First Name: {client.first_name}</p>
            <p>Last Name: {client.last_name}</p>
            <p>Email: {client.email}</p>
            <p>Phone Number: {client.phone_number}</p>
            <p>Other Details: {client.other_details}</p>
            <p>Hourly Rate: {client.hourly_rate}</p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default ClientDetails;
