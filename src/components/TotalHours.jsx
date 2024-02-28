import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TotalHours() {
    const [totalHours, setTotalHours] = useState('');
    const [totalEarnings, setTotalEarnings] = useState('');

    useEffect(() => {
        const fetchTotalHours = async () => {
            try {
                const response = await axios.get('/api/clients/:clientId/earnings');
                setTotalHours(response.data.total_hours);
                setTotalEarnings(response.data.total_earnings);
            } catch (error) {
                console.error('Error fetching total hours:', error);
            }
        };
        fetchTotalHours();
    }, []);

    return (
        <div className="total-hours-container">
            <h2>Total Hours and Earnings</h2>
            <p>Total Hours Worked: {totalHours}</p>
            <p>Total Earnings: ${totalEarnings}</p>
        </div>
    );
}

export default TotalHours;
