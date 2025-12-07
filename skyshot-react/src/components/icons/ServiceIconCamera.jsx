import React from 'react'
import Lottie from 'lottie-react'
import cameraAnimation from '../../assets/lottie/camera-aperture.json'

export default function ServiceIconCamera() {
  return (
    <div className="card__icon card__icon--lottie" style={{ width: 160, height: 160 }} aria-hidden="true">
      <Lottie
        animationData={cameraAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

