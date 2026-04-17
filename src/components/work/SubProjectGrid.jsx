import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useStore from '../../store/useStore'
import { createPortal } from 'react-dom'

/**
 * SubProjectGrid — Reconstructed as an Immersive Simulation Collection.
 * Features: Magnetic Physics, CRT Terminal Modal, Technical Boot-up sequence.
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
        <section className="relative py-24 overflow-visible">
            {/* Background Narrative Marker */}
            <div className="absolute -right-12 top-0 pointer-events-none select-none opacity-[0.03] vertical-marker text-[12rem] font-black uppercase text-white hidden lg:block">
                Blueprints
            </div>

            <div className="max-w-6xl relative z-10">
                {/* Section Header HUD */}
                <div className="flex items-center gap-6 mb-20">
                    <div className="flex flex-col">
                        <span className="text-sm tracking-widest uppercase text-[var(--accent-1)] font-bold mb-2">
                           03 / Simulation Matrix
                        </span>
                        <span className="text-xs text-white/50 uppercase tracking-widest">Module Library</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--accent-1)]/30 to-transparent" />
                </div>

                {/* Organic Simulation Matrix (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {data.map((item, index) => (
                        <div 
                            key={item.id || item.title}
                            className={`${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}
                        >
                            <SimulationCard 
                                item={item} 
                                index={index} 
                                isClones={isClones} 
                                onClick={() => handleItemClick(item)} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulation Interface (Modal) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {activeItem && isClones && (
                        <motion.div
                            className="fixed inset-0 z-[1000] flex items-center justify-center px-4 md:px-12 py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveItem(null)}
                        >
                            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
                            
                            {/* CRT HUD Overlay (Global Scanlines) */}
                            <div className="absolute inset-0 pointer-events-none z-[1005] opacity-30 overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-1)]/10 to-transparent h-40 w-full"
                                    animate={{ top: ['-20%', '120%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>

                            <motion.div
                                className="relative w-full max-w-7xl h-full z-10 flex flex-col overflow-hidden border border-white/10 rounded-3xl bg-[#050505] shadow-[0_0_150px_rgba(0,0,0,0.9)]"
                                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Simulation Control Header */}
                                <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                                    <div className="flex items-center gap-10">
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="group flex items-center gap-6 text-[11px] tracking-[0.5em] uppercase text-[var(--accent-1)] hover:text-white transition-all font-black"
                                        >
                                            <div className="w-10 h-10 rounded-full border border-[var(--accent-1)]/30 flex items-center justify-center group-hover:bg-[var(--accent-1)] group-hover:text-black transition-all">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform rotate-180">
                                                    <path d="M5 12h14m-7-7l7 7-7 7" />
                                                </svg>
                                            </div>
                                            Exit Archive
                                        </button>
                                        <div className="hidden sm:flex flex-col gap-1 pl-10 border-l border-white/5">
                                            <span className="text-sm tracking-widest text-white uppercase font-bold">
                                                {activeItem.title}
                                            </span>
                                            <span className="text-xs text-[var(--accent-1)] uppercase tracking-widest animate-pulse">
                                                Active Simulation v1.0
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-8">
                                        <a
                                            href={activeItem.path || activeItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hidden md:flex items-center gap-4 text-sm tracking-widest uppercase text-white/50 hover:text-[var(--accent-1)] transition-all px-8 py-3 rounded-full border border-white/10 hover:border-[var(--accent-1)]/50 bg-white/[0.02]"
                                        >
                                            Open in New Node
                                        </a>
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-[var(--accent-1)] hover:border-[var(--accent-1)] transition-all"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Simulation Canvas */}
                                <div className="relative flex-1 bg-white overflow-hidden">
                                    <div className="absolute inset-0 z-20 pointer-events-none bg-black/5 mix-blend-overlay" />
                                    <iframe
                                        src={activeItem.path || activeItem.url}
                                        title={activeItem.title}
                                        className="w-full h-full border-0 relative z-10"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                    
                                    {/* CINEMATIC BOOT-UP SEQUENCE */}
                                    <AnimatePresence>
                                        <motion.div 
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 1.2 }}
                                            className="absolute inset-0 bg-[#050505] z-30 flex flex-col items-center justify-center p-12 text-center"
                                        >
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: 300 }}
                                                transition={{ duration: 1 }}
                                                className="h-px bg-[var(--accent-1)] mb-8"
                                            />
                                            <div className="text-sm text-[var(--accent-1)] tracking-widest space-y-4 uppercase">
                                                <motion.div 
                                                    initial={{ opacity: 0 }} 
                                                    animate={{ opacity: 1 }} 
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    Injecting Assets... [DONE]
                                                </motion.div>
                                                <motion.div 
                                                    initial={{ opacity: 0 }} 
                                                    animate={{ opacity: 1 }} 
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    Compiling Shaders... [DONE]
                                                </motion.div>
                                                <motion.div 
                                                    initial={{ opacity: 0 }} 
                                                    animate={{ opacity: 1 }} 
                                                    transition={{ delay: 0.5 }}
                                                    className="font-bold text-white"
                                                >
                                                    INITIALIZING SIMULATION CORE
                                                </motion.div>
                                            </div>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: 300 }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-px bg-[var(--accent-1)] mt-8"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Data Stream Footer */}
                                <div className="px-10 py-6 bg-black border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-12 text-xs text-white/50 tracking-widest uppercase">
                                        <div className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] animate-pulse" />
                                            <span>Stream / Stable</span>
                                        </div>
                                        <span>Node / 4096 X</span>
                                        <span className="hidden md:block">Time / {new Date().toLocaleTimeString()}</span>
                                    </div>
                                    <div className="w-48 h-[2px] bg-white/5 overflow-hidden relative rounded-full">
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        />
                                    </div>
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

