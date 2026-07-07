import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import useStore from '../store/useStore'
import certificates from '../data/certificatesData'

/**
 * CertCard — 3D Tilt Card with custom theme glow and shared layout id.
 */
function CertCard({ cert, index, onClick }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        // Subtle tilt: max 6 degrees rotation
        const rotateX = ((centerY - y) / centerY) * 6
        const rotateY = ((x - centerX) / centerX) * 6
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        setCursorVariant('default')
    }

    // First card (Meta Frontend) is wide on desktop/tablets (Bento Layout)
    const gridSpan = cert.id === 'meta-frontend' 
        ? "md:col-span-2 col-span-1" 
        : "col-span-1"

    const themeColor = cert.themeColor || '#60a5fa'

    return (
        <motion.div
            ref={cardRef}
            layoutId={`cert-card-container-${cert.id}`}
            layout="position"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setCursorVariant('hover')}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
                transformStyle: 'preserve-3d',
            }}
            className={`glass-card glass-card-hover ${gridSpan} cursor-pointer group select-none relative overflow-hidden`}
        >
            {/* Top accent border line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--bg-highlight-hover)] to-transparent" />

            {/* Glowing background blob matching certificate theme color */}
            <div 
                className="absolute -inset-[100px] opacity-0 group-hover:opacity-10 pointer-events-none rounded-full blur-[80px] transition-opacity duration-700"
                style={{
                    background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`
                }}
            />

            <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[340px] relative z-10" style={{ transformStyle: 'preserve-3d' }}>
                <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6" style={{ transform: 'translateZ(15px)' }}>
                        <span className="text-[9px] tracking-[0.2em] uppercase font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--text-secondary)]">
                            {cert.category}
                        </span>
                        <span className="text-[10px] text-[var(--text-secondary)]">{cert.date}</span>
                    </div>

                    {/* Title */}
                    <motion.h4
                        layoutId={`cert-card-title-${cert.id}`}
                        className="text-lg md:text-xl font-bold text-white mb-2 leading-snug transition-colors duration-300"
                        style={{ fontFamily: "'Poppins', sans-serif", transform: 'translateZ(25px)' }}
                    >
                        {cert.title}
                    </motion.h4>
                    
                    <p className="text-xs text-[var(--text-secondary)] mb-6" style={{ transform: 'translateZ(10px)' }}>
                        {cert.issuer}
                    </p>
                </div>

                <div>
                    {/* Certificate preview thumbnail if available */}
                    {cert.image && (
                        <motion.div 
                            layoutId={`cert-card-image-wrap-${cert.id}`}
                            className="w-full aspect-video rounded-lg overflow-hidden mb-6 relative border border-white/5 group-hover:border-white/10 transition-colors shadow-lg" 
                            style={{ transform: 'translateZ(20px)' }}
                        >
                            <img
                                src={cert.image}
                                alt={`${cert.title} Thumbnail`}
                                className="w-full h-full object-cover saturate-[0.6] group-hover:saturate-[1.1] group-hover:scale-[1.03] transition-all duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                        </motion.div>
                    )}

                    {/* Lower Info & Skills Badge Summary */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-color)]" style={{ transform: 'translateZ(15px)' }}>
                        {/* Skills preview tags */}
                        {cert.skills && cert.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                                {cert.skills.slice(0, 3).map((skill, idx) => (
                                    <span key={idx} className="px-2 py-0.5 text-[8px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-[var(--text-muted)] rounded-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <span className="text-[10px] text-[var(--text-secondary)] group-hover:text-white transition-colors">Click to view</span>
                        )}

                        {/* Grade Badge */}
                        {cert.grade ? (
                            <span className="px-2 py-0.5 text-[9px] font-mono font-semibold rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                {cert.grade}
                            </span>
                        ) : (
                            <span className="text-[9px] tracking-wider text-[var(--text-muted)] uppercase">Verified</span>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Custom glowing card border on hover */}
            <div 
                className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none group-hover:border-white/10 transition-colors duration-500" 
                style={{
                    borderColor: 'transparent',
                    boxShadow: `inset 0 0 12px ${themeColor}10`
                }}
            />
        </motion.div>
    )
}

export default function Certificates() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const [selected, setSelected] = useState(null)
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = ['All', 'Frontend', 'Hackathon']

    const filteredCerts = certificates.filter(
        (c) => activeCategory === 'All' || c.category === activeCategory
    )

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelected(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <section id="certificates" ref={sectionRef} className="py-16 sm:py-32 px-6 md:px-12 lg:px-24 relative">
            <div className="section-divider mb-16 sm:mb-32" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">004 &mdash; Credentials</p>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <h2
                            className="text-3xl md:text-5xl font-bold mb-3 text-[var(--text-primary)]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Certificates & <span className="text-gradient-silver">Awards</span>
                        </h2>
                        <p className="text-sm text-[var(--text-secondary)] max-w-md">
                            Continuous learning is at the heart of what I do. Here are some highlights from my journey.
                        </p>
                    </div>

                    {/* Category Filter Switcher */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-sm self-start md:self-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors duration-300 font-medium ${
                                    activeCategory === cat ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'
                                }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeCertFilter"
                                        className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat === 'All' ? 'All' : cat + 's'}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Asymmetric Bento Grid Showcase with fluid Framer Motion animations */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCerts.map((cert, i) => (
                            <CertCard 
                                key={cert.id} 
                                cert={cert} 
                                index={i} 
                                onClick={() => setSelected(cert)} 
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Interactive hint */}
                <motion.div
                    className="flex items-center justify-center gap-3 mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                    <span className="text-[10px] tracking-[0.3em] text-[var(--text-secondary)] uppercase">
                        Click cards to verify credentials
                    </span>
                    <div className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                </motion.div>
            </motion.div>

            {/* Modal - Shared Layout Morphing */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center px-4 md:px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        {/* Animated Aura Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl overflow-hidden">
                            <motion.div 
                                animate={{ 
                                    x: [0, 100, -50, 0],
                                    y: [0, -50, 100, 0],
                                    scale: [1, 1.2, 0.8, 1],
                                    rotate: [0, 90, 180, 270, 360]
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] mix-blend-screen"
                                style={{ backgroundColor: `${selected.themeColor || '#60a5fa'}15` }}
                            />
                            <motion.div 
                                animate={{ 
                                    x: [0, -120, 80, 0],
                                    y: [0, 100, -80, 0],
                                    scale: [1, 0.9, 1.1, 1],
                                    rotate: [360, 270, 180, 90, 0]
                                }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-[10%] -right-[15%] w-[70%] h-[70%] rounded-full blur-[140px] mix-blend-screen"
                                style={{ backgroundColor: `${selected.themeColor || '#a78bfa'}15` }}
                            />
                        </div>

                        {/* Shared Layout Morph Target */}
                        <motion.div
                            layoutId={`cert-card-container-${selected.id}`}
                            className="relative glass-card max-w-lg w-full z-10 overflow-hidden shadow-2xl border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top bar accent */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--bg-highlight-hover)] to-transparent" />

                            <div className="p-6 md:p-8">
                                {/* Header with category and close */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 text-[9px] tracking-[0.2em] font-medium uppercase bg-[var(--bg-highlight)] border border-[var(--border-color)] rounded-full" style={{ color: selected.themeColor || '#60a5fa' }}>
                                        {selected.category}
                                    </span>
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="text-[var(--text-secondary)] hover:text-white transition-colors p-1"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </div>

                                {/* Certificate Image Container - Shared Layout */}
                                <motion.div 
                                    layoutId={`cert-card-image-wrap-${selected.id}`}
                                    className="w-full aspect-video rounded-xl bg-gradient-to-br from-[var(--bg-highlight)] to-transparent mb-6 flex items-center justify-center relative shadow-inner-glow overflow-hidden group"
                                >
                                    {selected.image ? (
                                        <img
                                            src={selected.image}
                                            alt={`${selected.title} Certificate`}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 opacity-[0.05]"
                                                style={{
                                                    backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                                                    backgroundSize: '20px 20px',
                                                }}
                                            />
                                            <div className="relative group-hover:scale-110 transition-transform duration-700">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                                                    <rect x="3" y="4" width="18" height="16" rx="2" />
                                                    <path d="M7 8h10M7 12h6M7 16h3" />
                                                    <circle cx="17" cy="15" r="2" /><path d="M17 17v2" />
                                                </svg>
                                            </div>
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                                </motion.div>

                                <div className="space-y-5">
                                    <div>
                                        <motion.h3
                                            layoutId={`cert-card-title-${selected.id}`}
                                            className="text-lg md:text-xl font-bold text-white mb-2"
                                            style={{ fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            {selected.title}
                                        </motion.h3>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[var(--text-secondary)]">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selected.themeColor || '#60a5fa' }} />
                                                <span className="font-medium text-[var(--text-primary)]/80">{selected.issuer}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px]">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                                <span>{selected.date}</span>
                                            </div>
                                            {selected.grade && (
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                                    <span className="text-[9px] font-mono font-semibold">GRADE: {selected.grade}</span>
                                                </div>
                                            )}
                                            {selected.credentialId && (
                                                <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[var(--bg-highlight)] border border-[var(--border-color)]">
                                                    <span className="text-[8px] uppercase tracking-widest font-mono text-[var(--text-muted)]">ID: {selected.credentialId}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {selected.description && (
                                        <div className="p-4 rounded-xl bg-[var(--bg-highlight)]/30 border border-[var(--border-color)]">
                                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>
                                        </div>
                                    )}

                                    {selected.skills && selected.skills.length > 0 && (
                                        <div className="space-y-2">
                                            <span className="text-[9px] tracking-wider text-[var(--text-muted)] uppercase">Skills Earned</span>
                                            <div className="flex flex-wrap gap-2">
                                                {selected.skills.map((skill, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 text-[10px] bg-[var(--bg-highlight)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-secondary)] hover:text-white rounded-md border border-[var(--border-color)] transition-colors">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => setSelected(null)}
                                                className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-2 group"
                                            >
                                                <svg className="group-hover:-translate-x-1 transition-transform" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                Dismiss
                                            </button>

                                            {selected.credentialUrl && (
                                                <a
                                                    href={selected.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] tracking-[0.2em] uppercase transition-all flex items-center gap-2 group"
                                                    style={{ color: selected.themeColor || '#60a5fa' }}
                                                >
                                                    Verify Online
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                </a>
                                            )}
                                        </div>
                                        <span className="text-[9px] tracking-wider text-[var(--text-muted)] hidden sm:block uppercase">ESC TO CLOSE</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
