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

import { useState, useEffect, useRef, useCallback } from 'react'
import DomeGallery from './components/DomeGallery'
import ImageModal from './components/ImageModal'
import './index.css'

// Get base URL for assets (works in both dev and production)
const BASE_URL = import.meta.env.BASE_URL

// Helper function to get asset path
const assetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}

// Gallery images data
const galleryImages = [
  { src: assetPath('fotos/1wingfoil-lake-garda.jpg'), alt: 'Wingfoil jump over Lake Garda' },
  { src: assetPath('fotos/29ersailing.jpg'), alt: 'Sailing 29er drone shot' },
  { src: assetPath('fotos/3mountain-with-snow.jpg.jpg'), alt: 'Mountain with snow at Lake Garda' },
  { src: assetPath('fotos/4golden-hour-kayak.jpg'), alt: 'Golden hour kayak on Lake Garda' },
  { src: assetPath('fotos/5cold-river-in-lake.jpg'), alt: 'Cold river flowing into Lake Garda' },
  { src: assetPath('fotos/6vineyards-by-the-lake.jpg'), alt: 'Vineyards by Lake Garda' },
  { src: assetPath('fotos/7vineyard-aerial-view.jpg'), alt: 'Aerial view of vineyards at Lake Garda' },
  { src: assetPath('fotos/8nago-torbole-night.jpg'), alt: 'Nago Torbole night aerial view' },
  { src: assetPath('fotos/9riva-del-garda-mountain-night-view.jpg'), alt: 'Riva del Garda mountain night view' },
  { src: assetPath('fotos/10nago-torbole-with-lake-garda-in-the-background.jpg'), alt: 'Nago Torbole with Lake Garda in the background' },
  { src: assetPath('fotos/11-vineyard-fields-panorama.jpg'), alt: 'Vineyard fields panorama at Lake Garda' },
  { src: assetPath('fotos/12-ledro-lake-mountains-in-the-background.jpg'), alt: 'Ledro Lake with mountains in the background' },
  { src: assetPath('fotos/13-sunset-behind-the-mountains-from-torri.jpg'), alt: 'Sunset behind the mountains from Torri del Benaco' },
  { src: assetPath('fotos/14-tenno-lake-island.jpg'), alt: 'Tenno Lake island aerial view' },
  { src: assetPath('fotos/15-tenno-mountains-with-trees.jpg'), alt: 'Tenno mountains with trees' },
  { src: assetPath('fotos/16-mountain-peak-very-high-3000-meters-altitude.jpg'), alt: 'Mountain peak at 3000 meters altitude' },
  { src: assetPath('fotos/17-limone-city-from-altissimo.jpg'), alt: 'Limone city view from Altissimo' },
  { src: assetPath('fotos/18-paragliding-from-the-peak-of-lake-garda.jpg'), alt: 'Paragliding from the peak of Lake Garda' },
  { src: assetPath('fotos/19-abandoned-church-in-torbole-lake.jpg'), alt: 'Abandoned church in Torbole' },
  { src: assetPath('fotos/20-riva-and-torbole-from-nago-torbole.jpg'), alt: 'Riva and Torbole view from Nago Torbole' },
  { src: assetPath('fotos/21-lake-garda-mountain-peaks.jpg'), alt: 'Lake Garda mountain peaks' },
  { src: assetPath('fotos/22-lake-garda-mountain-trails.jpg'), alt: 'Lake Garda mountain trails' },
  { src: assetPath('fotos/23-lake-garda-mountain-peak.jpg'), alt: 'Lake Garda mountain peak' },
  { src: assetPath('fotos/24-friends-on-a-trail-in-lake-garda.jpg'), alt: 'Friends on a trail in Lake Garda' },
  { src: assetPath('fotos/25-path-through-vineyards-with-lake-garda-view.jpg'), alt: 'Path through vineyards with Lake Garda view' },
  { src: assetPath('fotos/26-rose-behind-bars-with-mountain-background.jpg'), alt: 'Rose behind bars with mountain background' },
  { src: assetPath('fotos/27-sunset-behind-lake-garda-mountains.jpg'), alt: 'Sunset behind Lake Garda mountains' },
  { src: assetPath('fotos/28-sunset-behind-the-mountains.jpg'), alt: 'Sunset behind the mountains' },
  { src: assetPath('fotos/29-aerial-view-of-torbole-yacht-club.jpg'), alt: 'Aerial view of Torbole yacht club' },
  { src: assetPath('fotos/30-sunset-behind-the-mountains-with-sailboat-on-lake-garda.jpg'), alt: 'Sunset with sailboat on Lake Garda' },
  { src: assetPath('fotos/31-sunset-behind-the-mountains-with-sailboat-on-lake-garda.jpg'), alt: 'Sunset with sailboat on Lake Garda - view 2' },
  { src: assetPath('fotos/32-sunset-behind-the-mountains-with-sailboat-on-lake-garda-close-up.jpg'), alt: 'Sunset with sailboat close up on Lake Garda' },
  { src: assetPath('fotos/33-mountain-peak-with-clouds.jpg'), alt: 'Mountain peak with clouds' },
  { src: assetPath('fotos/34-sunset-on-lake-garda-airplane-trails-over-the-mountains.jpg'), alt: 'Sunset on Lake Garda with airplane trails' },
  { src: assetPath('fotos/35-sunset-on-lake-garda-airplane-trails-over-close-mountains.jpg'), alt: 'Sunset with airplane trails over close mountains' },
  { src: assetPath('fotos/36-green-mountains-over-riva-del-garda.jpg'), alt: 'Green mountains over Riva del Garda' },
  { src: assetPath('fotos/38-torbole-road-path-over-lake-garda.jpg'), alt: 'Torbole road path over Lake Garda' },
  { src: assetPath('fotos/39-village-between-the-mountains.jpg'), alt: 'Village between the mountains' },
  { src: assetPath('fotos/40-mountain-peaks-at-sunset.jpg'), alt: 'Mountain peaks at sunset' },
  { src: assetPath('fotos/41-flooded-forest-of-loppio.jpg'), alt: 'Flooded forest of Loppio' },
  { src: assetPath('fotos/42-flooded-forest-of-loppio.jpg'), alt: 'Flooded forest of Loppio - view 2' },
  { src: assetPath('fotos/43-flooded-forest-of-loppio.jpg'), alt: 'Flooded forest of Loppio - view 3' },
  { src: assetPath('fotos/44-winding-mountain-road.jpg'), alt: 'Winding mountain road' },
  { src: assetPath('fotos/45-waning-moon.jpg'), alt: 'Waning moon over Lake Garda' },
  { src: assetPath('fotos/46-nago-torbole-night-aerial-view.jpg'), alt: 'Nago Torbole night aerial view' },
  { src: assetPath('fotos/47-long-exposure-road.jpg'), alt: 'Long exposure road shot' },
  { src: assetPath('fotos/48-29er-sailing-upwind.jpg'), alt: '29er sailing upwind' },
  { src: assetPath('fotos/49-j70-sailing-with-spinnaker.jpg'), alt: 'J70 sailing with spinnaker' },
  { src: assetPath('fotos/50-nago-torbole-from-lake-garda.jpg'), alt: 'Nago Torbole from Lake Garda' },
  { src: assetPath('fotos/51-j70-sailing-upwind-in-lake-garda.jpg'), alt: 'J70 sailing upwind in Lake Garda' },
  { src: assetPath('fotos/52-wingfoil-jumping-in-lake-garda.jpg'), alt: 'Wingfoil jumping in Lake Garda' },
  { src: assetPath('fotos/53-arco-castle.jpg'), alt: 'Arco castle aerial view' },
  { src: assetPath('fotos/54-sunset-with-clouds-over-lake-garda.jpg'), alt: 'Sunset with clouds over Lake Garda' },
  { src: assetPath('fotos/55-riva-del-garda-yacht-club-aerial-photo.jpg'), alt: 'Riva del Garda yacht club aerial photo' },
  { src: assetPath('fotos/56-lake-tenno-peninsula-with-trees.jpg'), alt: 'Lake Tenno peninsula with trees' },
  { src: assetPath('fotos/57-lake-tenno-coast.jpg'), alt: 'Lake Tenno coast' },
  { src: assetPath('fotos/58-orange-sunset-over-the-mountains.jpg'), alt: 'Orange sunset over the mountains' },
]

