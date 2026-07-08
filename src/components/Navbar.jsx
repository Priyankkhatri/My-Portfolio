import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import NavbarContainer from './navbar/NavbarContainer'
import NavbarLinks from './navbar/NavbarLinks'
import NavbarProgress from './navbar/NavbarProgress'
import useNavbarState from '../hooks/useNavbarState'
import useStore from '../store/useStore'

const NAV_ITEMS = [
    { label: 'Home', to: '/', exact: true },
    { label: 'About', to: '/about' },
    { label: 'Work', to: '/work' },
    { label: 'Credentials', to: '/credentials' },
    { label: 'Contact', to: '/contact' },
]

const NAVBAR_LOGO_SRC = 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775552783/logo_jatani.png'

const NAVBAR_MOTION = {
    entryEase: [0.22, 1, 0.36, 1],
    exitEase: [0.4, 0, 1, 1],
    idleEase: [0.4, 0, 0.2, 1],
    activeDuration: 0.55,
    compactDuration: 0.55,
    childDelay: 0.04,
    linkEnterStagger: 0.03,
    linkExitStagger: 0.02,
    progressDelay: 0.12,
    idleDuration: 0.8,
    restoreDuration: 0.15,
    hoverDuration: 0.2,
}

const NAVBAR_TOKENS = {
    active: {
        blur: 16,
        idleBlur: 14,
        saturate: 140,
        background: 'rgba(6, 10, 18, 0.6)',
        radius: 0,
        shadow: '0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
        scrollShadow: '0 10px 34px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        idleShadow: '0 6px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
        hoverShadow: '0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
        paddingX: 32,
        paddingY: 10,
        top: 0,
        widthClass: 'w-full',
        progressOpacity: 0.74,
        progressIdleOpacity: 0.44,
        highlightOpacity: 0.3,
        borderGlowOpacity: 0,
    },
    compact: {
        blur: 20,
        idleBlur: 16,
        saturate: 150,
        background: 'rgba(6, 10, 18, 0.72)',
        radius: 9999,
        shadow: '0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
        scrollShadow: '0 10px 36px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)',
        idleShadow: '0 6px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
        hoverShadow: '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        paddingX: 20,
        paddingY: 6,
        top: 16,
        widthClass: 'mx-auto w-fit max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)]',
        progressOpacity: 0.92,
        progressIdleOpacity: 0.5,
        highlightOpacity: 0.5,
        borderGlowOpacity: 0,
    },
    mobile: {
        widthClass: 'w-full',
    },
}

