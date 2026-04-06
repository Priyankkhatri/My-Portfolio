import ProjectCard from './ProjectCard'

/**
 * WorkGrid — Reconstructed as an Asymmetric Masonry Gallery.
 * Uses intentional visual tension and varying aspect ratios (4:3, 16:9, etc.)
 * to create a distinctive, editorial showcase.
 */
export default function WorkGrid({ projects }) {
    if (!projects || projects.length === 0) return null

    return (
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
                    </div>
                )
            })}
        </div>
    )
}
