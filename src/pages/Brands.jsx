import React from 'react'
import { motion } from 'framer-motion'
import { getBrandItems } from '../data/persistence'
import Gallery from '../components/Gallery'

const Brands = () => {
  const staticItems = [
    { image: '/src/assets/video_editor.png', title: 'DIGITAL ETHER', category: 'COMMERCIAL' },
    { image: '/src/assets/hero.png', title: 'URBAN VESTIGE', category: 'FASHION' },
    { image: '/src/assets/concert_1.png', title: 'MONOCHROME', category: 'CAMPAIGN' },
  ]

  const brandItems = getBrandItems(staticItems)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Gallery 
        title="VISUAL VOX" 
        subtitle="Brand Archive" 
        items={brandItems} 
      />
    </motion.div>
  )
}

export default Brands
