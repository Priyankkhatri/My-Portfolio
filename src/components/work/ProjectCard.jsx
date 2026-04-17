import { Link } from 'react-router-dom'
import { motion, useInView, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback, useMemo, useEffect } from 'react'

import useStore from '../../store/useStore'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * ProjectCard — a single project in the Work Grid.
 * Reconstructed with 'Antigravity Creative' aesthetic.
 * Features: Magnetic Physics, Multi-layer Glass Glint, Quick Peek Metadata.

 */
export default function ProjectCard({ project, index = 0, variant = 'normal' }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isMobile = useIsMobile()
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: '-100px' })

    const [isHovered, setIsHovered] = useState(false)
    const isFeatured = variant === 'featured'

    // --- Magnetic Physics ---
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 15, mass: 0.8 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    // Tilt transforms
    const rotateX = useTransform(ySpring, [-0.5, 0.5], [isFeatured ? 5 : 8, isFeatured ? -5 : -8])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], [isFeatured ? -5 : -8, isFeatured ? 5 : 8])
    
    // Parallax for inner content
    const contentX = useTransform(xSpring, [-0.5, 0.5], [-15, 15])
    const contentY = useTransform(ySpring, [-0.5, 0.5], [-15, 15])
    
    // Sub-parallax for text layers
    const textParallaxX = useTransform(contentX, x => x * 0.5)
    const textParallaxY = useTransform(contentY, y => y * 0.5)
    
    // Glint transforms
    const glintX = useTransform(xSpring, [-0.5, 0.5], [0, 100])
    const glintY = useTransform(ySpring, [-0.5, 0.5], [0, 100])

    const glintBg1 = useTransform(
        [glintX, glintY],
        ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
    )

    const glintBg2 = useTransform(
        [glintX, glintY],
        ([gx, gy]) => `radial-gradient(circle at ${100 - gx}% ${100 - gy}%, rgba(96, 165, 250, 0.2) 0%, transparent 40%)`
    )

    const handleMouseMove = useCallback((e) => {
        if (isMobile || !cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }, [isMobile, mouseX, mouseY])

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0)
        mouseY.set(0)
        setIsHovered(false)
        setCursorVariant('default')
    }, [mouseX, mouseY, setCursorVariant])

    const handleMouseEnter = useCallback(() => {
        if (!isMobile) {
            setIsHovered(true)
            setCursorVariant('hover')
        }
    }, [isMobile, setCursorVariant])

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(20px)' }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{
                duration: 1.4,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],

            }}
            className={isFeatured ? 'col-span-full' : ''}
        >
            <Link
                to={`/work/${project.id}`}
                aria-label={`View case study: ${project.title}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="block group relative rounded-2xl focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-1)] focus:ring-offset-4 focus:ring-offset-[var(--bg-primary)]"
                style={{
                    perspective: 1200,
                    transformStyle: 'preserve-3d',
                }}
            >
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        scale: isHovered ? (isFeatured ? 1.01 : 1.03) : 1,
                        transformStyle: 'preserve-3d',
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-colors duration-500 group-hover:border-[var(--accent-1)]/30 ${isFeatured ? 'min-h-[450px] md:min-h-[600px]' : 'min-h-[380px] md:min-h-[480px]'}`}
                >
                    {/* 1. Multi-layered Glint Layer */}
                    <AnimatePresence>
                        {isHovered && !isMobile && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                                    style={{ background: glintBg1 }}
                                />
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-30 pointer-events-none mix-blend-soft-light"
                                    style={{ background: glintBg2 }}
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* 2. Background Media with Magnetic Parallax */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            style={{
                                x: contentX,
                                y: contentY,
                                scale: 1.1, // Zoom for parallax room
                            }}
                            className="w-full h-full"
                        >
                            <img
                                src={project.previewImage}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                loading={index < 3 ? "eager" : "lazy"}
                            />
                        </motion.div>
                        
                        {/* High-Concept Overlays */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${isFeatured
                            ? 'bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent opacity-80 group-hover:opacity-100'
                            : 'bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent opacity-90 group-hover:opacity-100'
                        }`} />
                        
                        {/* Scanline Overlay for Technical Feel */}
                        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AEMDAAAAY9AgP6B74GAAAAAElFTkSuQmCC')] opacity-[0.03] pointer-events-none bg-repeat" />
                    </div>

                    {/* 3. High-Fidelity Content Layer */}
                    <div className={`relative z-10 flex h-full ${isFeatured
                        ? 'flex-col md:flex-row items-end md:items-end p-8 md:p-14 lg:p-20'
                        : 'flex-col justify-end p-8 md:p-10'
                    }`}>
                        <motion.div 
                            className={isFeatured ? 'max-w-2xl' : 'w-full'}
                            style={{ 
                                x: isHovered ? textParallaxX : 0, 
                                y: isHovered ? textParallaxY : 0 
                            }}
                        >
                            {/* Year / Archive Status */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-2 py-0.5 rounded border border-[var(--border-color)] text-xs tracking-widest text-[var(--accent-1)] bg-[var(--bg-primary)]/50 uppercase">
                                    Release {project.year}
                                </span>
                                {project.featured && (
                                    <span className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--accent-1)] animate-pulse" />
                                        <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">Verified Project</span>
                                    </span>
                                )}
                            </div>

                            {/* Project Title with Separation Effect */}
                            <h3
                                className={`font-bold text-[var(--text-primary)] mb-4 leading-[1.1] tracking-tighter ${isFeatured ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-3xl md:text-4xl'}`}
                                style={{ 
                                    fontFamily: "var(--font-display)",

                                    textWrap: 'balance'
                                }}
                            >
                                {project.title}
                            </h3>

                            {/* Description with reveal effect */}
                            <p className={`text-[var(--text-secondary)] mb-8 leading-relaxed opacity-70 group-hover:opacity-100 transition-all duration-500 line-clamp-2 md:line-clamp-none ${isFeatured ? 'text-lg md:text-xl max-w-xl' : 'text-sm md:text-base'}`}>
                                {project.shortDescription}
                            </p>

                            {/* --- Quick Peek: Tech Stack Overlay --- */}
                            <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                {project.techStack.map((tech, i) => (
                                    <span 
                                        key={tech.name} 
                                        className="px-2 py-1 text-[8px] tracking-widest uppercase rounded bg-white/5 border border-white/10 text-white/50"
                                        style={{ transitionDelay: `${i * 30}ms` }}
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>

                            {/* Enhanced Navigation Hint */}
                            <div className="flex items-center gap-4 group/hint">
                                <div className="relative flex items-center">
                                    <span className="w-8 h-px bg-[var(--border-color)] group-hover:w-16 group-hover:bg-[var(--accent-1)] transition-all duration-500" />
                                    <motion.span 
                                        className="absolute left-full ml-4 text-xs tracking-widest uppercase text-[var(--text-muted)] whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500"
                                    >
                                        View Case Study
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Industrial Corner ID Ornament */}
                    <div className="absolute top-10 left-10 z-10 opacity-30 group-hover:opacity-100 group-hover:text-[var(--accent-1)] transition-all duration-700 text-xs tracking-widest [writing-mode:vertical-rl] text-[var(--text-muted)] pointer-events-none uppercase">
                        Archive / {project.id.toUpperCase().slice(0, 4)}
                    </div>

                    {/* Reactive Border Glow */}
                    <div className="absolute inset-0 border border-[var(--accent-1)]/0 group-hover:border-[var(--accent-1)]/40 transition-colors duration-700 rounded-2xl pointer-events-none" />

                </motion.div>
            </Link>
        </motion.div>
    )
}
