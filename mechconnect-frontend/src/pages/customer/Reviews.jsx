import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetch = async () => {
    try {
      const res = await api.get("/reviews/customer");
      setReviews(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="app-container">
      <Sidebar roleProp="CUSTOMER" />
      <div className="main-content">
        <Navbar title="My Reviews" />
        <div className="dashboard-content">
          {reviews.length === 0 ? <p>No reviews</p> : reviews.map(r => (
            <div key={r.id} className="card">
              <p><strong>Mechanic:</strong> {r.mechanic?.name}</p>
              <p><strong>Rating:</strong> {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
