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

  // Hero video loading - optimized to hide loader only when video shows first frame
  // OR after minimum 3 seconds (whichever comes first)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let isVideoReady = false
    let loaderHidden = false
    let rafId = null
    let fallbackTimeout = null
    const startTime = Date.now()
    const MIN_LOADER_TIME = 2000 // Minimum 2 seconds

    const hideLoader = () => {
      // Only hide loader once to avoid flickering
      if (!loaderHidden) {
        loaderHidden = true
        setIsLoading(false)
        setHeroVisible(true)
        document.body.classList.add('video-ready')
        
        // Clean up all timers
        if (rafId) cancelAnimationFrame(rafId)
        if (fallbackTimeout) clearTimeout(fallbackTimeout)
      }
    }

    const checkVideoPlaying = () => {
      // Verify video is actually playing and showing frames
      // Only mark as ready if ALL conditions are met:
      const isReady = video.readyState >= 3 &&    // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
                     video.currentTime > 0 &&     // Video has started playing
                     !video.paused &&             // Video is not paused
                     !video.ended                 // Video is not ended

      if (isReady && !isVideoReady) {
        isVideoReady = true
        
        // Use requestAnimationFrame to ensure frame is rendered
        rafId = requestAnimationFrame(() => {
          // Double check that video is still playing
          if (video.currentTime > 0 && !video.paused && video.readyState >= 3) {
            // Check if minimum time has passed OR video is ready
            const elapsed = Date.now() - startTime
            if (elapsed >= MIN_LOADER_TIME) {
              hideLoader()
            } else {
              // Wait for minimum time, then hide
              setTimeout(() => {
                if (!loaderHidden) {
                  hideLoader()
                }
              }, MIN_LOADER_TIME - elapsed)
            }
          } else {
            // If not playing yet, try again
            isVideoReady = false
            rafId = requestAnimationFrame(checkVideoPlaying)
          }
        })
      } else if (!isVideoReady) {
        // Keep checking until video is ready
        rafId = requestAnimationFrame(checkVideoPlaying)
      }
    }

    const handleCanPlayThrough = () => {
      // Video has enough data to play through
      // Try to play and then check if it's actually playing
      video.play().then(() => {
        // Wait a frame to ensure video has started
        rafId = requestAnimationFrame(() => {
          checkVideoPlaying()
        })
      }).catch(() => {
        // Autoplay might be blocked, but still check if video loaded
        checkVideoPlaying()
      })
    }

    const handlePlaying = () => {
      // Video has started playing
      checkVideoPlaying()
    }

    const handleTimeUpdate = () => {
      // Video time has updated, means it's playing
      if (video.currentTime > 0) {
        checkVideoPlaying()
      }
    }

    // Force video load immediately
    video.load()

    // Set up event listeners
    video.addEventListener('canplaythrough', handleCanPlayThrough, { once: true })
    video.addEventListener('playing', handlePlaying, { once: true })
    video.addEventListener('timeupdate', handleTimeUpdate, { once: true })

    // Force play attempt for mobile autoplay
    const attemptPlay = () => {
      video.play().catch((error) => {
        // Autoplay might be blocked, but continue checking
        console.log('Autoplay attempt:', error.message)
      })
    }

    // Start checking immediately for fast connections
    if (video.readyState >= 3) {
      attemptPlay()
      // Fallback: try again after a short delay for slow connections
      setTimeout(() => {
        if (video.readyState >= 3 && video.paused) {
          attemptPlay()
        }
      }, 500)
      rafId = requestAnimationFrame(checkVideoPlaying)
    } else {
      // For slower connections, wait for readyState >= 3 then attempt play
      const waitForReady = () => {
        if (video.readyState >= 3) {
          attemptPlay()
          // Fallback: try again after delay
          setTimeout(() => {
            if (video.readyState >= 3 && video.paused) {
              attemptPlay()
            }
          }, 750)
          rafId = requestAnimationFrame(checkVideoPlaying)
        } else {
          // Keep waiting
          setTimeout(waitForReady, 100)
        }
      }
      waitForReady()
    }

    // Safety fallback - hide loader after minimum time (3s) if video isn't ready yet
    // This ensures loader is visible for at least 3 seconds OR until video is ready
    // The loader will hide when EITHER condition is met:
    // 1. Video is ready (readyState >= 3, currentTime > 0, !paused) AND minimum time has passed
    // 2. Minimum 3 seconds have elapsed (regardless of video state)
    fallbackTimeout = setTimeout(() => {
      if (!loaderHidden) {
        hideLoader()
      }
    }, MIN_LOADER_TIME)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      if (rafId) cancelAnimationFrame(rafId)
      if (fallbackTimeout) clearTimeout(fallbackTimeout)
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
