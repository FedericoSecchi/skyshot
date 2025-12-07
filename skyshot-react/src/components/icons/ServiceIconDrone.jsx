import React from 'react'
import Lottie from 'lottie-react'
import droneAnimation from '../../assets/lottie/uav-technology-v2.json'

export default function ServiceIconDrone() {
  return (
    <div className="card__icon card__icon--lottie card__icon--drone" aria-hidden="true">
      <Lottie
        animationData={droneAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '160px', height: '160px' }}
      />
    </div>
  )
}

