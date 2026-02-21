import { motion } from 'framer-motion'
import useStore from '../store/useStore'

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 2.4 },
    },
}

const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

const stats = [
    { num: '2nd', label: 'Semester Student' },
    { num: '4+', label: 'Learning Projects' },
    { num: '10+', label: 'Technologies' },
]

export default function Hero() {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-24 pb-16"
        >
            {/* Decorative elements */}
            <div className="absolute top-32 right-12 w-px h-40 bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
            <div className="absolute bottom-32 left-12 w-32 h-px bg-gradient-to-r from-white/5 to-transparent hidden lg:block" />
            <div className="floating-orb w-96 h-96 bg-slate-500 -top-20 -right-20" />
            <div className="floating-orb w-64 h-64 bg-blue-900 bottom-20 left-20" />

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
                <motion.div
                    className="max-w-xl w-full"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-white/10" />
                        <p className="text-[11px] tracking-[0.4em] uppercase text-white/25">
                            BTech CSE Student &bull; Aspiring Developer
                        </p>
                    </motion.div>

                    {/* Headings */}
                    <motion.div variants={fadeUp} className="mb-4">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Priyank Khatri
                        </h1>
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.02] mb-10"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <span className="text-gradient-silver">Aspiring Software Developer</span><span className="text-white/30">.</span>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeUp}
                        className="text-base md:text-lg leading-[1.8] text-white/35 max-w-xl mb-6"
                    >
                        Building React apps and REST APIs while pursuing computer science and exploring modern technology stacks.
                    </motion.p>

                    {/* Location badge */}
                    <motion.div variants={fadeUp} className="flex items-center gap-2 mb-12">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-xs tracking-wider text-white/20">India &bull; B.Tech CSE</span>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-20">
                        <a
                            href="#projects"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0a] text-sm font-medium tracking-wide rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-white/5"
                        >
                            View Projects
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        <a
                            href="mailto:priyank@example.com"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-white/60 text-sm font-medium tracking-wide rounded-full hover:bg-white/5 hover:border-white/20 hover:text-white/80 transition-all duration-300"
                        >
                            <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full group-hover:bg-emerald-400/80 transition-colors" />
                            Contact / Hire me
                        </a>
                    </motion.div>

                    {/* Stats row */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap gap-12 pt-8 border-t border-white/[0.04]"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span
                                    className="text-2xl md:text-3xl font-bold text-white/80 stat-number"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                >
                                    {stat.num}
                                </span>
                                <span className="text-[10px] tracking-[0.25em] uppercase text-white/20">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Image - Right Side */}
                <motion.div
                    className="relative hidden lg:flex flex-col items-center justify-center w-[400px] h-[400px] shrink-0"
                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    {/* Outer animated rings */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-4 rounded-full border border-white/10 border-dashed animate-[spin_30s_linear_infinite_reverse]" />
                    <div className="absolute inset-8 rounded-full border border-white/5 animate-pulse-glow" />

                    {/* Image Container */}
                    <div className="absolute inset-12 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-transparent border border-white/20 flex items-center justify-center backdrop-blur-md group">
                        <img
                            src="https://images.unsplash.com/photo-1549692520-ACC6669E2F0C?auto=format&fit=crop&q=80&w=400&h=400"
                            alt="Profile"
                            className="w-full h-full object-cover object-center mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4, duration: 1 }}
            >
                <span className="text-[9px] tracking-[0.3em] text-white/15 uppercase">Scroll</span>
                <motion.div
                    className="w-5 h-8 border border-white/10 rounded-full flex items-start justify-center p-1.5"
                >
                    <motion.div
                        className="w-0.5 h-1.5 bg-white/20 rounded-full"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </motion.div>
        </section>
    )
}
