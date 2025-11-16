import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) return setMsg("Please select a role");
    setLoading(true);
    setMsg("");

    try {
      const user = await login({ email, password, roleSelection: role });
      if (user.role === "CUSTOMER") navigate("/customer/dashboard");
      else if (user.role === "MECHANIC") navigate("/mechanic/dashboard");
      else navigate("/admin/dashboard");
    } catch (err) {
      setMsg("Login failed. Check credentials or server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleLogin} className="auth-card">
        <h2>Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">-- Select role --</option>
          <option value="CUSTOMER">Customer</option>
          <option value="MECHANIC">Mechanic</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Login"}
        </button>

        <p className="msg">{msg}</p>
        <p className="switch-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
