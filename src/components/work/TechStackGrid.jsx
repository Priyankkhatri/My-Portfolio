import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollRevealWrapper from '../ScrollRevealWrapper'

/**
 * TechStackGrid — grouped icon + label grid showing tech used.
 * Staggered animation on reveal. Groups by category.
 */
export default function TechStackGrid({ techStack }) {
    if (!techStack || techStack.length === 0) return null

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    // Group by category
    const grouped = techStack.reduce((acc, tech) => {
        const cat = tech.category || 'Other'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(tech)
        return acc
    }, {})

    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
            <div className="max-w-5xl mx-auto">
                <ScrollRevealWrapper>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-px bg-gradient-to-r from-[#60a5fa] to-transparent" />
                        <p className="text-xs tracking-widest uppercase text-[var(--text-secondary)]">
                            Tech Stack
                        </p>
                    </div>
                </ScrollRevealWrapper>

                <div ref={ref} className="space-y-8">
                    {Object.entries(grouped).map(([category, techs], catIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.6,
                                delay: catIndex * 0.12,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <p className="text-xs tracking-widest uppercase text-[var(--text-muted)] mb-4">
                                {category}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {techs.map((tech, i) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            duration: 0.4,
                                            delay: catIndex * 0.12 + i * 0.06,
                                            ease: 'easeOut',
                                        }}
                                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#60a5fa]/25 hover:bg-[#60a5fa]/5 transition-all duration-300 group"
                                    >
                                        {/* Tech icon placeholder — gradient circle */}
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[var(--border-color)] flex items-center justify-center group-hover:border-[#60a5fa]/30 transition-colors">
                                            <span className="text-[10px] font-bold text-[var(--text-secondary)] group-hover:text-[#60a5fa] transition-colors">
                                                {tech.name.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[var(--text-primary)] font-medium">
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