function App() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [modalImage, setModalImage] = useState(null)
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

  // Hero fade-in effect
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        setTimeout(() => setHeroVisible(true), 800)
      }
      video.addEventListener('loadeddata', handleLoadedData)
      
      // Fallback
      const fallback = setTimeout(() => {
        if (!heroVisible) setHeroVisible(true)
      }, 2500)

      return () => {
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

  const gallerySettings = {
    fit: 2.0,
    minRadius: 140,
    maxRadius: 1000,
    maxVerticalRotationDeg: 10,
    segments: 22,
    dragDampening: 5.5,
    grayscale: false,
    overlayBlurColor: "rgba(14, 17, 23, 0.9)",
    padFactor: 0.08
  }

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
              className="hero__video"
            >
              <source src={assetPath('video/sequence-01.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <h2 className="section__title">Services</h2>
          <div className="grid cards">
            <article className="card">
              <div className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
                  <title>Drone filming icon</title>
                  <path d="M7 4a3 3 0 1 1-2.83 4H2a1 1 0 1 1 0-2h2.17A3 3 0 0 1 7 4Zm10 0a3 3 0 1 1 2.83 4H22a1 1 0 1 1 0-2h-2.17A3 3 0 0 1 17 4ZM3 18h2.17A3 3 0 1 1 7 20a3 3 0 0 1-1.83-6H2a1 1 0 1 1 0-2h5.59l2-2H11V7h2v3h1.41l2 2H22a1 1 0 1 1 0 2h-3.17A3 3 0 1 1 17 20a3 3 0 0 1 1.83-6H13.41l-1.7 1.7a1 1 0 0 1-.71.3H8.76a1 1 0 0 1-.7-.29L6.41 14H3a1 1 0 1 1 0-2h1.59l2 2H9.6l1.7-1.7a1 1 0 0 1 .7-.3h2a1 1 0 0 1 .7.29L16.41 14H19"/>
                </svg>
              </div>
              <h3>Drone Filming</h3>
              <p>Smooth aerial shots that highlight action and landscapes.</p>
            </article>

            <article className="card">
              <div className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
                  <title>Camera operations icon</title>
                  <path d="M9 4a2 2 0 0 1 1.789 1.106L11.5 6H16a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1l.711-1.894A2 2 0 0 1 9 4Zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
                </svg>
              </div>
              <h3>Camera Ops</h3>
              <p>Close-ups from the shore or dynamic shots from a boat.</p>
            </article>

            <article className="card">
              <div className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
                  <title>Photo packs icon</title>
                  <path d="M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0h9v9H6V6Zm1 12h10a2 2 0 0 0 2-2V6h1a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2Z"/>
                </svg>
              </div>
              <h3>Photo Packs</h3>
              <p>Curated selections with expert color grading. Ready to share.</p>
            </article>

            <article className="card">
              <div className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
                  <title>Branding and motion icon</title>
                  <path d="M12 2 9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5L12 2Zm0 4.2 1.5 3.8 3.8 1.5-3.8 1.5L12 16.8l-1.5-3.8L6.7 11l3.8-1.5L12 6.2Z"/>
                </svg>
              </div>
              <h3>Branding & Motion</h3>
              <p>From logo animations to full visual direction.</p>
            </article>
          </div>
        </section>

        {/* SELECTED WORK - Con DomeGallery */}
        <section id="work" style={{ height: '100vh', padding: 0, margin: 0, maxWidth: '100%', background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <h2 className="section__title" style={{ margin: 0, padding: '8px 0' }}>
            Selected Work
          </h2>
          <div style={{ flex: 1, minHeight: 0, width: '100%', height: '100%', margin: 0, padding: 0 }}>
            <DomeGallery 
              images={galleryImages}
              fit={gallerySettings.fit}
              minRadius={gallerySettings.minRadius}
              maxRadius={gallerySettings.maxRadius}
              maxVerticalRotationDeg={gallerySettings.maxVerticalRotationDeg}
              segments={gallerySettings.segments}
              dragDampening={gallerySettings.dragDampening}
              grayscale={gallerySettings.grayscale}
              overlayBlurColor={gallerySettings.overlayBlurColor}
              padFactor={gallerySettings.padFactor}
              onImageClick={handleImageClick}
            />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <h2 className="section__title">Let's shoot</h2>
          <p>Based around Lake Garda. Available for schools, teams, brands and events.</p>
          <div className="contact__actions">
            <a className="btn" href="https://wa.me/393332991417" target="_blank" rel="noopener">
              WhatsApp
            </a>
            <a className="btn alt" href="mailto:hello@skyshotlab.com">
              Email
            </a>
            <a className="btn alt" href="https://instagram.com/skyshot.lab" target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© SkyShot Lab. Aerial & Outdoor Visuals.</p>
      </footer>

      {/* ImageModal - Mantener con los últimos ajustes */}
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </>
  )
}

export default App
