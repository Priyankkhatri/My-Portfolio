import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'
import { createPortal } from 'react-dom'

/**
 * SubProjectGrid — Reconstructed as an Industrial Masonry Collection.
 * Standardizes the 'Archive' aesthetic for clones and mini-games.
 */
export default function SubProjectGrid({ type, data }) {
    const isClones = type === 'clones'
    const [activeItem, setActiveItem] = useState(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        if (activeItem) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveItem(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [activeItem])

    const handleItemClick = (item) => {
        if (isClones) {
            setActiveItem(item)
        } else {
            window.open(item.url || item.path, '_blank', 'noopener,noreferrer')
        }
    }

    if (!data || data.length === 0) return null

    return (
        <section className="py-4 md:py-6">
            <div className="max-w-5xl">
                {/* Industrial Header */}
                <div className="flex items-center gap-6 mb-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent-1)]">
                        Collection // 03
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                </div>

                {/* Asymmetric Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.map((item, index) => {
                        // Offset every second item for masonry feel
                        const isOffset = index % 2 === 1
                        
                        return (
                            <motion.button
                                key={item.id || item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                onClick={() => handleItemClick(item)}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className={`group relative p-8 rounded-2xl bg-[var(--bg-highlight)]/20 border border-[var(--border-color)] hover:border-[var(--accent-1)]/40 transition-all duration-500 text-left overflow-hidden min-h-[220px] flex flex-col justify-between ${isOffset ? 'md:mt-8' : ''}`}
                            >

                                {/* Technical Background ID */}
                                <div className="absolute top-4 right-6 font-mono text-[8px] tracking-[0.4em] uppercase text-[var(--text-muted)] opacity-20 group-hover:opacity-100 transition-opacity">
                                    {isClones ? 'CLONE' : 'GAME'}_ID_{index + 1}
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)]" />
                                        <h4 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-1)] transition-colors tracking-tight">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 pr-4 font-light">
                                        {item.description || 'Interactive technical demonstration'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors mt-8">
                                    <span className="w-6 h-px bg-[var(--border-color)] group-hover:w-10 group-hover:bg-[var(--accent-1)] transition-all duration-500" />
                                    <span>Execute_Process</span>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Re-Styled Technical Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {activeItem && isClones && (
                        <motion.div
                            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 sm:px-8 py-8 md:py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveItem(null)}
                        >
                            <div className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-2xl" />

                            <motion.div
                                className="relative w-full max-w-7xl h-[90vh] z-10 flex flex-col overflow-hidden border border-[var(--border-color)] rounded-2xl bg-[var(--bg-primary)] shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                                initial={{ scale: 0.98, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.98, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Industrial Modal Header */}
                                <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--border-color)] bg-[var(--bg-highlight)]/50 backdrop-blur-md">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                            Terminate
                                        </button>
                                        <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block" />
                                        <span className="text-xs font-mono tracking-[0.2em] text-[var(--accent-1)] hidden sm:block uppercase">
                                            Simulation_Active: {activeItem.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <a
                                            href={activeItem.path || activeItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-primary)] hover:text-[var(--accent-1)] transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-1)]/40 bg-[var(--bg-primary)]"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                            External_Link
                                        </a>
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="text-[var(--text-muted)] hover:text-[var(--accent-1)] transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Iframe with Film Grain Overlay */}
                                <div className="relative flex-1 bg-white overflow-hidden">
                                    <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.04] mix-blend-overlay">
                                        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
                                    </div>
                                    <iframe
                                        src={activeItem.path || activeItem.url}
                                        title={activeItem.title}
                                        className="w-full h-full border-0 relative z-10"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    )
}
