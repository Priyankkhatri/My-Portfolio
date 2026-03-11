import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import useStore from '../store/useStore'
import AiChatPanel from './AiChatPanel'

/**
 * AiChatButton — fixed vertical scroll progress track on center-right.
 * The AI button rides along this track and changes appearance based on scroll.
 */
export default function AiChatButton() {
    const isChatOpen = useStore((s) => s.isChatOpen)
    const setChatOpen = useStore((s) => s.setChatOpen)
    const toggleChat = useStore((s) => s.toggleChat)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [visible, setVisible] = useState(false)
    const { scrollYProgress } = useScroll()
    
    // Smooth the scroll progress so the button doesn't jitter
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Map scroll progress to vertical position along a 200px track (padding slightly so button doesn't overflow)
    // The container is h-64 (256px), button is h-12 (48px). Range: -100 to 100.
    const buttonY = useTransform(smoothProgress, [0, 1], [-104, 104])
    const trackFillHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
    
    // Adaptive icon styling based on scroll
    const iconRotate = useTransform(smoothProgress, [0, 1], [0, 360])
    const iconColor = useTransform(
        smoothProgress, 
        [0, 0.33, 0.66, 1], 
        ['#a78bfa', '#22d3ee', '#f472b6', '#a78bfa'] // Transitions through neon colors
    )

    /* Show button after scrolling just a bit, so it doesn't clutter the very top if not wanted, 
       but here the user wants it connected to a scroll line, so let's make it always visible or fade in after a tiny scroll. */
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /* ESC to close */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setChatOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [setChatOpen])

    return (
        <>
            {/* Scroll Track & Button Container */}
            <AnimatePresence>
                {visible && !isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-64 w-12 z-[9998] flex justify-center items-center pointer-events-none"
                    >
                        {/* The thin vertical background line */}
                        <div className="absolute top-0 bottom-0 w-px bg-[var(--border-color)] opacity-50" />
                        
                        {/* The filled progress line */}
                        <motion.div 
                            className="absolute top-0 w-[2px] bg-gradient-to-b from-[#a78bfa] to-[#22d3ee] glow-line" 
                            style={{ height: trackFillHeight }}
                        />

                        {/* The AI Button traveling the line */}
                        <motion.button
                            style={{ y: buttonY }}
                            onClick={toggleChat}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="absolute w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-lg pointer-events-auto hover:bg-[var(--glass-bg)] hover:border-[#a78bfa]/50 transition-colors duration-300 group"
                            aria-label="Open AI Assistant"
                        >
                            {/* Inner glowing halo adapting to scroll */}
                            <motion.div 
                                className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundColor: iconColor }}
                            />

                            {/* The adapting sparkle icon */}
                            <motion.svg
                                style={{ rotate: iconRotate, color: iconColor }}
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="relative z-10 drop-shadow-md"
                            >
                                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                            </motion.svg>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AiChatPanel isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
        </>
    )
}
