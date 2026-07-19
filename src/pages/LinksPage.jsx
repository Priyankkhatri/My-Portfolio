import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useVelocity,
    useReducedMotion,
} from 'framer-motion'
import useStore from '../store/useStore'
import LinksBackground3D from '../components/LinksBackground3D'

/* ═══════════════════════════ DATA ═══════════════════════════ */

const PLATFORMS = [
    {
        id: 'github',
        label: 'GitHub',
        word: 'COMMIT',
        color: '#60a5fa',
        href: 'https://github.com/Priyankkhatri',
        handle: '@Priyankkhatri',
        tagline: 'Repositories, experiments, and everything I ship.',
        cta: 'Open GitHub',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        id: 'leetcode',
        label: 'LeetCode',
        word: 'SOLVE',
        color: '#f59e0b',
        href: 'https://leetcode.com/u/Priyank_Khatri/',
        handle: '@Priyank_Khatri',
        tagline: 'Data structures, algorithms, and daily problem grind.',
        cta: 'Open LeetCode',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        word: 'CONNECT',
        color: '#38bdf8',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        handle: 'in/priyankkhatrii',
        tagline: 'Professional profile — open to internships and collabs.',
        cta: 'Connect',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        id: 'youtube',
        label: 'YouTube',
        word: 'CREATE',
        color: '#ef4444',
        href: 'https://www.youtube.com/@PriyankCreates',
        handle: '@PriyankCreates',
        tagline: 'Build breakdowns, dev setups, and project vlogs.',
        cta: 'Open YouTube',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
        ),
    },
    {
        id: 'instagram',
        label: 'Instagram',
        word: 'DESIGN',
        color: '#ec4899',
        href: 'https://www.instagram.com/priyankhatrii/',
        handle: '@priyankhatrii',
        tagline: 'Design logs, setups, palettes, and visual experiments.',
        cta: 'Open Instagram',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        id: 'twitter',
        label: 'X / Twitter',
        word: 'BROADCAST',
        color: '#e2e8f0',
        href: 'https://x.com/PriyankKhatrii',
        handle: '@PriyankKhatrii',
        tagline: 'Dev thoughts, design opinions, and micro-interactions.',
        cta: 'Follow',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
]

// intro + 6 platforms + index — order drives the 3D glyph morph
const SECTION_IDS = ['intro', ...PLATFORMS.map((p) => p.id), 'index']
const GLYPH_FOR_SECTION = { intro: 0, github: 1, leetcode: 2, linkedin: 3, youtube: 4, instagram: 5, twitter: 6, index: 0 }

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

/* ═══════════════════ MOTION PRIMITIVES ═══════════════════ */

