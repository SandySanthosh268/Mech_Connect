import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: 0 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE}/services`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchServices();
        setFormData({ name: "", price: 0 });
      }
    } catch (err) {
      console.error("Add service error:", err);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await fetch(`${API_BASE}/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      fetchServices();
    } catch (err) {
      console.error("Delete service error:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <Navbar title="Manage Services" />
        <div className="dashboard-content">

          <form onSubmit={handleAddService} className="form">
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />
            <button type="submit">Add Service</button>
          </form>

          <h3>Service List</h3>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>₹{s.price}</td>
                    <td>
                      <button onClick={() => handleDeleteService(s.id)}>Delete</button>
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

export default ManageServices;
