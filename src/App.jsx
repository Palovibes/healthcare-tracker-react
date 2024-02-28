import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsList from './components/ClientsList';
import ClientDetails from './components/ClientDetails';
import AddSessionForm from './components/AddSessionForm';
import UpdateClientForm from './components/UpdateClientForm';
import SessionsList from './components/SessionsList';
import SessionDetails from './components/SessionDetails';

import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/clients/:clientId" element={<ClientDetails />} />
        <Route path="/add-session" element={<AddSessionForm />} />
        <Route path="/update-client/:clientId" element={<UpdateClientForm />} />
        <Route path="/sessions" element={<SessionsList />} />
        <Route path="/sessions/:sessionId" element={<SessionDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
