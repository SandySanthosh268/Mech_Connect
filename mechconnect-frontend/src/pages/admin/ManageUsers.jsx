import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'CUSTOMER',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchUsers();
        setFormData({ name: '', email: '', role: 'CUSTOMER' });
      }
    } catch (err) {
      console.error('Add user error:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchUsers();
    } catch (err) {
      console.error('Delete user error:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="ADMIN" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Manage Users" />

        <div className="flex-1 p-8 space-y-8">
          {/* Add User Form */}
          <form
            onSubmit={handleAddUser}
            className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="MECHANIC">Mechanic</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add User
            </button>
          </form>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="px-4 py-2">{u.id}</td>
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-600 py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
