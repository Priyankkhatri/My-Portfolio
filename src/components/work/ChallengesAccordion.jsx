import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollRevealWrapper from '../ScrollRevealWrapper'

/**
 * ChallengesAccordion — expandable sections for challenges and learnings.
 * Animated expand/collapse. Only renders if at least one field is present.
 */
export default function ChallengesAccordion({ challenges, learnings }) {
    if (!challenges && !learnings) return null

    const items = [
        challenges && { label: 'Challenges', content: challenges, icon: '⚡' },
        learnings && { label: 'Key Learnings', content: learnings, icon: '💡' },
    ].filter(Boolean)

    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">
                <ScrollRevealWrapper>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-px bg-gradient-to-r from-[#60a5fa] to-transparent" />
                        <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">
                            Reflections
                        </p>
                    </div>
                </ScrollRevealWrapper>

                <div className="space-y-3">
                    {items.map((item, i) => (
                        <ScrollRevealWrapper key={item.label} delay={i * 0.1}>
                            <AccordionItem item={item} defaultOpen={i === 0} />
                        </ScrollRevealWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}

function AccordionItem({ item, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-inset transition-colors hover:bg-[var(--bg-highlight)]/30"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm md:text-base font-medium text-[var(--text-primary)]">
                        {item.label}
                    </span>
                </div>
                <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-muted)]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </motion.svg>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-[var(--border-color)] mb-5" />
                            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed pl-8">
                                {item.content}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
