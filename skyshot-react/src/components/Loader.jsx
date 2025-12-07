import './Loader.css'
import { assetPath } from '../utils/assetPath'

function Loader() {
  return (
    <div className="loader__overlay">
      <div className="loader__spinner">
        <img 
          src={assetPath('assets/skyshot.png')} 
          alt="SkyShot Lab" 
          className="loader__logo"
          loading="eager"
          width="100"
          height="100"
        />
        <div className="spinner"></div>
      </div>
    </div>
  )
}

export default Loader
