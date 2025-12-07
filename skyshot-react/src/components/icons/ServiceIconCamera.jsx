import React from 'react'
import Lottie from 'lottie-react'
import cameraAnimation from '../../assets/lottie/camera-aperture-v2.json'

export default function ServiceIconCamera() {
  return (
    <div className="card__icon card__icon--lottie card__icon--camera" aria-hidden="true">
      <Lottie
        animationData={cameraAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '200px', height: '200px' }}
      />
    </div>
  )
}

