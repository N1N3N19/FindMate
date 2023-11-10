// AdminPanel.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css";
import Dashboard from "../Components/Dashboard";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          {/* Add more navigation links for other sections */}
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
