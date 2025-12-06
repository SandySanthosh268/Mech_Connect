import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../api/axiosConfig';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetch = async () => {
    try {
      const res = await api.get('/reviews/customer');
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="CUSTOMER" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="My Reviews" />

        <div className="flex-1 p-8 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No reviews</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-white shadow-md rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Mechanic:</strong> {r.mechanic?.name || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Rating:</strong> {r.rating}
                </p>
                <p className="text-gray-600">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
