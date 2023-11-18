import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Feedback from './Components/Dashboard/Feedback/Feedback';
import Sidebar from './Components/Dashboard/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Users from './Components/User/Users';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/*"
          element={(
            <Sidebar>
              <Routes>
                <Route path="/users" element={<Users />} />
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