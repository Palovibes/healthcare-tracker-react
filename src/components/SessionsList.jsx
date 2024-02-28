import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SessionsList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/sessions')
      .then(response => setSessions(response.data))
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <Link to={`/sessions/${session.id}`}>
              {session.started_at} - {session.ended_at}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionsList;
