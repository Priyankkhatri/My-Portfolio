import { Link } from 'react-router-dom'
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import useStore from '../../store/useStore'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * ProjectCard — Cinematic editorial project card.
 * Features: Magnetic 3D tilt, parallax image, desaturation hover,
 * staggered content reveals, and clean typography.
 */
export default function ProjectCard({ project, index = 0, variant = 'normal' }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isMobile = useIsMobile()
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, margin: '-80px' })

    const [isHovered, setIsHovered] = useState(false)
    const isFeatured = variant === 'featured'
    const displayIndex = String(index + 1).padStart(2, '0')

    // ── Magnetic 3D Tilt Physics ──
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 15, mass: 0.8 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)

    const tiltAmount = isFeatured ? 4 : 6
    const rotateX = useTransform(ySpring, [-0.5, 0.5], [tiltAmount, -tiltAmount])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], [-tiltAmount, tiltAmount])

    // Parallax for image layer
    const imgX = useTransform(xSpring, [-0.5, 0.5], [-12, 12])
    const imgY = useTransform(ySpring, [-0.5, 0.5], [-12, 12])

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

    // ── Staggered child animation variants ──
    const contentVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.15 }
        }
    }
    const childFade = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 1,
                delay: Math.min(index * 0.12, 0.5),
                ease: [0.22, 1, 0.36, 1],
            }}
            className={isFeatured ? 'col-span-full' : ''}
        >
            <Link
                to={`/work/${project.id}`}
                aria-label={`View project: ${project.title}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="block group relative rounded-2xl focus-visible:outline-none focus:ring-2 focus:ring-[var(--accent-1)] focus:ring-offset-4 focus:ring-offset-[var(--bg-primary)]"
                style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            >
                <motion.div
                    style={{
                        rotateX: isMobile ? 0 : rotateX,
                        rotateY: isMobile ? 0 : rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                    className={`relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] transition-colors duration-500 group-hover:border-[var(--accent-1)]/25 ${
                        isFeatured
                            ? 'min-h-[420px] md:min-h-[550px]'
                            : 'min-h-[360px] md:min-h-[440px]'
                    }`}
                >
                    {/* ── Background Image with Parallax ── */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            style={{ x: isMobile ? 0 : imgX, y: isMobile ? 0 : imgY }}
                            className="w-full h-full"
                        >
                            <img
                                src={project.previewImage}
                                alt={project.title}
                                className="w-full h-full object-cover work-card-image"
                                loading={index < 3 ? "eager" : "lazy"}
                            />
                        </motion.div>

                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 transition-opacity duration-700 ${
                            isFeatured
                                ? 'bg-gradient-to-r from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/50 to-transparent'
                                : 'bg-gradient-to-t from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/40 to-transparent'
                        }`} />
                    </div>

                    {/* ── Large Index Watermark ── */}
                    <div className={`absolute z-10 work-card-index pointer-events-none ${
                        isFeatured
                            ? 'top-6 right-8 md:right-14 text-[8rem] md:text-[12rem]'
                            : 'top-4 right-6 text-[6rem] md:text-[8rem]'
                    }`}>
                        {displayIndex}
                    </div>

                    {/* ── Content Layer ── */}
                    <motion.div
                        className={`relative z-10 flex h-full ${
                            isFeatured
                                ? 'flex-col justify-end p-8 md:p-12 lg:p-16'
                                : 'flex-col justify-end p-6 md:p-8'
                        }`}
                        variants={contentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Year + Role */}
                        <motion.div variants={childFade} className="flex items-center gap-3 mb-4">
                            <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                                {project.year}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]/50" />
                            <span className="text-xs tracking-[0.1em] uppercase text-[var(--text-muted)]">
                                {project.role}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            variants={childFade}
                            className={`font-bold text-[var(--text-primary)] mb-3 leading-[1.05] tracking-tight ${
                                isFeatured
                                    ? 'text-4xl md:text-5xl lg:text-6xl'
                                    : 'text-2xl md:text-3xl'
                            }`}
                            style={{ fontFamily: "var(--font-display)", textWrap: 'balance' }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            variants={childFade}
                            className={`text-[var(--text-secondary)] mb-6 leading-relaxed line-clamp-2 ${
                                isFeatured
                                    ? 'text-base md:text-lg max-w-lg'
                                    : 'text-sm'
                            }`}
                        >
                            {project.shortDescription}
                        </motion.p>

                        {/* Tech Tags — reveal on hover */}
                        <div className="flex flex-wrap gap-1.5 mb-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                            {project.techStack.slice(0, 5).map((tech, i) => (
                                <span
                                    key={tech.name}
                                    className="px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase rounded-full bg-[var(--bg-highlight)] border border-[var(--border-color)] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-all duration-300"
                                    style={{ transitionDelay: `${i * 40}ms` }}
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>

                        {/* View Arrow */}
                        <motion.div variants={childFade} className="flex items-center gap-3">
                            <span className="w-8 h-px bg-[var(--border-color)] group-hover:w-12 group-hover:bg-[var(--accent-1)] transition-all duration-500" />
                            <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="text-[var(--text-muted)] group-hover:text-[var(--accent-1)] work-arrow transition-colors duration-300"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* ── Edge Glow ── */}
                    <div className="work-card-glow" />

                </motion.div>
            </Link>
        </motion.div>
    )
}
