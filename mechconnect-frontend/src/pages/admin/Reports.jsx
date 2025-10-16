import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <Navbar title="Reports" />
        <div className="dashboard-content">
          <h3>Booking & Service Reports</h3>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Mechanic</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.customer?.email}</td>
                    <td>{r.mechanic?.email}</td>
                    <td>{r.serviceType}</td>
                    <td>{r.status}</td>
                    <td>{new Date(r.bookingDate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
