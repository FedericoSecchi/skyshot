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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loader = document.querySelector('.loader__overlay')
    const video = videoRef.current

    if (!video) return

    if (prefersReducedMotion) {
      console.warn('⚠️ Reduced Motion active: fallback visual applied')
      if (loader) loader.style.display = 'none'
      if (video) {
        video.style.opacity = '1'
        video.style.filter = 'none'
        video.style.transition = 'none'
      }
      setIsLoading(false)
      document.body.classList.add('video-ready')
      return
    }

    // Estilos iniciales: video limpio sin blur
    video.style.filter = 'none'
    video.style.opacity = '1'

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
        loader.style.transition = 'opacity 1s ease, filter 1s ease'
        loader.style.opacity = '0'
        loader.style.filter = 'blur(15px)'
        setTimeout(() => {
          loader.style.display = 'none'
          setIsLoading(false)
          document.body.classList.add('video-ready')
          // Preload selected work images after loader disappears
          preloadSelectedWorkImages()
        }, 1000)
      } else {
        setIsLoading(false)
        document.body.classList.add('video-ready')
        // Preload selected work images after loader disappears
        preloadSelectedWorkImages()
      }
    }

    // ⛔️ Fallback visual si video tarda mucho (por conexión lenta o bug)
    const MAX_WAIT_TIME = 6000

    const timeoutFallback = setTimeout(() => {
      console.warn('⏱️ Tiempo máximo de espera alcanzado. Forzando transición')
      hideLoader()
    }, MAX_WAIT_TIME)

    const checkVideoReady = () => {
      const now = Date.now()
      const elapsed = now - startTime.current

      const isReady =
        video?.readyState >= 3 &&
        video?.currentTime > 0 &&
        !video?.paused &&
        !video?.ended

      if (isReady && elapsed >= MIN_LOADER_TIME) {
        clearTimeout(timeoutFallback)
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
      clearTimeout(timeoutFallback)
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

  // Preload selected work images after loader disappears
  const preloadSelectedWorkImages = () => {
    const imageSources = [
      assetPath('fotos/1wingfoil-lake-garda.jpg'),
      assetPath('fotos/29ersailing.jpg'),
      assetPath('fotos/3mountain-with-snow.jpg.jpg'),
      assetPath('fotos/4golden-hour-kayak.jpg'),
      assetPath('fotos/5cold-river-in-lake.jpg'),
      assetPath('fotos/6vineyards-by-the-lake.jpg'),
      assetPath('fotos/7vineyard-aerial-view.jpg'),
      assetPath('fotos/8nago-torbole-night.jpg'),
      assetPath('fotos/9riva-del-garda-mountain-night-view.jpg'),
      assetPath('fotos/10nago-torbole-with-lake-garda-in-the-background.jpg'),
      assetPath('fotos/11-vineyard-fields-panorama.jpg'),
      assetPath('fotos/12-ledro-lake-mountains-in-the-background.jpg'),
      assetPath('fotos/13-sunset-behind-the-mountains-from-torri.jpg'),
      assetPath('fotos/14-tenno-lake-island.jpg'),
      assetPath('fotos/15-tenno-mountains-with-trees.jpg'),
      assetPath('fotos/16-mountain-peak-very-high-3000-meters-altitude.jpg'),
      assetPath('fotos/17-limone-city-from-altissimo.jpg'),
      assetPath('fotos/18-paragliding-from-the-peak-of-lake-garda.jpg'),
      assetPath('fotos/19-abandoned-church-in-torbole-lake.jpg'),
      assetPath('fotos/20-riva-and-torbole-from-nago-torbole.jpg'),
      assetPath('fotos/21-lake-garda-mountain-peaks.jpg'),
      assetPath('fotos/22-lake-garda-mountain-trails.jpg'),
      assetPath('fotos/23-lake-garda-mountain-peak.jpg'),
      assetPath('fotos/24-friends-on-a-trail-in-lake-garda.jpg'),
      assetPath('fotos/25-path-through-vineyards-with-lake-garda-view.jpg'),
      assetPath('fotos/26-rose-behind-bars-with-mountain-background.jpg'),
      assetPath('fotos/27-sunset-behind-lake-garda-mountains.jpg'),
      assetPath('fotos/28-sunset-behind-the-mountains.jpg'),
      assetPath('fotos/29-aerial-view-of-torbole-yacht-club.jpg'),
      assetPath('fotos/30-sunset-behind-the-mountains-with-sailboat-on-lake-garda.jpg'),
      assetPath('fotos/31-sunset-behind-the-mountains-with-sailboat-on-lake-garda.jpg'),
      assetPath('fotos/32-sunset-behind-the-mountains-with-sailboat-on-lake-garda-close-up.jpg'),
      assetPath('fotos/33-mountain-peak-with-clouds.jpg'),
      assetPath('fotos/34-sunset-on-lake-garda-airplane-trails-over-the-mountains.jpg'),
      assetPath('fotos/35-sunset-on-lake-garda-airplane-trails-over-close-mountains.jpg'),
      assetPath('fotos/36-green-mountains-over-riva-del-garda.jpg'),
      assetPath('fotos/38-torbole-road-path-over-lake-garda.jpg'),
      assetPath('fotos/39-village-between-the-mountains.jpg'),
      assetPath('fotos/40-mountain-peaks-at-sunset.jpg'),
      assetPath('fotos/41-flooded-forest-of-loppio.jpg'),
      assetPath('fotos/42-flooded-forest-of-loppio.jpg'),
      assetPath('fotos/43-flooded-forest-of-loppio.jpg'),
      assetPath('fotos/44-winding-mountain-road.jpg'),
      assetPath('fotos/45-waning-moon.jpg'),
      assetPath('fotos/46-nago-torbole-night-aerial-view.jpg'),
      assetPath('fotos/47-long-exposure-road.jpg'),
      assetPath('fotos/48-29er-sailing-upwind.jpg'),
      assetPath('fotos/49-j70-sailing-with-spinnaker.jpg'),
      assetPath('fotos/50-nago-torbole-from-lake-garda.jpg'),
      assetPath('fotos/51-j70-sailing-upwind-in-lake-garda.jpg'),
      assetPath('fotos/52-wingfoil-jumping-in-lake-garda.jpg'),
      assetPath('fotos/53-arco-castle.jpg'),
      assetPath('fotos/54-sunset-with-clouds-over-lake-garda.jpg'),
      assetPath('fotos/55-riva-del-garda-yacht-club-aerial-photo.jpg'),
      assetPath('fotos/56-lake-tenno-peninsula-with-trees.jpg'),
      assetPath('fotos/57-lake-tenno-coast.jpg'),
      assetPath('fotos/58-orange-sunset-over-the-mountains.jpg'),
    ]

    // Preload images in background
    imageSources.forEach(src => {
      const img = new Image()
      img.src = src
    })
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
