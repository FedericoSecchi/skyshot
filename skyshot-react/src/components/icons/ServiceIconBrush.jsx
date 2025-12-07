import React from 'react'
import Lottie from 'lottie-react'
import brushAnimation from '../../assets/lottie/paint-brush-v2.json'

export default function ServiceIconBrush() {
  return (
    <div className="card__icon card__icon--lottie card__icon--brush" aria-hidden="true">
      <Lottie
        animationData={brushAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '120px', height: '120px' }}
      />
    </div>
  )
}

