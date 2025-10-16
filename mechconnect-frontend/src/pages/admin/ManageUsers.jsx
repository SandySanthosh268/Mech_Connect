import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "CUSTOMER" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchUsers();
        setFormData({ name: "", email: "", role: "CUSTOMER" });
      }
    } catch (err) {
      console.error("Add user error:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      fetchUsers();
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <Navbar title="Manage Users" />
        <div className="dashboard-content">

          <form onSubmit={handleAddUser} className="form">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="MECHANIC">Mechanic</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button type="submit">Add User</button>
          </form>

          <h3>User List</h3>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
