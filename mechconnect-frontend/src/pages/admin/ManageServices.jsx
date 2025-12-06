import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: 0 });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE}/services`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchServices();
        setFormData({ name: '', price: 0 });
      }
    } catch (err) {
      console.error('Add service error:', err);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await fetch(`${API_BASE}/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchServices();
    } catch (err) {
      console.error('Delete service error:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="ADMIN" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Manage Services" />

        <div className="flex-1 p-8 space-y-8">
          {/* Add Service Form */}
          <form
            onSubmit={handleAddService}
            className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value),
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Service
            </button>
          </form>

          {/* Services Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="px-4 py-2">{s.id}</td>
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2">₹{s.price}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-600 py-4">
                      No services available.
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

export default ManageServices;
