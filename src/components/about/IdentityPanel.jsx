import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

function getVisualState(relativeIndex) {
    if (relativeIndex === 0) {
        return {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1.16,
            opacity: 1,
            zIndex: 30,
        }
    }

    if (relativeIndex === 1) {
        return {
            x: 132,
            y: 18,
            rotate: 7,
            scale: 0.92,
            opacity: 0.58,
            zIndex: 20,
        }
    }

    return {
        x: -132,
        y: 18,
        rotate: -7,
        scale: 0.92,
        opacity: 0.44,
        zIndex: 10,
    }
}

export default function IdentityPanel() {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-10%' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [failedImages, setFailedImages] = useState({})
    const [activeVisual, setActiveVisual] = useState(0)

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveVisual((current) => (current + 1) % visualStack.length)
        }, 2600)

        return () => window.clearInterval(intervalId)
    }, [])

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

                {/* Right Side: Rotating Photo Stack */}
                <div className="flex flex-1 items-center justify-center min-h-[500px] relative p-8 sm:p-12 bg-white/[0.01] z-10">
                    <div className="relative mx-auto flex h-[430px] w-full max-w-[580px] items-center justify-center sm:h-[490px] md:h-[540px]">
                        {visualStack.map((visual, index) => {
                            const relativeIndex = (index - activeVisual + visualStack.length) % visualStack.length
                            const visualState = getVisualState(relativeIndex)
                            const isActive = relativeIndex === 0

                            return (
                                <motion.div
                                    key={visual.id}
                                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                                    animate={
                                        inView
                                            ? {
                                                x: visualState.x,
                                                y: visualState.y,
                                                rotate: visualState.rotate,
                                                scale: visualState.scale,
                                                opacity: visualState.opacity,
                                            }
                                            : {}
                                    }
                                    transition={{ duration: 0.85, ease }}
                                    className="group absolute left-1/2 top-1/2 h-[320px] w-[235px] -translate-x-1/2 -translate-y-1/2 sm:h-[390px] sm:w-[285px] md:h-[430px] md:w-[320px]"
                                    style={{ zIndex: visualState.zIndex }}
                                >
                                    <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] border border-white/10 bg-[rgba(16,22,36,0.28)] shadow-[0_28px_80px_rgba(0,0,0,0.42)] transition-[border-color,box-shadow,background-color] duration-500 group-hover:border-white/20 group-hover:bg-[rgba(24,34,52,0.34)] group-hover:shadow-[0_32px_90px_rgba(0,0,0,0.48),0_0_0_1px_rgba(255,255,255,0.05)]">
                                        <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                            <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_82%_86%,rgba(147,197,253,0.16),transparent_26%)] backdrop-blur-[14px]" />
                                            <div className="absolute inset-[1.5px] rounded-[2rem] border border-white/16" />
                                            <div className="absolute inset-x-5 top-[1px] h-12 rounded-b-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.08)_44%,transparent)] blur-[1px]" />
                                            <div className="absolute bottom-0 left-[10%] right-[10%] h-16 rounded-t-[2rem] bg-[linear-gradient(0deg,rgba(255,255,255,0.14),transparent_70%)]" />
                                            <div className="absolute inset-y-8 left-0 w-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.16),transparent)]" />
                                            <div className="absolute inset-y-8 right-0 w-10 bg-[linear-gradient(270deg,rgba(255,255,255,0.12),transparent)]" />
                                        </div>
                                        <div className="absolute inset-[12px] overflow-hidden rounded-[1.65rem] border border-white/8 bg-[rgba(5,8,16,0.08)]">
                                            <img
                                                src={visual.image}
                                                alt={visual.label}
                                                loading={relativeIndex === 0 ? 'eager' : 'lazy'}
                                                onError={() => {
                                                    setFailedImages((prev) => ({ ...prev, [visual.id]: true }))
                                                }}
                                                className={`block h-full w-full object-cover transition-[filter] duration-700 ${
                                                    isActive
                                                        ? 'grayscale-0 saturate-100'
                                                        : 'grayscale saturate-0'
                                                }`}
                                            />
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_22%,transparent_78%,rgba(255,255,255,0.06))]" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-white/8" />
                                        </div>

                                        {failedImages[visual.id] && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(13,19,35,0.95),rgba(9,14,27,0.98))] text-white/70 text-xs tracking-[0.3em] uppercase">
                                                Visual Offline
                                            </div>
                                        )}
                                    </div>
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
