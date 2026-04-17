import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useStore from '../../store/useStore'
import { createPortal } from 'react-dom'

/**
 * SubProjectGrid — Merged Immersive Simulation (Liquid Glass) & Industrial Masonry Collection.
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
        <section className={`relative overflow-visible ${isClones ? 'py-24' : 'py-12 md:py-16'}`}>
            {isClones && (
                <div className="absolute -right-12 top-0 pointer-events-none select-none opacity-[0.03] vertical-marker text-[12rem] font-black uppercase text-white hidden lg:block">
                    Blueprints
                </div>
            )}

            <div className={`relative z-10 ${isClones ? 'max-w-6xl' : 'max-w-5xl'}`}>
                {/* Combined Section Header */}
                <div className="flex items-center gap-6 mb-12 lg:mb-20">
                    {isClones ? (
                        <div className="flex flex-col">
                            <span className="text-sm tracking-widest uppercase text-[var(--accent-1)] font-bold mb-2">
                               03 / Simulation Matrix
                            </span>
                            <span className="text-xs text-white/50 uppercase tracking-widest">Module Library</span>
                        </div>
                    ) : (
                        <span className="font-mono text-sm tracking-[0.4em] uppercase text-[var(--accent-1)]">
                            Collection // 03
                        </span>
                    )}
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-1)]/30 to-transparent" />
                </div>

                {/* Grid Container */}
                <div className={`grid grid-cols-1 md:grid-cols-2 ${isClones ? 'gap-12 lg:gap-24' : 'gap-8'}`}>
                    {data.map((item, index) => {
                        if (isClones) {
                            return (
                                <div key={item.id || item.title} className={`${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}>
                                    <SimulationCard 
                                        item={item} 
                                        index={index} 
                                        isClones={isClones} 
                                        onClick={() => handleItemClick(item)} 
                                    />
                                </div>
                            )
                        } else {
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
                                    className={`group relative p-8 rounded-2xl bg-[var(--bg-highlight)]/10 border border-[var(--border-color)] hover:border-[var(--accent-1)]/40 hover:bg-[var(--bg-highlight)]/20 transition-all duration-500 text-left overflow-hidden min-h-[220px] flex flex-col justify-between ${isOffset ? 'md:mt-8' : ''}`}
                                >
                                    <div className="absolute top-4 right-6 font-mono text-[8px] tracking-[0.4em] uppercase text-[var(--text-muted)] opacity-20 group-hover:opacity-100 transition-opacity">
                                        GAME_ID_{index + 1}
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
                        }
                    })}
                </div>
            </div>

            {/* Modal Portal (Liquid Glass style prioritizing Clones) */}
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
                            {/* Backdrop: Mixing Liquid Glass blurs and Industrial opacity */}
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[40px] saturate-[150%]" />
                            
                            {/* Ambient liquid orbs */}
                            <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden mix-blend-screen z-0">
                                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[var(--accent-1)]/30 rounded-full blur-[100px]" />
                                <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-[var(--accent-2)]/20 rounded-full blur-[120px]" />
                            </div>

                            <motion.div
                                className="relative w-full max-w-[95vw] md:max-w-[90vw] h-[90vh] z-10 flex flex-col overflow-hidden rounded-[2rem] glass-morphism-premium border border-white/20 shadow-2xl"
                                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Thinner Liquid Glass Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md relative z-20">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="group flex items-center gap-3 text-xs tracking-widest uppercase text-white hover:text-[var(--accent-1)] transition-colors font-bold"
                                        >
                                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--accent-1)] group-hover:border-[var(--accent-1)] group-hover:text-black transition-all shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-0.5 transition-transform">
                                                    <path d="M15 18l-6-6 6-6" />
                                                </svg>
                                            </div>
                                            Exit Focus
                                        </button>
                                        <div className="hidden sm:flex flex-col border-l border-white/20 pl-6 space-y-0.5">
                                            <span className="text-sm tracking-wide text-white font-bold drop-shadow-md line-clamp-1 max-w-[200px] md:max-w-none">
                                                {activeItem.title}
                                            </span>
                                            <span className="text-[10px] text-[var(--accent-1)] uppercase tracking-widest opacity-80">
                                                Active Session v1.0
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={activeItem.path || activeItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white transition-all px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 hover:border-white shadow-sm"
                                        >
                                            Open in New Tab
                                        </a>
                                        <button
                                            onClick={() => setActiveItem(null)}
                                            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Simulation Canvas Layout Base */}
                                <div className="relative flex-1 w-full bg-[#030303] overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
                                    {/* Adding Industrial Grain feature to Liquid Glass layout */}
                                    <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.04] mix-blend-overlay">
                                        <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
                                    </div>
                                    
                                    <iframe
                                        src={activeItem.path || activeItem.url}
                                        title={activeItem.title}
                                        className="absolute inset-0 w-full h-full border-0 z-10 bg-white"
                                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    />
                                    
                                    {/* CINEMATIC BOOT-UP SEQUENCE */}
                                    <AnimatePresence>
                                        <motion.div 
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 1.2 }}
                                            className="absolute inset-0 bg-[#050505] z-30 flex flex-col items-center justify-center p-12 text-center pointer-events-none"
                                        >
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: 300 }}
                                                transition={{ duration: 1 }}
                                                className="h-px bg-[var(--accent-1)] mb-8"
                                            />
                                            <div className="text-sm text-[var(--accent-1)] tracking-widest space-y-4 uppercase">
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                                                    Injecting Assets... [DONE]
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                                    Compiling Shaders... [DONE]
                                                </motion.div>
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-bold text-white">
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

                                    {/* Floating Glass Indicator */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                                        <div className="glass-card px-6 py-2 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-4 text-[10px] tracking-widest text-white/70 uppercase">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] animate-pulse shadow-[0_0_10px_var(--accent-1)]" />
                                            <span>Stable Connection</span>
                                            <span className="w-px h-4 bg-white/20 mx-2" />
                                            <span>{isClones ? 'Clone' : 'Session'}</span>
                                        </div>
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

function SimulationCard({ item, index, isClones, onClick }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const cardRef = useRef(null)
    
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
            <div className="absolute inset-0 grid-blueprint opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity" />
            
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

            <div className="absolute -bottom-6 -right-6 p-8 pointer-events-none opacity-[0.02] group-hover:opacity-10 transition-opacity vertical-marker">
                <div className="text-[80px] font-black leading-none uppercase select-none">{isClones ? 'CLONE' : 'NODE'} {index + 1}</div>
            </div>
        </motion.button>
    )
}
