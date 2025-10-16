import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { decodeJwt } from "../utils/authHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  useEffect(() => {
    if (token) {
      // try to decode token to get role/email if user not stored
      if (!user) {
        const payload = decodeJwt(token);
        if (payload) {
          const u = { email: payload.sub, role: payload.role };
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }
      }
    }
  }, [token]);

  const login = async ({ email, password, roleSelection }) => {
    // backend login may return plain text token or JSON { token: ... }
    const url = "/auth/login"; // axios baseURL will prefix /api
    const response = await api.post(url + `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    let t;
    if (typeof response.data === "string") t = response.data;
    else if (response.data?.token) t = response.data.token;
    else t = response.data; // fallback

    // save token
    localStorage.setItem("token", t);
    setToken(t);

    // set user: try decode token for role; fallback to selected role
    const payload = decodeJwt(t);
    const role = payload?.role || roleSelection || "CUSTOMER";
    const userObj = { email, role };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    return userObj;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
