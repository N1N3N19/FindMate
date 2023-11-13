// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Analytics from './Components/Dashboard/Analytics/Analytics';
import Users from './Components/User/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
