import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAllArtists } from '../data/persistence'

const Artists = () => {
  const artists = getAllArtists()
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="page-container"
    >
      <section className="gallery-section">
        <div className="gallery-header">
          <span className="section-label">Archive</span>
          <h1 className="gallery-hero-title">SONIC VISIONS</h1>
        </div>
        
        <div className="artist-archive-grid">
          {artists.map((artist, index) => (
            <Link 
              to={`/artists/${artist.id}`} 
              key={artist.id} 
              className="artist-card-link interactive"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="artist-card"
              >
                <div className="artist-card-inner">
                  <div className="artist-image-container">
                    <img src={artist.coverImage} alt={artist.name} className="artist-cover-image" />
                    <div className="artist-card-overlay">
                      <div className="artist-hover-content">
                        <h2 className="artist-name-title">{artist.name}</h2>
                        <span className="artist-year-subtitle">{artist.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default Artists
