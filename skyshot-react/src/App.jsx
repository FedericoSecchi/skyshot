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

  // Hero video loading - optimized for universal autoplay and smooth loader transition
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let loaderHidden = false
    const cleanupFunctions = []
    const startTime = Date.now()
    const MIN_LOADER_TIME = 1500 // Minimum 1.5 seconds for smooth UX

    const hideLoader = () => {
      if (loaderHidden) return
      loaderHidden = true
      
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        setIsLoading(false)
        setHeroVisible(true)
        document.body.classList.add('video-ready')
      })
    }

    const checkAndHideLoader = () => {
      const elapsed = Date.now() - startTime
      const isVideoPlaying = video.readyState >= 3 && 
                            video.currentTime > 0 && 
                            !video.paused && 
                            !video.ended

      // Hide loader if video is playing AND minimum time has passed
      if (isVideoPlaying && elapsed >= MIN_LOADER_TIME) {
        hideLoader()
        return true
      }
      
      // Also hide after max wait time (fallback for slow connections)
      if (elapsed >= 4000) {
        hideLoader()
        return true
      }
      
      return false
    }

    // Aggressive play attempts for mobile autoplay
    const attemptPlay = () => {
      if (video.paused) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video started playing
              setTimeout(() => checkAndHideLoader(), 100)
            })
            .catch((error) => {
              // Autoplay blocked - will retry on other events
              console.debug('Autoplay attempt:', error.message)
            })
        }
      }
    }

    // Event handlers for comprehensive video state detection
    const handleLoadedData = () => {
      // Video has loaded enough data to start playing
      attemptPlay()
      checkAndHideLoader()
    }

    const handleCanPlay = () => {
      // Video can start playing (may need buffering)
      attemptPlay()
      checkAndHideLoader()
    }

    const handleCanPlayThrough = () => {
      // Video can play through without stopping
      attemptPlay()
      checkAndHideLoader()
    }

    const handlePlaying = () => {
      // Video has actually started playing
      setTimeout(() => checkAndHideLoader(), 50)
    }

    const handleTimeUpdate = () => {
      // Video time updated - means it's playing
      if (video.currentTime > 0) {
        checkAndHideLoader()
      }
    }

    const handleLoadedMetadata = () => {
      // Video metadata loaded - try to play early
      attemptPlay()
    }

    // Set up comprehensive event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('timeupdate', handleTimeUpdate)

    cleanupFunctions.push(
      () => video.removeEventListener('loadedmetadata', handleLoadedMetadata),
      () => video.removeEventListener('loadeddata', handleLoadedData),
      () => video.removeEventListener('canplay', handleCanPlay),
      () => video.removeEventListener('canplaythrough', handleCanPlayThrough),
      () => video.removeEventListener('playing', handlePlaying),
      () => video.removeEventListener('timeupdate', handleTimeUpdate)
    )

    // Force video load immediately
    video.load()

    // Initial play attempt for fast connections
    if (video.readyState >= 2) {
      attemptPlay()
    }

    // Periodic check for slow connections (3G/4G throttling)
    const checkInterval = setInterval(() => {
      if (checkAndHideLoader()) {
        clearInterval(checkInterval)
      }
    }, 200)

    cleanupFunctions.push(() => clearInterval(checkInterval))

    // Fallback timeout - hide loader after max wait
    const fallbackTimeout = setTimeout(() => {
      if (!loaderHidden) {
        hideLoader()
      }
    }, 4000)

    cleanupFunctions.push(() => clearTimeout(fallbackTimeout))

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
      document.body.classList.remove('video-ready')
    }
  }, [])

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
              muted
              autoPlay
              playsInline
              loop
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
