import { motion } from 'framer-motion'
import WorkGrid from '../components/work/WorkGrid'
import useProjectData from '../hooks/useProjectData'

/**
 * Work page — Reconstructed as an Industrial Minimalist Gallery.
 * Incorporates high-craft 'Frontend Design' principles and 'Kaizen' unified interactions.
 */
export default function Work() {
    const { projects } = useProjectData()

    return (
        <section className="min-h-screen px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-32 relative overflow-hidden bg-[var(--bg-primary)]">
            
            {/* Professional Film Grain Overlay (Breathing Texture) */}
            <div className="fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 opacity-[0.03] contrast-150 brightness-100 mix-blend-overlay overflow-hidden">
                <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
            </div>

            {/* Industrial Section Header */}
            <div className="max-w-7xl mx-auto mb-24 md:mb-32">
                
                {/* Asymmetric Eyebrow */}
                <motion.div
                    className="flex items-center gap-6 mb-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-[var(--accent-1)]">
                        Archive / 01
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                </motion.div>

                {/* Industrial Heading */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8 py-4">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-bold text-[var(--text-primary)] leading-[0.9] tracking-tighter"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        SELECTED <br />
                        <span className="text-stroke tracking-normal opacity-10">WORK</span>
                    </motion.h1>

                    <motion.div 
                        className="max-w-xs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed uppercase tracking-widest font-medium border-l-2 border-[var(--accent-1)] pl-4">
                            Exploring the intersection of human-centered design and systematic code architecture.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Project Grid (Masonry) */}
            <div className="max-w-7xl mx-auto">
                <WorkGrid projects={projects} />
            </div>

            {/* Industrial Pagination Hint */}
            <motion.div
                className="flex items-center justify-between mt-32 max-w-7xl mx-auto pt-8 border-t border-[var(--border-color)] text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span>End / Page_01</span>
                <span>Scroll to Reveal_∞</span>
            </motion.div>

            {/* Custom Background Ambient Glow (Industrial Blue) */}
            <div 
                className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent-1)]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow"
                style={{ animationDuration: '8s' }}
            />
        </section>
    )
}
