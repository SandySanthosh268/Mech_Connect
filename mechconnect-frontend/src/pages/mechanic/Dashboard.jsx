import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [mechanic, setMechanic] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setMechanic(user);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="MECHANIC" />
      <div className="dashboard-content">
        <h1>Welcome, {mechanic?.email} 👷</h1>
        <p>Here you can see your jobs, earnings, and reviews.</p>
      </div>
    </div>
  );
};

export default Dashboard;
