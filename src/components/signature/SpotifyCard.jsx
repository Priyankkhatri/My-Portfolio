import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardSkeleton from './CardSkeleton'

const POLL_INTERVAL = 30_000 // 30 seconds
const TITLE_TRUNCATE = 30

function truncate(str, max) {
    if (!str) return ''
    return str.length > max ? str.slice(0, max) + '…' : str
}

/* ── Equalizer Bars (CSS-animated) ─────────────────────── */
function EqualizerBars({ animate = false }) {
    return (
        <div className="flex items-end gap-[2px] h-3">
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className={`w-[3px] rounded-full bg-[#1DB954] ${animate ? 'equalizer-bar' : ''}`}
                    style={{
                        height: animate ? undefined : '4px',
                        animationDelay: animate ? `${(i - 1) * 0.15}s` : undefined,
                    }}
                />
            ))}
        </div>
    )
}

/**
 * SpotifyCard — displays currently playing or recently played track.
 * Fetches from /api/spotify serverless function.
 */
export default function SpotifyCard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const lastDataRef = useRef(null)

    const fetchData = useCallback(async (isPolling = false) => {
        try {
            const res = await fetch('/api/spotify')
            if (!res.ok) throw new Error(`Spotify API ${res.status}`)

            const json = await res.json()
            setData(json)
            lastDataRef.current = json
            setError(false)
        } catch {
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

    const track = data || lastDataRef.current
    const showFallback = error && !track

    return (
        <motion.div
            className="signature-card glass-card min-h-[220px] group relative overflow-hidden"
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(96,165,250,0.06)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            {/* Blurred album art background */}
            <AnimatePresence mode="wait">
                {track?.albumArt && (
                    <motion.div
                        key={track.albumArt}
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={track.albumArt}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ filter: 'blur(40px) saturate(1.5)' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    {track?.isPlaying ? (
                        <>
                            <EqualizerBars animate />
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#1DB954]">
                                Now Playing
                            </span>
                        </>
                    ) : (
                        <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                                Recently Played
                            </span>
                        </>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {showFallback ? (
                        /* Fallback */
                        <motion.div
                            key="fallback"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-start justify-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-lg bg-[var(--bg-highlight)] flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] italic">
                                Vibing offline…
                            </p>
                        </motion.div>
                    ) : track ? (
                        /* Track data */
                        <motion.div
                            key={track.title + track.artist}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex items-center gap-4"
                        >
                            {/* Album Art */}
                            <div className="w-[80px] h-[80px] rounded-lg overflow-hidden shrink-0 bg-[var(--bg-highlight)]">
                                {track.albumArt ? (
                                    <img
                                        src={track.albumArt}
                                        alt={`${track.title} album art`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                            <path d="M9 18V5l12-2v13" />
                                            <circle cx="6" cy="18" r="3" />
                                            <circle cx="18" cy="16" r="3" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Track Info */}
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                                    {truncate(track.title, TITLE_TRUNCATE)}
                                </span>
                                <span className="text-xs text-[var(--text-secondary)] truncate">
                                    {track.artist}
                                </span>

                                {/* Progress bar (estimated) */}
                                {track.isPlaying && track.progress_ms != null && track.duration_ms ? (
                                    <div className="w-full h-[2px] rounded-full bg-[var(--bg-highlight)] mt-2 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#1DB954] rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${Math.min(100, (track.progress_ms / track.duration_ms) * 100)}%`,
                                            }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                {/* Spotify attribution */}
                <div className="flex items-center gap-1.5 mt-auto pt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#1DB954">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-[9px] text-[var(--text-muted)] tracking-wider uppercase">Spotify</span>
                </div>
            </div>
        </motion.div>
    )
}
