import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const GalleryItem = ({ image, title, category, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="gallery-item-container interactive"
  >
    <div className="gallery-image-wrapper">
      <img src={image} alt={title} className="gallery-image" />
      <div className="gallery-item-overlay">
        <ArrowUpRight size={24} color="var(--accent)" />
      </div>
    </div>
    <div className="gallery-item-meta">
      <span className="gallery-item-category">{category}</span>
      <h3 className="gallery-item-title">{title}</h3>
    </div>
  </motion.div>
)

const Gallery = ({ title, items, subtitle }) => {
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <span className="section-label">{subtitle}</span>
        <h1 className="gallery-hero-title">{title}</h1>
      </div>
      
      <div className="masonry-grid">
        {items.map((item, index) => (
          <GalleryItem 
            key={index} 
            {...item} 
            delay={index * 0.15} 
          />
        ))}
      </div>
    </section>
  )
}

export default Gallery
