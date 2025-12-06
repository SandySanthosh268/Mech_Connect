import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import api from '../../api/axiosConfig';

const Search = () => {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get('/mechanics/search', {
        params: { serviceType, location },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="CUSTOMER" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Search Mechanics" />

        <div className="flex-1 p-8 space-y-6">
          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto"
          >
            <input
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="Service (Bike/Car)"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., Chennai)"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No mechanics found.</p>
            ) : (
              results.map((m) => (
                <div
                  className="bg-white shadow-md rounded-lg p-4 space-y-2 flex flex-col justify-between"
                  key={m.id}
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{m.name}</h4>
                    <p className="text-gray-600">
                      {m.serviceType} • {m.location}
                    </p>
                    <p className="text-gray-600">
                      ₹{m.price} • Rating: {m.rating ?? 'N/A'}
                    </p>
                  </div>
                  <button className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition-colors">
                    Book
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
