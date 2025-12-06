import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) return setMsg('Please select a role');
    setLoading(true);
    setMsg('');

    try {
      const user = await login({ email, password, roleSelection: role });
      if (user.role === 'CUSTOMER') navigate('/customer/dashboard');
      else if (user.role === 'MECHANIC') navigate('/mechanic/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      setMsg('Login failed. Check credentials or server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select role --</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MECHANIC">Mechanic</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? (
            <span className="loader border-t-2 border-b-2 border-white w-5 h-5 rounded-full animate-spin"></span>
          ) : (
            'Login'
          )}
        </button>

        {msg && <p className="text-red-500 text-center">{msg}</p>}

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
