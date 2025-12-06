import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setProfile(user);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/mechanics/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) alert('Profile updated successfully!');
      else alert('Update failed');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="MECHANIC" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Profile" />

        {/* Profile Form */}
        <div className="flex-1 p-8">
          <form
            onSubmit={handleUpdate}
            className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">Edit Profile</h2>

            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
