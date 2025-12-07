import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import ImageModal from './components/ImageModal'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { assetPath } from './utils/assetPath'
import './index.css'

// Lazy load sections for better performance
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const WorkSection = lazy(() => import('./components/WorkSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))

function App() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)
  const navbarRef = useRef(null)
  const startTime = useRef(Date.now())
  const loaderHidden = useRef(false)
  const MIN_LOADER_TIME = 2500

  // Navbar dynamic transparency based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current
      if (!navbar) return

      const scrollY = window.scrollY
      // Calculate opacity: 0 at scroll 0px, 0.6 at scroll 300px
      // Clamp between 0 and 0.6
      const maxScroll = 300
      const maxOpacity = 0.6
      const opacity = Math.min((scrollY / maxScroll) * maxOpacity, maxOpacity)
      
      // Apply dynamic background color directly to navbar
      navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`
    }

    // Set initial transparent background
    if (navbarRef.current) {
      navbarRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Trigger once to set initial state
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hero video loading - optimized for universal autoplay and smooth loader transition
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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
      if (loaderHidden.current) return
      loaderHidden.current = true
      const loader = document.querySelector('.loader__overlay')
      if (loader) {
        loader.style.transition = 'opacity 3s ease, filter 3s ease'
        loader.style.opacity = '0'
        loader.style.filter = 'blur(20px)'
        setTimeout(() => {
          loader.style.display = 'none'
          setIsLoading(false)
          setHeroVisible(true)
          document.body.classList.add('video-ready')
        }, 3000) // Duración extendida
      } else {
        setIsLoading(false)
        setHeroVisible(true)
        document.body.classList.add('video-ready')
      }
    }

    const checkVideoReady = () => {
      const now = Date.now()
      const elapsed = now - startTime.current

      const isReady =
        video.readyState >= 3 &&
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended

      if (isReady && elapsed >= MIN_LOADER_TIME) {
        hideLoader()
      } else {
        requestAnimationFrame(checkVideoReady)
      }
    }

    // Start checking video readiness
    checkVideoReady()

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

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc)
  }

  return (
    <>
      <Navbar navbarRef={navbarRef} />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero__content">
            <h1>Outdoor visuals, <span>from above</span>.</h1>
            <p>From shore, boat or sky. You focus on riding—we do the rest.</p>
            <div className="hero__cta">
              <a className="btn" href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} aria-label="Book a session">
                Book a session
              </a>
              <a className="link" href="#work" onClick={(e) => handleSmoothScroll(e, '#work')} aria-label="View selected work">
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
