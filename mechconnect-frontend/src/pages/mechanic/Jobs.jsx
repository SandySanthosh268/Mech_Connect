import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_BASE}/jobs/mechanic`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const completeJob = async (id) => {
    if (!window.confirm('Mark this job as completed?')) return;
    try {
      await fetch(`${API_BASE}/jobs/update/${id}?status=COMPLETED`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchJobs();
    } catch (err) {
      alert('Failed to update job');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="MECHANIC" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="My Jobs" />

        <div className="flex-1 p-8 space-y-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No jobs assigned.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white shadow-md rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Customer:</strong> {job.customer?.email || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Service:</strong> {job.serviceType}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {new Date(job.bookingDate).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {job.status}
                </p>
                {job.status !== 'COMPLETED' && (
                  <button
                    onClick={() => completeJob(job.id)}
                    className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
