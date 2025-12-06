import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setAdmin(user);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="ADMIN" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Admin Dashboard" />

        <div className="flex-1 p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {admin?.email || 'Admin'}
            </h1>
            <p className="text-gray-600 text-lg">
              Select an option from the sidebar to manage the platform.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-gray-600 font-medium">Total Users</h3>
              <p className="text-2xl font-bold text-gray-800">--</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-gray-600 font-medium">Total Mechanics</h3>
              <p className="text-2xl font-bold text-gray-800">--</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-gray-600 font-medium">Total Services</h3>
              <p className="text-2xl font-bold text-gray-800">--</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h3 className="text-gray-600 font-medium">Reports</h3>
              <p className="text-2xl font-bold text-gray-800">--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
