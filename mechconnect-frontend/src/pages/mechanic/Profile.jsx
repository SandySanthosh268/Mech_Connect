import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setProfile(user);
  }, []);

  // ✅ Required fields check
  const isProfileComplete = () => {
    return (
      profile.name &&
      profile.email &&
      profile.location &&
      profile.skill &&
      profile.experience > 0 &&
      profile.serviceType &&
      profile.price > 0
    );
  };

 const handleUpdate = async (e) => {
   e.preventDefault();

   if (!profile.id) {
     alert('❌ Mechanic ID missing. Please logout and login again.');
     return;
   }

   if (!isProfileComplete()) {
     alert('⚠️ Please fill all required fields');
     return;
   }

   // ✅ SEND ONLY MECHANIC FIELDS (NO token, NO role)
   const payload = {
     name: profile.name,
     skill: profile.skill,
     experience: profile.experience,
     serviceType: profile.serviceType,
     price: profile.price,
     location: profile.location,
   };

   try {
     const res = await fetch(`${API_BASE}/mechanics/${profile.id}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
       },
       body: JSON.stringify(payload),
     });

     if (!res.ok) {
       const text = await res.text();
       console.error('Backend error:', text);
       alert('❌ Update failed');
       return;
     }

     // ✅ USE BACKEND RESPONSE (IMPORTANT)
     const updatedMechanic = await res.json();

     localStorage.setItem('user', JSON.stringify(updatedMechanic));

     alert('✅ Profile updated successfully!');
     window.location.href = '/mechanic/dashboard';
   } catch (err) {
     console.error('Update error:', err);
     alert('❌ Server error');
   }
 };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar roleProp="MECHANIC" />

      <div className="flex-1 flex flex-col">
        <Navbar title="Profile" />

        <div className="flex-1 p-8">
          {!profile.profileCompleted && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-800">
              ⚠️ Complete your profile to access jobs & earnings
            </div>
          )}

          <form
            onSubmit={handleUpdate}
            className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Mechanic Profile</h2>

            {/* Name */}
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Full Name"
              className="input"
              required
            />

            {/* Email */}
            <input
              type="email"
              value={profile.email || ''}
              disabled
              className="input bg-gray-100 cursor-not-allowed"
            />

            {/* Phone */}
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Phone Number"
              className="input"
            />

            {/* Location */}
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Location"
              className="input"
              required
            />

            {/* Skill */}
            <input
              type="text"
              value={profile.skill || ''}
              onChange={(e) => setProfile({ ...profile, skill: e.target.value })}
              placeholder="Skill (e.g. Engine Repair, Brake Service)"
              className="input"
              required
            />

            {/* Experience */}
            <input
              type="number"
              min="0"
              value={profile.experience || ''}
              onChange={(e) => setProfile({ ...profile, experience: Number(e.target.value) })}
              placeholder="Experience (years)"
              className="input"
              required
            />

            {/* Service Type */}
            <select
              value={profile.serviceType || ''}
              onChange={(e) => setProfile({ ...profile, serviceType: e.target.value })}
              className="input"
              required
            >
              <option value="">Select Service Type</option>
              <option value="Bike">Bike</option>
              <option value="Car">Car</option>
              <option value="Both">Bike & Car</option>
            </select>

            {/* Price */}
            <input
              type="number"
              min="0"
              value={profile.price || ''}
              onChange={(e) => setProfile({ ...profile, price: Number(e.target.value) })}
              placeholder="Service Price (₹)"
              className="input"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
