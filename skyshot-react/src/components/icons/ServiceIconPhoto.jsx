import React from 'react'
import Lottie from 'lottie-react'
import photoAnimation from '../../assets/lottie/picture.json'

export default function ServiceIconPhoto() {
  return (
    <div className="card__icon card__icon--lottie" style={{ width: 160, height: 160 }} aria-hidden="true">
      <Lottie
        animationData={photoAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

