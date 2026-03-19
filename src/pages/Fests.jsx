import React from 'react'
import { motion } from 'framer-motion'
import { getFestItems } from '../data/persistence'
import Gallery from '../components/Gallery'

const Fests = () => {
  const staticItems = [
    { image: '/src/assets/event_1.png', title: 'SUNSET REIGN', category: 'SUMMER FEST' },
    { image: '/src/assets/concert_1.png', title: 'NIGHT CRAWLER', category: 'CLUB SET' },
    { image: '/src/assets/video_editor.png', title: 'THE PIT', category: 'DOCUMENTARY' },
  ]

  const festItems = getFestItems(staticItems)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Gallery 
        title="SONIC CHAOS" 
        subtitle="Festival Archive" 
        items={festItems} 
      />
    </motion.div>
  )
}

export default Fests
