import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div className="font-bold text-xl">Digiopt</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/contact" className="hover:text-blue-300">Contact</Link>
      </div>
    </nav>
  );
};
export default Navbar;