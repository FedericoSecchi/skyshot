// ImageModal.jsx actualizado para garantizar botón de cierre visible en todas las resoluciones
import React, { useEffect } from "react";
import "../index.css";

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Expanded" className="modal-image" />
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✖</button>
      </div>
    </div>
  );
};

export default ImageModal;
