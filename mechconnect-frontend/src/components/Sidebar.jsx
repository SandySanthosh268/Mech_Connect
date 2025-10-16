import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ roleProp }) => {
  const { user, logout } = useContext(AuthContext);
  const role = (roleProp || user?.role || "CUSTOMER").toUpperCase();

  const menu = {
    CUSTOMER: [
      { name: "Dashboard", path: "/customer/dashboard" },
      { name: "Search Mechanics", path: "/customer/search" },
      { name: "My Bookings", path: "/customer/bookings" },
      { name: "My Reviews", path: "/customer/reviews" },
      { name: "Profile", path: "/customer/profile" },
    ],
    MECHANIC: [
      { name: "Dashboard", path: "/mechanic/dashboard" },
      { name: "Jobs", path: "/mechanic/jobs" },
      { name: "Earnings", path: "/mechanic/earnings" },
      { name: "Profile", path: "/mechanic/profile" },
    ],
    ADMIN: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Manage Users", path: "/admin/manage-users" },
      { name: "Manage Services", path: "/admin/manage-services" },
      { name: "Reports", path: "/admin/reports" },
    ],
  };

  return (
    <aside className="sidebar">
      <h3>{role === "ADMIN" ? "Admin Panel" : "MechConnect"}</h3>
      <ul>
        {menu[role]?.map((it) => (
          <li key={it.path}>
            <NavLink to={it.path} className={({ isActive }) => (isActive ? "active" : "")}>
              {it.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="logout-btn" onClick={logout}>🚪 Logout</button>
    </aside>
  );
};

export default Sidebar;
