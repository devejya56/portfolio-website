import React from 'react'
import { motion } from 'framer-motion'
import { Sparkle } from 'lucide-react'

const Marquee = () => {
  const items = [
    'GRADING', 'MUSIC VIDEOS', 'LIVE EVENTS', 'FESTIVALS', 
    'CORPORATE EVENTS', 'CONCERT PHOTOGRAPHY', 'EVENT CONTENT'
  ]

  return (
    <div className="marquee-container">
      <motion.div 
        className="marquee-inner"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item">
            <span>{item}</span>
            <Sparkle size={10} color="var(--accent)" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
