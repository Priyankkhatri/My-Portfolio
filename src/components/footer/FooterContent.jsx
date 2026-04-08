import { Link } from 'react-router-dom'
import { footerConfig } from '../../data/footerConfig'

/**
 * FooterContent — Layer 2: Main Footer
 * Identity block + multi-column navigation + optional legal/trust.
 * Static render — no entrance animation.
 */
export default function FooterContent() {
    const { identity, navColumns, legalLinks } = footerConfig
    const hasLegal = legalLinks && legalLinks.length > 0

    return (
        <div
            id="footer-content"
            className={`grid gap-10 md:gap-8 ${
                hasLegal
                    ? 'grid-cols-1 md:grid-cols-4'
                    : 'grid-cols-1 md:grid-cols-3'
            }`}
        >
            {/* ── Identity Block ────────────────────────────── */}
            <div className="md:col-span-1">
                <h3
                    className="text-lg font-semibold text-[var(--text-primary)] tracking-tight mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    {identity.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                    {identity.description}
                </p>

                {/* Availability badge */}
                <div className="flex items-center gap-2 mt-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)] animate-pulse-glow" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
                        Available for work
                    </span>
                </div>
            </div>

            {/* ── Navigation Columns ───────────────────────── */}
            {navColumns.map((column) => (
                <div key={column.title}>
                    <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-5 font-medium">
                        {column.title}
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {column.links.map((link) => (
                            <li key={link.label}>
                                {link.path ? (
                                    /* Internal link — react-router */
                                    <Link
                                        to={link.path}
                                        id={`footer-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    /* External link — new tab */
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id={`footer-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors duration-200 inline-flex items-center gap-1.5"
                                    >
                                        {link.label}
                                        <svg
                                            className="w-3 h-3 opacity-40"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* ── Legal / Trust (optional) ──────────────────── */}
            {hasLegal && (
                <div>
                    <h4 className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)] mb-5 font-medium">
                        Legal
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {legalLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
