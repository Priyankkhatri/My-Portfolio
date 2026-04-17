import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LightboxModal from './LightboxModal'

export default function ScreenshotGallery({ gallery, projectTitle }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!gallery || gallery.length === 0) return null

  return (
    <section className="relative">
      <div className="mb-10">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">Gallery</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((src, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightboxIndex(i)}
            className="flex relative overflow-hidden rounded-xl border border-[var(--border-color)] aspect-video group"
          >
            <img 
              src={src} 
              alt={`${projectTitle} screenshot ${i + 1}`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
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
