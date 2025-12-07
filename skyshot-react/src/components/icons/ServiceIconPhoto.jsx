import React from 'react'
import Lottie from 'lottie-react'
import photoAnimation from '../../assets/lottie/picture-v2.json'

export default function ServiceIconPhoto() {
  return (
    <div className="card__icon card__icon--lottie card__icon--photo" aria-hidden="true">
      <Lottie
        animationData={photoAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '120px', height: '120px' }}
      />
    </div>
  )
}

