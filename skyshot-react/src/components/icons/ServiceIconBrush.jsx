import React from 'react'
import Lottie from 'lottie-react'
import brushAnimation from '../../assets/lottie/paint-brush-v2.json'

export default function ServiceIconBrush() {
  return (
    <div className="card__icon card__icon--lottie" style={{ width: 140, height: 140 }} aria-hidden="true">
      <Lottie
        animationData={brushAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

