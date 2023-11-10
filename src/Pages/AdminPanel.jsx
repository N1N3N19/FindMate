import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css"; // Create a CSS file for styling

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="ashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="all-users">All Users</Link>
          </li>
          <li>
            <Link to="feedback">Feedback</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
