import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = ({ roleProp }) => {
  const { user, logout } = useContext(AuthContext);
  const role = (roleProp || user?.role || 'CUSTOMER').toUpperCase();

  const menu = {
    CUSTOMER: [
      { name: 'Dashboard', path: '/customer/dashboard' },
      { name: 'Search Mechanics', path: '/customer/search' },
      { name: 'My Bookings', path: '/customer/bookings' },
      { name: 'My Reviews', path: '/customer/reviews' },
      { name: 'Profile', path: '/customer/profile' },
    ],
    MECHANIC: [
      { name: 'Dashboard', path: '/mechanic/dashboard' },
      { name: 'Jobs', path: '/mechanic/jobs' },
      { name: 'Earnings', path: '/mechanic/earnings' },
      { name: 'Profile', path: '/mechanic/profile' },
    ],
    ADMIN: [
      { name: 'Dashboard', path: '/admin/dashboard' },
      { name: 'Manage Users', path: '/admin/manage-users' },
      { name: 'Manage Services', path: '/admin/manage-services' },
      { name: 'Reports', path: '/admin/reports' },
    ],
  };

  return (
    <aside className="bg-gray-800 text-gray-100 w-64 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-8">
          {role === 'ADMIN' ? 'Admin Panel' : 'MechConnect'}
        </h3>
        <ul className="space-y-2">
          {menu[role]?.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-blue-600 font-semibold' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={logout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors flex items-center justify-center"
      >
        🚪 Logout
      </button>
    </aside>
  );
};

export default Sidebar;
