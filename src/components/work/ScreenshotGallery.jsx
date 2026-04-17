import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LightboxModal from './LightboxModal'

export default function ScreenshotGallery({ gallery, projectTitle }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!gallery || gallery.length === 0) return null

  return (
    <section className="relative glass-card p-6 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      <div className="mb-8 relative z-10 text-center">
        <h3 className="text-2xl font-bold text-[var(--accent-1)] tracking-widest uppercase inline-block relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-px after:bg-[var(--accent-1)]">Gallery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {gallery.map((src, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setLightboxIndex(i)}
            className="flex relative overflow-hidden rounded-xl border border-white/10 aspect-video group shadow-lg"
          >
            <img 
              src={src} 
              alt={`${projectTitle} screenshot ${i + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-xl" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal 
            images={gallery} 
            currentIndex={lightboxIndex} 
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
