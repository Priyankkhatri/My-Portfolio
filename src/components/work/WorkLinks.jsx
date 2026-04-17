import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

<<<<<<< HEAD
export default function WorkLinks({ liveUrl, githubUrl }) {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  if (!liveUrl && !githubUrl) return null

  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Live Interface Link */}
        {liveUrl && (
          <motion.a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            whileHover={{ y: -5 }}
            className="group flex flex-col justify-between p-8 rounded-2xl glass-card glass-card-hover btn-shine transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-wider uppercase text-[var(--accent-1)] mb-2 drop-shadow-md">Live Site</p>
              <h3 className="text-2xl font-bold text-white">Open Live Site</h3>
            </div>
            
            <div className="mt-8 self-end w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[var(--accent-1)] group-hover:text-black group-hover:border-[var(--accent-1)] group-hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] transition-all duration-300 relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        )}

        {/* GitHub Repository Link */}
        {githubUrl && (
          <motion.a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            whileHover={{ y: -5 }}
            className="group flex flex-col justify-between p-8 rounded-2xl glass-card glass-card-hover btn-shine transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-wider uppercase text-white/50 mb-2 drop-shadow-md">Repository</p>
              <h3 className="text-2xl font-bold text-white">Source Code</h3>
            </div>

            <div className="mt-8 self-end w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
          </motion.a>
        )}
      </div>
    </section>
  )
=======
/**
 * WorkLinks — Reconstructed as 'Technical Action' modules.
 * Industrial buttons with high-precision branding.
 */
export default function WorkLinks({ liveUrl, githubUrl }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    if (!liveUrl && !githubUrl) return null

    return (
        <section className="py-4 md:py-6 mb-4">
            <div className="max-w-5xl">
                {/* Industrial Header */}
                <div className="flex items-center gap-6 mb-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent-1)]">
                        Action // 04
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                </div>


                <div className="flex flex-wrap gap-8 lg:gap-12">
                    {/* Live Deployment Link */}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group relative flex items-center gap-8 px-10 py-6 border border-[var(--accent-1)]/30 bg-[var(--accent-1)]/5 rounded-xl transition-all duration-500 hover:border-[var(--accent-1)] hover:shadow-[0_0_30px_rgba(var(--accent-1-rgb),0.1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]"
                        >
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-[var(--accent-1)] opacity-50 mb-1">
                                    SYS_EXECUTE
                                </span>
                                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--text-primary)]">
                                    Launch_Production
                                </span>
                            </div>
                            
                            <div className="w-12 h-12 rounded-full border border-[var(--accent-1)]/20 flex items-center justify-center group-hover:bg-[var(--accent-1)] group-hover:border-[var(--accent-1)] transition-all duration-500">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:text-white transition-colors">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </div>

                            {/* Decorative Accent */}
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--accent-1)] rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    )}

                    {/* Source Code Link */}
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group relative flex items-center gap-8 px-10 py-6 border border-[var(--border-color)] bg-[var(--bg-highlight)]/20 rounded-xl transition-all duration-500 hover:border-[var(--text-secondary)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]"
                        >
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-[var(--text-muted)] opacity-50 mb-1">
                                    SRC_ACCESS
                                </span>
                                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                    Repository_Data
                                </span>
                            </div>
                            
                            <div className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--text-primary)] transition-all duration-500">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
}
