import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView, LayoutGroup } from 'framer-motion'
import useStore from '../store/useStore'

const journeyData = [
    {
        id: 'start',
        title: 'Started Journey',
        year: '2025',
        summary: 'Exploring fundamentals of computer science',
        details: 'My journey began with a deep curiosity about how digital systems operate. I dove into computer science fundamentals, learning to break down complex problems and understanding the underlying logic before writing any code. This foundational phase set the stage for everything that followed.',
        stats: [
            { label: 'Focus', value: 'Algorithms & Logic' },
            { label: 'Core', value: 'C / C++ Basics' }
        ],
        accent: 'rgba(100, 140, 220, 0.1)' // blue neutral
    },
    {
        id: 'build',
        title: 'Building Projects',
        year: '2026',
        summary: 'Creating APIs, and React apps to learn',
        details: 'Transitioning from theory to practice, I started architecting real-world applications. I embraced the MERN stack, focusing on building robust REST APIs and responsive, dynamic interfaces with React. Every project became a playground for testing new architectures, state management, and modern UI/UX principles.',
        stats: [
            { label: 'Stack', value: 'MERN & Next.js' },
            { label: 'Focus', value: 'System Architecture' }
        ],
        accent: 'rgba(120, 100, 200, 0.1)' // violet neutral
    },
    {
        id: 'current',
        title: 'Currently Learning',
        year: 'Present',
        summary: '2nd-Semester BE/B.Tech CSE at Coding Gita',
        details: 'Currently honing my skills in an intense offline environment. I am pushing the boundaries of frontend performance, exploring advanced state management, and learning to write production-grade, highly scalable backend services. The goal is to build tools that are not only functional but feel premium and alive.',
        stats: [
            { label: 'Current Phase', value: 'Advanced Full-Stack' },
            { label: 'Goal', value: 'Production SaaS' }
        ],
        accent: 'rgba(80, 160, 130, 0.1)' // emerald neutral
    }
]

