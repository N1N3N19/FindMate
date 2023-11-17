import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Analytics from './Components/Dashboard/Analytics/Analytics';
import Users from './Components/User/Users';
import Feedback from './Components/Dashboard/Feedback/Feedback';
import Sidebar from './Components/Dashboard/Sidebar/Sidebar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login without Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Sidebar containing Dashboard, Users, Analytics, Feedback */}
        <Route
          path="/*"
          element={(
            <Sidebar>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/feedback" element={<Feedback />} />
              </Routes>
            </Sidebar>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
