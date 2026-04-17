import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useStore from '../store/useStore'

/**
 * 404 Not Found page with animated visual and back-to-home CTA.
 */
export default function NotFoundPage() {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center max-w-lg"
            >
                {/* Large 404 */}
                <motion.h1
                    className="text-[8rem] md:text-[12rem] font-bold leading-none text-[var(--text-primary)]/[0.04] select-none"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    animate={{ opacity: [0.02, 0.06, 0.02] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    404
                </motion.h1>

                {/* Heading */}
                <div className="flex items-center gap-4 mb-4 justify-center -mt-16 relative z-10">
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">Lost in space</p>
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                </div>

                <h2
                    className="text-2xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Page Not <span className="text-gradient-silver">Found</span>
                </h2>

                <p className="text-sm text-[var(--text-secondary)] mb-10 max-w-sm mx-auto">
                    The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                {/* CTA */}
                <Link
                    to="/"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="group btn-shine inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/25 text-[var(--text-primary)] text-sm font-medium tracking-wide rounded-full hover:border-[#60a5fa]/45 active:scale-[0.97] transition-all duration-300 shadow-lg shadow-[#60a5fa]/5"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    Take Me Home
                </Link>

                {/* Route hint */}
                <p className="text-[10px] text-[var(--text-muted)] mt-8 tracking-wider">
                    Or try: <code className="text-[var(--text-secondary)]">/work</code> · <code className="text-[var(--text-secondary)]">/tech</code> · <code className="text-[var(--text-secondary)]">/credentials</code> · <code className="text-[var(--text-secondary)]">/contact</code>
                </p>
            </motion.div>
        </section>
    )
}
