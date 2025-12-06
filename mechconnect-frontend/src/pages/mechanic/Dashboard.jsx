import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const [mechanic, setMechanic] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setMechanic(user);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="MECHANIC" />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {mechanic?.email} 👷</h1>
        <p className="text-gray-600 text-lg">Here you can see your jobs, earnings, and reviews.</p>
      </main>
    </div>
  );
};

export default Dashboard;
