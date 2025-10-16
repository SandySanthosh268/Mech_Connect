import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { API_BASE } from "../../utils/constants";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/reviews/mechanic`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="MECHANIC" />
      <div className="main-content">
        <Navbar title="My Reviews" />
        <div className="dashboard-content">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="review-card">
                <p><strong>Customer:</strong> {r.customer?.email}</p>
                <p><strong>Rating:</strong> {r.rating}</p>
                <p><strong>Comment:</strong> {r.comment}</p>
                <p><strong>Date:</strong> {new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
