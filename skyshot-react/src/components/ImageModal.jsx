import { useEffect } from 'react';

// ImageModal component for fullscreen image preview
function ImageModal({ imageSrc, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✖</button>
        <img src={imageSrc} alt="Fullscreen preview" className="modal-image" />
      </div>
    </div>
  );
}

export default ImageModal

