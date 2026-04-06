import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollRevealWrapper from '../ScrollRevealWrapper'
import useStore from '../../store/useStore'

/**
 * NextWorkNav — animated navigation to previous/next project.
 * Supports looping (wraps around at start/end).
 */
export default function NextWorkNav({ prev, next }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    if (!prev && !next) return null

    return (
        <section className="py-8 md:py-12 border-t border-[var(--border-color)] w-full">
            <ScrollRevealWrapper>
                <div className="flex items-center gap-4 mb-6 justify-center">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--border-color)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-muted)]">
                        Continue Exploring
                    </p>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--border-color)]" />
                </div>
            </ScrollRevealWrapper>


                <ScrollRevealWrapper delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Previous */}
                        {prev && (
                            <Link
                                to={`/work/${prev.id}`}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="group flex items-center gap-4 p-5 md:p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#60a5fa]/25 hover:bg-[#60a5fa]/5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                aria-label={`Previous project: ${prev.title}`}
                            >
                                <motion.div
                                    className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-[#60a5fa]/30 transition-colors"
                                    whileHover={{ x: -4 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)] group-hover:text-[#60a5fa] transition-colors">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </motion.div>
                                <div className="min-w-0">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1">
                                        Previous
                                    </p>
                                    <p className="text-sm md:text-base font-medium text-[var(--text-primary)] truncate group-hover:text-[#60a5fa] transition-colors">
                                        {prev.title}
                                    </p>
                                </div>
                            </Link>
                        )}

                        {/* Next */}
                        {next && (
                            <Link
                                to={`/work/${next.id}`}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="group flex items-center gap-4 p-5 md:p-6 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#60a5fa]/25 hover:bg-[#60a5fa]/5 transition-all duration-300 md:flex-row-reverse md:text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                                aria-label={`Next project: ${next.title}`}
                            >
                                <motion.div
                                    className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-[#60a5fa]/30 transition-colors"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)] group-hover:text-[#60a5fa] transition-colors">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </motion.div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-1">
                                        Next
                                    </p>
                                    <p className="text-sm md:text-base font-medium text-[var(--text-primary)] truncate group-hover:text-[#60a5fa] transition-colors">
                                        {next.title}
                                    </p>
                                </div>
                            </Link>
                        )}
                    </div>
                </ScrollRevealWrapper>
        </section>
    )
}