function InteractiveNode({ item, index, isActive, setActiveIndex, isLast, setCursorVariant }) {
    const nodeRef = useRef(null)
    const [lightPos, setLightPos] = useState({ x: 50, y: 50 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e) => {
        if (!nodeRef.current) return
        const rect = nodeRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setLightPos({ x, y })
    }

    return (
        <div 
            className="flex gap-6 md:gap-8 group relative cursor-pointer"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => {
                setIsHovered(true)
                setCursorVariant('hover')
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                setCursorVariant('default')
            }}
            onMouseMove={handleMouseMove}
            ref={nodeRef}
            aria-current={isActive}
        >
            {/* Timeline line and dot column */}
            <div className="flex flex-col items-center relative z-10 w-6">
                <motion.div 
                    initial={false}
                    animate={{ 
                        scale: isActive ? 1.15 : isHovered ? 1.05 : 1,
                        boxShadow: isActive ? '0 0 20px rgba(96, 165, 250, 0.4)' : isHovered ? '0 0 10px rgba(255, 255, 255, 0.1)' : '0 0 0px rgba(0,0,0,0)'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-5 h-5 rounded-full border-[1.5px] relative bg-[#060a12] z-20 flex items-center justify-center shrink-0
                        ${isActive ? 'border-blue-400' : 'border-white/20 group-hover:border-white/40'}
                    `}
                >
                    {isActive && (
                        <motion.div 
                            layoutId="activeTimelineIndicator"
                            className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                    )}
                    
                    {/* Active pulse ring */}
                    {isActive && (
                        <motion.div
                            className="absolute inset-0 rounded-full border border-blue-400/50"
                            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        />
                    )}
                </motion.div>
                
                {/* Connecting line */}
                {!isLast && (
                    <div className="w-px h-28 my-3 relative bg-white/[0.05] overflow-hidden shrink-0">
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ 
                                background: 'linear-gradient(to bottom, rgba(0,150,255,0.4), rgba(0,150,255,0.05))'
                            }}
                            animate={{ 
                                y: ['-100%', '100%'],
                                opacity: isActive ? 1 : 0.3
                            }}
                            transition={{ 
                                y: { repeat: Infinity, duration: 2.5, ease: "linear" },
                                opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Node card preview */}
            <div className="flex-1 pb-10">
                <motion.div 
                    animate={
                        isActive 
                        ? { y: 0, backgroundColor: 'rgba(59, 130, 246, 0.04)', borderColor: 'rgba(59, 130, 246, 0.12)' }
                        : isHovered 
                            ? { y: -2, backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' } 
                            : { y: 0, backgroundColor: 'rgba(255,255,255,0.01)', borderColor: 'rgba(255,255,255,0.03)' }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative px-5 py-4 rounded-xl border overflow-hidden"
                >
                    {/* Hover light effect */}
                    <motion.div 
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                        animate={{ opacity: isHovered || isActive ? 1 : 0 }}
                        style={{
                            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.06), transparent 40%)`
                        }}
                    />

                    <p className={`text-[10px] tracking-[0.2em] font-semibold uppercase transition-colors duration-400 ease-[0.22,1,0.36,1] relative z-10
                        ${isActive ? 'text-blue-400' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}
                    `}>
                        {item.year}
                    </p>
                    <h3 className={`text-base sm:text-lg font-bold mt-1.5 transition-colors duration-400 ease-[0.22,1,0.36,1] relative z-10
                        ${isActive ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-white'}
                    `} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {item.title}
                    </h3>
                    <p className={`text-[13px] mt-1.5 leading-relaxed transition-colors duration-400 ease-[0.22,1,0.36,1] relative z-10
                        ${isActive ? 'text-blue-100/60' : 'text-[var(--text-muted)]'}
                    `}>
                        {item.summary}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default function About() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const autoPlayRef = useRef(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        if (!isAutoPlaying) {
            if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
            return
        }

        const startTimer = () => {
            autoPlayRef.current = setTimeout(() => {
                setActiveIndex((prev) => (prev + 1) % journeyData.length)
            }, 3500) // Slightly longer pause to allow reading
        }

        startTimer()
        return () => clearTimeout(autoPlayRef.current)
    }, [activeIndex, isAutoPlaying])

    return (
        <section id="about" ref={sectionRef} className="py-16 sm:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            {/* Section divider */}
            <div className="section-divider mb-16 sm:mb-32" />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto relative z-10"
            >
                {/* Dynamic Global Background Shift */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-70"
                    animate={{ background: journeyData[activeIndex].accent }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Soft Ambient Cinematic Light */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[600px] pointer-events-none -z-10"
                    animate={{ 
                        opacity: [0.03, 0.06, 0.03],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, transparent 80%)' }}
                />

                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">002 &mdash; About</p>
                </div>
                <h2
                    className="text-3xl md:text-5xl font-bold mb-16 text-[var(--text-primary)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Building with <span className="text-gradient-silver">Purpose</span>
                </h2>

                <div 
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* LEFT PANEL: TIMELINE */}
                    <div className="lg:col-span-5 flex flex-col">
                        <LayoutGroup>
                            {journeyData.map((item, idx) => (
                                <InteractiveNode 
                                    key={item.id}
                                    item={item}
                                    index={idx}
                                    isActive={idx === activeIndex}
                                    setActiveIndex={setActiveIndex}
                                    isLast={idx === journeyData.length - 1}
                                    setCursorVariant={setCursorVariant}
                                />
                            ))}
                        </LayoutGroup>
                    </div>

                    {/* RIGHT PANEL: CONTENT DISPLAY */}
                    <div className="lg:col-span-7 h-full min-h-[420px] pb-10 lg:pb-0" style={{ perspective: 1000 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, filter: 'blur(6px)', scale: 0.99 }}
                                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }} // Exit triggers the "dim" effect via fast opacity transition
                                transition={{ 
                                    duration: 0.5, 
                                    ease: [0.22, 1, 0.36, 1],
                                    opacity: { duration: 0.3, ease: 'easeOut' } // Fast dim out
                                }}
                                whileHover={{ rotateX: 0.5, rotateY: -0.5 }} // Extremely subtle
                                className="glass-card h-full p-8 md:p-12 relative overflow-hidden rounded-[2rem] flex flex-col justify-between"
                                style={{
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.002) 100%)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Active State Background Ambient Blur inside the card */}
                                <motion.div 
                                    className="absolute -top-32 -right-32 w-96 h-96 blur-[90px] rounded-full pointer-events-none"
                                    animate={{ background: journeyData[activeIndex].accent }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                />
                                <motion.div 
                                    className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />

                                <div className="relative z-10 flex flex-col h-full transform-gpu" style={{ transform: 'translateZ(20px)' }}>
                                    <div>
                                        <motion.div 
                                            className="relative inline-block group mb-2" 
                                            whileHover="hover"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.04 }} // micro-delay
                                        >
                                            <motion.h3 
                                                className="text-3xl lg:text-4xl font-bold relative z-10 cursor-default tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/60" 
                                                style={{ fontFamily: "'Poppins', sans-serif" }}
                                                variants={{ hover: { letterSpacing: '-0.3px' } }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                {journeyData[activeIndex].title}
                                            </motion.h3>
                                            <motion.div 
                                                className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400 origin-center"
                                                variants={{ hover: { scaleX: 1, opacity: 1 } }}
                                                initial={{ scaleX: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center gap-3 mb-8"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                                        >
                                            <span className="text-blue-400 font-medium tracking-wide">
                                                {journeyData[activeIndex].year}
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                            <span className="text-xs text-[var(--text-secondary)]">
                                                My Timeline
                                            </span>
                                        </motion.div>

                                        <motion.div 
                                            className="w-12 h-px bg-white/20 mb-8" 
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 48 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
                                        />

                                        <motion.p 
                                            className="text-[15px] text-[var(--text-secondary)] mb-8"
                                            style={{ lineHeight: 1.6, opacity: 0.85 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }} // micro-delay
                                        >
                                            {journeyData[activeIndex].details}
                                        </motion.p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mt-auto pt-8 border-t border-white/5">
                                        {journeyData[activeIndex].stats.map((stat, i) => (
                                            <motion.div 
                                                key={i} 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 + (i * 0.04) }} // staggering tags
                                                className="flex flex-col p-4 rounded-xl relative overflow-hidden bg-white/[0.01] border border-white/[0.02] cursor-pointer"
                                                whileHover={{ 
                                                    y: -2, 
                                                    boxShadow: '0 8px 25px rgba(0, 150, 255, 0.08)',
                                                    borderColor: 'rgba(255,255,255,0.06)'
                                                }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-blue-400 mb-1.5 font-bold relative z-10 transition-colors">
                                                    {stat.label}
                                                </span>
                                                <span className="text-[13px] font-medium text-white/90 relative z-10">
                                                    {stat.value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
