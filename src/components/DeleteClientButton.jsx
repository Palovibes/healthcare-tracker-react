import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteClientButton({ clientId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/clients/${clientId}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return (
        <button onClick={handleDelete}>Delete Client</button>
    );
}

export default DeleteClientButton;
