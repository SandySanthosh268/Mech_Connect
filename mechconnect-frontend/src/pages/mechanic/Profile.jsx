import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setProfile(user);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/mechanics/${profile.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify(profile),
      });
      if (res.ok) alert("Profile updated successfully!");
      else alert("Update failed");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="MECHANIC" />
      <div className="main-content">
        <Navbar title="Profile" />
        <div className="dashboard-content">
          <form onSubmit={handleUpdate} className="profile-form">
            <input
              type="text"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              type="text"
              value={profile.location || ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Location"
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
