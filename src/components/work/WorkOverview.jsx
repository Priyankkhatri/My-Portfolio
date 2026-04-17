import { motion } from 'framer-motion'

export default function WorkOverview({ project }) {
  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Main Description */}
        <div className="lg:w-2/3 glass-card p-8 md:p-12 relative group h-fit">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-10" />
          <div className="relative z-20">
            <h3 className="text-sm font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-6">
              Overview
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--accent-1)] leading-tight mb-8 drop-shadow-[0_0_15px_rgba(96,165,250,0.2)]" style={{ fontFamily: 'var(--font-display)' }}>
              {project.shortDescription}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed font-light">
              {project.fullDescription}
            </p>
          </div>
        </div>

        {/* Project Meta details */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="glass-card glass-card-hover p-6 md:p-8 flex-1">
            <h4 className="text-xs tracking-wider uppercase text-[var(--accent-1)] mb-3 font-semibold">Role</h4>
            <p className="text-base text-white/90 font-medium">{project.role}</p>
          </div>
          <div className="glass-card glass-card-hover p-6 md:p-8 flex-1">
            <h4 className="text-xs tracking-wider uppercase text-[var(--accent-1)] mb-3 font-semibold">Timeline</h4>
            <p className="text-base text-white/90 font-medium">{project.year}</p>
          </div>
          <div className="glass-card glass-card-hover p-6 md:p-8 flex-[2]">
            <h4 className="text-xs tracking-wider uppercase text-[var(--accent-1)] mb-4 font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.techStack?.map((tech) => (
                <span 
                  key={tech.name} 
                  className="px-3 py-1 text-xs rounded-full border border-white/10 text-white/70 bg-white/5 hover:bg-white/10 transition-colors"
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