/**
 * SimulationCard — Magnetic card with high-fidelity technical ornaments.
 */
function SimulationCard({ item, index, isClones, onClick }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const cardRef = useRef(null)
    
    // Magnetic Physics
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const xSpring = useSpring(mouseX, { stiffness: 150, damping: 15 })
    const ySpring = useSpring(mouseY, { stiffness: 150, damping: 15 })
    
    const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8])

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }, [mouseX, mouseY])

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0)
        mouseY.set(0)
        setCursorVariant('default')
    }, [mouseX, mouseY, setCursorVariant])

    return (
        <motion.button
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full p-12 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-[var(--accent-1)]/40 transition-all duration-700 text-left overflow-hidden min-h-[380px] flex flex-col justify-between"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 grid-blueprint opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity" />
            
            {/* Technical HUD Corner */}
            <div className="absolute top-8 right-10 text-xs tracking-widest uppercase text-white/20 group-hover:text-[var(--accent-1)] transition-colors">
                REC {index + 1}
            </div>

            <div className="relative z-10 space-y-10">
                <div className="flex flex-col gap-6">
                    <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:bg-[var(--accent-1)] group-hover:text-black transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(var(--accent-1-rgb),0.3)]">
                        <span className="text-lg font-black">0{index + 1}</span>
                    </div>
                    <h4 
                        className="text-4xl lg:text-5xl font-black text-white leading-none tracking-[-0.05em]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {item.title}
                    </h4>
                </div>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed font-light opacity-60 group-hover:opacity-100 transition-opacity max-w-sm">
                    {item.description || 'Comprehensive technical simulation focused on interaction fidelity and systematic implementation.'}
                </p>
            </div>

            <div className="flex items-center gap-6 group/btn mt-12 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all">
                        <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                </div>
                <span className="text-xs tracking-widest uppercase text-white/50 group-hover/btn:text-white transition-colors">
                    BOOT UP
                </span>
            </div>

            {/* Faint Background ID */}
            <div className="absolute -bottom-6 -right-6 p-8 pointer-events-none opacity-[0.02] group-hover:opacity-10 transition-opacity vertical-marker">
                <div className="text-[80px] font-black leading-none uppercase select-none">NODE {index}</div>
            </div>
        </motion.button>
    )
}
