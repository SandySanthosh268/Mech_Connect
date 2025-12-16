import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');

    // 🔐 Not logged in
    if (!userStr) {
      window.location.href = '/login';
      return;
    }

    const user = JSON.parse(userStr);

    // 🔐 Role check (extra safety)
    if (user.role !== 'MECHANIC') {
      window.location.href = '/unauthorized';
      return;
    }

    // 🚨 FORCE PROFILE UPDATE
    if (user.profileCompleted==0||false) {
      window.location.href = '/mechanic/profile';
      return;
    }

    // ✅ All good
    setMechanic(user);
    setLoading(false);
  }, []);

  // ⏳ Prevent flicker before redirect
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="MECHANIC" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {mechanic.email} 👷</h1>

        <p className="text-gray-600 text-lg mb-6">
          Here you can see your jobs, earnings, and reviews.
        </p>

        {/* 🚀 Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Jobs</h3>
            <p className="text-gray-600">View and manage your assigned jobs</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Earnings</h3>
            <p className="text-gray-600">Track your income and payments</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            <p className="text-gray-600">See customer feedback & ratings</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
