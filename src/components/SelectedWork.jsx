import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSelectedWork } from '../data/persistence'

const SelectedWork = () => {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Concerts', 'Events', 'Portraits']

  const staticItems = [
    { id: '1', title: 'MAIN STAGE', category: 'Concerts', image: '/src/assets/concert_premium_1.png', span: 'large' },
    { id: '2', title: 'FESTIVAL CROWD', category: 'Events', image: '/src/assets/event_1.png', span: 'medium' },
    { id: '3', title: 'STREET PORTRAIT', category: 'Portraits', image: '/src/assets/portrait_premium_1.png', span: 'medium' },
    { id: '4', title: 'STAGE LIGHTS', category: 'Concerts', image: '/src/assets/concert_1.png', span: 'small' },
    { id: '5', title: 'BLUE HOUR', category: 'Events', image: '/src/assets/video_editor.png', span: 'small' },
    { id: '6', title: 'ATMOSPHERE', category: 'Concerts', image: '/src/assets/hero.png', span: 'small' },
  ]

  const allItems = getSelectedWork(staticItems)

  const filteredItems = filter === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === filter)

  return (
    <section className="selected-work-section">
      <div className="section-header-flex">
        <div>
          <span className="section-label">Portfolio</span>
          <h2 className="hero-title" style={{ lineHeight: '0.92' }}>SELECTED<br />WORK</h2>
        </div>
        <div className="filter-bar">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="selected-grid">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`selected-item ${item.span}`}
            >
              <div className="selected-item-inner">
                <img src={item.image} alt={item.title} />
                <div className="selected-overlay">
                  <div className="selected-meta">
                    <span className="selected-category">{item.category}</span>
                    <h3 className="selected-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <a href="/artists" className="btn-outline interactive">View Full Archive</a>
      </div>
    </section>
  )
}

export default SelectedWork
