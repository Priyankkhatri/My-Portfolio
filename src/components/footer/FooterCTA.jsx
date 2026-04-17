import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { footerConfig } from '../../data/footerConfig'

/**
 * FooterCTA — Layer 1: CTA Hero Footer
 * Bold heading + subtext + CTA button with entrance animation.
 * On /contact: heading swaps, button hidden.
 */
export default function FooterCTA() {
    const { cta } = footerConfig
    const location = useLocation()
    const isContactPage = location.pathname === '/contact'

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    /* Reduced motion check */
    const [reducedMotion, setReducedMotion] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const heading = isContactPage ? cta.contactRouteHeading : cta.heading
    const subtext = isContactPage ? cta.contactRouteSubtext : cta.subtext

    /* Animation variants */
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12 },
        },
    }

    const itemVariants = reducedMotion
        ? { hidden: {}, visible: {} }
        : {
              hidden: { opacity: 0, y: 30 },
              visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                  },
              },
          }

    return (
        <section
            ref={sectionRef}
            id="footer-cta"
            className="relative flex flex-col items-center text-center overflow-hidden"
        >
            {/* ── Decorative Orb (P2) ──────────────────────── */}
            {!reducedMotion && (
                <div
                    className="footer-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
                    aria-hidden="true"
                />
            )}

            {/* ── Content ──────────────────────────────────── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="relative z-10 flex flex-col items-center gap-5 max-w-2xl"
            >
                {/* Heading — dominant typographic element */}
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    <span className="text-gradient-silver">{heading}</span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="text-base sm:text-lg text-[var(--text-secondary)] max-w-md leading-relaxed"
                >
                    {subtext}
                </motion.p>

                {/* CTA Button — hidden on /contact */}
                {!isContactPage && (
                    <motion.div variants={itemVariants}>
                        <Link
                            to={cta.buttonPath}
                            id="footer-cta-button"
                            className="footer-cta-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide btn-shine"
                        >
                            {cta.buttonLabel}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </section>
    )
}
