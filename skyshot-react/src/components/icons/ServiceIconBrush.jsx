import React from 'react'
import Lottie from 'lottie-react'
import brushAnimation from '../../assets/lottie/brush-animation.json'

export default function ServiceIconBrush() {
  return (
    <div className="card__icon card__icon--lottie" style={{ width: 120, height: 120 }} aria-hidden="true">
      <Lottie
        animationData={brushAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

