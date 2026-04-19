import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
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

    // Framer Motion 3D Tilt & Glow Setup
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6])

    const isHovered = useMotionValue(0)
    const scale = useSpring(useTransform(isHovered, [0, 1], [1, 1.05]), { stiffness: 300, damping: 30 })
    const brightness = useTransform(isHovered, [0, 1], [1, 1.3])

    // Cursor Glow
    const pointerX = useMotionValue(0)
    const pointerY = useMotionValue(0)
    const pointerXSpring = useSpring(pointerX, { stiffness: 300, damping: 30 })
    const pointerYSpring = useSpring(pointerY, { stiffness: 300, damping: 30 })
    const glowBackground = useMotionTemplate`radial-gradient(circle 120px at ${pointerXSpring}px ${pointerYSpring}px, rgba(29, 185, 84, 0.15), transparent 100%)`
    const backgroundFilter = useMotionTemplate`blur(4px) brightness(${brightness})`

    // Parallax mapped from spring
    const parallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8])
    const parallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [-8, 8])

    const fetchData = useCallback(async (isPolling = false) => {
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 5000)
            const res = await fetch('/api/spotify', { signal: controller.signal })
            clearTimeout(timeout)
            if (!res.ok) throw new Error(`Spotify API ${res.status}`)

            const json = await res.json()
            setData(json)
            lastDataRef.current = json
            setError(false)
        } catch {
            // Silently handle — backend may not be running locally
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

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Normalize
        x.set(mouseX / rect.width - 0.5)
        y.set(mouseY / rect.height - 0.5)
        
        pointerX.set(mouseX)
        pointerY.set(mouseY)

        isHovered.set(1)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        isHovered.set(0)
    }

    return (
        <motion.div
            className="signature-card glass-card group relative flex min-h-[220px]"
            style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(29,185,84,0.1)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div 
                className="absolute inset-0 z-10 pointer-events-none mix-blend-screen overflow-hidden rounded-xl"
                style={{ background: glowBackground, opacity: isHovered }}
            />

            {/* Inner clips boundary for background image */}
            <div className="absolute inset-0 overflow-hidden rounded-xl border border-[var(--border-color)]">
                {/* Background image & gradient fade */}
                <AnimatePresence mode="wait">
                    {track?.albumArt && (
                        <motion.div
                            key={track.albumArt}
                            className="absolute inset-0 z-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.img
                                src={track.albumArt}
                                alt=""
                                className="w-full h-full object-cover opacity-20 filter"
                                style={{ scale, filter: backgroundFilter }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card)]/80 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Left Content Column */}
            <div className="relative z-20 p-6 flex flex-col h-full w-[70%]">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-5">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-base font-bold text-[var(--text-primary)] relative" style={{ transform: "translateZ(20px)" }}>
                        {track?.isPlaying ? 'Now Playing' : 'Last Played'}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    {showFallback ? (
                        <motion.div
                            key="fallback"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1"
                        >
                            <p className="text-[13px] leading-relaxed text-[var(--text-secondary)] italic">
                                Vibing offline…
                            </p>
                        </motion.div>
                    ) : track ? (
                        <motion.div
                            key={track.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1"
                            style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                        >
                            <p className="text-sm leading-[1.6] text-[var(--text-secondary)]">
                                {track.isPlaying ? 'I am currently listening to ' : 'I recently listened to '}
                                <span className="font-bold text-[var(--text-primary)]">{track.title}</span> by <span className="font-bold text-[var(--text-primary)]">{track.artist}</span>
                                {track.album && (
                                    <span> from the album <span className="font-bold text-[var(--text-primary)]">{track.album}</span></span>
                                )}
                            </p>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            {/* Vinyl UI at right */}
            {track?.albumArt && (
                <div className="absolute right-0 bottom-0 pointer-events-none overflow-visible h-[120px] w-1/2 flex items-end justify-end">
                    <div className="relative w-full h-[100px] flex items-end justify-end pb-4 pr-6">
                        {/* Spinning vinyl record */}
                        <motion.div 
                            className="absolute right-[70px] bottom-[25px] w-[90px] h-[90px] z-0"
                            style={{ scale, x: parallaxX, y: parallaxY }}
                        >
                            <div className={`w-full h-full ${track.isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                    <circle cx="50" cy="50" r="48" fill="#18181b" stroke="#2a2a30" strokeWidth="1" />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#2a2a30" strokeWidth="1.5" />
                                    <circle cx="50" cy="50" r="28" fill="none" stroke="#2a2a30" strokeWidth="1.5" />
                                    <circle cx="50" cy="50" r="16" fill="#1DB954" />
                                    <circle cx="50" cy="50" r="4" fill="#09090b" />
                                </svg>
                            </div>
                        </motion.div>
                        {/* Album Cover */}
                        <motion.img 
                            src={track.albumArt} 
                            alt="Album Cover"
                            className="w-[90px] h-[90px] object-cover rounded shadow-2xl relative z-10 border border-white/10"
                            style={{ scale, x: parallaxX, y: parallaxY, transform: "translateZ(40px)" }}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    )
}
