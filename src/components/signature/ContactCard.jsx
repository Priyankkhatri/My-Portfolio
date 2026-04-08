import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useStore from '../../store/useStore'

/* ── Swappable constants ───────────────────────────────── */
const HEADING = "Let's work together"
const SUBLINE = `Have a project in mind? Let's connect.`
const CTA_TEXT = 'Get in Touch'
const CTA_ROUTE = '/contact'

/**
 * ContactCard — static center card with CTA to /contact.
 * No loading state needed; renders instantly.
 */
export default function ContactCard() {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <motion.div
            className="signature-card glass-card p-6 flex flex-col items-center justify-center text-center min-h-[220px] group"
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(96,165,250,0.06)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            {/* Decorative accent line */}
            <div className="w-8 h-px bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] mb-5 opacity-50" />

            <h3
                className="text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                {HEADING}
            </h3>

            <p className="text-xs text-[var(--text-secondary)] mb-6 max-w-[200px] leading-relaxed">
                {SUBLINE}
            </p>

            <Link to={CTA_ROUTE}>
                <motion.button
                    className="signature-cta-btn btn-shine inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent-1)]/15 to-[var(--accent-2)]/15 border border-[var(--accent-1)]/25 text-[var(--text-primary)] text-sm font-medium tracking-wide rounded-full transition-all duration-300"
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    {CTA_TEXT}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-0.5 transition-transform duration-300"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </motion.button>
            </Link>
        </motion.div>
    )
}
