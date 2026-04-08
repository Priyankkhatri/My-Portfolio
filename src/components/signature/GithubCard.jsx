import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../../store/useStore'
import CardSkeleton from './CardSkeleton'

const GITHUB_USERNAME = 'Priyankkhatri'
const POLL_INTERVAL = 90_000 // 90 seconds
const COMMIT_TRUNCATE = 72

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

function getStatusColor(dateString) {
    const diff = Date.now() - new Date(dateString).getTime()
    const hours = diff / (1000 * 60 * 60)
    if (hours < 24) return '#22c55e'   // green
    if (hours < 168) return '#f59e0b'  // amber (7 days)
    return '#ef4444'                    // red
}

function truncate(str, max) {
    if (!str) return ''
    return str.length > max ? str.slice(0, max) + '…' : str
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
            // Added cache busting so GitHub's API doesn't serve a stale 304 response
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10&t=${Date.now()}`
            )
            if (!res.ok) throw new Error(`GitHub API ${res.status}`)

            const events = await res.json()
            const pushEvent = events.find((e) => e.type === 'PushEvent')

            if (pushEvent) {
                const commits = pushEvent.payload?.commits || []
                // Get the most recent commit from the push event
                const commit = commits[commits.length - 1] || commits[0]
                const parsed = {
                    repo: pushEvent.repo?.name?.split('/')[1] || pushEvent.repo?.name,
                    repoUrl: `https://github.com/${pushEvent.repo?.name}`,
                    branch: pushEvent.payload?.ref?.replace('refs/heads/', '') || 'main',
                    sha: commit?.sha?.substring(0, 7) || pushEvent.payload?.head?.substring(0, 7) || '',
                    message: commit?.message?.split('\n')[0] || 'Updates pushed to repository',
                    timestamp: pushEvent.created_at,
                }
                setData(parsed)
                lastDataRef.current = parsed
                setError(false)
            } else {
                // No push events found
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
        const id = setInterval(() => fetchData(true), POLL_INTERVAL)
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
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${isLive ? 'animate-pulse' : ''}`}
                        style={{ backgroundColor: data ? getStatusColor(data.timestamp) : 'var(--text-muted)' }}
                    />
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] font-semibold">
                        {isLive ? 'Live Activity' : 'Latest Push'}
                    </span>
                </div>
                {data?.sha && (
                    <span className="text-[10px] font-mono text-[var(--text-primary)] bg-[var(--bg-highlight)] border border-[var(--border-color)] px-2 py-0.5 rounded-md">
                        {data.sha}
                    </span>
                )}
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
                        {/* Repo & Branch */}
                        <div className="flex flex-col gap-1.5 mb-3">
                            <a
                                href={data.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-1)] transition-colors duration-300 inline-flex items-center gap-1.5 w-fit"
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                {data.repo}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-y-0">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                            
                            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] bg-[var(--bg-highlight)] w-fit px-2 py-0.5 rounded-md border border-[var(--border-color)]">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
                                </svg>
                                <span className="font-mono">{data.branch}</span>
                            </div>
                        </div>

                        {/* Commit message */}
                        <div className="bg-[var(--bg-highlight)] border-l-2 border-[var(--accent-1)] p-2.5 rounded-r-md mb-3">
                            <p className="text-xs text-[var(--text-primary)] leading-relaxed font-mono truncate" title={data.message}>
                                {data.message}
                            </p>
                        </div>

                        {/* Timestamp */}
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs font-semibold text-[var(--text-secondary)]">
                                {getRelativeTime(data.timestamp)}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Social icons row */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[var(--border-color)]">
                {socialLinks.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-all duration-300 transform hover:scale-125"
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
