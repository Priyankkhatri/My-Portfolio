import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={scrollToTop}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="!fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-4 rounded-full glass-card glass-card-hover group border border-[#60a5fa]/20 bg-[var(--bg-primary)]/80 backdrop-blur-xl shadow-lg shadow-[#60a5fa]/10 hover:shadow-[#60a5fa]/20 hover:border-[#60a5fa]/40 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    {/* Inner glowing ring on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#60a5fa]/20 to-[#a78bfa]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-y-1 transition-all duration-300 relative z-10"
                    >
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
