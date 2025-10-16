import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Get admin info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setAdmin(user);
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar with role="ADMIN" */}
      <Sidebar role="ADMIN" />

      <div className="main-content">
        <Navbar title="Admin Dashboard" />

        <div className="dashboard-content">
          <h1>Welcome, {admin?.email || "Admin"}</h1>
          <p>Select an option from the sidebar to manage the platform.</p>

          <div className="admin-overview">
            <div className="card">
              <h3>Total Users</h3>
              <p>--</p>
            </div>
            <div className="card">
              <h3>Total Mechanics</h3>
              <p>--</p>
            </div>
            <div className="card">
              <h3>Total Services</h3>
              <p>--</p>
            </div>
            <div className="card">
              <h3>Reports</h3>
              <p>--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
