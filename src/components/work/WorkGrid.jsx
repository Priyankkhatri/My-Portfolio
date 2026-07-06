import ProjectCard from './ProjectCard'
import { motion } from 'framer-motion'

/**
 * WorkGrid — Asymmetric editorial layout for project cards.
 * Creates visual rhythm through alternating column spans and vertical offsets.
 * No decorative text labels — the layout itself creates the visual interest.
 */
export default function WorkGrid({ projects }) {
    if (!projects || projects.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
            >
                <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase">
                    No projects match this filter
                </p>
            </motion.div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 md:gap-x-8 lg:gap-x-12">
            {projects.map((project, i) => {
                // Rhythmic editorial layout — alternating patterns
                const configs = [
                    { grid: "md:col-span-12", variant: "featured" },        // 0: Full-width hero
                    { grid: "md:col-span-7", variant: "normal" },           // 1: Large left
                    { grid: "md:col-span-5 md:mt-20", variant: "normal" },  // 2: Small right, offset down
                    { grid: "md:col-span-5", variant: "normal" },           // 3: Small left
                    { grid: "md:col-span-7 md:-mt-8", variant: "normal" },  // 4: Large right, pulled up
                    { grid: "md:col-span-12", variant: "featured" },        // 5: Full-width hero (mid-break)
                    { grid: "md:col-span-6", variant: "normal" },           // 6: Even split
                    { grid: "md:col-span-6 md:mt-16", variant: "normal" },  // 7: Even split, offset
                ]

                const currentConfig = configs[i % configs.length]

                return (
                    <div key={project.id} className={`${currentConfig.grid} relative`}>
                        {/* Subtle accent line above featured cards */}
                        {currentConfig.variant === 'featured' && i > 0 && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="h-px bg-gradient-to-r from-[var(--accent-1)]/20 via-[var(--accent-2)]/10 to-transparent mb-12 origin-left"
                            />
                        )}

                        <ProjectCard
                            project={project}
                            index={i}
                            variant={currentConfig.variant}
                        />
                    </div>
                )
            })}
        </div>
    )
}
