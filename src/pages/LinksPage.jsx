import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import useStore from '../store/useStore'
import LinksBackground3D from '../components/LinksBackground3D'

const socialsList = [
    {
        id: 'github',
        label: 'GitHub',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
        color: '#60a5fa',
        href: 'https://github.com/Priyankkhatri',
        tagline: 'Code Repositories & Contributions',
        telemetry: 'SYS_NODE: GITHUB // COMMITS_SYNCED'
    },
    {
        id: 'leetcode',
        label: 'LeetCode',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        color: '#f59e0b',
        href: 'https://leetcode.com/u/Priyank_Khatri/',
        tagline: 'Algorithm Rankings & Problems',
        telemetry: 'SYS_NODE: LEETCODE // SCORE_ACTIVE'
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
        color: '#38bdf8',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        tagline: 'Professional Networks & Identity',
        telemetry: 'SYS_NODE: LINKEDIN // PORTAL_STABLE'
    },
    {
        id: 'youtube',
        label: 'YouTube',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
        ),
        color: '#ef4444',
        href: 'https://www.youtube.com/@PriyankCreates',
        tagline: 'Video Walkthroughs & Vlogs',
        telemetry: 'SYS_NODE: YOUTUBE // BROADCAST_OK'
    },
    {
        id: 'instagram',
        label: 'Instagram',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        ),
        color: '#ec4899',
        href: 'https://www.instagram.com/priyankhatrii/',
        tagline: 'Artistic Renders & Personal Log',
        telemetry: 'SYS_NODE: INSTAGRAM // SNAP_TUNNEL'
    },
    {
        id: 'twitter',
        label: 'X (Twitter)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
                <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
            </svg>
        ),
        color: '#ffffff',
        href: 'https://x.com/PriyankKhatrii',
        tagline: 'Daily Developer Feed & Logs',
        telemetry: 'SYS_NODE: TWITTER // LIVE_STREAM'
    }
]

const hudNavigationItems = [
    { id: 'intro', label: 'Intro', icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
    ), color: '#a78bfa' },
    ...socialsList
]

const mockCommits = [
    'feat(ui): compiled secure orbital coordinate deck',
    'fix(telemetry): connection timeout on gateway sync',
    'refactor(engine): optimized 3D coordinate matrices',
    'docs(readme): add credentials payload schema details',
    'chore(deps): upgraded Three.js and Vite packages',
    'style(nav): dynamic fluid neon hover transitions',
    'perf(render): GPU accelerated animations on core rings',
    'feat(form): added active indicator focus dot',
    'fix(autofill): neutralized solid chrome background clips',
    'docs(dossier): update skill catalog references',
]

/* Decorative contribution matrix — generated once at module load so the
   pattern and tooltips stay stable across re-renders. Not real GitHub data. */
const contributionCells = [...Array(140)].map((_, i) => {
    const density = Math.random()
    return {
        colorClass: density < 0.3 ? 'bg-white/5'
            : density < 0.6 ? 'bg-emerald-950/40'
            : density < 0.85 ? 'bg-emerald-800/60 shadow-[0_0_4px_rgba(16,185,129,0.15)]'
            : 'bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.45)]',
        msg: mockCommits[i % mockCommits.length],
        date: `2026-07-${String((i % 9) + 1).padStart(2, '0')}`,
    }
})

/* Contribution board with local tooltip state so hovering a cell only
   re-renders this component, not the whole page. */