/** Per-character rising reveal, triggered when scrolled into view. */
function CharReveal({ text, className = '', style, delay = 0 }) {
    const reduced = useReducedMotion()
    if (reduced) {
        return <span className={className} style={style}>{text}</span>
    }
    return (
        <span className={className} style={style} aria-label={text} role="text">
            {text.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '105%', rotate: 6 }}
                        whileInView={{ y: '0%', rotate: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 0.7, delay: delay + i * 0.028, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {ch === ' ' ? ' ' : ch}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

/** Magnetic hover wrapper — element leans toward the cursor. */
function Magnetic({ children, strength = 0.35, className = '' }) {
    const ref = useRef(null)
    const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
    const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
    const reduced = useReducedMotion()

    const handleMove = (e) => {
        if (reduced || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * strength)
        y.set((e.clientY - rect.top - rect.height / 2) * strength)
    }
    const handleLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div ref={ref} style={{ x, y }} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`inline-block ${className}`}>
            {children}
        </motion.div>
    )
}

/** Primary CTA link with magnetic pull + sliding arrow. */
function PlatformCta({ platform, setCursorVariant }) {
    return (
        <Magnetic strength={0.3}>
            <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="group/cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 relative overflow-hidden"
                style={{ borderColor: `${platform.color}44`, color: 'var(--text-primary)' }}
            >
                <span
                    className="absolute inset-0 translate-y-[101%] group-hover/cta:translate-y-0 transition-transform duration-400 ease-out"
                    style={{ background: `${platform.color}18` }}
                />
                <span className="relative z-10">{platform.cta}</span>
                <span className="relative z-10 overflow-hidden w-3.5 h-3.5">
                    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover/cta:translate-x-[150%]" style={{ color: platform.color }}>→</span>
                    <span className="absolute inset-0 flex items-center justify-center -translate-x-[150%] transition-transform duration-300 group-hover/cta:translate-x-0" style={{ color: platform.color }}>→</span>
                </span>
            </a>
        </Magnetic>
    )
}

/* ═══════════════════ PINNED SCROLL SECTION ═══════════════════
   Each platform gets ~190vh of scroll. The stage stays pinned while
   scroll progress choreographs: a giant outlined word sweeping across,
   the card rising/flattening in 3D, a color beam drawing itself, and
   everything lifting away as the next section takes over.            */
function PinnedSection({ platform, index, setCursorVariant, children }) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

    const wordX = useTransform(scrollYProgress, [0, 1], ['16vw', '-42vw'])
    const wordOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0])
    const cardY = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [130, 0, 0, -130])
    const cardOpacity = useTransform(scrollYProgress, [0.02, 0.2, 0.8, 0.98], [0, 1, 1, 0])
    const cardRotateX = useTransform(scrollYProgress, [0, 0.24], [22, 0])
    const cardScale = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0.92, 1, 1, 0.95])
    const beamScaleX = useTransform(scrollYProgress, [0.08, 0.32], [0, 1])
    const metaY = useTransform(scrollYProgress, [0.05, 0.25], [40, 0])
    const metaOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])

    const stageStyle = reduced ? {} : { y: cardY, opacity: cardOpacity, rotateX: cardRotateX, scale: cardScale }
    const wordStyle = reduced ? { x: 0, opacity: 0.6 } : { x: wordX, opacity: wordOpacity }

    return (
        <section ref={ref} id={platform.id} className={reduced ? 'relative min-h-screen' : 'relative h-[190vh]'}>
            <div className={`${reduced ? 'min-h-screen' : 'sticky top-0 h-screen'} flex items-center justify-center overflow-hidden [perspective:1200px]`}>

                {/* Giant outlined word sweeping across the stage */}
                <motion.span
                    style={{
                        ...wordStyle,
                        WebkitTextStroke: `1.5px ${platform.color}30`,
                        color: 'transparent',
                    }}
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 text-[24vw] font-black whitespace-nowrap select-none pointer-events-none leading-none tracking-tight"
                    aria-hidden="true"
                >
                    {platform.word}
                </motion.span>

                {/* Section meta — floating index + handle */}
                <motion.div
                    style={reduced ? {} : { y: metaY, opacity: metaOpacity }}
                    className="absolute top-[12vh] left-6 sm:left-12 lg:left-20 font-mono select-none pointer-events-none"
                    aria-hidden="true"
                >
                    <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: platform.color }}>
                        {String(index + 1).padStart(2, '0')} / {String(PLATFORMS.length).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] tracking-wider text-[var(--text-muted)] mt-1.5">{platform.handle}</div>
                </motion.div>

                {/* The card */}
                <motion.div
                    style={stageStyle}
                    className="relative w-[calc(100%-2.5rem)] max-w-3xl bg-[var(--bg-primary)]/55 border border-[var(--border-color)] rounded-[2rem] backdrop-blur-2xl p-7 sm:p-12 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.65)] overflow-hidden"
                >
                    {/* self-drawing color beam */}
                    <motion.div
                        style={reduced ? {} : { scaleX: beamScaleX }}
                        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                        aria-hidden="true"
                    >
                        <div className="h-full w-full" style={{ background: `linear-gradient(90deg, ${platform.color}, transparent)` }} />
                    </motion.div>

                    {/* corner glow */}
                    <div
                        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[70px] pointer-events-none opacity-[0.07]"
                        style={{ background: platform.color }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 space-y-7">
                        <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ borderColor: `${platform.color}40`, color: platform.color }}>
                                {platform.icon}
                            </span>
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase font-bold" style={{ color: platform.color }}>
                                {platform.label}
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-6xl font-bold text-[var(--text-primary)] leading-[1.02]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            <CharReveal text={platform.word.charAt(0) + platform.word.slice(1).toLowerCase()} />
                            <span style={{ color: platform.color }}>.</span>
                        </h2>

                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md font-sans">
                            {platform.tagline}
                        </p>

                        {children}

                        <PlatformCta platform={platform} setCursorVariant={setCursorVariant} />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ═══════════════════ PLATFORM WIDGETS ═══════════════════ */

