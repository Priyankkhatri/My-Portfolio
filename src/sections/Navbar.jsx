import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import useStore from '../store/useStore'
import useNavbarState from '../hooks/useNavbarState'
import { navConfig } from '../data/navConfig'
import NavbarLogo from '../components/navbar/NavbarLogo'
import NavbarLinks from '../components/navbar/NavbarLinks'
import NavbarProgress from '../components/navbar/NavbarProgress'

/**
 * Navbar — Adaptive Navigation System
 *
 * Three scroll-driven states:
 *   State 1 (Hero):    Transparent, logo only, links hidden       [scrollY < 100px]
 *   State 2 (Active):  Glassmorphic bar, all links visible         [100px–700px]
 *   State 3 (Pill):    Compact floating pill, short labels          [700px+]
 *
 * Mounted once in RootLayout. Never remounts on route changes.
 * Mobile: never enters pill state; hamburger overlay for navigation.
 */
export default function Navbar() {
    const { navState, reducedMotion, isMobile } = useNavbarState()
    const [mobileOpen, setMobileOpen] = useState(false)
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const theme = useStore((s) => s.theme)
    const startThemeTransition = useStore((s) => s.startThemeTransition)
    const loaderPhase = useStore((s) => s.loaderPhase)

    const isPill = navState === 'pill'
    const isHero = navState === 'hero'
    const isActive = navState === 'active'

    /* ── Close mobile menu on route change ─────────────────── */
    useEffect(() => {
        setMobileOpen(false)
    }, [navState])

    /* ── Theme toggle handler ──────────────────────────────── */
    const handleThemeToggle = (e) => {
        const btn = e.currentTarget
        const rect = btn.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        startThemeTransition(x, y)
    }

    /* ── Pill hover state ──────────────────────────────────── */
    const [pillHovered, setPillHovered] = useState(false)

    /* ── Animation config ──────────────────────────────────── */
    const { ease } = navConfig.timing
    const morphDuration = 0.5
    const transition = reducedMotion
        ? { duration: 0 }
        : { duration: morphDuration, ease }

    /* ── Container animation variants ────────────────────── */
    const containerAnimate = {
        maxWidth: isPill ? navConfig.pill.maxWidth : 9999,
        height: isPill
            ? navConfig.pill.height
            : isMobile
                ? 56
                : isActive
                    ? 64
                    : 72,
        borderRadius: isPill ? 9999 : 0,
        marginTop: isPill ? 16 : 0,
        y: isPill ? -6 : 0,
        backgroundColor: isHero
            ? 'rgba(10, 14, 23, 0)'
            : isPill
                ? 'rgba(10, 14, 23, 0.85)'
                : 'rgba(10, 14, 23, 0.75)',
        backdropFilter: isHero
            ? 'blur(0px)'
            : isPill
                ? 'blur(24px)'
                : 'blur(16px)',
        borderColor: isHero
            ? 'rgba(255, 255, 255, 0)'
            : isPill
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(255, 255, 255, 0.06)',
        boxShadow: isPill
            ? pillHovered
                ? '0 4px 16px rgba(0,0,0,0.2), 0 8px 40px rgba(0,0,0,0.35), 0 20px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.08)'
                : '0 4px 12px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.25), 0 16px 64px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.06)'
            : '0 0 0 rgba(0, 0, 0, 0)',
        scale: isPill && pillHovered ? 1.01 : 1,
    }

    /* ── Desktop link entrance animation ───────────────────── */
    const linkEntranceVariants = {
        hidden: { opacity: 0, y: -8, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: reducedMotion ? 0 : 0.4,
                ease,
                delay: 0.05,
            },
        },
        exit: {
            opacity: 0,
            y: -8,
            scale: 0.97,
            transition: {
                duration: reducedMotion ? 0 : 0.25,
                ease,
            },
        },
    }

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50"
                initial={{ y: '20vh', opacity: 0 }}
                animate={
                    loaderPhase >= 4
                        ? { y: 0, opacity: 1 }
                        : { y: '20vh', opacity: 0 }
                }
                transition={{
                    duration: 1.5,
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {/* ── Morphing Container ────────────────────── */}
                <motion.div
                    className={`mx-auto relative overflow-hidden ${isPill ? 'navbar-pill-container' : ''}`}
                    layout
                    animate={containerAnimate}
                    transition={{
                        ...transition,
                        layout: { duration: reducedMotion ? 0 : morphDuration, ease },
                    }}
                    style={{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        WebkitBackdropFilter: isHero
                            ? 'blur(0px)'
                            : isPill
                                ? 'blur(24px)'
                                : 'blur(16px)',
                    }}
                    onMouseEnter={() => isPill && setPillHovered(true)}
                    onMouseLeave={() => setPillHovered(false)}
                >
                    {/* ── Content Wrapper ───────────────────── */}
                    <div
                        className={`
                            ${isPill ? 'px-5' : 'max-w-7xl mx-auto px-6 md:px-12'}
                            flex items-center justify-between h-full
                        `}
                    >
                        {/* ── Logo (appears first in stagger) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={
                                loaderPhase >= 4
                                    ? { opacity: 1, y: 0, scale: 1 }
                                    : { opacity: 0, y: -10, scale: 0.95 }
                            }
                            transition={{
                                delay: 0.6,
                                duration: 0.5,
                                ease,
                            }}
                        >
                            <NavbarLogo compact={isPill} />
                        </motion.div>

                        {/* ── Desktop Navigation ───────────── */}
                        <div className="hidden md:flex items-center">
                            {/* Nav Links — hidden in hero */}
                            <AnimatePresence>
                                {!isHero && (
                                    <motion.div
                                        variants={linkEntranceVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <NavbarLinks compact={isPill} isMobile={isMobile} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Available Badge — Active state only */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        className="flex items-center gap-2 ml-4 pl-4 border-l border-[var(--border-color)]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{
                                            duration: reducedMotion ? 0 : 0.25,
                                        }}
                                    >
                                        <div className="w-1.5 h-1.5 bg-[#60a5fa]/80 rounded-full animate-pulse-glow" />
                                        <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase">
                                            Available
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Theme Toggle — Hero + Active only (hidden in pill) */}
                            <AnimatePresence>
                                {!isPill && (
                                    <motion.button
                                        onClick={handleThemeToggle}
                                        onMouseEnter={() =>
                                            setCursorVariant('hover')
                                        }
                                        onMouseLeave={() =>
                                            setCursorVariant('default')
                                        }
                                        className="ml-3 w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--glass-bg)] transition-all duration-300 group"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{
                                            duration: reducedMotion ? 0 : 0.3,
                                            type: 'spring',
                                        }}
                                        aria-label="Toggle Theme"
                                    >
                                        <div className="relative w-4 h-4 overflow-hidden">
                                            <motion.div
                                                className="absolute inset-0 flex flex-col items-center justify-start"
                                                animate={{
                                                    y:
                                                        theme === 'dark'
                                                            ? 0
                                                            : -16,
                                                }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.25, 1, 0.5, 1],
                                                }}
                                            >
                                                <svg
                                                    className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-1)] transition-colors shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                                <svg
                                                    className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-2)] transition-colors shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                                    />
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Mobile Hamburger ─────────────── */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-3"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                className="block w-6 h-px bg-[var(--text-secondary)]"
                                animate={
                                    mobileOpen
                                        ? { rotate: 45, y: 5 }
                                        : { rotate: 0, y: 0 }
                                }
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="block w-4 h-px bg-[var(--text-secondary)] ml-auto"
                                animate={
                                    mobileOpen
                                        ? { opacity: 0, width: 0 }
                                        : { opacity: 1, width: 16 }
                                }
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-6 h-px bg-[var(--text-secondary)]"
                                animate={
                                    mobileOpen
                                        ? { rotate: -45, y: -5 }
                                        : { rotate: 0, y: 0 }
                                }
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </div>

                    {/* ── Progress Bar ──────────────────────── */}
                    <NavbarProgress />
                </motion.div>

                {/* ── Glow Line — Active state only ────────── */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            className="h-px glow-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.3 }}
                        />
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ── Mobile Overlay Menu ──────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-colors duration-500"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4 }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget)
                                setMobileOpen(false)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setMobileOpen(false)
                        }}
                    >
                        {/* Decorative lines */}
                        <div className="absolute top-20 left-8 w-px h-32 bg-gradient-to-b from-[var(--bg-highlight)] to-transparent" />
                        <div className="absolute bottom-20 right-8 w-px h-32 bg-gradient-to-t from-[var(--bg-highlight)] to-transparent" />

                        <nav className="flex flex-col items-center gap-6">
                            <motion.p
                                className="text-[10px] tracking-[0.5em] uppercase text-[var(--text-muted)] mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Navigation
                            </motion.p>

                            {navConfig.links.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{
                                        opacity: 0,
                                        x: -30,
                                        y: 20,
                                        filter: 'blur(4px)',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: 20,
                                        y: -10,
                                    }}
                                    transition={{
                                        delay: i * 0.07 + 0.1,
                                        duration: 0.5,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/'}
                                        onClick={() => setMobileOpen(false)}
                                        onMouseEnter={() =>
                                            setCursorVariant('hover')
                                        }
                                        onMouseLeave={() =>
                                            setCursorVariant('default')
                                        }
                                        className={({ isActive: active }) =>
                                            `flex items-center gap-4 text-3xl tracking-wide transition-colors ${
                                                active
                                                    ? 'text-[var(--text-primary)]'
                                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                            }`
                                        }
                                        style={{
                                            fontFamily:
                                                "'Poppins', sans-serif",
                                        }}
                                    >
                                        {({ isActive: active }) => (
                                            <>
                                                <span
                                                    className={`text-xs ${active ? 'text-[var(--accent-1)]' : 'text-[var(--text-muted)]'}`}
                                                >
                                                    {String(i + 1).padStart(
                                                        2,
                                                        '0'
                                                    )}
                                                </span>
                                                {item.label}
                                                {active && (
                                                    <motion.span
                                                        layoutId="mobile-nav-indicator"
                                                        className="w-2 h-2 rounded-full bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                                                        transition={{
                                                            type: 'spring',
                                                            stiffness: 300,
                                                            damping: 25,
                                                        }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </motion.div>
                            ))}

                            {/* Theme Toggle in mobile menu */}
                            <motion.button
                                onClick={handleThemeToggle}
                                className="mt-6 flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--glass-bg)] transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <div className="relative w-4 h-4 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 flex flex-col items-center justify-start"
                                        animate={{
                                            y: theme === 'dark' ? 0 : -16,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.25, 1, 0.5, 1],
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4 text-[var(--text-secondary)] shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-[var(--text-secondary)] shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <span className="text-sm text-[var(--text-secondary)]">
                                    {theme === 'dark'
                                        ? 'Light Mode'
                                        : 'Dark Mode'}
                                </span>
                            </motion.button>
                        </nav>

                        {/* Footer info in mobile menu */}
                        <motion.div
                            className="absolute bottom-12 text-center flex flex-col items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#60a5fa]/70 rounded-full animate-pulse-glow" />
                                <span className="text-[10px] tracking-[0.3em] text-[var(--text-secondary)] uppercase">
                                    Available for work
                                </span>
                            </div>
                            <p className="text-[10px] tracking-[0.3em] text-[var(--text-muted)] uppercase">
                                Priyank &mdash; Portfolio 2026
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
