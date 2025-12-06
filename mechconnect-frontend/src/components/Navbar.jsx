import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="text-gray-600 font-medium">{user?.email || 'Guest'}</div>
    </header>
  );
};

export default Navbar;
