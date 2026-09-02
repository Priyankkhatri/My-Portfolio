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
import {
    Copy,
    Check,
    ExternalLink,
    Play,
    Sparkles,
    ArrowUpRight,
    Terminal,
    Compass,
    Code2,
    Share2,
    Mail,
    FileText,
} from 'lucide-react'
import {
    SiGithub as GithubIcon,
    SiLeetcode as LeetcodeIcon,
    SiYoutube as YoutubeIcon,
    SiInstagram as InstagramIcon,
    SiX as XIcon,
} from 'react-icons/si'
import { FaLinkedinIn as LinkedinIcon } from 'react-icons/fa6'
import useStore from '../store/useStore'
import LinksBackground3D from '../components/LinksBackground3D'

/* ═══════════════════════════ DATA ═══════════════════════════ */

const PLATFORMS = [
    {
        id: 'github',
        glyphIdx: 1,
        label: 'GitHub',
        word: 'COMMIT',
        color: '#60a5fa',
        href: 'https://github.com/Priyankkhatri',
        handle: '@Priyankkhatri',
        badge: 'Open Source & Repositories',
        tagline: 'Full-stack MERN apps, 3D WebGL experiments, and open-source contributions.',
        cta: 'Open GitHub',
        icon: GithubIcon,
    },
    {
        id: 'leetcode',
        glyphIdx: 2,
        label: 'LeetCode',
        word: 'SOLVE',
        color: '#f59e0b',
        href: 'https://leetcode.com/u/Priyank_Khatri/',
        handle: '@Priyank_Khatri',
        badge: 'Algorithms & Data Structures',
        tagline: 'Consistent algorithmic problem solving with dynamic programming, trees, and graphs.',
        cta: 'Open LeetCode',
        icon: LeetcodeIcon,
    },
    {
        id: 'linkedin',
        glyphIdx: 3,
        label: 'LinkedIn',
        word: 'CONNECT',
        color: '#38bdf8',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        handle: 'in/priyankkhatrii',
        badge: 'Professional Network',
        tagline: 'Connect for software developer internships, full-time opportunities, and collabs.',
        cta: 'Connect on LinkedIn',
        icon: LinkedinIcon,
    },
    {
        id: 'youtube',
        glyphIdx: 4,
        label: 'YouTube',
        word: 'CREATE',
        color: '#ef4444',
        href: 'https://www.youtube.com/@PriyankCreates',
        handle: '@PriyankCreates',
        badge: 'Devlogs & Breakdowns',
        tagline: 'Project walkthroughs, architectural breakdowns, frontend engineering, and dev vlogs.',
        cta: 'Open YouTube',
        icon: YoutubeIcon,
    },
    {
        id: 'instagram',
        glyphIdx: 5,
        label: 'Instagram',
        word: 'DESIGN',
        color: '#ec4899',
        href: 'https://www.instagram.com/priyankhatrii/',
        handle: '@priyankhatrii',
        badge: 'Visual Design & Workspace',
        tagline: 'Design logs, UI prototypes, setup aesthetics, and visual developer experiments.',
        cta: 'Open Instagram',
        icon: InstagramIcon,
    },
    {
        id: 'twitter',
        glyphIdx: 6,
        label: 'X / Twitter',
        word: 'BROADCAST',
        color: '#cbd5e1',
        href: 'https://x.com/PriyankKhatrii',
        handle: '@PriyankKhatrii',
        badge: 'Tech Broadcasts & Insights',
        tagline: 'Daily software engineering updates, WebGL explorations, and tech opinions.',
        cta: 'Follow on X',
        icon: XIcon,
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

const contributionCells = [...Array(120)].map((_, i) => {
    const density = Math.random()
    return {
        colorClass: density < 0.28 ? 'bg-white/5'
            : density < 0.58 ? 'bg-[#60a5fa]/30'
            : density < 0.85 ? 'bg-[#60a5fa]/70 shadow-[0_0_6px_rgba(96,165,250,0.35)]'
            : 'bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.65)]',
        msg: mockCommits[i % mockCommits.length],
        date: `2026-08-${String((i % 28) + 1).padStart(2, '0')}`,
    }
})

/* ═══════════════════ MOTION HELPERS ═══════════════════ */

/** Magnetic hover button wrapper with spring dynamics */
function Magnetic({ children, strength = 0.3, className = '' }) {
    const ref = useRef(null)
    const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.35 })
    const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.35 })
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

