import React from 'react';
import './Navbar.css';

const BASE_URL = import.meta.env.BASE_URL

const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <img 
        src={assetPath('skyshot-logo/skyshot-logo.png')} 
        alt="SkyShot Lab Logo" 
        className="navbar-logo" 
      />
      {/* Si querés agregar botones, se pueden poner acá */}
    </nav>
  );
};

export default Navbar;

