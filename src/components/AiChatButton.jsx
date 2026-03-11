import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import AiChatPanel from './AiChatPanel'

/**
 * AiChatButton — floating bottom-right button + chat panel.
 * Appears after scrolling 200px.
 */
export default function AiChatButton() {
    const isChatOpen = useStore((s) => s.isChatOpen)
    const setChatOpen = useStore((s) => s.setChatOpen)
    const toggleChat = useStore((s) => s.toggleChat)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [visible, setVisible] = useState(false)

    /* Show button after scrolling 200px */
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 200)
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
            {/* Floating Button */}
            <AnimatePresence>
                {visible && !isChatOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        onClick={toggleChat}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="fixed bottom-28 right-6 md:bottom-32 md:right-10 z-[9998] w-12 h-12 rounded-full flex items-center justify-center border border-[#a78bfa]/30 bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-lg shadow-[#a78bfa]/15 hover:shadow-[#a78bfa]/35 hover:border-[#a78bfa]/50 transition-all duration-300 group"
                        aria-label="Open AI Assistant"
                        style={{
                            animation: 'ai-glow-pulse 3s ease-in-out infinite',
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#a78bfa] group-hover:text-[#c4b5fd] transition-colors duration-300"
                        >
                            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AiChatPanel isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
        </>
    )
}
