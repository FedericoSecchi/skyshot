// Restaurar la estructura completa de la web
// 1. Mantener el DomeGallery y el ImageModal con sus últimos ajustes
// 2. Asegurar que estén presentes las siguientes secciones en App.jsx:
//    - Hero
//    - About
//    - SelectedWork
//    - Contact
//    - Footer
// 3. Asegurarse de que DomeGallery esté dentro de SelectedWork como antes
// 4. Verificar que todos los componentes estén bien importados y ordenados
// 5. No eliminar el nuevo ImageModal, solo asegurar que todo lo anterior conviva correctamente
// 6. Confirmar que el render final de App.jsx refleje la estructura original + el nuevo modal

import { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react'
import ImageModal from './components/ImageModal'
import Loader from './components/Loader'
import './index.css'

// Lazy load sections for better performance
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const WorkSection = lazy(() => import('./components/WorkSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))

// Get base URL for assets (works in both dev and production)
const BASE_URL = import.meta.env.BASE_URL

// Helper function to get asset path
const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)
  const navbarRef = useRef(null)

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero video loading - optimized with loader
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Force video load immediately
      video.load()
      
      // Wait for canplaythrough to ensure video is fully ready
      const handleCanPlayThrough = () => {
        setIsLoading(false)
        setHeroVisible(true)
      }
      
      const handleCanPlay = () => {
        // Show content when video can play (faster response)
        setHeroVisible(true)
      }
      
      const handleLoadedData = () => {
        // Fallback: show content after data is loaded
        if (!heroVisible) {
          setTimeout(() => setHeroVisible(true), 300)
        }
      }
      
      // Primary: wait for canplaythrough to hide loader
      video.addEventListener('canplaythrough', handleCanPlayThrough, { once: true })
      video.addEventListener('canplay', handleCanPlay, { once: true })
      video.addEventListener('loadeddata', handleLoadedData, { once: true })
      
      // Immediate fallback for very fast connections
      if (video.readyState >= 4) {
        setIsLoading(false)
        setHeroVisible(true)
      } else if (video.readyState >= 3) {
        setHeroVisible(true)
      }
      
      // Safety fallback - hide loader after max wait time
      const fallback = setTimeout(() => {
        setIsLoading(false)
        if (!heroVisible) setHeroVisible(true)
      }, 2000)

      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadeddata', handleLoadedData)
        clearTimeout(fallback)
      }
    }
  }, [heroVisible])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      const navbar = navbarRef.current
      const headerHeight = navbar ? navbar.offsetHeight : 0
      const targetPosition = element.offsetTop - headerHeight - 20
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleImageClick = useCallback((imageSrc) => {
    setModalImage(imageSrc)
  }, [])

  return (
    <>
      <header 
        ref={navbarRef}
        className={`navbar navbar-expand-lg fixed-top custom-navbar ${navbarScrolled ? 'scrolled' : ''}`}
      >
        <div className="container">
          <a className="navbar-brand" href="#top" onClick={(e) => handleSmoothScroll(e, '#top')}>
            <img src={assetPath('skyshot-logo/skyshot-logo.png')} alt="SkyShot Lab logo" className="nav-logo" />
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#services" onClick={(e) => handleSmoothScroll(e, '#services')}>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#work" onClick={(e) => handleSmoothScroll(e, '#work')}>
                  Work
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link cta-btn" href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                  Book
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className={`hero__content ${heroVisible ? 'visible' : ''}`}>
            <h1>Outdoor visuals, <span>from above</span>.</h1>
            <p>From shore, boat or sky. You focus on riding—we do the rest.</p>
            <div className="hero__cta">
              <a className="btn" href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>
                Book a session
              </a>
              <a className="link" href="#work" onClick={(e) => handleSmoothScroll(e, '#work')}>
                See work ↗
              </a>
            </div>
          </div>
          <div className="hero__media">
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              className="hero__video"
            >
              <source src={assetPath('video/sequence-01.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* SERVICES - Lazy loaded */}
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>

        {/* SELECTED WORK - Lazy loaded with DomeGallery */}
        <Suspense fallback={null}>
          <WorkSection onImageClick={handleImageClick} />
        </Suspense>

        {/* CONTACT - Lazy loaded */}
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>

      <footer className="footer">
        <p>© SkyShot Lab. Aerial & Outdoor Visuals.</p>
      </footer>

      {/* ImageModal - Mantener con los últimos ajustes */}
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}

      {/* Loader - Shows until video is ready */}
      {isLoading && <Loader />}
    </>
  )
}

export default App
