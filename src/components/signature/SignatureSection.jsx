import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import GithubCard from './GithubCard'
import ContactCard from './ContactCard'
import SpotifyCard from './SpotifyCard'

/**
 * SignatureSection — persistent 3-card section at the bottom of every page.
 * Mounted once in RootLayout, outside AnimatePresence.
 * Never remounts during route transitions.
 */
export default function SignatureSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <section
            ref={sectionRef}
            id="signature-section"
            className="relative px-6 md:px-12 lg:px-24 py-16"
        >
            {/* Subtle top divider */}
            <div className="section-divider mb-12" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto"
            >
                {/* Section label */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)]">
                        Signature
                    </span>
                </div>

                {/* 3-column card grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <GithubCard />
                    <ContactCard />
                    <SpotifyCard />
                </div>
            </motion.div>
        </section>
    )
}
