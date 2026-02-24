import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import useStore from '../store/useStore'

const certificates = [
    {
        title: 'Introduction to Front-End Development',
        issuer: 'Coursera (Meta)',
        date: 'In Progress',
        category: 'Frontend',
        hours: 'Pending',
    },
    {
        title: 'Introduction to Back-End Development',
        issuer: 'Coursera (Meta)',
        date: 'Upcoming',
        category: 'Backend',
        hours: 'Pending',
    },
    {
        title: 'Maximize Productivity With AI Tools',
        issuer: 'Coursera (Google)',
        date: 'Upcoming',
        category: 'Tools',
        hours: 'Pending',
    },
]

function CertCard({ cert, index, onClick }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }}
            className="glass-card glass-card-hover min-w-[300px] md:min-w-[340px] flex-shrink-0 select-none group"
        >
            {/* Top gradient bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/15">{cert.category}</span>
                    <span className="text-[10px] text-white/10">{cert.date}</span>
                </div>

                {/* Certificate visual */}
                <div className="w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] mb-6 flex items-center justify-center relative overflow-hidden">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    />
                    {/* Certificate icon */}
                    <div className="relative">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/10 group-hover:text-white/20 transition-colors duration-500">
                            <rect x="3" y="4" width="18" height="16" rx="2" />
                            <path d="M7 8h10M7 12h6M7 16h3" />
                            <circle cx="17" cy="15" r="2" />
                            <path d="M17 17v2" />
                        </svg>
                    </div>
                    {/* Hover shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </div>

                {/* Info */}
                <h4
                    className="text-sm font-semibold text-white/75 mb-1.5 group-hover:text-white/90 transition-colors duration-300"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    {cert.title}
                </h4>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-white/25">{cert.issuer}</p>
                    <span className="text-[10px] text-white/15">{cert.hours}</span>
                </div>

                {/* Bottom action hint */}
                <div className="mt-5 pt-4 border-t border-white/[0.04] flex items-center gap-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15">
                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    <span className="text-[10px] text-white/15 group-hover:text-white/30 transition-colors">Click to view</span>
                </div>
            </div>
        </motion.div>
    )
}

export default function Certificates() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const [selected, setSelected] = useState(null)

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
        <section id="certificates" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
            <div className="section-divider mb-32" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-white/10" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-white/20">004 &mdash; Credentials</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <h2
                            className="text-3xl md:text-5xl font-bold mb-3 text-white/90"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Certificates & <span className="text-gradient-silver">Awards</span>
                        </h2>
                        <p className="text-sm text-white/25 max-w-md">
                            Continuous learning is at the heart of what I do. Here are some highlights from my journey.
                        </p>
                    </div>
                    <span className="text-xs text-white/10 mt-4 md:mt-0">{certificates.length} credentials</span>
                </div>

                {/* Horizontal scroll */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0e17] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0e17] to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-5 overflow-x-auto pb-4 px-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                        {certificates.map((cert, i) => (
                            <CertCard key={i} cert={cert} index={i} onClick={() => setSelected(cert)} />
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    className="flex items-center justify-center gap-3 mt-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <div className="w-8 h-px bg-white/10" />
                    <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">
                        Drag to explore
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/15">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

                        <motion.div
                            className="relative glass-card max-w-lg w-full z-10 overflow-hidden"
                            initial={{ scale: 0.85, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top bar */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            <div className="p-8 md:p-12">
                                {/* Category badge */}
                                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/5 rounded-full text-white/30 mb-6">
                                    {selected.category}
                                </span>

                                {/* Certificate visual */}
                                <div className="w-full aspect-[16/9] rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] mb-8 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-[0.04]"
                                        style={{
                                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                            backgroundSize: '20px 20px',
                                        }}
                                    />
                                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/15">
                                        <rect x="3" y="4" width="18" height="16" rx="2" />
                                        <path d="M7 8h10M7 12h6M7 16h3" />
                                        <circle cx="17" cy="15" r="2" /><path d="M17 17v2" />
                                    </svg>
                                </div>

                                <h3
                                    className="text-xl md:text-2xl font-bold text-white/90 mb-2"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    {selected.title}
                                </h3>

                                <div className="flex items-center gap-3 text-sm text-white/30 mb-2">
                                    <span>{selected.issuer}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/15" />
                                    <span>{selected.date}</span>
                                </div>

                                <p className="text-xs text-white/15 mb-8">{selected.hours}</p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/[0.04]">
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="text-xs tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Close
                                    </button>
                                    <span className="text-[10px] text-white/10">ESC to dismiss</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