/* Contribution board with local tooltip state so hovering a cell only
   re-renders this component, not the whole page. */
function ContributionBoard({ setCursorVariant }) {
    const [activeTooltip, setActiveTooltip] = useState(null)

    return (
        <div className="space-y-2.5">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.25em] block">Decorative contribution matrix</span>
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.004 } } }}
                className="flex flex-wrap gap-1 bg-black/10 p-4 rounded-2xl border border-white/5 relative max-w-xl"
            >
                {contributionCells.map((cell, i) => (
                    <motion.div
                        key={i}
                        variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
                        onMouseEnter={() => {
                            setCursorVariant('hover')
                            setActiveTooltip({ id: i, msg: cell.msg, date: cell.date })
                        }}
                        onMouseLeave={() => {
                            setCursorVariant('default')
                            setActiveTooltip(null)
                        }}
                        className={`w-3 h-3 rounded-[3px] cursor-pointer transition-colors duration-300 hover:scale-110 ${cell.colorClass}`}
                    />
                ))}
                <AnimatePresence>
                    {activeTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute -top-11 left-4 right-4 bg-black/95 backdrop-blur border border-emerald-500/20 px-3 py-2 rounded-lg font-mono text-[9px] text-emerald-400 shadow-lg text-left z-20"
                        >
                            {`[Commit: ${activeTooltip.date}] ${activeTooltip.msg}`}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

function GithubWidget({ setCursorVariant }) {
    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-2 hidden sm:flex items-center justify-center overflow-hidden max-w-lg">
                <img
                    src="https://github-readme-stats.vercel.app/api?username=Priyankkhatri&theme=transparent&text_color=e8edf5&icon_color=60a5fa&border_color=60a5fa/10&show_icons=true"
                    alt="Live GitHub statistics for Priyankkhatri"
                    className="max-w-full h-auto select-none"
                    loading="lazy"
                />
            </div>
            <ContributionBoard setCursorVariant={setCursorVariant} />
        </div>
    )
}

function LeetCodeWidget() {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-2 flex items-center justify-center overflow-hidden max-w-lg">
            <img
                src="https://leetcard.jacoblin.cool/Priyank_Khatri?theme=dark&font=Outfit&ext=activity"
                alt="Live LeetCode statistics for Priyank_Khatri"
                className="max-w-full h-auto object-contain select-none"
                loading="lazy"
            />
        </div>
    )
}

function LinkedInWidget() {
    return (
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl max-w-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400 uppercase font-semibold">Available for internships</span>
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] font-mono">Priyank Khatri</h3>
            <div className="text-xs text-[#38bdf8] font-mono">Creative Full Stack Developer · Student</div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-sans">
                React, Node, Vite, Three.js. Building clean interactive systems and high-fidelity products.
            </p>
        </div>
    )
}

