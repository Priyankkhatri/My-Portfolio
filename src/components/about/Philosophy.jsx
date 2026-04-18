import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const lines = [
    "I don't just build apps. I build systems.",
    "Every millisecond matters.",
    "Clean UI is not optional.",
]

export default function Philosophy() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section ref={ref} className="py-12 sm:py-20 px-6 md:px-12 lg:px-24 relative">
            {/* Divider */}
            <div className="section-divider mb-12 sm:mb-16" />

            <div className="max-w-4xl mx-auto">
                <div className="space-y-12 sm:space-y-16">
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                            transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.25 }}
                            className="flex items-start gap-6 sm:gap-8"
                        >
                            <span
                                className="text-[var(--accent-1)] opacity-20 text-sm sm:text-base mt-2 shrink-0 font-bold"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p
                                className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight tracking-tight"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {line}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
