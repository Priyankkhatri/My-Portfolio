<<<<<<< HEAD
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
=======
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import LightboxModal from './LightboxModal'
import ScrollRevealWrapper from '../ScrollRevealWrapper'

/**
 * ScreenshotGallery — grid layout with staggered entrance.
 * Click to open fullscreen lightbox.
 * Gracefully hidden when gallery array is empty.
 */
export default function ScreenshotGallery({ gallery, projectTitle }) {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    if (!gallery || gallery.length === 0) return null

    return (
        <section className="py-4 md:py-6">
            <div className="max-w-5xl">
                <ScrollRevealWrapper>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-gradient-to-r from-[#60a5fa] to-transparent" />
                        <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">
                            Gallery
                        </p>
                    </div>
                </ScrollRevealWrapper>


                {/* Grid */}
                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    {gallery.map((src, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            onClick={() => setLightboxIndex(i)}
                            className="group relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] aspect-video cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                            aria-label={`View ${projectTitle} screenshot ${i + 1}`}
                        >
                            <img
                                src={src}
                                alt={`${projectTitle} screenshot ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 3 21 3 21 9" />
                                            <polyline points="9 21 3 21 3 15" />
                                            <line x1="21" y1="3" x2="14" y2="10" />
                                            <line x1="3" y1="21" x2="10" y2="14" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Lightbox */}
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
            </div>
        </section>
    )
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
}