function YouTubeWidget() {
    return (
        <div className="space-y-2.5 max-w-lg">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.25em] block">Preview concepts</span>
            <div className="grid grid-cols-2 gap-3">
                {[
                    { title: '3D Portfolio Build BTS', tag: 'BTS_LOG_01' },
                    { title: 'Advanced React Routing', tag: 'CODE_LOG_02' },
                ].map((vid, idx) => (
                    <div key={idx} className="group/vid rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-[#ef4444]/30 transition-all duration-500">
                        <div className="aspect-video bg-white/5 flex items-center justify-center group-hover/vid:bg-white/10 transition-colors">
                            <div className="w-9 h-9 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white group-hover/vid:scale-110 transition-transform duration-300">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                            </div>
                        </div>
                        <div className="p-3 space-y-0.5">
                            <span className="text-[7px] font-mono text-[#ef4444] uppercase tracking-wider">{vid.tag}</span>
                            <h3 className="text-[11px] font-semibold text-[var(--text-primary)] font-mono">{vid.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function InstagramWidget() {
    return (
        <div className="space-y-2.5 max-w-lg">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.25em] block">Visual index</span>
            <div className="grid grid-cols-4 gap-2.5">
                {['Mesh', 'Setup', 'Vector', 'Grad'].map((label, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5, rotate: idx % 2 === 0 ? -2 : 2 }}
                        className="aspect-square rounded-xl bg-white/[0.01] border border-white/5 flex flex-col items-center justify-center gap-1 group/pic hover:border-[#ec4899]/40 transition-colors duration-300"
                    >
                        <span className="text-[10px] font-mono font-bold text-[var(--text-primary)]">{label}</span>
                        <span className="text-[7px] font-mono text-white/15 group-hover/pic:text-[#ec4899]/60 transition-colors">0{idx + 1}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function TwitterWidget() {
    return (
        <div className="space-y-2.5 max-w-lg">
            <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.25em] block">Sample broadcasts</span>
            <div className="space-y-2.5">
                {[
                    'Just completed the Quantum Aurora portal. Direct DOM styling at 60fps makes it feel like absolute butter. 🚀',
                    'Coffee, code, and compositor animations. Exploring Three.js camera transitions tonight. ☕',
                ].map((tweet, idx) => (
                    <div key={idx} className="bg-white/[0.01] border border-white/5 px-4 py-3 rounded-xl hover:border-white/10 transition-colors">
                        <p className="text-[11px] text-[var(--text-primary)] font-sans leading-relaxed">{tweet}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const WIDGETS = {
    github: GithubWidget,
    leetcode: LeetCodeWidget,
    linkedin: LinkedInWidget,
    youtube: YouTubeWidget,
    instagram: InstagramWidget,
    twitter: TwitterWidget,
}

/* ═══════════════════ HUD: RAIL + COUNTER + MOBILE DOCK ═══════════════════ */

function ProgressRail({ activeId, onNavigate, setCursorVariant, scrollProgress }) {
    const fill = useSpring(scrollProgress, { stiffness: 90, damping: 25 })
    return (
        <div className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 items-center gap-5 select-none">
            <div className="relative w-px h-64 bg-[var(--border-color)] overflow-hidden rounded-full">
                <motion.div
                    style={{ scaleY: fill }}
                    className="absolute inset-0 origin-top bg-gradient-to-b from-[#a78bfa] via-[#60a5fa] to-[#ec4899]"
                />
            </div>
            <div className="flex flex-col justify-between h-64 py-0.5">
                {SECTION_IDS.map((id) => {
                    const platform = PLATFORMS.find((p) => p.id === id)
                    const label = id === 'intro' ? 'Start' : id === 'index' ? 'Index' : platform.label
                    const color = platform?.color || '#a78bfa'
                    const isActive = activeId === id
                    return (
                        <button
                            key={id}
                            onClick={() => onNavigate(id)}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group/rail flex items-center gap-2.5 text-left"
                            aria-label={`Scroll to ${label}`}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    background: isActive ? color : 'var(--text-muted)',
                                    boxShadow: isActive ? `0 0 8px ${color}` : 'none',
                                    transform: isActive ? 'scale(1.6)' : 'scale(1)',
                                }}
                            />
                            <span
                                className={`font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover/rail:opacity-60 group-hover/rail:translate-x-0'}`}
                                style={{ color: isActive ? color : 'var(--text-secondary)' }}
                            >
                                {label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function SectionCounter({ activeId }) {
    const idx = SECTION_IDS.indexOf(activeId)
    const platform = PLATFORMS.find((p) => p.id === activeId)
    const color = platform?.color || '#a78bfa'
    return (
        <div className="hidden md:flex fixed top-28 right-8 z-40 items-baseline gap-1.5 font-mono select-none pointer-events-none" aria-hidden="true">
            <span className="relative w-9 h-8 overflow-hidden inline-block">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={activeId}
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -22, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 text-2xl font-bold text-right"
                        style={{ color }}
                    >
                        {String(idx + 1).padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-widest">/ {String(SECTION_IDS.length).padStart(2, '0')}</span>
        </div>
    )
}

function MobileDock({ activeId, onNavigate }) {
    return (
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-3 py-2.5 rounded-full bg-[var(--bg-primary)]/80 border border-[var(--border-color)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
            {SECTION_IDS.map((id) => {
                const platform = PLATFORMS.find((p) => p.id === id)
                const color = platform?.color || '#a78bfa'
                const isActive = activeId === id
                return (
                    <button
                        key={id}
                        onClick={() => onNavigate(id)}
                        aria-label={`Scroll to ${id}`}
                        className="p-1.5"
                    >
                        <span
                            className="block rounded-full transition-all duration-300"
                            style={{
                                width: isActive ? 18 : 6,
                                height: 6,
                                background: isActive ? color : 'var(--text-muted)',
                            }}
                        />
                    </button>
                )
            })}
        </div>
    )
}

/* ═══════════════════ INTRO + INDEX ═══════════════════ */

function IntroSection({ setCursorVariant }) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [0, -160])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <section ref={ref} id="intro" className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.div style={reduced ? {} : { y, opacity }} className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="flex items-center justify-center gap-3 mb-7"
                >
                    <span className="w-10 h-px bg-[#a78bfa]/40" />
                    <span className="text-[10px] font-mono tracking-[0.4em] text-[#a78bfa] uppercase font-bold">Priyank Khatri — Everywhere</span>
                    <span className="w-10 h-px bg-[#a78bfa]/40" />
                </motion.div>

                <h1 className="text-[17vw] sm:text-[13vw] lg:text-[9rem] font-black leading-[0.9] text-[var(--text-primary)] tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    <CharReveal text="EVERY" delay={0.25} />
                    <br />
                    <CharReveal text="LINK." delay={0.5} className="text-gradient-silver" />
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="mt-8 text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-sans"
                >
                    One page, six platforms. Scroll — the particle field rebuilds itself
                    into each destination as you travel.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-14 flex flex-col items-center gap-3"
                    aria-hidden="true"
                >
                    <span className="text-[9px] font-mono tracking-[0.35em] text-[var(--text-muted)] uppercase">Scroll</span>
                    <div className="w-px h-14 bg-[var(--border-color)] relative overflow-hidden">
                        <motion.div
                            animate={reduced ? {} : { y: ['-100%', '100%'] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#a78bfa] to-transparent"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

/** Final section — every link as a big interactive index row. */
function IndexSection({ setCursorVariant }) {
    return (
        <section id="index" className="relative min-h-screen flex items-center justify-center py-32 px-6">
            <div className="w-full max-w-4xl relative z-10">
                <div className="flex items-center gap-3 mb-12">
                    <span className="w-8 h-px bg-[var(--text-muted)]/40" />
                    <span className="text-[10px] font-mono tracking-[0.35em] text-[var(--text-muted)] uppercase font-bold">Full index — pick a destination</span>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-15%' }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
                >
                    {PLATFORMS.map((p, i) => (
                        <motion.a
                            key={p.id}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group/row relative flex items-center justify-between gap-4 py-6 sm:py-8 border-t border-[var(--border-color)] last:border-b overflow-hidden px-2 sm:px-4"
                        >
                            {/* hover fill */}
                            <span
                                className="absolute inset-0 translate-y-[101%] group-hover/row:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                style={{ background: `${p.color}14` }}
                                aria-hidden="true"
                            />
                            <span
                                className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover/row:scale-y-100 origin-bottom transition-transform duration-500"
                                style={{ background: p.color }}
                                aria-hidden="true"
                            />

                            <span className="relative z-10 flex items-center gap-5 sm:gap-8 min-w-0">
                                <span className="font-mono text-[10px] text-[var(--text-muted)] w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight transition-transform duration-500 group-hover/row:translate-x-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    {p.label}
                                </span>
                                <span className="hidden md:block text-[11px] text-[var(--text-secondary)] font-sans truncate max-w-[240px] opacity-0 group-hover/row:opacity-100 transition-opacity duration-500">
                                    {p.tagline}
                                </span>
                            </span>

                            <span className="relative z-10 flex items-center gap-4 shrink-0">
                                <span className="hidden sm:block font-mono text-[10px] text-[var(--text-muted)] group-hover/row:text-[var(--text-secondary)] transition-colors">{p.handle}</span>
                                <span
                                    className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 group-hover/row:rotate-45"
                                    style={{ borderColor: `${p.color}40`, color: p.color }}
                                >
                                    ↗
                                </span>
                            </span>
                        </motion.a>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center font-mono text-[10px] tracking-[0.3em] text-[var(--text-muted)] uppercase"
                >
                    priyank.khatri.cg@gmail.com
                </motion.p>
            </div>
        </section>
    )
}

/* ═══════════════════ PAGE ═══════════════════ */

export default function LinksPage() {
    const [activeSection, setActiveSection] = useState('intro')
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const reduced = useReducedMotion()

    // Global scroll: progress feeds the rail, velocity feeds skew + 3D turbulence
    const { scrollY, scrollYProgress } = useScroll()
    const velocity = useVelocity(scrollY)
    const skewRaw = useTransform(velocity, [-2500, 2500], [-2.5, 2.5])
    const skew = useSpring(skewRaw, { stiffness: 280, damping: 35 })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id)
                })
            },
            { root: null, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        )
        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }

    return (
        <>
            <Helmet>
                <title>Links | Priyank Khatri — Every Platform, One Scroll</title>
                <meta name="description" content="Scroll-driven link hub for Priyank Khatri — GitHub, LeetCode, LinkedIn, YouTube, Instagram, and X, each with its own morphing particle scene." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/links" />
            </Helmet>

            <div className="relative">
                {/* Morphing particle field — one glyph per platform */}
                <LinksBackground3D activeIdx={GLYPH_FOR_SECTION[activeSection] ?? 0} velocity={velocity} />

                <ProgressRail
                    activeId={activeSection}
                    onNavigate={scrollToSection}
                    setCursorVariant={setCursorVariant}
                    scrollProgress={scrollYProgress}
                />
                <SectionCounter activeId={activeSection} />
                <MobileDock activeId={activeSection} onNavigate={scrollToSection} />

                {/* Velocity skew wrapper — content shears with scroll speed */}
                <motion.main style={reduced ? {} : { skewY: skew }} className="relative z-10">
                    <IntroSection setCursorVariant={setCursorVariant} />

                    {PLATFORMS.map((platform, i) => {
                        const Widget = WIDGETS[platform.id]
                        return (
                            <PinnedSection key={platform.id} platform={platform} index={i} setCursorVariant={setCursorVariant}>
                                {Widget ? <Widget setCursorVariant={setCursorVariant} /> : null}
                            </PinnedSection>
                        )
                    })}

                    <IndexSection setCursorVariant={setCursorVariant} />
                </motion.main>
            </div>
        </>
    )
}
