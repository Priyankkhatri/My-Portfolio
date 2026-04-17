<<<<<<< HEAD
import { motion } from 'framer-motion'

export default function ProblemSolution({ problem, solution }) {
  if (!problem && !solution) return null

  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        
        {/* Problem */}
        {problem && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">The Challenge</h3>
            </div>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {problem}
            </p>
          </div>
        )}

        {/* Solution */}
        {solution && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">The Solution</h3>
            </div>
            <p className="text-lg text-[var(--text-primary)] font-medium leading-relaxed">
              {solution}
            </p>
          </div>
        )}

      </div>
    </section>
  )
=======
/**
 * ProblemSolution — Reconstructed as a 'Blueprint Study'.
 * Uses monochromatic industrial styling and technical drafting SVGs.
 */
export default function ProblemSolution({ problem, solution }) {
    if (!problem && !solution) return null

    return (
        <section className="py-4 md:py-6">
            <div className="max-w-5xl">
                {/* Industrial Header */}
                <div className="flex items-center gap-6 mb-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent-1)]">
                        Study // 02
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Problem / Objective */}
                    {problem && (
                        <div className="relative p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-highlight)]/20 overflow-hidden group">
                            {/* Blueprint Corner Accent */}
                            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[var(--accent-1)]/20 rounded-tr-2xl pointer-events-none" />
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full border border-[var(--accent-1)]/20 flex items-center justify-center bg-[var(--accent-1)]/5 group-hover:border-[var(--accent-1)]/40 transition-colors">
                                    {/* Schematic: Problem/Exclamation */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--accent-1)]">
                                        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--text-primary)] font-bold">
                                    Constraints
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light">
                                {problem}
                            </p>
                        </div>
                    )}

                    {/* Solution / Implementation */}
                    {solution && (
                        <div className="relative p-8 rounded-2xl border border-[var(--accent-1)]/20 bg-[var(--accent-1)]/5 overflow-hidden group md:mt-8">
                            {/* Blueprint Corner Accent */}
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[var(--accent-1)]/40 rounded-bl-2xl pointer-events-none" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full border border-[var(--accent-1)]/40 flex items-center justify-center bg-[var(--accent-1)]/10 group-hover:border-[var(--accent-1)] transition-colors">
                                    {/* Schematic: Solution/Lightbulb */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--accent-1)]">
                                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                                    </svg>
                                </div>
                                <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--accent-1)] font-bold">
                                    Mechanism
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed font-medium">
                                {solution}
                            </p>
                            
                            {/* Industrial ID Label */}
                            <div className="absolute top-4 right-4 font-mono text-[8px] tracking-[0.4em] uppercase text-[var(--accent-1)] opacity-40">
                                SOL_APPROVED
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>

    )
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
}
