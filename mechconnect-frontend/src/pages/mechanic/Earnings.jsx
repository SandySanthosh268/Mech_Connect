import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await fetch(`${API_BASE}/earnings/mechanic`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setEarnings(data);
    } catch (err) {
      console.error("Error fetching earnings:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="MECHANIC" />
      <div className="main-content">
        <Navbar title="My Earnings" />
        <div className="dashboard-content">
          {earnings ? (
            <>
              <p><strong>Total Earnings:</strong> ₹{earnings.total}</p>
              <p><strong>Completed Jobs:</strong> {earnings.completedJobs}</p>
              <p><strong>Pending Payments:</strong> ₹{earnings.pending}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
