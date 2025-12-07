import { useEffect, useRef } from 'react'

function ContactSection() {
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
    <section id="contact" ref={sectionRef} className="section contact fade-in">
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
  )
}

export default ContactSection

