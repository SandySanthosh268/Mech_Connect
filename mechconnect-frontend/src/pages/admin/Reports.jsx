import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { API_BASE } from '../../utils/constants';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar roleProp="ADMIN" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Reports" />

        <div className="flex-1 p-8">
          <h3 className="text-xl font-semibold mb-4">Booking & Service Reports</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Mechanic</th>
                  <th className="px-4 py-2 text-left">Service</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No reports found.
                    </td>
                  </tr>
                )}
                {reports.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{r.id}</td>
                    <td className="px-4 py-2">{r.customer?.email}</td>
                    <td className="px-4 py-2">{r.mechanic?.email}</td>
                    <td className="px-4 py-2">{r.serviceType}</td>
                    <td className="px-4 py-2">{r.status}</td>
                    <td className="px-4 py-2">{new Date(r.bookingDate).toLocaleString()}</td>
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

export default Reports;
