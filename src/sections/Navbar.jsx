import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import useStore from '../store/useStore'
import useNavbarState from '../hooks/useNavbarState'
import { navConfig } from '../data/navConfig'
import NavbarContainer from '../components/navbar/NavbarContainer'
import NavbarLogo from '../components/navbar/NavbarLogo'
import NavbarLinks from '../components/navbar/NavbarLinks'
import NavbarProgress from '../components/navbar/NavbarProgress'

const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements(container) {
    if (!container) {
        return []
    }

    return [...container.querySelectorAll(focusableSelector)].filter(
        (element) =>
            !element.hasAttribute('disabled') &&
            element.getAttribute('aria-hidden') !== 'true'
    )
}

function ThemeToggleButton({
    theme,
    onToggle,
    setCursorVariant,
    compact = false,
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={`group flex shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] transition-[border-color,background-color,color,transform] duration-300 hover:border-[#60a5fa]/40 hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)] ${
                compact ? 'min-h-10 min-w-10' : 'min-h-11 min-w-11'
            }`}
            aria-label="Toggle theme"
        >
            <div className="relative h-4 w-4 overflow-hidden">
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-start"
                    animate={{ y: theme === 'dark' ? 0 : -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                    <svg
                        className="h-4 w-4 shrink-0"
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
                        className="h-4 w-4 shrink-0"
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
        </button>
    )
}

function MobileMenuLink({
    item,
    onSelect,
    setCursorVariant,
}) {
    return (
        <NavLink
            to={item.to}
            end={item.to === '/'}
            onClick={onSelect}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={({ isActive }) =>
                `flex min-h-11 items-center justify-between gap-6 rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,color] duration-300 ${
                    isActive
                        ? 'border-[#60a5fa]/35 bg-[var(--glass-bg)] text-[var(--text-primary)]'
                        : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:border-[var(--bg-highlight-hover)] hover:bg-[var(--bg-highlight)] hover:text-[var(--text-primary)]'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <div className="flex flex-col gap-1">
                        <span
                            className="text-sm font-medium"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            {item.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                            {item.to === '/' ? 'Home route' : item.to.slice(1)}
                        </span>
                    </div>
                    <span
                        className={`h-2.5 w-2.5 rounded-full transition-opacity duration-200 ${
                            isActive
                                ? 'bg-[#60a5fa] opacity-100 shadow-[0_0_10px_rgba(96,165,250,0.45)]'
                                : 'bg-[var(--text-muted)] opacity-35'
                        }`}
                    />
                </>
            )}
        </NavLink>
    )
}

export default function Navbar() {
    const location = useLocation()
    const {
        navState,
        reducedMotion,
        isMobile,
        isIdle,
        snapInstantly,
    } = useNavbarState()
    const [mobileOpen, setMobileOpen] = useState(false)
    const overlayRef = useRef(null)
    const restoreFocusRef = useRef(null)

    const loaderPhase = useStore((state) => state.loaderPhase)
    const theme = useStore((state) => state.theme)
    const setCursorVariant = useStore((state) => state.setCursorVariant)
    const startThemeTransition = useStore(
        (state) => state.startThemeTransition
    )

    const isCompact = isMobile || navState === 'compact'
    const navInteractive = loaderPhase >= 5

    const handleThemeToggle = (event) => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()

        startThemeTransition(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        )
    }

    const closeMobileMenu = () => {
        setMobileOpen(false)
    }

    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (!isMobile && mobileOpen) {
            setMobileOpen(false)
        }
    }, [isMobile, mobileOpen])

    useEffect(() => {
        if (!mobileOpen) {
            return
        }

        restoreFocusRef.current = document.activeElement

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const container = overlayRef.current
        const focusableElements = getFocusableElements(container)
        const firstFocusable = focusableElements[0]

        if (firstFocusable) {
            firstFocusable.focus()
        } else {
            container?.focus()
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                setMobileOpen(false)
                return
            }

            if (event.key !== 'Tab') {
                return
            }

            const currentFocusableElements = getFocusableElements(container)

            if (currentFocusableElements.length === 0) {
                event.preventDefault()
                container?.focus()
                return
            }

            const firstElement = currentFocusableElements[0]
            const lastElement =
                currentFocusableElements[currentFocusableElements.length - 1]

            if (
                event.shiftKey &&
                document.activeElement === firstElement
            ) {
                event.preventDefault()
                lastElement.focus()
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)

            if (restoreFocusRef.current instanceof HTMLElement) {
                restoreFocusRef.current.focus()
            }
        }
    }, [mobileOpen])

    return (
        <>
            <motion.nav
                className="fixed inset-x-0 top-0 z-[120]"
                initial={
                    reducedMotion
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: -20, filter: 'blur(6px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                    duration: reducedMotion ? 0 : 0.55,
                    ease: navConfig.timing.ease,
                }}
                style={{
                    pointerEvents: navInteractive ? 'auto' : 'none',
                }}
            >
                    <NavbarContainer
                        navState={navState}
                        isMobile={isMobile}
                        isIdle={isIdle}
                        reducedMotion={reducedMotion}
                        snapInstantly={snapInstantly}
                        progress={
                            <NavbarProgress
                                compact={isCompact}
                                mobile={isMobile}
                            />
                        }
                    >
                        <div className="flex min-w-0 flex-1 items-center justify-between gap-4 md:gap-6">
                            <NavbarLogo compact={isCompact} />

                            {isMobile ? (
                                <button
                                    type="button"
                                    className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] transition-[border-color,background-color,color] duration-300 hover:border-[#60a5fa]/40 hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
                                    onClick={() => setMobileOpen((open) => !open)}
                                    onMouseEnter={() =>
                                        setCursorVariant('hover')
                                    }
                                    onMouseLeave={() =>
                                        setCursorVariant('default')
                                    }
                                    aria-expanded={mobileOpen}
                                    aria-controls="mobile-navbar-menu"
                                    aria-label="Toggle navigation menu"
                                >
                                    <div className="relative h-4 w-5">
                                        <motion.span
                                            className="absolute left-0 top-0 block h-px w-5 bg-current"
                                            animate={
                                                mobileOpen
                                                    ? {
                                                          rotate: 45,
                                                          top: 7,
                                                      }
                                                    : {
                                                          rotate: 0,
                                                          top: 1,
                                                      }
                                            }
                                            transition={{
                                                duration: reducedMotion
                                                    ? 0
                                                    : 0.22,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        />
                                        <motion.span
                                            className="absolute left-0 top-[7px] block h-px w-5 bg-current"
                                            animate={{
                                                opacity: mobileOpen ? 0 : 1,
                                            }}
                                            transition={{
                                                duration: reducedMotion
                                                    ? 0
                                                    : 0.18,
                                                ease: 'easeOut',
                                            }}
                                        />
                                        <motion.span
                                            className="absolute left-0 top-[14px] block h-px w-5 bg-current"
                                            animate={
                                                mobileOpen
                                                    ? {
                                                          rotate: -45,
                                                          top: 7,
                                                      }
                                                    : {
                                                          rotate: 0,
                                                          top: 13,
                                                      }
                                            }
                                            transition={{
                                                duration: reducedMotion
                                                    ? 0
                                                    : 0.22,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        />
                                    </div>
                                </button>
                            ) : (
                                <div className="hidden min-w-0 items-center gap-4 md:flex">
                                    <div className="min-w-0">
                                        <NavbarLinks
                                            compact={isCompact}
                                            isMobile={false}
                                        />
                                    </div>
                                    <ThemeToggleButton
                                        theme={theme}
                                        onToggle={handleThemeToggle}
                                        setCursorVariant={setCursorVariant}
                                        compact={isCompact}
                                    />
                                </div>
                            )}
                        </div>
                    </NavbarContainer>
            </motion.nav>

            <AnimatePresence>
                {isMobile && mobileOpen ? (
                    <motion.div
                        className="fixed inset-0 z-[115] bg-[var(--bg-primary)]/86 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: reducedMotion ? 0 : 0.2,
                            ease: 'easeOut',
                        }}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                closeMobileMenu()
                            }
                        }}
                    >
                        <motion.div
                            id="mobile-navbar-menu"
                            ref={overlayRef}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Navigation menu"
                            tabIndex={-1}
                            className="mx-4 mt-24 rounded-[28px] border border-[var(--border-color)] bg-[var(--bg-secondary)]/96 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)]"
                            initial={{ opacity: 0, y: -16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{
                                duration: reducedMotion ? 0 : 0.24,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)]">
                                        Navigation
                                    </p>
                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        Stable mobile menu
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] transition-[border-color,background-color,color] duration-300 hover:border-[#60a5fa]/40 hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
                                    onClick={closeMobileMenu}
                                    aria-label="Close navigation menu"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {navConfig.links.map((item) => (
                                    <MobileMenuLink
                                        key={item.label}
                                        item={item}
                                        onSelect={closeMobileMenu}
                                        setCursorVariant={setCursorVariant}
                                    />
                                ))}
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--border-color)] pt-5">
                                <ThemeToggleButton
                                    theme={theme}
                                    onToggle={handleThemeToggle}
                                    setCursorVariant={setCursorVariant}
                                />
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                    Esc or tap outside to close
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}
