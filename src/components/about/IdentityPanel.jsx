import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
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
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1776485115/WhatsApp_Image_2026-04-18_at_09.32.00_fudfnq.jpg', 
        label: 'Architecture' 
    },
    { 
        id: 2, 
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1776485115/WhatsApp_Image_2026-04-18_at_09.26.47_1_fhl7hh.jpg', 
        label: 'Interface' 
    },
    { 
        id: 3, 
        image: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1776485114/WhatsApp_Image_2026-04-18_at_09.26.47_fnlkub.jpg', 
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
    const containerRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-10%' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    // Image stack state
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % visualStack.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    // Parallax logic
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { damping: 30, stiffness: 200 })
    const springY = useSpring(mouseY, { damping: 30, stiffness: 200 })

    const rotateX = useTransform(springY, [-300, 300], [5, -5])
    const rotateY = useTransform(springX, [-300, 300], [-5, 5])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
        setCursorVariant('default')
    }

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setCursorVariant('hover')}
                style={{
                    rotateX,
                    rotateY,
                    perspective: 1200,
                    transformStyle: 'preserve-3d',
                }}
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

                {/* Right Side: 3D Fanned Image Stack System */}
                <div className="flex-1 min-h-[400px] relative flex items-center justify-center p-12 bg-white/[0.01]">
                    <div className="relative w-full max-w-[340px] aspect-[4/5] transform-gpu" style={{ perspective: '2000px' }}>
                        <AnimatePresence mode="popLayout">
                            {visualStack.map((visual, i) => {
                                // Calculate relative position in the 3-card cycle
                                const relativePos = (i - activeIndex + visualStack.length) % visualStack.length
                                
                                // Mapping relative position to 3D fanned coordinates
                                // 0: Center (Front), 1: Right-Peeking (Behind), 2: Left-Peeking (Behind)
                                const config = {
                                    0: { x: 0, y: 0, z: 120, rotateY: 0, scale: 1, opacity: 1, blur: 0, zIndex: 30 },
                                    1: { x: 70, y: 15, z: 0, rotateY: -25, scale: 0.85, opacity: 0.5, blur: 4, zIndex: 10 },
                                    2: { x: -70, y: 15, z: 0, rotateY: 25, scale: 0.85, opacity: 0.5, blur: 4, zIndex: 20 },
                                }[relativePos] || { x: 0, y: 0, z: -100, rotateY: 0, scale: 0.7, opacity: 0, blur: 10, zIndex: 0 }

                                return (
                                    <motion.div
                                        key={visual.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, x: 0, z: -200 }}
                                        animate={{
                                            opacity: config.opacity,
                                            scale: config.scale,
                                            x: config.x,
                                            y: config.y,
                                            z: config.z,
                                            rotateY: config.rotateY,
                                            filter: `blur(${config.blur}px)`,
                                        }}
                                        exit={{ opacity: 0, scale: 0.5, z: -300 }}
                                        transition={{ 
                                            type: 'spring',
                                            damping: 25,
                                            stiffness: 120,
                                            mass: 1
                                        }}
                                        className="absolute inset-0 rounded-[2.5rem] overflow-hidden glass-card border-white/10 shadow-2xl"
                                        style={{
                                            zIndex: config.zIndex,
                                            boxShadow: relativePos === 0 ? '0 30px 60px rgba(0,0,0,0.6)' : 'none',
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        <div className="absolute inset-0">
                                            <img 
                                                src={visual.image}
                                                alt={visual.label}
                                                className={`w-full h-full object-cover transition-opacity duration-700 ${relativePos === 0 ? 'opacity-100' : 'opacity-80'}`}
                                            />
                                            {/* Refined overlays for better clarity */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                                        </div>

                                        {/* Label overlay (Only for active) */}
                                        <motion.div 
                                            className="absolute bottom-8 left-8 z-20"
                                            animate={{ opacity: relativePos === 0 ? 1 : 0, y: relativePos === 0 ? 0 : 20 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-black mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                                                VISUAL 0{visual.id}
                                            </span>
                                            <p className="text-2xl font-bold text-white tracking-tighter leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                                                {visual.label}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Deep ambient glow behind the fanned assembly */}
                    <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-1)] opacity-[0.03] rounded-full blur-[120px]" 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                {/* Dynamic Cursor Highlight Glow inside card */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useTransform(
                            [springX, springY],
                            ([x, y]) => `radial-gradient(circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(96,165,250,0.06) 0%, transparent 60%)`
                        )
                    }}
                />
            </motion.div>
        </section>
    )
}
