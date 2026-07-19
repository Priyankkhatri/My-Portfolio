import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'
import CardSkeleton from './CardSkeleton'

const GITHUB_USERNAME = 'Priyankkhatri'
// Unauthenticated GitHub API allows 60 req/hr per IP; each poll costs 2 requests.
const POLL_INTERVAL = 600_000 // 10 minutes

/* ── Social icon links ─────────────────────────────────── */
const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/Priyankkhatri',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'X',
        href: 'https://x.com/PriyankKhatrii',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
            </svg>
        ),
    },
]

/* ── Helpers ────────────────────────────────────────────── */
function getRelativeTime(dateString) {
    const now = Date.now()
    const then = new Date(dateString).getTime()
    const diff = now - then
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 30) return `${days}d ago`
    return `${Math.floor(days / 30)}mo ago`
}

/**
 * GithubCard — displays the latest PushEvent from GitHub public API.
 */
export default function GithubCard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const lastDataRef = useRef(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const fetchData = useCallback(async (isPolling = false) => {
        try {
            // Fetch repos sorted by latest push to bypass /events endpoint caching delay.
            // No cache-buster param: let GitHub serve conditional 304s, which don't
            // count against the unauthenticated rate limit.
            const repoRes = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=1`
            )
            if (!repoRes.ok) throw new Error(`GitHub API ${repoRes.status}`)

            const repos = await repoRes.json()
            if (!repos || repos.length === 0) throw new Error('No repos found')

            const latestRepo = repos[0]
            const branch = latestRepo.default_branch || 'main'

            // Fetch the latest commit for this globally latest repo
            const commitRes = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${latestRepo.name}/commits?per_page=1`
            )
            if (!commitRes.ok) throw new Error(`GitHub Commits API ${commitRes.status}`)
            
            const commits = await commitRes.json()
            const latestCommit = commits[0]

            if (latestCommit) {
                const parsed = {
                    repo: latestRepo.name,
                    repoUrl: latestRepo.html_url,
                    branch: branch,
                    sha: latestCommit.sha.substring(0, 7),
                    message: latestCommit.commit.message.split('\n')[0] || 'Updates pushed to repository',
                    timestamp: latestRepo.pushed_at || latestCommit.commit.author.date,
                }
                setData(parsed)
                lastDataRef.current = parsed
                setError(false)
            } else {
                if (!lastDataRef.current) setError(true)
            }
        } catch {
            // On polling failure, keep last data
            if (!isPolling && !lastDataRef.current) setError(true)
        } finally {
            if (!isPolling) setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData(false)
        const id = setInterval(() => {
            if (document.visibilityState === 'visible') fetchData(true)
        }, POLL_INTERVAL)
        return () => clearInterval(id)
    }, [fetchData])

    if (loading) return <CardSkeleton />

    // Check if activity is "Live" (less than 1 hour ago)
    const isLive = data && (Date.now() - new Date(data.timestamp).getTime()) < 3600000

    return (
        <motion.div
            className="signature-card glass-card p-6 flex flex-col min-h-[220px] group relative overflow-hidden"
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(96,165,250,0.06)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            {/* Header: GitHub Logo and Name */}
            <div className="flex items-center gap-2 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-primary)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <h3 className="text-xl tracking-wide text-white" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 600 }}>
                    Priyank&apos;s Github
                </h3>
            </div>

            <AnimatePresence mode="wait">
                {error || !data ? (
                    /* Fallback */
                    <motion.div
                        key="fallback"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <p className="text-sm text-[var(--text-secondary)] italic">
                            Currently building something new…
                        </p>
                    </motion.div>
                ) : (
                    /* Data */
                    <motion.div
                        key={data.message}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* LATEST PUSH and Timestamp Pill */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] tracking-[0.2em] font-medium text-[var(--text-secondary)]">
                                LATEST PUSH
                            </span>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#052e16] border border-[#064e3b]">
                                <span className={`w-1.5 h-1.5 rounded-full bg-[#10b981] ${isLive ? 'animate-pulse' : ''}`} />
                                <span className="text-[9px] font-medium text-[#10b981]">
                                    {getRelativeTime(data.timestamp)}
                                </span>
                            </div>
                        </div>

                        {/* Commit Message */}
                        <p className="text-lg text-[var(--text-primary)] font-bold leading-snug mb-3">
                            "{data.message}"
                        </p>

                        {/* Repo Info & Branch/SHA */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-mono">
                                <span className="text-[var(--text-secondary)]">Repo:</span>
                                <a 
                                    href={data.repoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#60a5fa] hover:text-[#93c5fd] transition-colors"
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    {data.repo}
                                </a>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)] bg-[var(--bg-highlight)] w-fit px-2 py-0.5 rounded-md border border-[var(--border-color)]">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
                                    </svg>
                                    <span className="font-mono">{data.branch}</span>
                                </div>
                                <span className="text-[10px] font-mono text-[var(--text-primary)] bg-[var(--bg-highlight)] border border-[var(--border-color)] px-2 py-0.5 rounded-md">
                                    {data.sha}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Social icons row (centered at bottom) */}
            <div className="flex items-center justify-center gap-8 mt-auto pt-6 bg-gradient-to-t from-[var(--bg-highlight)]/0 to-transparent">
                {socialLinks.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 transform hover:scale-110"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        aria-label={s.label}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </motion.div>
    )
}
