import React from 'react'

const Stats = () => {
  const stats = [
    { val: '200+', label: 'EVENTS SHOT' },
    { val: '50+', label: 'ARTISTS FEATURED' },
    { val: '5+', label: 'YEARS EXPERIENCE' }
  ]

  return (
    <section className="stats-section">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <span className="stat-value">{s.val}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
