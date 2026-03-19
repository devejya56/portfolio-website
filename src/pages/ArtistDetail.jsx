import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Camera, MapPin, User, Hash } from 'lucide-react'
import { getAllArtists } from '../data/persistence'

const ArtistDetail = () => {
  const { id } = useParams()
  const artists = getAllArtists()
  const artist = artists.find(a => a.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.lenis) window.lenis.scrollTo(0)
  }, [id])

  if (!artist) return <div className="page-container" style={{ textAlign: 'center', padding: '120px' }}><h1 className="hero-title">NOT FOUND</h1><Link to="/artists" className="btn-premium">Back to Archive</Link></div>

  const metadata = [
    { icon: <Camera size={14} />, label: 'GEAR', val: 'ARRI ALEXA MINI / 35mm' },
    { icon: <MapPin size={14} />, label: 'LOC', val: 'NEW DELHI / 28.6° N' },
    { icon: <User size={14} />, label: 'CLIENT', val: artist.id === 'rhythm-chaos' ? 'SONY MUSIC' : 'EDITORIAL' },
    { icon: <Hash size={14} />, label: 'ID', val: `LF_${artist.id.toUpperCase()}_025` }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="page-container"
    >
      <section className="artist-detail-hero">
        <div className="detail-header">
          <Link to="/artists" className="btn-back interactive">
            <ArrowLeft size={16} /> Archive
          </Link>
          <span className="section-label">Project // {artist.year}</span>
          <h1 className="detail-title">{artist.name}</h1>
          <p className="detail-desc">{artist.description}</p>
          
          <div className="detail-metadata-bar">
            {metadata.map((m, i) => (
              <div key={i} className="meta-pill">
                <span className="meta-icon">{m.icon}</span>
                <span className="meta-label">{m.label}:</span>
                <span className="meta-value">{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="detail-gallery">
        <div className="masonry-grid editorial-grid">
          {artist.gallery.map((img, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="gallery-item-container"
            >
              <div className="gallery-image-wrapper" style={{ aspectRatio: idx % 3 === 0 ? '4/5' : '1/1' }}>
                <img src={img} alt={`${artist.name} ${idx}`} className="gallery-image" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <Link to="/artists" className="btn-premium interactive">Back to Archive</Link>
      </div>
    </motion.div>
  )
}

export default ArtistDetail
