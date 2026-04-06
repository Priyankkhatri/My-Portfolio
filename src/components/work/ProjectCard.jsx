import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, useMemo } from 'react'
import useStore from '../../store/useStore'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * ProjectCard — a single project in the Work Grid.
 * Reconstructed with 'Industrial Gallery' aesthetic (Frontend Design).
 * Optimized with 'Reactive 3D Tilt' & 'Dynamic Glint' (Unified with Credentials).
 */
export default function ProjectCard({ project, index = 0, variant = 'normal' }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isMobile = useIsMobile()
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: '-100px' })

    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glintX: 50, glintY: 50 })
    const isFeatured = variant === 'featured'

    /* ── Reactive Interaction Logic (Unified with Credentials) ── */
    const handleMouseMove = useCallback((e) => {
        if (isMobile) return
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        
        // Slightly more subtle tilt than certificates for large cards
        const intensity = isFeatured ? 8 : 12 
        setTilt({ 
            rotateY: (x - 0.5) * intensity, 
            rotateX: (y - 0.5) * -intensity,
            glintX: x * 100,
            glintY: y * 100
        })
    }, [isMobile, isFeatured])

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0, glintX: 50, glintY: 50 })
        setCursorVariant('default')
    }, [setCursorVariant])

    const springTransition = { type: 'spring', stiffness: 220, damping: 25, mass: 1 }

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
                duration: 1.2,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1], // Cinematic ease-out
            }}
            className={isFeatured ? 'col-span-full' : ''}
        >
            <Link
                to={`/work/${project.id}`}
                aria-label={`View case study: ${project.title}`}
                onMouseEnter={() => !isMobile && setCursorVariant('hover')}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="block group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-primary)]"
            >
                <motion.div
                    ref={cardRef}
                    animate={{
                        rotateX: tilt.rotateX,
                        rotateY: tilt.rotateY,
                        scale: 1, // Base scale, CardHoverWrapper handles hover lift
                    }}
                    transition={springTransition}
                    className={`relative overflow-hidden rounded-2xl border transition-all duration-500 border-[var(--border-color)] bg-[var(--card-bg)] group-hover:border-[var(--accent-1)]/30 ${isFeatured ? 'min-h-[420px] md:min-h-[520px]' : 'min-h-[360px] md:min-h-[440px]'}`}
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: 1200,
                    }}
                >
                    {/* Dynamic Glint (Shiny Effect) — Standardized with Credentials */}
                    {!isMobile && (
                        <div 
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
                            style={{
                                background: `radial-gradient(circle at ${tilt.glintX}% ${tilt.glintY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                                mixBlendMode: 'overlay'
                            }}
                        />
                    )}

                    {/* Image Layer with Industrial Parallax */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={project.previewImage}
                            alt={project.title}
                            animate={{
                                scale: 1.05,
                                x: tilt.rotateY * -1.5,
                                y: tilt.rotateX * 1.5,
                            }}
                            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-[filter] duration-700"
                            loading="lazy"
                        />
                        
                        {/* High-Contrast Gradient Overlay (Industrial Mood) */}
                        <div className={`absolute inset-0 transition-all duration-700 ${isFeatured
                            ? 'bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent opacity-90 group-hover:opacity-100'
                            : 'bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent opacity-95 group-hover:opacity-100'
                        }`} />
                    </div>

                    {/* Content Layer */}
                    <div className={`relative z-10 flex h-full ${isFeatured
                        ? 'flex-col md:flex-row items-end md:items-end p-8 md:p-14'
                        : 'flex-col justify-end p-8 md:p-10'
                    }`}>
                        <div className={isFeatured ? 'max-w-xl' : 'w-full'}>
                            {/* Year Indicator (Industrial Tabular) */}
                            <div className="flex items-center gap-4 mb-5">
                                <span 
                                    className="text-[10px] tracking-[0.3em] font-mono text-[var(--text-muted)]"
                                    style={{ fontVariantNumeric: 'tabular-nums' }}
                                >
                                    [{project.year}]
                                </span>
                                {project.featured && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] shadow-[0_0_8px_var(--accent-1)]" />
                                )}
                            </div>

                            {/* Title (Balanced Tech) */}
                            <h3
                                className={`font-bold text-[var(--text-primary)] mb-3 leading-[1.1] ${isFeatured ? 'text-4xl md:text-6xl tracking-tight' : 'text-2xl md:text-3xl'}`}
                                style={{ 
                                    fontFamily: "'Poppins', sans-serif",
                                    textWrap: 'balance'
                                }}
                            >
                                {project.title}
                            </h3>

                            {/* Description (Industrial Layout) */}
                            <p className={`text-[var(--text-secondary)] mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500 ${isFeatured ? 'text-base md:text-lg max-w-lg' : 'text-sm md:text-base'}`}>
                                {project.shortDescription}
                            </p>

                            {/* Navigation Hint */}
                            <div className="flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500">
                                <span className="w-8 h-px bg-[var(--border-color)] group-hover:w-12 group-hover:bg-[var(--accent-1)] transition-all duration-500" />
                                <span>Discover Case Study</span>
                            </div>
                        </div>
                    </div>

                    {/* Industrial Corner ID */}
                    <div className="absolute top-8 left-8 z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-700 font-mono text-[9px] tracking-widest text-[var(--text-muted)] pointer-events-none">
                        PRJ_{project.id.toUpperCase().slice(0, 8)}
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    )
}
