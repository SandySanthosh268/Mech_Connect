import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/customer");
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/update/${id}`, null, { params: { status } });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar roleProp="CUSTOMER" />
      <div className="main-content">
        <Navbar title="My Bookings" />
        <div className="dashboard-content">
          {bookings.length === 0 ? <p>No bookings</p> : bookings.map(b => (
            <div key={b.id} className="card">
              <h4>{b.serviceType}</h4>
              <p>Mechanic: {b.mechanic?.name}</p>
              <p>Date: {new Date(b.bookingDate).toLocaleString()}</p>
              <p>Status: {b.status}</p>
              {b.status === "REQUESTED" && <button onClick={() => updateStatus(b.id, "CANCELLED")}>Cancel</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
