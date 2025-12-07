import React from 'react'
import Lottie from 'lottie-react'
import droneAnimation from '../assets/lottie/uav-technology-animation.json'

export default function ServiceIconDrone() {
  return (
    <div className="card__icon card__icon--lottie" style={{ width: 80, height: 80 }} aria-hidden="true">
      <Lottie
        animationData={droneAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

