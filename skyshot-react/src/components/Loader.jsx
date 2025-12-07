import './Loader.css'

const BASE_URL = import.meta.env.BASE_URL

const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

function Loader() {
  // Video preload is handled in HTML and App.jsx, no need to duplicate here
  return (
    <div className="loader__overlay">
      <div className="loader__spinner">
        <img 
          src={assetPath('skyshot-logo/skyshot-logo.png')} 
          alt="SkyShot Lab" 
          className="loader__logo"
        />
        <div className="spinner"></div>
      </div>
    </div>
  )
}

export default Loader
