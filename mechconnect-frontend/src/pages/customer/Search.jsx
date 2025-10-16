import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../api/axiosConfig";

const Search = () => {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get("/mechanics/search", {
        params: { serviceType, location },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    }
  };

  return (
    <div className="app-container">
      <Sidebar roleProp="CUSTOMER" />
      <div className="main-content">
        <Navbar title="Search Mechanics" />
        <div className="dashboard-content">
          <form onSubmit={handleSearch} className="search-form">
            <input value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder="Service (Bike/Car)" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (e.g., Chennai)" />
            <button type="submit">Search</button>
          </form>

          <div className="results">
            {results.length === 0 ? <p>No mechanics found.</p> : results.map((m) => (
              <div className="card" key={m.id}>
                <h4>{m.name}</h4>
                <p>{m.serviceType} • {m.location}</p>
                <p>₹{m.price} • Rating: {m.rating ?? "N/A"}</p>
                <button>Book</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
