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
}
