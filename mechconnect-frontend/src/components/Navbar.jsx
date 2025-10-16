import React, { useContext } from "react";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ title }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="navbar">
      <h2>{title}</h2>
      <div className="user-info">{user?.email || "Guest"}</div>
    </header>
  );
};

export default Navbar;
