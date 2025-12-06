import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../api/axiosConfig';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/customer');
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/update/${id}`, null, { params: { status } });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="CUSTOMER" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="My Bookings" />

        <div className="flex-1 p-8 space-y-6">
          {bookings.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No bookings</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="bg-white shadow-md rounded-lg p-6 space-y-2">
                <h4 className="text-xl font-semibold text-gray-800">{b.serviceType}</h4>
                <p className="text-gray-600">Mechanic: {b.mechanic?.name || 'N/A'}</p>
                <p className="text-gray-600">Date: {new Date(b.bookingDate).toLocaleString()}</p>
                <p className="text-gray-600">Status: {b.status}</p>
                {b.status === 'REQUESTED' && (
                  <button
                    onClick={() => updateStatus(b.id, 'CANCELLED')}
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
