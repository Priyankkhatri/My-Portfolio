import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LightboxModal — fullscreen image viewer.
 * Keyboard accessible: Esc to close, arrow keys to navigate.
 * Click outside or close button to dismiss.
 */
export default function LightboxModal({ images, currentIndex, onClose, onNavigate }) {
    const [direction, setDirection] = useState(0)

    const handlePrev = useCallback(() => {
        if (images.length <= 1) return
        setDirection(-1)
        onNavigate((currentIndex - 1 + images.length) % images.length)
    }, [currentIndex, images.length, onNavigate])

    const handleNext = useCallback(() => {
        if (images.length <= 1) return
        setDirection(1)
        onNavigate((currentIndex + 1) % images.length)
    }, [currentIndex, images.length, onNavigate])

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') handlePrev()
            if (e.key === 'ArrowRight') handleNext()
        }
        window.addEventListener('keydown', handleKey)
        // Prevent body scroll
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose, handlePrev, handleNext])

    const slideVariants = {
        enter: (d) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
    }

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close lightbox"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev() }}
                        className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Previous image"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext() }}
                        className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label="Next image"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Image */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={(e) => e.stopPropagation()}
                />
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] uppercase text-white/50">
                {currentIndex + 1} / {images.length}
            </div>
        </motion.div>
    )
}
