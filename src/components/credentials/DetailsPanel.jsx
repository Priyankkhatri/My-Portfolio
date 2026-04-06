import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import useStore from '../../store/useStore'

/**
 * DetailsPanel — left panel showing the active certificate's full details.
 * Uses key={activeIndex} to trigger AnimatePresence mount/unmount for cinematic transitions.
 * Staggered entry: title → issuer → date → description → skills → CTA.
 */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.02,
            staggerDirection: -1,
            when: 'afterChildren',
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.15, ease: 'easeIn' },
    },
}

const reducedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
}

export default function DetailsPanel({ cert, activeIndex, prefersReducedMotion }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const variants = prefersReducedMotion ? reducedVariants : itemVariants
    const container = prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
        : containerVariants

    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={activeIndex}
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-5"
            >
                {/* Category pill */}
                <motion.div variants={variants}>
                    <span className="inline-flex items-center px-3 py-1 text-[9px] tracking-[0.2em] font-medium uppercase bg-[var(--bg-highlight)] border border-[var(--border-color)] rounded-full text-[var(--accent-1)]">
                        {cert.category}
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    variants={variants}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    {cert.title}
                </motion.h2>

                {/* Issuer + Date row */}
                <motion.div
                    variants={variants}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1.5"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-1)]" />
                        <span className="text-sm font-medium text-[var(--text-primary)]/80">
                            {cert.issuer}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{cert.date}</span>
                    </div>
                    {cert.grade && (
                        <span className="text-xs font-mono text-[var(--accent-2)] bg-[var(--bg-highlight)] border border-[var(--border-color)] px-2 py-0.5 rounded-md">
                            Grade: {cert.grade}
                        </span>
                    )}
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={variants}
                    className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)]"
                >
                    {cert.description}
                </motion.p>

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                    <motion.div variants={variants} className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                            <motion.span
                                key={skill}
                                className="tech-pill relative overflow-hidden group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                    duration: 0.4, 
                                    ease: 'easeOut', 
                                    delay: index * 0.05 + 0.1 
                                }}
                            >
                                {/* Glowing sweep effect on enter */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-1)]/30 to-transparent -skew-x-12"
                                    initial={{ x: '-150%' }}
                                    animate={{ x: '150%' }}
                                    transition={{ duration: 0.8, ease: 'easeInOut', delay: index * 0.05 + 0.2 }}
                                />
                                <span className="relative z-10">{skill}</span>
                            </motion.span>
                        ))}
                    </motion.div>
                )}

                {/* Credential ID */}
                {cert.credentialId && (
                    <motion.div variants={variants}>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--bg-highlight)] border border-[var(--border-color)]">
                            <span className="text-[9px] uppercase tracking-widest font-mono text-[var(--text-muted)]">
                                ID: {cert.credentialId}
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* CTA — only if credentialUrl exists */}
                {cert.credentialUrl && (
                    <motion.div variants={variants} className="pt-2">
                        <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-1)]/10 to-[var(--accent-2)]/10 border border-[var(--accent-1)]/20 hover:border-[var(--accent-1)]/40 text-[var(--accent-1)] hover:text-[var(--text-primary)] transition-all duration-300 btn-shine"
                        >
                            <span className="text-sm font-medium tracking-wide">
                                View Certificate
                            </span>
                            <ExternalLink
                                size={14}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
