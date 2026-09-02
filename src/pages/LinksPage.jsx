import { useState, useEffect, useRef, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import {
    motion,
    AnimatePresence,
    useScroll,
    useVelocity,
} from 'framer-motion'
import {
    Copy,
    Check,
    ExternalLink,
    Terminal,
    Sparkles,
    FileText,
    Mail,
    Share2,
    Code2,
    Play,
    Compass,
    ArrowUpRight,
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

/* ═══════════════════════════ PLATFORMS DATA ═══════════════════════════ */

const PLATFORMS = [
    {
        id: 'github',
        glyphIdx: 1,
        category: 'code',
        label: 'GitHub',
        actionWord: 'COMMIT',
        color: '#60a5fa',
        href: 'https://github.com/Priyankkhatri',
        handle: '@Priyankkhatri',
        badge: 'Open Source & Repos',
        tagline: 'Full-stack MERN projects, 3D WebGL experiments, and open-source code repositories.',
        cta: 'Explore Repositories',
        metrics: [
            { label: 'Public Repos', value: '30+' },
            { label: 'Primary Focus', value: 'React & Node' },
            { label: 'Status', value: 'Active Daily' },
        ],
        techTags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'Tailwind'],
        icon: GithubIcon,
    },
    {
        id: 'leetcode',
        glyphIdx: 2,
        category: 'code',
        label: 'LeetCode',
        actionWord: 'SOLVE',
        color: '#f59e0b',
        href: 'https://leetcode.com/u/Priyank_Khatri/',
        handle: '@Priyank_Khatri',
        badge: 'Data Structures & Algos',
        tagline: 'Consistent algorithmic problem-solving with dynamic programming, trees, and graphs.',
        cta: 'View Solutions',
        metrics: [
            { label: 'Problems Solved', value: '150+' },
            { label: 'Top Focus', value: 'DSA / Graphs' },
            { label: 'Consistency', value: 'Active' },
        ],
        difficulty: [
            { label: 'Easy', count: '65+', color: '#10b981', percent: '45%' },
            { label: 'Medium', count: '75+', color: '#f59e0b', percent: '48%' },
            { label: 'Hard', count: '10+', color: '#ef4444', percent: '7%' },
        ],
        icon: LeetcodeIcon,
    },
    {
        id: 'linkedin',
        glyphIdx: 3,
        category: 'career',
        label: 'LinkedIn',
        actionWord: 'CONNECT',
        color: '#38bdf8',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        handle: 'in/priyankkhatrii',
        badge: 'Professional Network',
        tagline: 'Connect for software developer internships, full-time opportunities, and tech collaborations.',
        cta: 'Connect on LinkedIn',
        metrics: [
            { label: 'Status', value: 'Open for Roles' },
            { label: 'Degree', value: 'B.Tech CSE' },
            { label: 'Location', value: 'India' },
        ],
        roleStatus: 'Available for Summer / Fall Internships',
        icon: LinkedinIcon,
    },
    {
        id: 'youtube',
        glyphIdx: 4,
        category: 'media',
        label: 'YouTube',
        actionWord: 'CREATE',
        color: '#ef4444',
        href: 'https://www.youtube.com/@PriyankCreates',
        handle: '@PriyankCreates',
        badge: 'Devlogs & Breakdowns',
        tagline: 'Project walkthroughs, architectural breakdowns, frontend engineering, and dev vlogs.',
        cta: 'Watch on YouTube',
        featuredVideos: [
            { title: 'Interactive 3D Portfolio Build & R3F Performance', tag: 'DEVLOG_01' },
            { title: 'Full Stack MERN Architecture & Deployment', tag: 'CODE_02' },
        ],
        icon: YoutubeIcon,
    },
    {
        id: 'instagram',
        glyphIdx: 5,
        category: 'media',
        label: 'Instagram',
        actionWord: 'DESIGN',
        color: '#ec4899',
        href: 'https://www.instagram.com/priyankhatrii/',
        handle: '@priyankhatrii',
        badge: 'Visual Journal & Setup',
        tagline: 'Design prototypes, UI experiments, setup aesthetics, and visual developer life.',
        cta: 'Follow Visual Feed',
        snapshots: [
            { title: 'Mesh Art', sub: '3D UI' },
            { title: 'Dev Setup', sub: 'Workspace' },
            { title: 'Palettes', sub: 'Dark Theme' },
            { title: 'Motion', sub: 'Framer' },
        ],
        icon: InstagramIcon,
    },
    {
        id: 'twitter',
        glyphIdx: 6,
        category: 'career',
        label: 'X (Twitter)',
        actionWord: 'BROADCAST',
        color: '#cbd5e1',
        href: 'https://x.com/PriyankKhatrii',
        handle: '@PriyankKhatrii',
        badge: 'Tech Thoughts & Builds',
        tagline: 'Daily software engineering updates, WebGL explorations, and tech opinions.',
        cta: 'Follow on X',
        posts: [
            'Building high-fidelity interactive 3D web experiences with Three.js and React Fiber. ⚡',
            'Performance first: 60fps animations, intelligent code splitting, and clean architecture. 🚀',
        ],
        icon: XIcon,
    },
]

const CATEGORIES = [
    { id: 'all', label: 'All Channels', count: 6 },
    { id: 'code', label: 'Code & DSA', count: 2 },
    { id: 'career', label: 'Career & Network', count: 2 },
    { id: 'media', label: 'Media & Design', count: 2 },
]

/* Mock Contribution Heatmap for GitHub Card */
const heatMapDays = Array.from({ length: 48 }, (_, i) => {
    const r = Math.random()
    const level = r > 0.7 ? 3 : r > 0.45 ? 2 : r > 0.25 ? 1 : 0
    return { id: i, level }
})

/* ═══════════════════════════ TOAST NOTIFICATION ═══════════════════════════ */

function Toast({ message, isVisible }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-secondary)] border border-[#60a5fa]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(96,165,250,0.25)] backdrop-blur-xl"
                >
                    <div className="w-6 h-6 rounded-full bg-[#60a5fa]/20 flex items-center justify-center text-[#60a5fa]">
                        <Check size={14} className="stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-mono text-[var(--text-primary)] font-medium">
                        {message}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ═══════════════════════════ INTERACTIVE BENTO CARD ═══════════════════════════ */

function BentoCard({ platform, onHover, onLeave, onCopy, copiedId, setCursorVariant }) {
    const cardRef = useRef(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const IconComponent = platform.icon

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const isCopied = copiedId === platform.id

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
                onHover(platform.glyphIdx)
                setCursorVariant('hover')
            }}
            onMouseLeave={() => {
                onLeave()
                setCursorVariant('default')
            }}
            className="group relative rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
            style={{
                willChange: 'transform, border-color',
            }}
        >
            {/* Mouse Spotlight Glow */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{
                    background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${platform.color}15, transparent 70%)`,
                }}
            />

            {/* Top Accent Line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
                }}
            />

            {/* Top Header Row */}
            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-inner"
                            style={{
                                background: `linear-gradient(135deg, ${platform.color}20, ${platform.color}05)`,
                                border: `1px solid ${platform.color}40`,
                                color: platform.color,
                            }}
                        >
                            <IconComponent size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-[var(--text-primary)] font-mono">
                                    {platform.label}
                                </h3>
                                <span
                                    className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold border"
                                    style={{
                                        borderColor: `${platform.color}35`,
                                        background: `${platform.color}10`,
                                        color: platform.color,
                                    }}
                                >
                                    {platform.actionWord}
                                </span>
                            </div>
                            <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                                {platform.handle}
                            </p>
                        </div>
                    </div>

                    {/* Quick Copy Handle Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onCopy(platform.handle, `Copied ${platform.label} handle!`, platform.id)
                        }}
                        className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/20 transition-all duration-200 cursor-pointer"
                        title="Copy handle"
                        aria-label={`Copy ${platform.label} handle`}
                    >
                        {isCopied ? (
                            <Check size={14} className="text-emerald-400" />
                        ) : (
                            <Copy size={14} />
                        )}
                    </button>
                </div>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    {platform.tagline}
                </p>

                {/* ── Specific Platform Widgets ── */}

                {/* 1. GitHub Custom Widget */}
                {platform.id === 'github' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            <span>Contribution Streak</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                            </span>
                        </div>
                        {/* Mini Activity Heatmap */}
                        <div className="grid grid-flow-col grid-rows-4 gap-1 p-2.5 rounded-xl bg-black/20 border border-white/5">
                            {heatMapDays.map((d) => (
                                <div
                                    key={d.id}
                                    className={`w-2.5 h-2.5 rounded-[2px] transition-transform hover:scale-125 ${
                                        d.level === 3
                                            ? 'bg-[#60a5fa] shadow-[0_0_6px_rgba(96,165,250,0.5)]'
                                            : d.level === 2
                                            ? 'bg-[#60a5fa]/70'
                                            : d.level === 1
                                            ? 'bg-[#60a5fa]/35'
                                            : 'bg-white/5'
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {platform.techTags.map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[var(--text-secondary)] border border-white/5"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. LeetCode Custom Widget */}
                {platform.id === 'leetcode' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            <span>Problem Stats</span>
                            <span className="text-amber-400 font-bold">150+ Solved</span>
                        </div>
                        <div className="space-y-2">
                            {platform.difficulty.map((diff, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-mono">
                                        <span style={{ color: diff.color }}>{diff.label}</span>
                                        <span className="text-[var(--text-secondary)]">{diff.count}</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: diff.percent,
                                                backgroundColor: diff.color,
                                                boxShadow: `0 0 8px ${diff.color}60`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. LinkedIn Custom Widget */}
                {platform.id === 'linkedin' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-3">
                        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            <span className="text-[11px] font-mono text-sky-300 font-medium">
                                {platform.roleStatus}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center pt-1">
                            {platform.metrics.map((m, i) => (
                                <div key={i} className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="text-[9px] font-mono text-[var(--text-muted)] uppercase">{m.label}</div>
                                    <div className="text-[11px] font-bold text-[var(--text-primary)] font-mono mt-0.5">{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. YouTube Custom Widget */}
                {platform.id === 'youtube' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-2.5">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Featured Topic Logs
                        </div>
                        <div className="space-y-2">
                            {platform.featuredVideos.map((vid, i) => (
                                <div
                                    key={i}
                                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 group-hover:border-red-500/30 transition-colors"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-6 h-6 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                                            <Play size={10} className="fill-current" />
                                        </div>
                                        <span className="text-[11px] font-mono text-[var(--text-primary)] truncate font-medium">
                                            {vid.title}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-mono text-red-400 shrink-0 uppercase tracking-wider">
                                        {vid.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Instagram Custom Widget */}
                {platform.id === 'instagram' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-2.5">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Visual Highlights
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {platform.snapshots.map((snap, i) => (
                                <div
                                    key={i}
                                    className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center group-hover:border-pink-500/30 transition-all hover:scale-105"
                                >
                                    <div className="text-[10px] font-mono font-bold text-pink-300">{snap.title}</div>
                                    <div className="text-[8px] font-mono text-[var(--text-muted)] mt-0.5">{snap.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 6. Twitter Custom Widget */}
                {platform.id === 'twitter' && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60 space-y-2.5">
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                            Broadcast Updates
                        </div>
                        <div className="space-y-2">
                            {platform.posts.map((post, i) => (
                                <div
                                    key={i}
                                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[var(--text-secondary)] font-sans leading-relaxed"
                                >
                                    {post}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Action Button */}
            <div className="mt-6 pt-4 relative z-10">
                <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative w-full inline-flex items-center justify-between px-5 py-3 rounded-2xl border font-mono text-xs tracking-wider uppercase font-semibold transition-all duration-300 overflow-hidden cursor-pointer"
                    style={{
                        borderColor: `${platform.color}40`,
                        background: `linear-gradient(135deg, ${platform.color}15, ${platform.color}05)`,
                        color: 'var(--text-primary)',
                    }}
                >
                    <span
                        className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"
                        style={{ background: platform.color }}
                    />
                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-black font-bold">
                        {platform.cta}
                    </span>
                    <span className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:text-black">
                        <ArrowUpRight size={16} />
                    </span>
                </a>
            </div>
        </motion.div>
    )
}

/* ═══════════════════════════ MAIN LINKS PAGE ═══════════════════════════ */

export default function LinksPage() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [activeGlyph, setActiveGlyph] = useState(0) // 0 = Intro Galaxy, 1-6 = Platform glyphs
    const [copiedId, setCopiedId] = useState(null)
    const [toastMessage, setToastMessage] = useState('')
    const [toastVisible, setToastVisible] = useState(false)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const { scrollY } = useScroll()
    const velocity = useVelocity(scrollY)

    const triggerToast = (msg, id = null) => {
        setToastMessage(msg)
        setCopiedId(id)
        setToastVisible(true)
        setTimeout(() => {
            setToastVisible(false)
            setCopiedId(null)
        }, 3000)
    }

    const copyToClipboard = (text, message, id = null) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                triggerToast(message, id)
            })
        }
    }

    const filteredPlatforms = useMemo(() => {
        if (selectedCategory === 'all') return PLATFORMS
        return PLATFORMS.filter((p) => p.category === selectedCategory)
    }, [selectedCategory])

    return (
        <>
            <Helmet>
                <title>Links & Channels | Priyank Khatri — Digital Hub</title>
                <meta
                    name="description"
                    content="Connect with Priyank Khatri across GitHub, LeetCode, LinkedIn, YouTube, Instagram, and X. All digital channels in one interactive hub."
                />
                <meta
                    name="keywords"
                    content="Priyank Khatri links, GitHub, LeetCode, LinkedIn, YouTube, Instagram, X, Developer portfolio social links"
                />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/links" />
            </Helmet>

            <Toast
                message={toastMessage}
                isVisible={toastVisible}
            />

            {/* 3D Morphing Particle Field */}
            <LinksBackground3D activeIdx={activeGlyph} velocity={velocity} />

            <div className="relative z-10 min-h-screen pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">

                {/* ─── Hero Header ─── */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    {/* Status Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-emerald-300">
                            Available for Internships & Projects
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-2"
                    >
                        <h1
                            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Digital{' '}
                            <span className="text-gradient-silver bg-clip-text">
                                Ecosystem
                            </span>
                            <span className="text-[#60a5fa]">.</span>
                        </h1>
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans max-w-xl mx-auto leading-relaxed pt-2">
                            Every repository, algorithm solve, professional network, and creative devlog connected in one interactive station.
                        </p>
                    </motion.div>

                    {/* Quick Utility Actions Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-3 pt-2"
                    >
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    window.location.href,
                                    'Hub link copied to clipboard! 🚀'
                                )
                            }
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/60 hover:bg-[var(--bg-highlight)] text-xs font-mono text-[var(--text-primary)] transition-all duration-300 cursor-pointer"
                        >
                            <Share2 size={13} className="text-[#60a5fa]" />
                            <span>Share Hub URL</span>
                        </button>

                        <button
                            onClick={() =>
                                copyToClipboard(
                                    'priyank.khatri.cg@gmail.com',
                                    'Email address copied to clipboard! ✉️'
                                )
                            }
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/60 hover:bg-[var(--bg-highlight)] text-xs font-mono text-[var(--text-primary)] transition-all duration-300 cursor-pointer"
                        >
                            <Mail size={13} className="text-[#a78bfa]" />
                            <span>Copy Email</span>
                        </button>

                        <a
                            href="/Priyank_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#60a5fa]/40 bg-[#60a5fa]/10 hover:bg-[#60a5fa]/20 text-xs font-mono text-[#60a5fa] transition-all duration-300 cursor-pointer"
                        >
                            <FileText size={13} />
                            <span>Resume PDF</span>
                        </a>
                    </motion.div>
                </div>

                {/* ─── Category Filter Pills ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center justify-center gap-2 sm:gap-3 my-12 overflow-x-auto py-2 px-1"
                >
                    {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer ${
                                    isSelected
                                        ? 'text-white font-bold'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] bg-[var(--bg-secondary)]/40'
                                }`}
                            >
                                {isSelected && (
                                    <motion.div
                                        layoutId="categoryHighlight"
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] shadow-[0_0_20px_rgba(96,165,250,0.4)]"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                                <span
                                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full ${
                                        isSelected ? 'bg-black/30 text-white' : 'bg-white/5 text-[var(--text-muted)]'
                                    }`}
                                >
                                    {cat.count}
                                </span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* ─── Bento Grid Section ─── */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPlatforms.map((platform) => (
                            <BentoCard
                                key={platform.id}
                                platform={platform}
                                onHover={(idx) => setActiveGlyph(idx)}
                                onLeave={() => setActiveGlyph(0)}
                                onCopy={copyToClipboard}
                                copiedId={copiedId}
                                setCursorVariant={setCursorVariant}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* ─── Complete Directory Index Table ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]/60 backdrop-blur-xl p-6 sm:p-10"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-color)]">
                        <div>
                            <div className="flex items-center gap-2">
                                <Terminal size={16} className="text-[#60a5fa]" />
                                <h3 className="text-lg font-bold text-[var(--text-primary)] font-mono">
                                    Direct Directory
                                </h3>
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] font-mono mt-1">
                                Complete index of all official accounts & channels
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                            <Compass size={14} />
                            <span>6 Verified Endpoints</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {PLATFORMS.map((p, idx) => (
                            <div
                                key={p.id}
                                onMouseEnter={() => {
                                    setActiveGlyph(p.glyphIdx)
                                    setCursorVariant('hover')
                                }}
                                onMouseLeave={() => {
                                    setActiveGlyph(0)
                                    setCursorVariant('default')
                                }}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <span className="font-mono text-xs text-[var(--text-muted)] w-6 shrink-0">
                                        0{idx + 1}
                                    </span>
                                    <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            background: `${p.color}15`,
                                            color: p.color,
                                            border: `1px solid ${p.color}30`,
                                        }}
                                    >
                                        <p.icon size={15} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-[var(--text-primary)] font-mono">
                                                {p.label}
                                            </span>
                                            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)]">
                                                {p.badge}
                                            </span>
                                        </div>
                                        <span className="text-xs font-mono text-[var(--text-secondary)] truncate block">
                                            {p.handle}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                    <button
                                        onClick={() => copyToClipboard(p.href, `${p.label} URL copied!`, p.id)}
                                        className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        {copiedId === p.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                        <span className="hidden sm:inline">Copy</span>
                                    </button>
                                    <a
                                        href={p.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
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
                </motion.div>

                {/* ─── Footer Direct Contact Card ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 text-center space-y-4 p-8 rounded-3xl border border-[var(--border-color)] bg-gradient-to-b from-white/[0.02] to-transparent"
                >
                    <Sparkles size={24} className="mx-auto text-[#60a5fa]" />
                    <h4 className="text-xl font-bold text-[var(--text-primary)] font-mono">
                        Looking for collaborations or opportunities?
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                        I'm always eager to discuss engineering challenges, internship roles, and full-stack projects.
                    </p>
                    <div className="pt-2">
                        <a
                            href="/contact"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(96,165,250,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <span>Send a Message</span>
                            <ArrowUpRight size={15} />
                        </a>
                    </div>
                </motion.div>

            </div>
        </>
    )
}
