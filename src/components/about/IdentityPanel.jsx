import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import useStore from '../../store/useStore'

const ease = [0.22, 1, 0.36, 1]

const fragments = [
    { label: 'Builder', detail: 'Turning ideas into functional, real-world digital products.' },
    { label: 'System Thinker', detail: 'Designing scalable architectures, not just feature patches.' },
    { label: 'Problem Solver', detail: 'Breaking complex problems down with DSA thinking.' },
    { label: 'UI Obsessed', detail: 'Every pixel and interaction is intentional and premium.' },
]

// Cinematic visuals for the stack
const visualStack = [
    { 
        id: 1, 
        image: '/about-photos/about-photo-1.jpg',
        label: 'Architecture' 
    },
    { 
        id: 2, 
        image: '/about-photos/about-photo-2.jpg',
        label: 'Interface' 
    },
    { 
        id: 3, 
        image: '/about-photos/about-photo-3.jpg',
        label: 'Logic' 
    },
]

function Pill({ item, index }) {
    const [expanded, setExpanded] = useState(false)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <motion.div
            onMouseEnter={() => {
                setExpanded(true)
                setCursorVariant('hover')
            }}
            onMouseLeave={() => {
                setExpanded(false)
                setCursorVariant('default')
            }}
            className="relative"
        >
            <motion.div
                layout
                className={`flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-highlight)] backdrop-blur-sm transition-all duration-300 ${expanded ? 'border-[var(--accent-1)]/30 bg-[var(--accent-1)]/5' : ''
                    }`}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)]" />
                <div className="flex flex-col">
                    <span className="text-[13px] font-bold tracking-wider uppercase text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-mono)' }}>
                        {item.label}
                    </span>
                    <AnimatePresence>
                        {expanded && (
                            <motion.span
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-[12px] text-[var(--text-secondary)] mt-1 max-w-[180px] leading-tight"
                            >
                                {item.detail}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function IdentityPanel() {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-10%' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [failedImages, setFailedImages] = useState({})

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
            <motion.div
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, ease }}
                className="max-w-6xl mx-auto glass-card relative flex flex-col lg:flex-row items-stretch min-h-[500px] group/card border-white/[0.05] hover:border-white/[0.08] transition-colors duration-700"
            >
                {/* Light sweep animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 translate-x-[-200%]"
                        animate={{ translateX: ['-200%', '200%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Left Side: Content */}
                <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-center relative z-10">
                    {/* Header */}
                    <div className="mb-10">
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                            animate={inView ? { opacity: 0.5, filter: 'blur(0px)', y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="w-8 h-px bg-[var(--accent-1)]" />
                            <span className="text-[12px] tracking-[0.4em] uppercase font-bold text-[var(--accent-1)]" style={{ fontFamily: 'var(--font-mono)' }}>
                                WHAT I DO
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, filter: 'blur(12px)', y: 20 }}
                            animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-[var(--text-primary)]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            I build <span className="text-gradient-accent">systems</span>. <br />
                            <span className="text-[var(--text-secondary)]/80 text-[0.8em]">Not just apps.</span>
                        </motion.h2>
                    </div>

                    {/* Body text */}
                    <div className="space-y-6 mb-12">
                        {[
                            "Building real-world products using MERN stack, focusing on performance, scalability, and clean architecture.",
                            "Currently exploring system design, advanced backend, and modern frontend frameworks like React and Next.js.",
                            "I aim to build fast, intuitive, production-ready systems that feel premium and alive."
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                                transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
                                className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl group/text hover:text-[var(--text-primary)] transition-colors duration-300"
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>

                    {/* Micro Identity Pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="flex flex-wrap gap-4"
                    >
                        {fragments.map((item, i) => (
                            <Pill key={i} item={item} index={i} />
                        ))}
                    </motion.div>
                </div>

                {/* Right Side: Static Photo Layout */}
                <div className="flex-1 min-h-[400px] relative p-8 sm:p-12 bg-white/[0.01] z-10">
                    <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-5">
                        {visualStack.map((visual, index) => {
                            const isPrimary = index === 0

                            return (
                                <motion.div
                                    key={visual.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease }}
                                    className={`${isPrimary ? 'col-span-2 h-[320px] sm:h-[360px]' : 'h-[180px] sm:h-[210px]'} relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(7,11,21,0.55)] shadow-[0_25px_60px_rgba(0,0,0,0.45)]`}
                                >
                                    <img
                                        src={visual.image}
                                        alt={visual.label}
                                        loading={isPrimary ? 'eager' : 'lazy'}
                                        onError={() => {
                                            setFailedImages((prev) => ({ ...prev, [visual.id]: true }))
                                        }}
                                        className="block h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                    <div className="absolute bottom-5 left-5 z-10">
                                        <span className="mb-2 block text-[10px] tracking-[0.38em] uppercase text-white/55" style={{ fontFamily: 'var(--font-mono)' }}>
                                            VISUAL 0{visual.id}
                                        </span>
                                        <p className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                                            {visual.label}
                                        </p>
                                    </div>
                                    {failedImages[visual.id] && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(13,19,35,0.95),rgba(9,14,27,0.98))] text-white/70 text-xs tracking-[0.3em] uppercase">
                                            Visual Offline
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Ambient glow */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-1)] opacity-[0.03] rounded-full blur-[120px]" 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
