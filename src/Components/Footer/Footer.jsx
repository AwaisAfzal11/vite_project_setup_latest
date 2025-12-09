import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-900 text-white text-center">
      © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
    </footer>
  );
};
export default Footer;