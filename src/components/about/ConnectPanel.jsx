import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SiGithub, SiLeetcode } from 'react-icons/si'
import { FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa'
import useStore from '../../store/useStore'

const ease = [0.22, 1, 0.36, 1]

const links = [
    { label: 'GitHub', href: 'https://github.com/Priyankkhatri', icon: SiGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyankkhatrii/', icon: FaLinkedinIn },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Priyank_Khatri/', icon: SiLeetcode },
    { label: 'Email', href: 'mailto:priyankkhatri.dev@gmail.com', icon: FaRegEnvelope },
]

export default function ConnectPanel() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <section ref={ref} className="py-12 sm:py-16 px-6 md:px-12 lg:px-24 pb-20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="text-[12px] tracking-[0.4em] uppercase text-[var(--text-muted)] mb-5 font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        CONNECT
                    </p>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tighter mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Let's build together
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-lg mx-auto mb-12">
                        Open to collaborations, hackathons, and developer communities.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease, delay: 0.15 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {links.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? undefined : '_blank'}
                            rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.06 }}
                            whileHover={{ y: -4, scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-sm text-[var(--text-secondary)] transition-all duration-300 hover:border-[rgba(96,165,250,0.2)] hover:text-[var(--text-primary)] hover:shadow-[0_8px_32px_rgba(96,165,250,0.08)]"
                        >
                            <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[15px] font-semibold tracking-wide">{link.label}</span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
