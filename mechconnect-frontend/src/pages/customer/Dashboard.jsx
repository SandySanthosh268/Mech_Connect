import React from 'react';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'CUSTOMER';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Customer Dashboard 👋</h1>
        <p className="text-gray-600 text-lg">
          Here you can search mechanics, manage bookings, and view your profile.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
