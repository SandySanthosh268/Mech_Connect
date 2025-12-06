import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../api/axiosConfig';
import { getUserFromStorage } from '../../utils/authHelper';

const Profile = () => {
  const stored = getUserFromStorage();
  const [profile, setProfile] = useState(stored || {});

  useEffect(() => {
    // optionally fetch fresh profile from backend if API exists
    // e.g., api.get('/customers/me')
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/customers/${profile.id}`, profile);
      alert('Saved');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="CUSTOMER" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar title="Profile" />

        {/* Profile Form */}
        <div className="flex-1 p-8">
          <form
            onSubmit={handleSave}
            className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">Edit Profile</h2>

            <input
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
