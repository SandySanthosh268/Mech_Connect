import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../../utils/constants";
import "../../styles/auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    location: "",
    role: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      // ✅ Choose correct API endpoint
      let endpoint = "";
      if (form.role === "CUSTOMER")
        endpoint = `${API_BASE}/auth/register/customer`;
      else if (form.role === "MECHANIC")
        endpoint = `${API_BASE}/auth/register/mechanic`;
      else {
        setMsg("Please select a valid role");
        setLoading(false);
        return;
      }

      // ✅ Prepare data payload
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        location: form.location,
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMsg(data.message || "❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleRegister} className="auth-card">
        <h2>Register</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />

        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MECHANIC">Mechanic</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Register"}
        </button>

        <p className="msg">{msg}</p>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