function ThemeToggle({ compact = false, onToggle, reducedMotion, theme, setCursorVariant }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[var(--border-color)] bg-[var(--bg-highlight)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--bg-highlight-hover)] hover:text-[var(--text-primary)] ${
                compact ? 'h-10 w-10' : 'h-11 w-11'
            }`}
            aria-label="Toggle theme"
        >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_70%)] opacity-70" />
            <span className="pointer-events-none relative flex h-4 w-4 overflow-hidden">
                <motion.span
                    className="absolute inset-0 flex flex-col items-center"
                    animate={{ y: theme === 'dark' ? 0 : -16 }}
                    transition={{
                        duration: reducedMotion ? 0 : 0.24,
                        ease: NAVBAR_MOTION.entryEase,
                    }}
                >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46" strokeLinecap="round" />
                    </svg>
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.7 8.7 0 1 0 20.2 15.1Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.span>
            </span>
        </button>
    )
}

function MobileNavLink({ item, reducedMotion, setCursorVariant, onSelect }) {
    return (
        <NavLink
            to={item.to}
            end={item.exact}
            onClick={onSelect}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={({ isActive }) =>
                `group inline-flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                    isActive
                        ? 'border-[rgba(96,165,250,0.22)] bg-[rgba(96,165,250,0.12)] text-[var(--text-primary)]'
                        : 'border-white/8 bg-white/[0.03] text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <motion.span
                        animate={{ scale: 1 }}
                        whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className={`text-sm ${
                            isActive ? 'font-semibold text-[var(--accent-1)]' : 'font-medium'
                        }`}
                    >
                        {item.label}
                    </motion.span>
                    <span
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                            isActive ? 'bg-[var(--accent-1)]' : 'bg-white/20'
                        }`}
                    />
                </>
            )}
        </NavLink>
    )
}

export default function Navbar() {
    const location = useLocation()
    const theme = useStore((s) => s.theme)
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const startThemeTransition = useStore((s) => s.startThemeTransition)

    const [menuOpen, setMenuOpen] = useState(false)
    const navbar = useNavbarState({
        compactAt: 700,
        expandBelow: 600,
        idleDelay: 1500,
        motion: NAVBAR_MOTION,
    })

    useEffect(() => {
        setMenuOpen(false)
        // ScrollToRouteTop handles scrollTo + dispatchEvent('scroll').
        // We only need to reset navbar internal state here.
        navbar.forceReset()
    }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!menuOpen) return

        const previousOverflow = document.body.style.overflow
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setMenuOpen(false)
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', closeOnEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', closeOnEscape)
        }
    }, [menuOpen])

    const handleThemeToggle = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        startThemeTransition(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(6,10,18,0.7),rgba(6,10,18,0.3),transparent)]" />
                <NavbarContainer
                    isCompact={navbar.isCompact}
                    isIdle={navbar.isIdle}
                    isMobile={navbar.isMobile}
                    reducedMotion={navbar.reducedMotion}
                    statePhase={navbar.statePhase}
                    transitionProfile={navbar.transitionProfile}
                    tokens={NAVBAR_TOKENS}
                    velocity={navbar.velocity}
                    motion={NAVBAR_MOTION}
                >
                    <div
                        className={`relative z-[2] flex items-center justify-between ${
                            navbar.isCompact ? 'gap-2' : 'gap-4'
                        }`}
                    >
                        <NavLink
                            to="/"
                            end
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex shrink-0 items-center justify-center p-[2px]"
                            aria-label="Go to home page"
                        >
                            <motion.span 
                                whileHover={navbar.reducedMotion ? undefined : { scale: 1.04 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="pointer-events-none inline-flex items-center"
                                style={{
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    padding: '6px',
                                    background: 'rgba(255,255,255,0.04)',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                }}
                            >
                                <img
                                    src={NAVBAR_LOGO_SRC}
                                    alt="Priyank logo"
                                    className="h-7 w-7 object-contain"
                                />
                            </motion.span>
                        </NavLink>

                        {navbar.isMobile ? (
                            <div className="flex items-center gap-2">
                                <ThemeToggle
                                    compact
                                    onToggle={handleThemeToggle}
                                    reducedMotion={navbar.reducedMotion}
                                    theme={theme}
                                    setCursorVariant={setCursorVariant}
                                />
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((current) => !current)}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-highlight)] text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-highlight-hover)]"
                                    aria-expanded={menuOpen}
                                    aria-controls="mobile-navigation"
                                    aria-label="Toggle navigation menu"
                                >
                                    <span className="pointer-events-none relative h-4 w-4">
                                        <motion.span
                                            className="absolute left-0 top-[2px] block h-px w-4 bg-current"
                                            animate={menuOpen ? { rotate: 45, top: 8 } : { rotate: 0, top: 2 }}
                                            transition={{
                                                duration: navbar.reducedMotion ? 0 : 0.24,
                                                ease: NAVBAR_MOTION.entryEase,
                                            }}
                                        />
                                        <motion.span
                                            className="absolute left-0 top-[8px] block h-px w-4 bg-current"
                                            animate={{ opacity: menuOpen ? 0 : 1 }}
                                            transition={{ duration: navbar.reducedMotion ? 0 : 0.16, ease: 'easeOut' }}
                                        />
                                        <motion.span
                                            className="absolute left-0 top-[14px] block h-px w-4 bg-current"
                                            animate={menuOpen ? { rotate: -45, top: 8 } : { rotate: 0, top: 14 }}
                                            transition={{
                                                duration: navbar.reducedMotion ? 0 : 0.24,
                                                ease: NAVBAR_MOTION.entryEase,
                                            }}
                                        />
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
                                <NavbarLinks
                                    items={NAV_ITEMS}
                                    isCompact={navbar.isCompact}
                                    reducedMotion={navbar.reducedMotion}
                                    setCursorVariant={setCursorVariant}
                                    statePhase={navbar.statePhase}
                                    transitionProfile={navbar.transitionProfile}
                                    motion={NAVBAR_MOTION}
                                />
                                <ThemeToggle
                                    compact={navbar.isCompact}
                                    onToggle={handleThemeToggle}
                                    reducedMotion={navbar.reducedMotion}
                                    theme={theme}
                                    setCursorVariant={setCursorVariant}
                                />
                            </div>
                        )}
                    </div>

                    <NavbarProgress
                        isCompact={navbar.isCompact}
                        isIdle={navbar.isIdle}
                        progress={navbar.progress}
                        reducedMotion={navbar.reducedMotion}
                        transitionProfile={navbar.transitionProfile}
                        tokens={NAVBAR_TOKENS}
                    />
                </NavbarContainer>
            </div>

            <AnimatePresence>
                {navbar.isMobile && menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[9998] bg-[rgba(7,10,18,0.72)] px-4 pt-24 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: navbar.reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            id="mobile-navigation"
                            className="mx-auto max-w-md rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-[0_10px_34px_rgba(0,0,0,0.15)]"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                                duration: navbar.reducedMotion ? 0 : 0.24,
                                ease: NAVBAR_MOTION.entryEase,
                            }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--text-muted)]">
                                        Navigation
                                    </p>
                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        Choose a destination.
                                    </p>
                                </div>

                                <ThemeToggle
                                    compact
                                    onToggle={handleThemeToggle}
                                    reducedMotion={navbar.reducedMotion}
                                    theme={theme}
                                    setCursorVariant={setCursorVariant}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item) => (
                                    <MobileNavLink
                                        key={item.to}
                                        item={item}
                                        reducedMotion={navbar.reducedMotion}
                                        setCursorVariant={setCursorVariant}
                                        onSelect={() => setMenuOpen(false)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
