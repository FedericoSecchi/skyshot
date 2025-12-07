import { useEffect, useRef } from 'react'
import ServiceIconDrone from './ServiceIconDrone'

function ServicesSection() {
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

  return (
    <section id="services" ref={sectionRef} className="section fade-in">
      <h2 className="section__title">Services</h2>
      <div className="grid cards">
        <article className="card">
          <ServiceIconDrone />
          <h3>Drone Filming</h3>
          <p>Smooth aerial shots that highlight action and landscapes.</p>
        </article>

        <article className="card">
          <div className="card__icon card__icon--pulse" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
              <title>Camera operations icon</title>
              <path d="M9 4a2 2 0 0 1 1.789 1.106L11.5 6H16a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1l.711-1.894A2 2 0 0 1 9 4Zm3 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/>
            </svg>
          </div>
          <h3>Camera Ops</h3>
          <p>Close-ups from the shore or dynamic shots from a boat.</p>
        </article>

        <article className="card">
          <div className="card__icon card__icon--bounce" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" role="img">
              <title>Photo packs icon</title>
              <path d="M4 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0h9v9H6V6Zm1 12h10a2 2 0 0 0 2-2V6h1a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4H8a2 2 0 0 1-2-2Z"/>
            </svg>
          </div>
          <h3>Photo Packs</h3>
          <p>Curated selections with expert color grading. Ready to share.</p>
        </article>

        <article className="card">
          <div className="card__icon card__icon--spin" aria-hidden="true">
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
  )
}

export default ServicesSection

