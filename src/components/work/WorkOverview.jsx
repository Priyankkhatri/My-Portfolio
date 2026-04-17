import { motion } from 'framer-motion'

export default function WorkOverview({ project }) {
  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Main Description */}
        <div className="lg:w-2/3">
          <h3 className="text-sm font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-6">
            Overview
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            {project.shortDescription}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Project Meta details */}
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-3 font-semibold">Role</h4>
            <p className="text-base text-[var(--text-primary)]">{project.role}</p>
          </div>
          <div>
            <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-3 font-semibold">Timeline</h4>
            <p className="text-base text-[var(--text-primary)]">{project.year}</p>
          </div>
          <div>
            <h4 className="text-xs tracking-wider uppercase text-[var(--text-muted)] mb-3 font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack?.map((tech) => (
                <span 
                  key={tech.name} 
                  className="px-3 py-1 text-xs rounded-md border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
