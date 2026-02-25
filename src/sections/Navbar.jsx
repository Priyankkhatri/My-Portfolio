import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import useStore from '../store/useStore'

const navItems = [
    { label: 'Home', href: '#home', num: '01' },
    { label: 'Tech', href: '#about', num: '02' },
    { label: 'Work', href: '#projects', num: '03' },
    { label: 'Credentials', href: '#certificates', num: '04' },
    { label: 'Contact', href: '#contact', num: '05' },
]

function NavLink({ item, index, active }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    return (
        <motion.a
            href={item.href}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className={`relative text-sm tracking-wide transition-colors duration-300 link-underline py-1 group ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + index * 0.08, duration: 0.5 }}
        >
            <span className={`text-[9px] mr-1 transition-colors ${active ? 'text-[var(--accent-1)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`}>{item.num}</span>
            {item.label}
            {active && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </motion.a>
    )
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('#home')
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const theme = useStore((s) => s.theme)
    const toggleTheme = useStore((s) => s.toggleTheme)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`)
                    }
                })
            },
            { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
        )

        navItems.forEach((item) => {
            const sectionId = item.href.replace('#', '')
            const element = document.getElementById(sectionId)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] origin-left z-[60]"
                style={{ scaleX }}
            />

            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 pt-[2px]"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
            >
                {/* Glass background with gradient border */}
                <div className="backdrop-blur-md bg-[var(--bg-primary)]/70 border-b border-[var(--border-color)] transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <a
                            href="#home"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="flex items-center gap-3 group"
                        >
                            {/* Logo mark */}
                            <div className="w-8 h-8 border border-[var(--border-color)] rounded-lg flex items-center justify-center group-hover:border-[var(--text-secondary)] transition-colors duration-500">
                                <span
                                    className="text-xs font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    P
                                </span>
                            </div>
                            <span
                                className="text-sm font-medium tracking-[0.15em] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500 hidden sm:block"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                PRIYANK
                            </span>
                        </a>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item, i) => (
                                <NavLink key={item.label} item={item} index={i} active={activeSection === item.href} />
                            ))}

                            {/* Status indicator */}
                            <motion.div
                                className="flex items-center gap-2 ml-4 pl-4 border-l border-[var(--border-color)]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5, duration: 0.5 }}
                            >
                                <div className="w-1.5 h-1.5 bg-[#60a5fa]/80 rounded-full animate-pulse-glow" />
                                <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase">Available</span>
                            </motion.div>

                            {/* Theme Toggle Button */}
                            <motion.button
                                onClick={toggleTheme}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="ml-2 w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--glass-bg)] transition-all duration-300 group"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.6, duration: 0.5, type: 'spring' }}
                                aria-label="Toggle Theme"
                            >
                                <div className="relative w-4 h-4 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 flex flex-col items-center justify-start"
                                        animate={{ y: theme === 'dark' ? 0 : -16 }}
                                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <svg className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-1)] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-2)] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.button>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                className="block w-6 h-px bg-[var(--text-secondary)]"
                                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="block w-4 h-px bg-[var(--text-secondary)] ml-auto"
                                animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 16 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-6 h-px bg-[var(--text-secondary)]"
                                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </div>
                </div>

                {/* Bottom glow line */}
                <div className="h-px glow-line" />
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-colors duration-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
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

                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className={`flex items-center gap-4 text-3xl tracking-wide transition-colors ${activeSection === item.href ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        <span className={`text-xs ${activeSection === item.href ? 'text-[var(--accent-1)]' : 'text-[var(--text-muted)]'}`}>{item.num}</span>
                                        {item.label}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer info in mobile menu */}
                        <motion.div
                            className="absolute bottom-12 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
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