function ContributionBoard({ setCursorVariant }) {
    const [activeTooltip, setActiveTooltip] = useState(null)

    return (
        <div className="space-y-3">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Decorative contribution matrix</span>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.005 } }
                }}
                className="flex flex-wrap gap-1 bg-black/10 p-5 rounded-2xl border border-white/5 relative group/board max-w-xl"
            >
                {contributionCells.map((cell, i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { scale: 0, opacity: 0 },
                            show: { scale: 1, opacity: 1 }
                        }}
                        onMouseEnter={() => {
                            setCursorVariant('hover')
                            setActiveTooltip({ id: i, msg: cell.msg, date: cell.date })
                        }}
                        onMouseLeave={() => {
                            setCursorVariant('default')
                            setActiveTooltip(null)
                        }}
                        className={`w-3.5 h-3.5 rounded-[3px] cursor-pointer transition-colors duration-300 hover:scale-110 ${cell.colorClass}`}
                    />
                ))}

                {/* Tooltip Overlay */}
                <AnimatePresence>
                    {activeTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute -top-12 left-4 right-4 bg-black/95 backdrop-blur border border-emerald-500/20 px-3 py-2 rounded-lg font-mono text-[9px] text-emerald-400 shadow-lg text-left z-20"
                        >
                            {`[Commit: ${activeTooltip.date}] ${activeTooltip.msg}`}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

// Smooth 3D scroll-driven card wrapper component
function ScrollDossierCard({ children, id, colorGlow }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Spring damping constants for natural, weight-based scroll motion
    const springConfig = { stiffness: 85, damping: 24, mass: 0.9 }

    // Map scroll percentage to size, rotation, opacity, and positioning
    const scale = useSpring(useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [0.88, 1, 1, 0.88]), springConfig)
    const rotateX = useSpring(useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [18, 0, 0, -18]), springConfig)
    const opacity = useSpring(useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]), springConfig)
    const y = useSpring(useTransform(scrollYProgress, [0.1, 0.45, 0.55, 0.9], [80, 0, 0, -80]), springConfig)

    return (
        <div ref={containerRef} id={id} className="min-h-screen flex items-center justify-center scroll-mt-24 w-full">
            <motion.div
                style={{ scale, rotateX, opacity, y, transformStyle: 'preserve-3d' }}
                className="w-full max-w-2xl bg-white/[0.015] border border-white/5 p-6 sm:p-10 rounded-3xl backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden group/scard hover:border-white/10 transition-colors duration-500"
            >
                {/* Visual backglow matching active coordinate */}
                <div 
                    className="absolute -inset-24 opacity-0 group-hover/scard:opacity-[0.03] pointer-events-none rounded-full blur-[45px] transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle, ${colorGlow || '#60a5fa'} 0%, transparent 70%)` }}
                />
                <div className="relative z-10">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}

