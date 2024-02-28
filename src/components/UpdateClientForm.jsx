import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateClientForm() {
    const { clientId } = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        other_details: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                // Add the full URL for the API request
                const response = await axios.get(`http://localhost:3000/api/clients/${clientId}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };
        fetchClient();
    }, [clientId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add the full URL for the API request
            await axios.patch(`http://localhost:3000/api/clients/${clientId}`, formData);
            navigate(`/clients/${clientId}`);
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    return (
        <div className="update-client-form-container">
            <h2>Update Client</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
                <textarea name="other_details" placeholder="Other Details" value={formData.other_details}
                    onChange={handleChange}></textarea>
                <button type="submit">Update Client</button>
            </form>
        </div>
    );
}

export default UpdateClientForm;
