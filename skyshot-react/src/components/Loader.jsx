import { useEffect } from 'react'
import './Loader.css'

const BASE_URL = import.meta.env.BASE_URL

const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

function Loader() {
  useEffect(() => {
    // Preload video while loader is showing
    const video = document.createElement('video')
    video.src = assetPath('video/sequence-01.mp4')
    video.preload = 'auto'
    video.load()
  }, [])

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <img 
          src={assetPath('skyshot-logo/skyshot-logo.png')} 
          alt="SkyShot Lab" 
          className="loader-logo"
        />
        <div className="loader-spinner"></div>
      </div>
    </div>
  )
}

export default Loader
