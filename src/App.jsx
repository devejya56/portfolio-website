import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MoveRight, ArrowRight, Instagram, Mail, Layout } from 'lucide-react'
import Lenis from '@studio-freight/lenis'
import './index.css'

// --- PERFORMANCE HOOK ---
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })
    window.lenis = lenis
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf)
    return () => { lenis.destroy(); window.lenis = null; }
  }, [])
}

import Artists from './pages/Artists'
import ArtistDetail from './pages/ArtistDetail'
import Fests from './pages/Fests'
import Brands from './pages/Brands'
import Corporate from './pages/Corporate'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Glimpse from './components/Glimpse'
import SelectedWork from './components/SelectedWork'
import Admin from './pages/Admin'

// --- SHARED COMPONENTS ---
const Grain = () => (
  <div className="grain-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
)

const PageWipe = () => (
  <motion.div 
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 0 }}
    exit={{ scaleY: 1 }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    style={{ originY: 0 }}
    className="page-wipe"
  />
)

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const m = (e) => setPos({ x: e.clientX, y: e.clientY })
    const o = (e) => setHover(!!e.target.closest('a, button, .interactive'))
    window.addEventListener('mousemove', m); window.addEventListener('mouseover', o)
    return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', o); }
  }, [])
  return (
    <>
      <motion.div 
        className="cursor-dot" 
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        style={{ position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div 
        className="cursor-ring" 
        animate={{ 
          x: pos.x, 
          y: pos.y, 
          scale: hover ? 1.5 : 1, 
          borderColor: hover ? '#EB5E28' : 'rgba(235, 94, 40, 0.8)' 
        }} 
        transition={{ type: 'spring', damping: 35, stiffness: 350, mass: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  )
}

const Navbar = () => {
  const { pathname } = useLocation()
  
  const handleAnchor = (e, id) => {
    if (pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el && window.lenis) window.lenis.scrollTo(el)
    }
  }

  return (
    <header className="nav-top-fixed">
      <div className="nav-inner">
        <Link to="/artists" className={pathname === '/artists' ? 'active' : ''}>Artists</Link>
        <Link to="/fests" className={pathname === '/fests' ? 'active' : ''}>Fests</Link>
        <Link to="/brands" className={pathname === '/brands' ? 'active' : ''}>Brands</Link>
        <Link to="/" className="interactive" style={{ fontFamily: 'var(--fb)', fontSize: '32px', fontWeight: 'normal', color: 'white', letterSpacing: '-1px' }}>L<span>&</span>F</Link>
        <Link to="/corporate" className={pathname === '/corporate' ? 'active' : ''}>Corporate</Link>
        <Link to="/#about" onClick={(e) => handleAnchor(e, 'about')} className="interactive">About</Link>
        <Link to="/#contact" onClick={(e) => handleAnchor(e, 'contact')} className="interactive">Contact</Link>
      </div>
    </header>
  )
}

const BackgroundSystem = () => (
  <div className="bg-overlay">
    <div className="pattern-grid"></div>
    <div className="pattern-diagonal"></div>
    <div className="infographic ig-tl">POS: 28.6139° N, 77.2090° E // DL_SYS_v3.0</div>
    <div className="infographic ig-tr">ENCODING: RAW_CR2 // ISO_400<br />SHUTTER: 1/250s</div>
    <div className="infographic ig-bl">EST: MMXXVI // LENS & FRAME ARCHIVE</div>
    <div className="infographic ig-br">STATUS: SERVING_BESPOKE_VISUALS<br />BUFFER: OPTIMIZED</div>
  </div>
)

// --- PAGES ---
const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
  >
    <section className="home-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div className="section-label">Concert & Events Specialist // New Delhi</div>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 60, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          LENS <span style={{ color: 'var(--accent)', display: 'inline-block' }}>&</span><br />
          <span className="text-outline" style={{ display: 'inline-block' }}>FRAME</span>
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ marginTop: '60px' }}
        >
          <Link to="/artists" className="btn-premium interactive">View Portfolio <ArrowRight size={14} /></Link>
        </motion.div>
        
        {/* RUNNING BANNER (NOW IN HERO) */}
        <Marquee />
      </div>
    </section>

    {/* GLIMPSE COLLAGE SECTION */}
    <Glimpse />

    {/* SELECTED WORK (FILTERABLE GALLERY) */}
    <SelectedWork />

    {/* STATS SECTION */}
    <Stats />

    {/* ABOUT SECTION (Streamlined) */}
    <section id="about" className="home-section">
      <div className="split-view">
        <div style={{ background: 'var(--panel)', height: '500px', borderRadius: '4px', overflow: 'hidden' }}>
          <img src="/src/assets/video_editor.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>
        <div>
          <span className="section-label">Profile</span>
          <h2 className="hero-title" style={{ fontSize: '80px' }}>YOUR NAME<br />HERE</h2>
          <p style={{ color: 'var(--dim)', fontSize: '18px', lineHeight: '1.6', marginTop: '30px' }}>
            I'm a Delhi-based concert & events photographer, videographer, and video editor with a passion for capturing the chaos, beauty, and energy of live performance. 
            My work sits at the intersection of documentary truth and cinematic vision — real moments, elevated.
          </p>
        </div>
      </div>
    </section>

    {/* CONTACT SECTION */}
    <section id="contact" className="home-section" style={{ background: '#000' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span className="section-label">Connect</span>
        <h2 className="hero-title" style={{ fontSize: '100px' }}>LET'S BUILD</h2>
      </div>
      <div className="split-view" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '60px' }}>
          <h3 style={{ fontFamily: 'var(--fd)', fontSize: '32px', marginBottom: '20px' }}>ENQUIRIES</h3>
          <p style={{ color: 'var(--dim)', marginBottom: '40px' }}>Available for global commissions. Based in New Delhi.</p>
          <a href="mailto:hello@youremail.com" className="btn-premium interactive" style={{ padding: '15px 30px' }}>Transmit Email</a>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input type="text" placeholder="NAME" style={{ padding: '20px', background: 'var(--panel)', border: 'none', color: 'white', fontFamily: 'var(--fm)', fontSize: '10px' }} />
          <input type="email" placeholder="EMAIL" style={{ padding: '20px', background: 'var(--panel)', border: 'none', color: 'white', fontFamily: 'var(--fm)', fontSize: '10px' }} />
          <textarea placeholder="PROJECT DETAILS" rows="4" style={{ padding: '20px', background: 'var(--panel)', border: 'none', color: 'white', fontFamily: 'var(--fm)', fontSize: '10px' }} />
          <button type="submit" className="btn-premium interactive" style={{ background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)', cursor: 'none' }}>SEND</button>
        </form>
      </div>
    </section>
  </motion.div>
)

const App = () => {
  useLenis()
  const loc = useLocation()

  useEffect(() => {
    if (loc.hash) {
      setTimeout(() => {
        const el = document.getElementById(loc.hash.replace('#', ''))
        if (el && window.lenis) window.lenis.scrollTo(el)
      }, 500)
    }
  }, [loc.pathname, loc.hash])

  return (
    <div className="app-main">
      <BackgroundSystem />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/fests" element={<Fests />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      <PageWipe />
      <footer style={{ padding: '60px', textAlign: 'center', fontFamily: 'var(--fm)', fontSize: '8px', opacity: 0.2 }}>
        L&F ARCHIVE SYSTEM v3.0 // ALL RIGHTS RESERVED // <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>ADMIN_ACCESS</Link>
      </footer>
    </div>
  )
}

export default App
