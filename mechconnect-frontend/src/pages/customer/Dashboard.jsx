import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "CUSTOMER";

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <div className="dashboard-content">
        <h1>Welcome to Customer Dashboard 👋</h1>
        <p>Here you can search mechanics, manage bookings, and view your profile.</p>
      </div>
    </div>
  );
};

export default Dashboard;
