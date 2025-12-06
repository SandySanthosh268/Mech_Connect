import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../../utils/constants';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    location: '',
    role: '',
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      let endpoint = '';
      if (form.role === 'CUSTOMER') endpoint = `${API_BASE}/auth/register/customer`;
      else if (form.role === 'MECHANIC') endpoint = `${API_BASE}/auth/register/mechanic`;
      else {
        setMsg('Please select a valid role');
        setLoading(false);
        return;
      }

      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        location: form.location,
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg('✅ Registration successful!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMsg(data.message || '❌ Registration failed');
      }
    } catch (err) {
      console.error(err);
      setMsg('⚠️ Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Role --</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MECHANIC">Mechanic</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            'Register'
          )}
        </button>

        {msg && <p className="text-center text-red-500">{msg}</p>}

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
