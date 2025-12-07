import './Navbar.css'
import { assetPath } from '../utils/assetPath'

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
          aria-label="Go to top"
        >
          <img 
            src={assetPath('assets/skyshot.png')} 
            alt="SkyShot Lab Logo" 
            width="100"
            height="100"
            loading="eager"
          />
        </a>
        <ul className="navbar-menu" role="menubar">
          <li role="none">
            <a 
              href="#services" 
              onClick={(e) => handleSmoothScroll(e, '#services')}
              role="menuitem"
            >
              Services
            </a>
          </li>
          <li role="none">
            <a 
              href="#work" 
              onClick={(e) => handleSmoothScroll(e, '#work')}
              role="menuitem"
            >
              Work
            </a>
          </li>
          <li role="none">
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              role="menuitem"
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

