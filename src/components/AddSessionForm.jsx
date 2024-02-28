import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddSessionForm() {
    const [formData, setFormData] = useState({
        client_id: '',
        duration: '',
        started_at: '',
        ended_at: '',
        comments: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/hours', formData);
            navigate('/');
        } catch (error) {
            console.error('Error adding session:', error);
        }
    };

    return (
        <div className="add-session-form-container">
            <h2>Add Session</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="client_id" placeholder="Client ID" value={formData.client_id} onChange={handleChange} required />
                <input type="text" name="duration" placeholder="Duration (HH:MM:SS)" value={formData.duration} onChange={handleChange} required />
                <input type="text" name="started_at" placeholder="Start Time (YYYY-MM-DD HH:MM:SS)" value={formData.started_at} onChange={handleChange} required />
                <input type="text" name="ended_at" placeholder="End Time (YYYY-MM-DD HH:MM:SS)" value={formData.ended_at} onChange={handleChange} required />
                <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange}></textarea>
                <button type="submit">Add Session</button>
            </form>
        </div>
    );
}

export default AddSessionForm;
