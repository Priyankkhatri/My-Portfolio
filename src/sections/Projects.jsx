import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import cloneWebsites from '../data/clone-websites.json'
import miniGamesData from '../data/mini-games.json'

const projects = [
    {
        title: 'API Image Gallery',
        tagline: 'Dynamic search & lazy loading',
        image: '/project-api-gallery.png',
        description: 'A responsive image gallery that fetches high-quality images via the Pexels API. Features dynamic keyword search, lazy loading without page reloads, and a fast frontend UI.',
        tech: ['HTML5', 'CSS3', 'JS', 'Pexels API', 'Netlify'],
        live: 'https://api-image-gallery.netlify.app',
        source: 'https://github.com/Priyankkhatri/My-Projects',
        year: '2025',
        role: 'Frontend Developer',
    },
    {
        title: 'Movie Explorer',
        tagline: 'Cinematic details & dynamic search',
        image: '/project-movie-explorer.jpeg',
        description: 'Movie search & details explorer using the OMDb API; cinematic details hero. Built to practice dynamic search, API integration, and creating clean detail pages with React and Tailwind.',
        tech: ['React.js', 'Tailwind CSS', 'OMDb API', 'Netlify'],
        live: 'https://api-movie-explorer.netlify.app',
        source: 'https://github.com/Priyankkhatri',
        year: '2026',
        role: 'Frontend Developer',
    },
    {
        title: 'Weather API',
        tagline: 'Upcoming personal API wrapper',
        image: '/project-weather-api.jpeg',
        description: '[Upcoming Project] Personal API wrapper over a public weather API with caching and a small frontend. Planning to use Redis or Mongo for caching to optimize external API requests.',
        tech: ['Node.js', 'Redis/Mongo', 'Render'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: 'Planned',
        role: 'Backend Developer',
    },
    {
        title: 'Clone Websites',
        tagline: 'Pixel-perfect website recreations',
        image: '/project-clones.jpeg',
        description: 'Frontend clones of popular brand websites (DJI, Nothing, Prime, etc.) built to practice layout, responsiveness, and modern CSS techniques.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: '2025',
        role: 'Frontend',
    },
    {
        title: 'Mini Games',
        tagline: 'Interactive fun & logic challenges',
        image: '/project-mini-games.jpeg',
        description: 'A collection of small, interactive games including Tic Tac Toe, Whack A Mole, and more, built to practice game logic and UI interactions.',
        tech: ['HTML5', 'CSS3', 'JS', 'Logic'],
        live: '#',
        source: 'https://github.com/Priyankkhatri',
        year: '2025',
        role: 'Frontend Developer',
    },
]

function ProjectCard({ project, index, onClick }) {
    const ref = useRef(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const isInView = useInView(ref, { once: true, margin: '-60px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const isEven = index % 2 === 0
    const num = String(index + 1).padStart(2, '0')

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setTilt({ x: y * -5, y: x * 5 })
    }
    const handleLeave = () => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
        setCursorVariant('default')
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 80, z: 0 }}
            animate={
                isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        z: 0,
                        rotateX: tilt.x,
                        rotateY: tilt.y,
                        scale: isHovered ? 1.01 : 1,
                    }
                    : { z: 0 }
            }
            transition={
                isHovered
                    ? { rotateX: { duration: 0.15, ease: 'easeOut' }, rotateY: { duration: 0.15, ease: 'easeOut' }, scale: { duration: 0.3 }, default: { duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }
                    : { rotateX: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }, rotateY: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }, scale: { duration: 0.4 }, default: { duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }
            }
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className={`glass-card glass-card-hover overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
            onMouseMove={handleMouse}
            onMouseEnter={() => { setIsHovered(true); setCursorVariant('hover') }}
            onMouseLeave={handleLeave}
            onClick={onClick}
            whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
        >
            <div
                className={`grid grid-cols-1 lg:grid-cols-5 lg:min-h-[400px]`}
            >
                {/* Image area — 2 cols */}
                <div
                    className={`relative col-span-2 bg-[var(--bg-secondary)] overflow-hidden group min-h-[220px] lg:min-h-0 ${!isEven ? 'lg:order-2' : ''
                        }`}
                >
                    {project.image ? (
                        <div className="absolute inset-0 bg-black">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover select-none opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-highlight)] to-transparent opacity-20 mix-blend-overlay" />
                        </div>
                    ) : (
                        <>
                            {/* Number watermark */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--bg-highlight)] to-transparent">
                                <span
                                    className="text-[8rem] md:text-[12rem] font-bold text-[var(--text-primary)]/[0.02] select-none group-hover:text-[var(--text-primary)]/[0.04] transition-colors duration-700"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    {num}
                                </span>
                            </div>

                            {/* Decorative grid pattern */}
                            <div className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }}
                            />
                        </>
                    )}

                    {/* Corner accent */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className="w-3 h-3 border border-[var(--border-color)] rounded-sm" />
                        <span className="text-[9px] tracking-[0.3em] text-[var(--text-secondary)] uppercase">{project.year}</span>
                    </div>

                    {/* Hover shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[var(--bg-highlight)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Content — 3 cols */}
                <div className={`col-span-3 p-6 sm:p-8 md:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]">Project {num}</span>
                        <span className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                        <span className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)]">{project.role}</span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-2"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm text-[var(--text-secondary)] italic mb-6">{project.tagline}</p>

                    {/* Description */}
                    <p className="text-sm leading-[1.8] text-[var(--text-secondary)] mb-8 max-w-lg">
                        {project.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                            <span key={t} className="tech-pill">{t}</span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-6 pt-6 border-t border-[var(--border-color)]">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (onClick) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onClick();
                                }
                            }}
                            className="group inline-flex items-center gap-2.5 text-sm py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Open
                        </a>
                        <a
                            href={project.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => onClick && e.stopPropagation()}
                            className="group inline-flex items-center gap-2.5 text-sm py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform duration-300">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            Source Code
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const [modalType, setModalType] = useState(null) // 'clones' or 'games'
    const [activeClone, setActiveClone] = useState(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (activeClone) {
                    setActiveClone(null)
                } else {
                    setModalType(null)
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activeClone])

    const closeModal = () => {
        setModalType(null)
        setActiveClone(null)
    }

    return (
        <section id="projects" ref={sectionRef} className="py-16 sm:py-32 px-6 md:px-12 lg:px-24 relative">
            {/* Section divider */}
            <div className="section-divider mb-16 sm:mb-32" />

            <div className="floating-orb w-80 h-80 bg-violet-800 -top-20 right-0" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">003 &mdash; Work</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <h2
                            className="text-3xl md:text-5xl font-bold mb-3 text-[var(--text-primary)]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Selected <span className="text-gradient-silver">Projects</span>
                        </h2>
                        <p className="text-sm text-[var(--text-secondary)] max-w-md">
                            A curated selection of projects that showcase my approach to solving
                            complex problems with elegant solutions.
                        </p>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] mt-4 md:mt-0">{projects.length} projects</span>
                </div>

                <div className="flex flex-col gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={i}
                            onClick={
                                project.title === 'Clone Websites' 
                                    ? () => setModalType('clones') 
                                    : project.title === 'Mini Games'
                                    ? () => setModalType('games')
                                    : undefined
                            }
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <p className="text-xs text-[var(--text-secondary)] mb-4">Want to see more?</p>
                    <a
                        href="https://github.com/Priyankkhatri/My-Projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors link-underline"
                    >
                        View all on GitHub
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                </motion.div>
            </motion.div>

            {/* Clone Websites Modal */}
            <AnimatePresence>
                {modalType && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center px-4 md:px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        {/* ── Animated Aura Backdrop ── */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl overflow-hidden">
                            {/* Floating animated orbs for dynamic feel */}
                            <motion.div 
                                animate={{ 
                                    x: [0, 100, -50, 0],
                                    y: [0, -50, 100, 0],
                                    scale: [1, 1.2, 0.8, 1],
                                    rotate: [0, 90, 180, 270, 360]
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen"
                            />
                            <motion.div 
                                animate={{ 
                                    x: [0, -120, 80, 0],
                                    y: [0, 100, -80, 0],
                                    scale: [1, 0.9, 1.1, 1],
                                    rotate: [360, 270, 180, 90, 0]
                                }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-[10%] -right-[15%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[140px] mix-blend-screen"
                            />
                            <motion.div 
                                animate={{ 
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-violet-900/10 to-transparent"
                            />
                        </div>

                        <motion.div
                            className={`relative glass-card ${activeClone ? 'max-w-6xl' : 'max-w-4xl'} w-full z-10 overflow-hidden shadow-2xl border-white/10`}
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            layout
                        >
                            {/* Top bar */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--bg-highlight-hover)] to-transparent" />

                            {activeClone ? (
                                /* ── Iframe View ── */
                                <div className="flex flex-col" style={{ height: '80vh' }}>
                                    {/* Iframe header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setActiveClone(null)}
                                                className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="15 18 9 12 15 6" />
                                                </svg>
                                                Back
                                            </button>
                                            <span className="w-px h-4 bg-[var(--border-color)]" />
                                            <span
                                                className="text-sm font-semibold text-[var(--text-primary)]"
                                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                            >
                                                {activeClone.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <a
                                                href={activeClone.path || activeClone.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[10px] tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                                            >
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                                New Tab
                                            </a>
                                            <button
                                                onClick={closeModal}
                                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Iframe */}
                                    <div className="flex-1 bg-white">
                                        <iframe
                                            src={activeClone.path || activeClone.url}
                                            title={activeClone.title}
                                            className="w-full h-full border-0"
                                            sandbox="allow-scripts allow-same-origin"
                                        />
                                    </div>
                                </div>
                            ) : (
                                /* ── List View ── */
                                <div className="p-8 md:p-12">
                                    <h3
                                        className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {modalType === 'clones' ? 'Clone Websites Collection' : 'Mini Games Collection'}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] mb-6">
                                        {modalType === 'clones' 
                                            ? `${cloneWebsites.length} pixel-perfect website recreations`
                                            : `${miniGamesData.length} fun interactive games`
                                        }
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {(modalType === 'clones' ? cloneWebsites : miniGamesData).map((item) => (
                                            <button
                                                key={item.id || item.title}
                                                onClick={() => {
                                                    if (modalType === 'clones') {
                                                        setActiveClone(item)
                                                    } else {
                                                        window.open(item.url, '_blank', 'noopener,noreferrer')
                                                    }
                                                }}
                                                className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] hover:border-[var(--bg-highlight-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-left relative overflow-hidden"
                                                onMouseEnter={() => setCursorVariant('hover')}
                                                onMouseLeave={() => setCursorVariant('default')}
                                            >
                                                {/* Subtle glowing background on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                
                                                <div className="relative z-10 flex flex-col h-full">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <span className="text-sm font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">
                                                            {item.title}
                                                        </span>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--text-secondary)] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                                                            {modalType === 'clones' ? (
                                                                <polyline points="9 18 15 12 9 6" />
                                                            ) : (
                                                                <>
                                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                    <polyline points="15 3 21 3 21 9" />
                                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                                </>
                                                            )}
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
                                                        {item.description || 'Interactive web experience'}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
                                        <button
                                            onClick={closeModal}
                                            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2"
                                        >
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                            Close
                                        </button>
                                        <span className="text-[10px] text-[var(--text-secondary)]">ESC to dismiss</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
