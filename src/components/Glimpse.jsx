import React from 'react'
import { motion } from 'framer-motion'

const Glimpse = () => {
  const images = [
    { id: 1, title: 'MAIN STAGE', category: 'Concerts', image: '/src/assets/concert_premium_1.png', span: 'large' },
    { id: 2, title: 'FESTIVAL CROWD', category: 'Events', image: '/src/assets/event_1.png', span: 'medium' },
    { id: 3, title: 'STREET PORTRAIT', category: 'Portraits', image: '/src/assets/portrait_premium_1.png', span: 'medium' },
    { id: 4, title: 'STAGE LIGHTS', category: 'Concerts', image: '/src/assets/concert_1.png', span: 'small' },
    { id: 5, title: 'BLUE HOUR', category: 'Events', image: '/src/assets/video_editor.png', span: 'small' },
    { id: 6, title: 'ATMOSPHERE', category: 'Concerts', image: '/src/assets/hero.png', span: 'small' },
  ]

  return (
    <section className="glimpse-section">
      <h2 className="hero-title">GLIMPSE</h2>
      <div className="glimpse-collage">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            className={`collage-item ${img.span}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <img src={img.image} alt={img.title} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Glimpse
