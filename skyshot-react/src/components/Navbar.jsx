import React from 'react';
import './Navbar.css';

const BASE_URL = import.meta.env.BASE_URL

const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

const Navbar = ({ navbarRef }) => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      const targetPosition = element.offsetTop - 20
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav ref={navbarRef} className="custom-navbar">
      <div className="navbar-container">
        <a 
          href="#top" 
          className="navbar-logo"
          onClick={(e) => handleSmoothScroll(e, '#top')}
        >
          <img 
            src={assetPath('assets/skyshot.png')} 
            alt="SkyShot Lab Logo" 
          />
        </a>
        <ul className="navbar-menu">
          <li>
            <a 
              href="#services" 
              onClick={(e) => handleSmoothScroll(e, '#services')}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#work" 
              onClick={(e) => handleSmoothScroll(e, '#work')}
            >
              Work
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

