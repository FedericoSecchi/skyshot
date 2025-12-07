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
import Navbar from './components/Navbar'
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
  const [heroVisible, setHeroVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)

  // Navbar scroll effect - show navbar background when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        document.body.classList.add('navbar-scrolled')
      } else {
        document.body.classList.remove('navbar-scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero video loading - optimized for universal autoplay and smooth loader transition
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startTime = Date.now()
    let isLoaded = false

    const tryPlay = () => {
      if (video.paused) {
        // Set currentTime to ensure video is ready to play
        if (video.readyState >= 2) {
          video.currentTime = 0.01
        }
        video.play().then(() => {
          document.body.classList.add('video-playing')
        }).catch(() => {
          // Silently handle autoplay errors - will retry on other events
        })
      }
    }

    const hideLoader = () => {
      if (isLoaded) return
      isLoaded = true
      setIsLoading(false)
      setHeroVisible(true)
      document.body.classList.add('video-ready')
    }

    const checkReady = setInterval(() => {
      if (isLoaded) {
        clearInterval(checkReady)
        return
      }
      
      const elapsed = Date.now() - startTime
      const ready = video.readyState >= 3 && 
                   video.currentTime > 0 && 
                   !video.paused && 
                   !video.ended

      if (ready || elapsed >= 4000) {
        hideLoader()
        clearInterval(checkReady)
      }
    }, 200)

    // Fallbacks para garantizar autoplay
    video.addEventListener('loadedmetadata', tryPlay)
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('canplaythrough', tryPlay)
    video.addEventListener('playing', tryPlay)
    
    // Remove video-playing class when video ends
    video.addEventListener('ended', () => {
      document.body.classList.remove('video-playing')
    })

    // Fix oculto para iOS: activar audio context suspendido
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      const ctx = new AudioContext()
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {
          // Silently handle audio context errors
        })
      }
    }

    // Force video load immediately
    video.load()

    // Initial play attempt
    if (video.readyState >= 2) {
      tryPlay()
    }

    return () => {
      clearInterval(checkReady)
      video.removeEventListener('loadedmetadata', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('canplaythrough', tryPlay)
      video.removeEventListener('playing', tryPlay)
      document.body.classList.remove('video-ready')
    }
  }, [])

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

  const handleImageClick = useCallback((imageSrc) => {
    setModalImage(imageSrc)
  }, [])

  return (
    <>
      <Navbar />

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
              crossOrigin="anonymous"
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
