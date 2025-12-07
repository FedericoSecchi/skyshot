import { useEffect, useRef } from 'react'
import ServiceIconDrone from './icons/ServiceIconDrone'
import ServiceIconCamera from './icons/ServiceIconCamera'
import ServiceIconPhoto from './icons/ServiceIconPhoto'
import ServiceIconBrush from './icons/ServiceIconBrush'

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
          <ServiceIconCamera />
          <h3>Camera Ops</h3>
          <p>Close-ups from the shore or dynamic shots from a boat.</p>
        </article>

        <article className="card">
          <ServiceIconPhoto />
          <h3>Photo Packs</h3>
          <p>Curated selections with expert color grading. Ready to share.</p>
        </article>

        <article className="card">
          <ServiceIconBrush />
          <h3>Branding & Motion</h3>
          <p>From logo animations to full visual direction.</p>
        </article>
      </div>
    </section>
  )
}

export default ServicesSection

