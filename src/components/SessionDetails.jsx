// src/components/SessionDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SessionDetails() {
    const { sessionId } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/sessions/${sessionId}`);
                setSession(response.data);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        fetchSession();
    }, [sessionId]);

    if (!session) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Session Details</h2>
            <p>Started At: {session.started_at}</p>
            <p>Ended At: {session.ended_at}</p>
            <p>Comments: {session.comments}</p>
        </div>
    );
}

export default SessionDetails;
