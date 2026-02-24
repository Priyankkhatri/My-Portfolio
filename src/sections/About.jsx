import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import useStore from '../store/useStore'

/* ── Tilt Card ──────────────────────────────────────────── */
function TiltCard({ children, className = '', span = '', delay = 0 }) {
    const ref = useRef(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setTilt({ x: y * -8, y: x * 8 })
    }
    const handleLeave = () => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
        setCursorVariant('default')
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => { setIsHovered(true); setCursorVariant('hover') }}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 40 }}
            animate={
                inView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: tilt.x,
                        rotateY: tilt.y,
                    }
                    : {}
            }
            transition={
                isHovered
                    ? { rotateX: { duration: 0.15, ease: 'easeOut' }, rotateY: { duration: 0.15, ease: 'easeOut' }, default: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
                    : { rotateX: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }, rotateY: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }, default: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
            }
            style={{ perspective: 800 }}
            className={`glass-card glass-card-hover p-6 md:p-8 relative ${span} ${className}`}
        >
            {children}
        </motion.div>
    )
}


/* ── Tech Icon with hover glow ──────────────────────────── */
const techStack = [
    { label: 'C / C++', icon: '⚡' },
    { label: 'HTML / CSS', icon: '🎨' },
    { label: 'JavaScript', icon: '💛' },
    { label: 'React / Next.js', icon: '⚛️' },
    { label: 'Node.js', icon: '🟢' },
    { label: 'Express', icon: '🔲' },
    { label: 'MongoDB', icon: '🍃' },
    { label: 'Netlify / Render', icon: '☁️' },
    { label: 'Git / GitHub', icon: '🔀' },
    { label: 'Chrome DevTools', icon: '🛠️' },
]

const interests = [
    { icon: '🏸', label: 'Badminton', desc: 'Competitive player' },
    { icon: '⚽', label: 'Football', desc: 'Casual/competitive' },
    { icon: '📷', label: 'Photography', desc: 'Street & landscape' },
    { icon: '🏎️', label: 'Cars', desc: 'BMW M4 enthusiast' },
    { icon: '📱', label: 'Tech Tinkering', desc: 'Android rooting & custom ROMs' },
]

/* ── Experience Timeline ────────────────────────────────── */
const experience = [
    { year: 'Currently', title: '2nd-Semester B.Tech CSE', desc: 'Coding Gita (Offline Institute)' },
    { year: '2026', title: 'Building Projects', desc: 'Creating APIs, and React apps to learn' },
    { year: '2025', title: 'Started Journey', desc: 'Exploring fundamentals of computer science' },
]

export default function About() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    return (
        <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
            {/* Section divider */}
            <div className="section-divider mb-32" />

            {/* Floating decorative orbs */}
            <div className="floating-orb w-72 h-72 bg-blue-500 top-20 -right-32" />
            <div className="floating-orb w-48 h-48 bg-violet-800 bottom-40 left-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-white/10" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-white/45">002 &mdash; About</p>
                </div>
                <h2
                    className="text-3xl md:text-5xl font-bold mb-6 text-white/90"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Building with <span className="text-gradient-silver">Purpose</span>
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-lg mb-16">
                    A passionate student discovering the intricacies of web development,
                    from crafting pixel-perfect UIs to designing robust APIs.
                </p>

                {/* ── Bento Grid ────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

                    {/* Bio Card — large */}
                    <TiltCard span="lg:col-span-2 lg:row-span-2" delay={0}>
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-6">Who I Am</p>
                                <h3
                                    className="text-2xl md:text-3xl font-bold text-white/90 mb-2"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Priyank
                                </h3>
                                <p className="text-sm text-white/45 mb-6">B.Tech CSE &bull; Full-Stack Developer</p>
                                <p className="text-sm leading-[1.8] text-white/50 mb-4">
                                    I’m a 2nd-semester Computer Science student at Coding Gita. I build small web apps (image galleries, movie explorers), REST APIs with <span className="text-white/55">Node.js + MongoDB</span>, and browser games with <span className="text-white/55">HTML/CSS/JS</span>.
                                </p>
                                <p className="text-sm leading-[1.8] text-white/45">
                                    Currently learning React/Next.js, data structures, and backend architecture. I love experimenting with UI/UX, performance optimization, and system fundamentals.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/[0.04]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="text-xs text-white/45">India</span>
                                <span className="ml-auto flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-[#60a5fa]/60 rounded-full animate-pulse-glow" />
                                    <span className="text-[10px] text-white/60">Open to internships</span>
                                </span>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Experience Timeline */}
                    <TiltCard span="lg:col-span-2" delay={0.1}>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-6">Journey</p>
                        <div className="flex flex-col gap-5">
                            {experience.map((exp, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors mt-1.5" />
                                        {i < experience.length - 1 && <div className="w-px h-full bg-white/[0.04] mt-1" />}
                                    </div>
                                    <div className="pb-4">
                                        <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase">{exp.year}</span>
                                        <h4 className="text-sm font-medium text-white/70 mt-1">{exp.title}</h4>
                                        <p className="text-xs text-white/60 mt-0.5">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TiltCard>

                    {/* Interests Card */}
                    <TiltCard span="lg:col-span-2" delay={0.15}>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-6">Beyond Code</p>
                        <div className="grid grid-cols-2 gap-4">
                            {interests.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.06] transition-all duration-300"
                                >
                                    <span className="text-xl mt-0.5">{item.icon}</span>
                                    <div>
                                        <span className="text-sm font-medium text-white/60 block">{item.label}</span>
                                        <span className="text-[10px] text-white/45">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TiltCard>

                    {/* Tech Stack — full width */}
                    <TiltCard span="lg:col-span-4" delay={0.2}>
                        <div className="flex items-start justify-between mb-6">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-white/45">Tech Stack</p>
                            <span className="text-[10px] text-white/60">{techStack.length} technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {techStack.map((tech, i) => (
                                <motion.span
                                    key={tech.label}
                                    className="tech-pill flex items-center gap-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                                >
                                    <span className="text-xs">{tech.icon}</span>
                                    {tech.label}
                                </motion.span>
                            ))}
                        </div>
                    </TiltCard>
                </div>
            </motion.div>
        </section>
    )
}
