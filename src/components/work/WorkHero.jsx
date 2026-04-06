import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import useStore from '../../store/useStore'

/**
 * WorkHero — Reconstructed as an Industrial Archive header.
 */
export default function WorkHero({ project }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const sectionRef = useRef(null)

    // Reduced motion preference
    const [reducedMotion, setReducedMotion] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    // Parallax scroll transform
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const opacityY = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={sectionRef} className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden bg-[var(--bg-primary)]">
            
            {/* Film Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.04] mix-blend-overlay">
                <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
            </div>

            {/* Parallax Hero Image Layer */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                style={reducedMotion ? {} : { y: parallaxY }}
            >
                <img
                    src={project.heroImage || project.previewImage}
                    alt={`${project.title} hero`}
                    className="w-full h-full object-cover grayscale-[0.3] brightness-50"
                />
            </motion.div>

            {/* Technical Gradient Overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />

            {/* Content Layer */}
            <div className="relative z-30 flex flex-col justify-between h-full min-h-[60vh] md:min-h-[70vh] px-6 md:px-12 lg:px-24">
                
                {/* Industrial Back Button */}
                <motion.div
                    className="pt-24 md:pt-32"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link
                        to="/work"
                        className="inline-flex items-center gap-4 group focus-visible:outline-none"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        aria-label="Back to central archive"
                    >
                        <div className="w-10 h-10 border border-[var(--border-color)] group-hover:border-[var(--accent-1)] rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden relative">
                            <div className="absolute inset-0 bg-[var(--accent-1)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative group-hover:-translate-x-1 transition-transform">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--accent-1)] opacity-60 font-mono">Return_To</span>
                            <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-primary)] font-bold">Central Archive</span>
                        </div>
                    </Link>
                </motion.div>

                {/* Industrial Title Overlay */}
                <motion.div 
                    className="pb-12 md:pb-16 max-w-5xl"
                    style={{ opacity: opacityY }}
                >

                    {/* Dossier Meta */}
                    <motion.div
                        className="flex items-center gap-6 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent-1)] flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] shadow-[0_0_8px_var(--accent-1)]" />
                            Archive_ID: {project.id.toUpperCase().slice(0, 8)}
                        </span>
                        <div className="h-px w-24 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] font-medium">
                            Ph_0{project.featured ? '1' : '2'} / {project.status.toUpperCase()}
                        </span>
                    </motion.div>

                    {/* Industrial Header Titles */}
                    <div className="mb-8">
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--text-primary)] leading-[0.85] tracking-tighter"
                            style={{ 
                                fontFamily: "'Poppins', sans-serif",
                                textWrap: 'balance'
                            }}
                            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {project.title.split(' ').slice(0, -1).join(' ')} <br />
                            <span className="text-stroke tracking-normal opacity-20">
                                {project.title.split(' ').slice(-1)}
                            </span>
                        </motion.h1>
                    </div>

                    {/* Dossier Abstract */}
                    <motion.p
                        className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed font-light border-l border-[var(--accent-1)]/30 pl-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        {project.shortDescription}
                    </motion.p>
                </motion.div>
            </div>

            {/* Bottom Tech Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 right-12 z-30 hidden lg:flex flex-col items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <span className="font-mono text-[9px] tracking-[0.6em] uppercase text-[var(--text-muted)] [writing-mode:vertical-lr]">
                    Scroll_To_Analyze
                </span>
                <div className="w-px h-24 bg-gradient-to-b from-[var(--border-color)] to-transparent relative overflow-hidden">
                    <motion.div 
                        className="absolute inset-0 bg-[var(--accent-1)]"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
