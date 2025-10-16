import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs/mechanic`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const completeJob = async (id) => {
    if (!window.confirm("Mark this job as completed?")) return;
    try {
      await fetch(`${API_BASE}/jobs/update/${id}?status=COMPLETED`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });
      fetchJobs();
    } catch (err) {
      alert("Failed to update job");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role="MECHANIC" />
      <div className="dashboard-content">
        <h2>My Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs assigned.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <p><strong>Customer:</strong> {job.customer?.email}</p>
              <p><strong>Service:</strong> {job.serviceType}</p>
              <p><strong>Date:</strong> {new Date(job.bookingDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {job.status}</p>
              {job.status !== "COMPLETED" && (
                <button onClick={() => completeJob(job.id)}>Mark Completed</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
