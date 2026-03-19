import React from 'react'
import { motion } from 'framer-motion'
import { getCorporateItems } from '../data/persistence'
import Gallery from '../components/Gallery'

const Corporate = () => {
  const staticItems = [
    { image: '/src/assets/video_editor.png', title: 'DIGITAL ETHER', category: 'COMMERCIAL' },
    { image: '/src/assets/hero.png', title: 'URBAN VESTIGE 2.0', category: 'FASHION' },
    { image: '/src/assets/portrait_premium_1.png', title: 'MONOCHROME CAMPAIGN', category: 'CAMPAIGN' },
    { image: '/src/assets/concert_1.png', title: 'NOCTURNAL GEAR', category: 'COMMERCIAL' },
    { image: '/src/assets/event_1.png', title: 'STREET WEAR AD', category: 'FASHION' },
    { image: '/src/assets/concert_premium_1.png', title: 'LUXURY MOTION', category: 'CAMPAIGN' },
    { image: '/src/assets/hero.png', title: 'ARCHITECTURAL STUDY', category: 'DOCUMENTARY' },
    { image: '/src/assets/portrait_premium_1.png', title: 'LEADERSHIP PORTRAITS', category: 'CORPORATE' },
    { image: '/src/assets/concert_1.png', title: 'QUARTERLY RECAP', category: 'EVENT' },
  ]

  const corporateItems = getCorporateItems(staticItems)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Gallery 
        title="PROFESSIONAL DEPTH" 
        subtitle="Corporate Archive" 
        items={corporateItems} 
      />
    </motion.div>
  )
}

export default Corporate
