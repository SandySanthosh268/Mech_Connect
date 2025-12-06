import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Earnings = () => {
  const [earnings, setEarnings] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const res = await fetch(`${API_BASE}/earnings/mechanic`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setEarnings(data);
    } catch (err) {
      console.error('Error fetching earnings:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="MECHANIC" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="My Earnings" />

        <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {earnings ? (
            <>
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-600 font-medium">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.total}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-600 font-medium">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-800">{earnings.completedJobs}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-600 font-medium">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-800">₹{earnings.pending}</p>
              </div>
            </>
          ) : (
            <p className="col-span-full text-center text-gray-600">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