/** Primary CTA link with animated hover */
function PlatformCta({ platform, setCursorVariant }) {
    return (
        <div className="flex items-center gap-3 pt-2">
            <Magnetic strength={0.35}>
                <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="group/cta relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 overflow-hidden shadow-lg cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${platform.color}25, ${platform.color}08)`,
                        borderColor: `${platform.color}50`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: 'var(--text-primary)',
                        boxShadow: `0 10px 25px -5px ${platform.color}20`,
                    }}
                >
                    <span
                        className="absolute inset-0 translate-y-[101%] group-hover/cta:translate-y-0 transition-transform duration-300 ease-out"
                        style={{ background: platform.color }}
                    />
                    <span className="relative z-10 transition-colors duration-300 group-hover/cta:text-black font-bold">
                        {platform.cta}
                    </span>
                    <span className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:text-black">
                        <ArrowUpRight size={16} />
                    </span>
                </a>
            </Magnetic>
        </div>
    )
}

/* ═══════════════════ PLATFORM WIDGETS ═══════════════════ */

function GithubWidget({ setCursorVariant }) {
    const [activeTooltip, setActiveTooltip] = useState(null)

    return (
        <div className="space-y-4">
            {/* Top stats pill row */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded-lg bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 font-semibold">
                    30+ Public Repos
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Daily Active Commits
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[var(--text-secondary)] border border-white/10">
                    Open Source
                </span>
            </div>

            {/* Contribution heat matrix */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <span>Recent Contribution Matrix</span>
                    <span className="text-[#60a5fa]">August 2026</span>
                </div>
                <div className="relative p-3 rounded-2xl bg-black/30 border border-white/10 overflow-hidden">
                    <div className="grid grid-flow-col grid-rows-4 gap-1.5">
                        {contributionCells.map((cell, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => {
                                    setCursorVariant('hover')
                                    setActiveTooltip({ id: i, msg: cell.msg, date: cell.date })
                                }}
                                onMouseLeave={() => {
                                    setCursorVariant('default')
                                    setActiveTooltip(null)
                                }}
                                className={`w-3.5 h-3.5 rounded-[3px] cursor-pointer transition-all duration-200 hover:scale-125 hover:z-10 ${cell.colorClass}`}
                            />
                        ))}
                    </div>

                    <AnimatePresence>
                        {activeTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                                className="absolute bottom-2 left-3 right-3 bg-black/95 backdrop-blur border border-[#60a5fa]/30 px-3 py-2 rounded-xl font-mono text-[10px] text-[#60a5fa] shadow-xl z-20 flex items-center justify-between"
                            >
                                <span className="truncate">{activeTooltip.msg}</span>
                                <span className="text-[var(--text-muted)] ml-2 shrink-0">{activeTooltip.date}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
                {['React.js', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'Tailwind CSS'].map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-[var(--text-secondary)] border border-white/5">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    )
}

function LeetCodeWidget() {
    const difficulties = [
        { label: 'Easy', count: '65+', color: '#10b981', percent: '45%' },
        { label: 'Medium', count: '75+', color: '#f59e0b', percent: '48%' },
        { label: 'Hard', count: '10+', color: '#ef4444', percent: '7%' },
    ]

    return (
        <div className="space-y-4">
            {/* Top Stats Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                        150+
                    </div>
                    <div>
                        <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">Problems Solved</div>
                        <div className="text-[10px] font-mono text-[var(--text-muted)]">Data Structures & Algorithms</div>
                    </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                    ACTIVE
                </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-black/30 border border-white/10">
                {difficulties.map((diff, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                            <span style={{ color: diff.color }} className="font-semibold">{diff.label}</span>
                            <span className="text-[var(--text-primary)] font-bold">{diff.count}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: diff.percent,
                                    backgroundColor: diff.color,
                                    boxShadow: `0 0 10px ${diff.color}80`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Topic Focus Pills */}
            <div className="flex flex-wrap gap-1.5">
                {['Dynamic Programming', 'Graphs', 'Trees', 'Binary Search', 'Sliding Window'].map((topic, i) => (
                    <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-amber-500/5 text-amber-200/80 border border-amber-500/15">
                        {topic}
                    </span>
                ))}
            </div>
        </div>
    )
}

function LinkedInWidget() {
    return (
        <div className="space-y-4">
            {/* Status & Availability Badge */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shrink-0" />
                <div>
                    <div className="text-xs font-mono font-bold text-sky-300">
                        Open for Software Developer Internships
                    </div>
                    <div className="text-[10px] font-mono text-sky-200/60 mt-0.5">
                        Available for Summer & Fall Opportunities
                    </div>
                </div>
            </div>

            {/* Candidate Summary Card */}
            <div className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-base font-bold text-[var(--text-primary)] font-mono">Priyank Khatri</h4>
                        <p className="text-xs text-sky-400 font-mono">Creative Full-Stack Developer · B.Tech CSE</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-300 font-mono text-[10px] font-semibold border border-sky-500/30">
                        VERIFIED
                    </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                    Specializing in high-performance React architectures, Node.js REST APIs, and immersive 3D WebGL experiences.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[9px] text-[var(--text-muted)] uppercase">Degree</div>
                        <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">B.Tech CSE</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[9px] text-[var(--text-muted)] uppercase">Institute</div>
                        <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">Coding Gita</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[9px] text-[var(--text-muted)] uppercase">Location</div>
                        <div className="text-xs font-bold text-[var(--text-primary)] mt-0.5">India</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function YouTubeWidget() {
    const devlogs = [
        { title: 'Interactive 3D Portfolio Build & R3F Performance', tag: 'DEVLOG_01', length: 'In-Depth' },
        { title: 'Full Stack MERN Architecture & Deployment Guide', tag: 'TUTORIAL_02', length: 'Full Stack' },
    ]

    return (
        <div className="space-y-3">
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Featured Technical Devlogs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {devlogs.map((vid, idx) => (
                    <div
                        key={idx}
                        className="group/vid rounded-2xl border border-white/10 bg-black/30 p-3.5 space-y-2.5 hover:border-red-500/40 transition-all duration-300 cursor-pointer"
                    >
                        <div className="aspect-video rounded-xl bg-gradient-to-br from-red-950/40 via-black to-black border border-red-500/20 flex items-center justify-center relative overflow-hidden group-hover/vid:border-red-500/50 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-600/80 text-white flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover/vid:scale-110 transition-transform duration-300">
                                <Play size={14} className="fill-current ml-0.5" />
                            </div>
                            <span className="absolute bottom-2 right-2 text-[8px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-red-200 border border-red-500/20">
                                {vid.length}
                            </span>
                        </div>
                        <div>
                            <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                                {vid.tag}
                            </span>
                            <h4 className="text-xs font-bold text-[var(--text-primary)] font-mono line-clamp-2 mt-0.5">
                                {vid.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function InstagramWidget() {
    const tiles = [
        { label: 'Creative Code', sub: '3D UI', color: 'from-pink-500/20 to-purple-500/20' },
        { label: 'Dev Setup', sub: 'Workspace', color: 'from-purple-500/20 to-indigo-500/20' },
        { label: 'Dark Palette', sub: 'Aesthetics', color: 'from-pink-500/20 to-rose-500/20' },
        { label: 'Motion', sub: 'Framer', color: 'from-indigo-500/20 to-pink-500/20' },
    ]

    return (
        <div className="space-y-3">
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Visual Development Log
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {tiles.map((tile, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        className={`aspect-square rounded-2xl bg-gradient-to-br ${tile.color} border border-pink-500/20 p-3 flex flex-col justify-between hover:border-pink-500/50 transition-colors cursor-pointer`}
                    >
                        <span className="text-[9px] font-mono text-pink-400 font-bold">0{idx + 1}</span>
                        <div>
                            <div className="text-xs font-mono font-bold text-[var(--text-primary)]">{tile.label}</div>
                            <div className="text-[9px] font-mono text-pink-200/60">{tile.sub}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function TwitterWidget() {
    const tweets = [
        'Crafting butter-smooth 60fps WebGL transitions with React Three Fiber and Three.js. Direct shader math makes all the difference. ⚡',
        'Performance first: granular chunking, viewport-gating heavy 3D canvases, and zero layout shift. Clean code always wins. 🚀',
    ]

    return (
        <div className="space-y-2.5">
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Recent Broadcast Insights
            </div>
            <div className="space-y-2.5">
                {tweets.map((t, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2 hover:border-white/20 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[var(--text-primary)] font-mono">Priyank Khatri</span>
                                <span className="text-[10px] font-mono text-[var(--text-muted)]">@PriyankKhatrii</span>
                            </div>
                            <span className="text-[10px] font-mono text-[var(--text-muted)]">Verified</span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                            {t}
                        </p>
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

/* ═══════════════════ PINNED SCROLL SECTION ═══════════════════ */

function PinnedSection({ platform, index, setCursorVariant, children }) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

    // Extended 210vh scroll with 68% stationary plateau time
    // Entrance: 0.00 -> 0.16 | Settle/Plateau: 0.16 -> 0.84 | Exit: 0.84 -> 1.00
    const rawCardY = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [55, 0, 0, -55])
    const cardY = useSpring(rawCardY, { stiffness: 120, damping: 20, mass: 0.2 })

    const rawCardOpacity = useTransform(scrollYProgress, [0.02, 0.14, 0.86, 0.98], [0, 1, 1, 0])
    const cardOpacity = useSpring(rawCardOpacity, { stiffness: 140, damping: 22, mass: 0.2 })

    const rawCardRotateX = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [5, 0, 0, -4])
    const cardRotateX = useSpring(rawCardRotateX, { stiffness: 120, damping: 20, mass: 0.2 })

    const rawCardScale = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.96, 1, 1, 0.97])
    const cardScale = useSpring(rawCardScale, { stiffness: 120, damping: 20, mass: 0.2 })

    const rawBeamScaleX = useTransform(scrollYProgress, [0.04, 0.18], [0, 1])
    const beamScaleX = useSpring(rawBeamScaleX, { stiffness: 140, damping: 24 })

    const rawMetaY = useTransform(scrollYProgress, [0.04, 0.18], [20, 0])
    const metaY = useSpring(rawMetaY, { stiffness: 120, damping: 22 })
    const metaOpacity = useTransform(scrollYProgress, [0.04, 0.18], [0, 1])

    const rawAuraOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.8, 0.92], [0, 0.22, 0.22, 0])
    const auraOpacity = useSpring(rawAuraOpacity, { stiffness: 110, damping: 24 })

    // 🌊 BUTTERY SMOOTH KINETIC SWEEPING TYPOGRAPHY (Right to Left on scroll)
    // Moves from +45vw (entering right) to -45vw (exiting left) with spring physics
    const rawWordX = useTransform(scrollYProgress, [0, 1], ['42vw', '-42vw'])
    const wordX = useSpring(rawWordX, { stiffness: 65, damping: 22, mass: 0.3 })
    const wordOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0.28, 0.28, 0])

    // Secondary reverse parallax sub-track (Left to Right) for ultra-rich depth
    const rawTickerX = useTransform(scrollYProgress, [0, 1], ['-25vw', '25vw'])
    const tickerX = useSpring(rawTickerX, { stiffness: 60, damping: 24, mass: 0.35 })

    const stageStyle = reduced ? {} : { y: cardY, opacity: cardOpacity, rotateX: cardRotateX, scale: cardScale }

    const IconComponent = platform.icon
    const titleText = platform.word.charAt(0) + platform.word.slice(1).toLowerCase()

    return (
        <section ref={ref} id={platform.id} className={reduced ? 'relative min-h-screen' : 'relative h-[210vh]'}>
            <div className={`${reduced ? 'min-h-screen' : 'sticky top-0 h-screen'} flex items-center justify-center overflow-hidden [perspective:1200px] px-4 sm:px-6`}>

                {/* ─── KINETIC SCROLL-DRIVEN BACKGROUND TYPOGRAPHY ─── */}
                <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
                    }}
                >
                    {/* Primary Giant Outline Word sweeping Right to Left */}
                    <motion.span
                        style={reduced ? { opacity: 0.15 } : {
                            x: wordX,
                            opacity: wordOpacity,
                            WebkitTextStroke: `2px ${platform.color}50`,
                            color: 'transparent',
                            filter: `drop-shadow(0 0 50px ${platform.color}35)`,
                        }}
                        className="text-[24vw] md:text-[20vw] font-black tracking-tighter leading-none uppercase select-none whitespace-nowrap"
                        aria-hidden="true"
                    >
                        {platform.word}
                    </motion.span>

                    {/* Secondary Parallax Micro-Ticker floating in reverse (Left to Right) */}
                    <motion.div
                        style={reduced ? { color: platform.color, opacity: 0 } : {
                            x: tickerX,
                            color: platform.color,
                            opacity: wordOpacity,
                        }}
                        className="absolute bottom-[18vh] whitespace-nowrap font-mono text-[10px] tracking-[0.5em] uppercase"
                        aria-hidden="true"
                    >
                        {`// PRIYANK KHATRI · ${platform.label.toUpperCase()} · ${platform.badge.toUpperCase()} //`}
                    </motion.div>
                </div>

                {/* Section Meta Badge — Floating Index + Handle */}
                <motion.div
                    style={reduced ? {} : { y: metaY, opacity: metaOpacity }}
                    className="absolute top-[8vh] left-6 sm:left-12 lg:left-24 font-mono select-none pointer-events-none z-20"
                    aria-hidden="true"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: platform.color, boxShadow: `0 0 8px ${platform.color}` }} />
                        <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: platform.color }}>
                            {String(index + 1).padStart(2, '0')} / {String(PLATFORMS.length).padStart(2, '0')}
                        </span>
                    </div>
                    <div className="text-xs tracking-wider text-[var(--text-muted)] mt-1">{platform.handle}</div>
                </motion.div>

                {/* The Luxury Glass Card */}
                <motion.div
                    style={stageStyle}
                    className="relative w-full max-w-3xl bg-[var(--bg-primary)]/85 border border-[var(--border-color)] rounded-[2.5rem] backdrop-blur-3xl p-7 sm:p-12 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] overflow-hidden z-10"
                >
                    {/* Drawing Top Laser Beam */}
                    <motion.div
                        style={reduced ? {} : { scaleX: beamScaleX }}
                        className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
                        aria-hidden="true"
                    >
                        <div
                            className="h-full w-full"
                            style={{
                                background: `linear-gradient(90deg, ${platform.color}, ${platform.color}80, transparent)`,
                                boxShadow: `0 0 12px ${platform.color}80`,
                            }}
                        />
                    </motion.div>

                    {/* Corner Ambient Glow with Spring Pacing */}
                    <motion.div
                        style={reduced ? { background: platform.color } : { opacity: auraOpacity, background: platform.color }}
                        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[90px] pointer-events-none"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 space-y-6 sm:space-y-7">
                        {/* Header Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3.5">
                                <div
                                    className="w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg"
                                    style={{
                                        borderColor: `${platform.color}50`,
                                        background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}05)`,
                                        color: platform.color,
                                    }}
                                >
                                    <IconComponent size={22} />
                                </div>
                                <div>
                                    <span className="text-xs font-mono tracking-[0.3em] uppercase font-bold block" style={{ color: platform.color }}>
                                        {platform.label}
                                    </span>
                                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                                        {platform.badge}
                                    </span>
                                </div>
                            </div>

                            <span
                                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border"
                                style={{
                                    borderColor: `${platform.color}30`,
                                    background: `${platform.color}10`,
                                    color: platform.color,
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: platform.color }} />
                                Active Hub
                            </span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                            <h2
                                className="text-4xl sm:text-6xl font-bold text-[var(--text-primary)] leading-[1.05] tracking-tight"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                <span>{titleText}</span>
                                <span style={{ color: platform.color }}>.</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-lg font-sans mt-2">
                                {platform.tagline}
                            </p>
                        </div>

                        {/* Specific Platform Widget */}
                        <div className="pt-1">
                            {children}
                        </div>

                        {/* Platform CTA */}
                        <PlatformCta platform={platform} setCursorVariant={setCursorVariant} />
                    </div>
                </motion.div>
            </div>
        </section>
    )
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
                            className="group/rail flex items-center gap-2.5 text-left cursor-pointer"
                            aria-label={`Scroll to ${label}`}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    background: isActive ? color : 'var(--text-muted)',
                                    boxShadow: isActive ? `0 0 10px ${color}` : 'none',
                                    transform: isActive ? 'scale(1.8)' : 'scale(1)',
                                }}
                            />
                            <span
                                className={`font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 font-bold' : 'opacity-0 -translate-x-2 group-hover/rail:opacity-60 group-hover/rail:translate-x-0'}`}
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
        <div className="hidden md:flex fixed top-20 right-8 sm:right-12 z-40 items-baseline gap-1.5 font-mono select-none pointer-events-none" aria-hidden="true">
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
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-3 py-2.5 rounded-full bg-[var(--bg-primary)]/80 border border-[var(--border-color)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {SECTION_IDS.map((id) => {
                const platform = PLATFORMS.find((p) => p.id === id)
                const color = platform?.color || '#a78bfa'
                const isActive = activeId === id
                return (
                    <button
                        key={id}
                        onClick={() => onNavigate(id)}
                        aria-label={`Scroll to ${id}`}
                        className="p-1.5 cursor-pointer"
                    >
                        <span
                            className="block rounded-full transition-all duration-300"
                            style={{
                                width: isActive ? 20 : 6,
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

/* ═══════════════════ INTRO & DIRECTORY SECTIONS ═══════════════════ */

function IntroSection({ setCursorVariant }) {
    const ref = useRef(null)
    const reduced = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const rawY = useTransform(scrollYProgress, [0, 1], [0, -120])
    const y = useSpring(rawY, { stiffness: 120, damping: 22 })
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    return (
        <section ref={ref} id="intro" className="relative h-screen flex items-center justify-center overflow-hidden px-4">
            <motion.div style={reduced ? {} : { y, opacity }} className="relative z-10 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#a78bfa]/30 bg-[#a78bfa]/10 backdrop-blur-md mb-7"
                >
                    <span className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#a78bfa] uppercase font-bold">
                        Priyank Khatri // Connect Network
                    </span>
                </motion.div>

                <h1
                    className="text-[15vw] sm:text-[12vw] lg:text-[7.5rem] font-black leading-[0.92] text-[var(--text-primary)] tracking-tight"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    EVERY LINK.
                    <br />
                    <span className="text-gradient-silver">ONE SCROLL.</span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-7 text-xs sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed font-sans"
                >
                    One continuous scroll across six platforms. The 3D particle swarm shifts and morphs into each destination glyph as you navigate.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 flex flex-col items-center gap-2.5"
                    aria-hidden="true"
                >
                    <span className="text-[9px] font-mono tracking-[0.35em] text-[var(--text-muted)] uppercase">Scroll to Discover</span>
                    <div className="w-5 h-9 border border-[var(--border-color)] rounded-full flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1 h-2 bg-[#a78bfa] rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

function IndexSection({ setCursorVariant }) {
    const [copiedId, setCopiedId] = useState(null)

    const copyHandle = (text, id) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedId(id)
                setTimeout(() => setCopiedId(null), 2500)
            })
        }
    }

    return (
        <section id="index" className="relative min-h-screen flex items-center justify-center py-32 px-4 sm:px-6">
            <div className="w-full max-w-4xl relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <span className="w-8 h-px bg-[var(--text-muted)]/40" />
                    <span className="text-xs font-mono tracking-[0.35em] text-[var(--text-muted)] uppercase font-bold">
                        Direct Directory Index
                    </span>
                </div>

                <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-2xl p-6 sm:p-10 divide-y divide-[var(--border-color)]/60">
                    {PLATFORMS.map((p, i) => (
                        <div
                            key={p.id}
                            className="group/row flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 first:pt-0 last:pb-0"
                        >
                            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                                <span className="font-mono text-xs text-[var(--text-muted)] w-6 shrink-0">
                                    0{i + 1}
                                </span>
                                <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{
                                        background: `${p.color}15`,
                                        color: p.color,
                                        border: `1px solid ${p.color}35`,
                                    }}
                                >
                                    <p.icon size={18} />
                                </div>
                                <div className="min-w-0">
                                    <h3
                                        className="text-lg sm:text-xl font-bold text-[var(--text-primary)] font-mono transition-transform duration-300 group-hover/row:translate-x-1"
                                    >
                                        {p.label}
                                    </h3>
                                    <p className="text-xs text-[var(--text-secondary)] font-mono truncate max-w-sm">
                                        {p.tagline}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                                <button
                                    onClick={() => copyHandle(p.href, p.id)}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/60 text-[var(--text-secondary)] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    {copiedId === p.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                    <span>{copiedId === p.id ? 'Copied' : 'Copy'}</span>
                                </button>
                                <a
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="px-4 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                    style={{
                                        background: `${p.color}20`,
                                        color: p.color,
                                        border: `1px solid ${p.color}40`,
                                    }}
                                >
                                    <span>Visit</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Direct Email */}
                <div className="mt-12 text-center font-mono text-xs text-[var(--text-muted)] space-y-2">
                    <p>PRIYANK KHATRI · PORTFOLIO DOSSIER 2026</p>
                    <a
                        href="mailto:priyank.khatri.cg@gmail.com"
                        className="text-[var(--text-secondary)] hover:text-[#60a5fa] transition-colors underline underline-offset-4"
                    >
                        priyank.khatri.cg@gmail.com
                    </a>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════ MAIN LINKS PAGE ═══════════════════ */

export default function LinksPage() {
    const [activeSection, setActiveSection] = useState('intro')
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const reduced = useReducedMotion()

    const { scrollY, scrollYProgress } = useScroll()
    const velocity = useVelocity(scrollY)
    const skewRaw = useTransform(velocity, [-2500, 2500], [-1.5, 1.5])
    const skew = useSpring(skewRaw, { stiffness: 260, damping: 32 })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id)
                })
            },
            { root: null, rootMargin: '-35% 0px -35% 0px', threshold: 0 }
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
                <meta
                    name="description"
                    content="Scroll-driven link hub for Priyank Khatri — GitHub, LeetCode, LinkedIn, YouTube, Instagram, and X, each with its own morphing particle scene."
                />
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