export default function LinksPage() {
    const [activeSection, setActiveSection] = useState('intro')
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, observerOptions)

        hudNavigationItems.forEach(s => {
            const el = document.getElementById(s.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    const getActiveIdx = () => {
        switch (activeSection) {
            case 'intro': return 0
            case 'github': return 1
            case 'leetcode': return 2
            case 'linkedin': return 3
            case 'youtube': return 4
            case 'instagram': return 5
            case 'twitter': return 6
            default: return 0
        }
    }

    const currentActiveData = hudNavigationItems.find(s => s.id === activeSection) || hudNavigationItems[0]

    return (
        <>
            <Helmet>
                <title>Connect & Coordinates | Priyank Khatri — Scroll Telemetry</title>
                <meta name="description" content="Immersive scroll-snapped social dossier highlighting Priyank Khatri's GitHub commits, LeetCode performance ratings, LinkedIn profile, and design showcases." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/links" />
            </Helmet>

            <div className="min-h-screen relative overflow-hidden flex flex-col items-center">
                
                {/* WebGL Particle Morphing Canvas */}
                <LinksBackground3D activeIdx={getActiveIdx()} />

                {/* Mobile / Tablet sticky HUD navigation */}
                <div className="sticky top-[70px] w-full z-[100] bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)] py-3 px-6 overflow-x-auto flex lg:hidden justify-center gap-3 select-none">
                    {hudNavigationItems.map(s => {
                        const isActive = s.id === activeSection
                        return (
                            <button
                                key={s.id}
                                onClick={() => scrollToSection(s.id)}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                style={{ color: isActive ? s.color : 'var(--text-secondary)' }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                                    isActive ? 'border-white/10 bg-white/[0.04]' : 'border-transparent bg-transparent'
                                }`}
                            >
                                {s.icon}
                                <span className="text-[10px] font-mono font-bold tracking-wider">{s.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Main coordinates content grid */}
                <div className="max-w-6xl w-full px-6 md:px-12 lg:px-16 pt-24 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                    
                    {/* Fixed Cockpit Telemetry Tracker Panel */}
                    <div className="hidden lg:block lg:col-span-4 select-none">
                        <div className="w-[280px] h-[calc(100vh-16rem)] fixed top-32 flex flex-col justify-between z-20">
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <div className="cyber-led cyber-led-blue" />
                                    <span className="text-[10px] font-mono tracking-widest text-[var(--text-primary)] uppercase font-semibold">
                                        Active Dossier HUD
                                    </span>
                                </div>
                                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans">
                                    Use the telemetry nodes below to navigate or scroll down to browse through active coordinates.
                                </p>
                            </div>

                            {/* Cockpit laser HUD track */}
                            <div className="flex items-stretch gap-6 pl-2 relative my-12 h-64">
                                <div className="hud-wire h-full flex flex-col justify-between py-1 relative">
                                    {hudNavigationItems.map((s) => {
                                        const isActive = s.id === activeSection
                                        return (
                                            <button 
                                                key={s.id}
                                                onClick={() => scrollToSection(s.id)}
                                                onMouseEnter={() => setCursorVariant('hover')}
                                                onMouseLeave={() => setCursorVariant('default')}
                                                className={`hud-node ${isActive ? 'active' : ''}`}
                                                aria-label={`Scroll to ${s.label}`}
                                            />
                                        )
                                    })}
                                </div>

                                <div className="flex flex-col justify-between py-0 text-[10px] font-mono tracking-widest font-semibold text-[var(--text-secondary)]">
                                    {hudNavigationItems.map(s => {
                                        const isActive = s.id === activeSection
                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => scrollToSection(s.id)}
                                                onMouseEnter={() => setCursorVariant('hover')}
                                                onMouseLeave={() => setCursorVariant('default')}
                                                style={{ color: isActive ? s.color : '' }}
                                                className={`text-left uppercase font-mono tracking-wider transition-colors duration-300 hover:text-white ${isActive ? 'font-bold' : ''}`}
                                            >
                                                {s.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Active platform coordinates feedback */}
                            <div className="p-4 rounded-xl bg-white/[0.01] border border-[var(--border-color)] font-mono text-[9px] leading-relaxed text-[var(--text-muted)] space-y-1">
                                <div>&gt; {currentActiveData.telemetry || 'SYS_NODE: ROOT // INTRO_ACTIVE'}</div>
                                <div>&gt; GATEWAY_STATUS: ACTIVE</div>
                                <div>&gt; LATENCY: 24ms</div>
                            </div>

                        </div>
                    </div>

                    {/* Scrollable platforms column */}
                    <div className="lg:col-span-8 flex flex-col w-full">
                        
                        {/* Section 0: Intro Hero */}
                        <ScrollDossierCard id="intro" colorGlow="#a78bfa">
                            <div className="space-y-6 text-left">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-px bg-[#a78bfa]/40" />
                                    <span className="text-[10px] font-mono tracking-widest text-[#a78bfa] uppercase font-bold">Node 00 // System Initialize</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Universal <span className="text-gradient-silver">Link Deck</span>
                                </h1>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                                    Welcome to the telemetry dossier hub. As you scroll, the WebGL particle structure in the background morphs, translating coordinate feeds into 3D constellations representing my developer profiles.
                                </p>
                                <div className="pt-4 flex items-center gap-3 font-mono text-[10px] text-[var(--text-secondary)]">
                                    <span>Scroll down to initialize dossier stream</span>
                                    <motion.span 
                                        animate={{ y: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ↓
                                    </motion.span>
                                </div>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 1: GitHub */}
                        <ScrollDossierCard id="github" colorGlow="#60a5fa">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-[#60a5fa]/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#60a5fa] uppercase font-bold">Node 01 // Github</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Open Source
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Explore my active repositories, code architectures, and developer commits synced directly from the GitHub network.
                                </p>

                                {/* GitHub stats card */}
                                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-2 flex items-center justify-center overflow-hidden hover:border-[#60a5fa]/20 transition-all duration-500 max-w-lg">
                                    <img 
                                        src="https://github-readme-stats.vercel.app/api?username=Priyankkhatri&theme=transparent&text_color=e8edf5&icon_color=60a5fa&border_color=60a5fa/10&show_icons=true" 
                                        alt="Github Stats"
                                        className="max-w-full h-auto select-none"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Contribution board */}
                                <ContributionBoard setCursorVariant={setCursorVariant} />

                                <a
                                    href="https://github.com/Priyankkhatri"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-[#60a5fa]/5 border border-[#60a5fa]/20 hover:border-[#60a5fa]/50 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Open GitHub &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 2: LeetCode */}
                        <ScrollDossierCard id="leetcode" colorGlow="#f59e0b">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-[#f59e0b]/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#f59e0b] uppercase font-bold">Node 02 // LeetCode</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Algorithms
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Tracking algorithmic optimization benchmarks, data structures solved, and active practice ratings.
                                </p>

                                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-2 flex items-center justify-center overflow-hidden hover:border-[#f59e0b]/20 transition-all duration-500 max-w-lg">
                                    <img 
                                        src="https://leetcard.jacoblin.cool/Priyank_Khatri?theme=dark&font=Outfit&ext=activity" 
                                        alt="LeetCode Stats"
                                        className="max-w-full h-auto object-contain select-none"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Animated Solved Progress Rings */}
                                <div className="space-y-4 max-w-xl">
                                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">Decorative breakdown — live stats in card above</span>
                                    
                                    <div className="grid grid-cols-3 gap-6 bg-black/10 p-6 rounded-2xl border border-white/5">
                                        {[
                                            { label: 'Easy', count: '110 Solved', color: '#10b981', pct: 70 },
                                            { label: 'Medium', count: '105 Solved', color: '#f59e0b', pct: 55 },
                                            { label: 'Hard', count: '25 Solved', color: '#ef4444', pct: 30 }
                                        ].map((ring, idx) => {
                                            const circumference = 2 * Math.PI * 40
                                            const strokeOffset = activeSection === 'leetcode' 
                                                ? circumference - (ring.pct / 100) * circumference 
                                                : circumference
                                                
                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-3">
                                                    <div className="relative w-20 h-20">
                                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                                            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                                                            <circle 
                                                                cx="50" 
                                                                cy="50" 
                                                                r="40" 
                                                                stroke={ring.color} 
                                                                strokeWidth="8" 
                                                                fill="transparent" 
                                                                strokeDasharray={circumference}
                                                                strokeDashoffset={strokeOffset}
                                                                className="progress-ring-circle leetcode-ring-glow"
                                                                style={{ color: ring.color }}
                                                            />
                                                        </svg>
                                                        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-[var(--text-primary)]">
                                                            {ring.pct}%
                                                        </span>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[10px] font-bold text-[var(--text-primary)]">{ring.label}</div>
                                                        <div className="text-[8px] font-mono text-[var(--text-secondary)] mt-0.5">{ring.count}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <a
                                    href="https://leetcode.com/u/Priyank_Khatri/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-[#f59e0b]/5 border border-[#f59e0b]/20 hover:border-[#f59e0b]/50 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Open LeetCode &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 3: LinkedIn */}
                        <ScrollDossierCard id="linkedin" colorGlow="#38bdf8">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-[#38bdf8]/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase font-bold">Node 03 // LinkedIn</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Credentials
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Connecting and collaborating on full stack applications, web architectures, and student internships.
                                </p>

                                <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl max-w-xl space-y-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#38bdf8]/5 blur-xl pointer-events-none" />
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">Available for Internship Positions</span>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-sm font-semibold text-[var(--text-primary)] font-mono">Priyank Khatri</h3>
                                        <div className="text-xs text-[#38bdf8] font-mono">Creative Full Stack Developer | Student</div>
                                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans mt-2">
                                            Skilled in React, Node, Vite, Three.js, and CSS. Designing clean interactive systems, structural page logic, and optimized API payloads. Focused on building high-fidelity products.
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="https://www.linkedin.com/in/priyankkhatrii/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-[#38bdf8]/5 border border-[#38bdf8]/20 hover:border-[#38bdf8]/50 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Connect &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 4: YouTube */}
                        <ScrollDossierCard id="youtube" colorGlow="#ef4444">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-[#ef4444]/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#ef4444] uppercase font-bold">Node 04 // YouTube</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Content Library
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Publishing workflow development breakdowns, developer setup guidelines, and personal project vlog logs.
                                </p>

                                {/* Video cards — decorative previews, not real uploads */}
                                <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block -mb-4">Preview concepts</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                                    {[
                                        { title: '3D Portfolio Build BTS', desc: 'Compositing orbital vector core rendering.', char: 'BTS_LOG_01' },
                                        { title: 'Advanced React Routing Guides', desc: 'Implementing Suspense, layout splitting.', char: 'CODE_LOG_02' }
                                    ].map((vid, idx) => (
                                        <div 
                                            key={idx}
                                            className="group/vid cursor-pointer rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-[#ef4444]/30 transition-all duration-500 text-left"
                                        >
                                            <div className="aspect-video bg-white/5 flex items-center justify-center group-hover/vid:bg-white/10 transition-colors relative">
                                                <div className="w-10 h-10 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white scale-100 group-hover/vid:scale-110 transition-all duration-300 shadow-md">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-1">
                                                <span className="text-[7px] font-mono text-[#ef4444] uppercase tracking-wider">{vid.char}</span>
                                                <h3 className="text-xs font-semibold text-[var(--text-primary)] font-mono">{vid.title}</h3>
                                                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed font-sans">{vid.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://www.youtube.com/@PriyankCreates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-[#ef4444]/5 border border-[#ef4444]/20 hover:border-[#ef4444]/50 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Open YouTube &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 5: Instagram */}
                        <ScrollDossierCard id="instagram" colorGlow="#ec4899">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-[#ec4899]/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-[#ec4899] uppercase font-bold">Node 05 // Instagram</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Design Logs
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Aesthetic captures of design setups, hardware logs, color palettes, and artistic vector renderings.
                                </p>

                                {/* Parallax Mosaic Grid */}
                                <div className="grid grid-cols-2 gap-4 max-w-xl">
                                    {[
                                        { label: '3D Render', char: 'Mesh' },
                                        { label: 'Workspace', char: 'Setup' },
                                        { label: 'Fluid Ribbon', char: 'Vector' },
                                        { label: 'Color Space', char: 'Grad' }
                                    ].map((pic, idx) => (
                                        <div 
                                            key={idx}
                                            className="aspect-square rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col items-center justify-center p-4 text-center group/pic hover:border-[#ec4899]/30 transition-all duration-300"
                                        >
                                            <span className="text-[9px] font-mono text-[var(--text-muted)] group-hover/pic:text-[#ec4899] transition-colors">{pic.label}</span>
                                            <span className="text-sm font-mono font-bold text-[var(--text-primary)] mt-1.5">{pic.char}</span>
                                            <span className="text-[8px] font-mono text-white/10 group-hover/pic:text-white/20 mt-3 transition-colors">QUERY_IMAGE // 0{idx+1}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://www.instagram.com/priyankhatrii/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-[#ec4899]/5 border border-[#ec4899]/20 hover:border-[#ec4899]/50 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Open Instagram &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                        {/* Section 6: X / Twitter */}
                        <ScrollDossierCard id="twitter" colorGlow="#ffffff">
                            <div className="space-y-8 text-left">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-px bg-white/30" />
                                        <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">Node 06 // X (Twitter)</span>
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Broadcast Stream
                                    </h2>
                                </div>

                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
                                    Daily broadcasts covering developer design decisions, styling overrides, and micro-interaction benchmarks.
                                </p>

                                {/* Drift up feed logs — decorative sample posts */}
                                <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider block -mb-4">Sample broadcasts</span>
                                <div className="space-y-4 max-w-xl">
                                    {[
                                        "Just completed the Quantum Aurora portal. Direct DOM styling at 60fps makes it feel like absolute butter. 🚀✨",
                                        "Don't build basic inputs. Add glowing outlines and focus dots. Micro-feedback is the differentiator. 🛠️💻",
                                        "Coffee, code, and compositor animations. Exploring Three.js camera transitions tonight. ☕🌌"
                                    ].map((tweet, idx) => (
                                        <div 
                                            key={idx}
                                            className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-2 hover:border-white/10 transition-colors text-left"
                                        >
                                            <p className="text-xs text-[var(--text-primary)] font-sans leading-relaxed">
                                                {tweet}
                                            </p>
                                            <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">{`Log node 0${idx + 1} // broadcasted`}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://x.com/PriyankKhatrii"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex px-6 py-3 bg-white/5 border border-white/15 hover:border-white/40 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl transition-all btn-shine"
                                >
                                    Follow &gt;
                                </a>
                            </div>
                        </ScrollDossierCard>

                    </div>
                </div>

            </div>
        </>
    )
}
