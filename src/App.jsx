import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import AdminPanel from "./Pages/AdminPanel";
import Dashboard from "./Components/Dashboard";
import AllUsers from "./Components/AllUsers";
import Feedback from "./Components/Feedback";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminPanel>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="all-users" element={<AllUsers />} />
                <Route path="feedback" element={<Feedback />} />
              </AdminPanel>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
