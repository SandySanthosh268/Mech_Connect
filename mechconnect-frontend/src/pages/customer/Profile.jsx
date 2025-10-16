import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";
import { getUserFromStorage } from "../../utils/authHelper";

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
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="app-container">
      <Sidebar roleProp="CUSTOMER" />
      <div className="main-content">
        <Navbar title="Profile" />
        <div className="dashboard-content">
          <form onSubmit={handleSave} className="profile-form">
            <input value={profile.name || ""} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Name" />
            <input value={profile.email || ""} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="Email" />
            <input value={profile.phone || ""} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="Phone" />
            <input value={profile.location || ""} onChange={e => setProfile({...profile, location: e.target.value})} placeholder="Location" />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
