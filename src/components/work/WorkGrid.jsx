import ProjectCard from './ProjectCard'
<<<<<<< HEAD
import { motion } from 'framer-motion'

/**
 * WorkGrid — Reconstructed as a High-Fidelity Editorial Collection.
 * Employs rhythmic visual tension, varying scale, and technical interstitials
 * to create a journey through the project archive.
=======

/**
 * WorkGrid — Reconstructed as an Asymmetric Masonry Gallery.
 * Uses intentional visual tension and varying aspect ratios (4:3, 16:9, etc.)
 * to create a distinctive, editorial showcase.
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
 */
export default function WorkGrid({ projects }) {
    if (!projects || projects.length === 0) return null

    return (
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-32 md:gap-x-16">
            {projects.map((project, i) => {
                // Rhythmic Layout Logic
                const configs = [
                    { grid: "md:col-span-12", variant: "featured" },      // 0: Full Hero
                    { grid: "md:col-span-7", variant: "normal" },        // 1: Large Left
                    { grid: "md:col-span-5 md:mt-32", variant: "normal" }, // 2: Small Right Offset
                    { grid: "md:col-span-5", variant: "normal" },        // 3: Small Left
                    { grid: "md:col-span-12", variant: "featured" },     // 4: Full Hero (Mid-Break)
                    { grid: "md:col-span-6 md:-mt-16", variant: "normal" }, // 5: Medium Offset
                    { grid: "md:col-span-6", variant: "normal" },        // 6: Medium
                ]
                
                const currentConfig = configs[i % configs.length]
                
                return (
                    <div key={project.id} className={`${currentConfig.grid} relative`}>
                        {/* Technical Decoration for Featured Items */}
                        {currentConfig.variant === 'featured' && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="absolute -top-12 left-0 w-full flex items-center gap-4 pointer-events-none"
                            >
                                <div className="h-px bg-gradient-to-r from-[var(--accent-1)] to-transparent w-32" />
                                <span className="text-xs tracking-widest text-[var(--accent-1)] uppercase">Technical Highlight // 0{i + 1}</span>
                            </motion.div>
                        )}

                        <ProjectCard
                            project={project}
                            index={i}
                            variant={currentConfig.variant}
                        />

                        {/* Creative Interstitial (Decorative Stat/Text) */}
                        {i === 2 && (
                            <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block rotate-90 origin-right">
                                <span className="text-xs tracking-widest uppercase text-[var(--text-muted)] opacity-20">
                                    SYSTEM CORE GALLERY ACTIVE
                                </span>
                            </div>
                        )}
=======
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-24 md:gap-x-12">
            {projects.map((project, i) => {
                // Layout logic for Asymmetric Masonry
                // 0: Full width (16:9 approx)
                // 1, 2: Two-column split (vertical-ish)
                // 3: Single column offset
                // etc.
                const layoutConfig = [
                    "md:col-span-12", // Item 0
                    "md:col-span-7",  // Item 1
                    "md:col-span-5 md:mt-24", // Item 2 (offset)
                    "md:col-span-5",  // Item 3
                    "md:col-span-7 md:-mt-12", // Item 4 (overlap/negative space)
                    "md:col-span-12", // Item 5
                ]
                
                const gridClass = layoutConfig[i % layoutConfig.length]
                const variant = (i % layoutConfig.length === 0 || i % layoutConfig.length === 5) ? 'featured' : 'normal'

                return (
                    <div key={project.id} className={gridClass}>
                        <ProjectCard
                            project={project}
                            index={i}
                            variant={variant}
                        />
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                    </div>
                )
            })}
        </div>
    )
}
