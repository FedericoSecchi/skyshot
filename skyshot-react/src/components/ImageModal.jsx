import { useEffect } from 'react'
import '../index.css'

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <img 
        src={image} 
        alt="Expanded view" 
        className="modal-image" 
        onClick={(e) => e.stopPropagation()}
        loading="eager"
      />
      <button 
        className="modal-close" 
        onClick={onClose} 
        aria-label="Close modal"
        type="button"
      >
        ✖
      </button>
    </div>
  )
}

export default ImageModal;
