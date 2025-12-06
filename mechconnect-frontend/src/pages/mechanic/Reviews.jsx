import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/reviews/mechanic`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="MECHANIC" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="My Reviews" />

        <div className="flex-1 p-8 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-white shadow-md rounded-lg p-6 space-y-2">
                <p className="text-gray-700">
                  <strong>Customer:</strong> {r.customer?.email || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <strong>Rating:</strong> {r.rating}
                </p>
                <p className="text-gray-700">
                  <strong>Comment:</strong> {r.comment}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Date:</strong> {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
