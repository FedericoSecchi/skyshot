import { useEffect, useRef, useMemo } from 'react'
import DomeGallery from './DomeGallery'
import { assetPath } from '../utils/assetPath'

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

function WorkSection({ onImageClick }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const gallerySettings = useMemo(() => ({
    fit: 2.0,
    minRadius: 140,
    maxRadius: 1000,
    maxVerticalRotationDeg: 10,
    segments: 28,
    dragDampening: 5.5,
    grayscale: false,
    overlayBlurColor: "rgba(14, 17, 23, 0.9)",
    padFactor: 0.08
  }), [])

  return (
    <section 
      id="work" 
      ref={sectionRef}
      className="fade-in"
      style={{ height: '100vh', padding: 0, margin: 0, maxWidth: '100%', background: 'var(--bg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
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
          onImageClick={onImageClick}
        />
      </div>
    </section>
  )
}

export default WorkSection

