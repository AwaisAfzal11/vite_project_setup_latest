import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-900 text-white text-center">
      © {new Date().getFullYear()} Digiopt Consulting
    </footer>
  );
};
export default Footer;