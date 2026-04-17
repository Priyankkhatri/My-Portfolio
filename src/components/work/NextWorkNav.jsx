import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

export default function NextWorkNav({ prev, next }) {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  if (!prev && !next) return null

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 glass-card p-8 md:p-12">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
      <div className="flex-1 w-full flex justify-start relative z-10">
        {prev && (
          <Link 
            to={`/work/${prev.id}`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex flex-col-reverse md:flex-row items-start md:items-center gap-6 text-left w-full h-full p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--accent-1)] group-hover:bg-[var(--accent-1)] group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm tracking-wider uppercase text-white/50 mb-2 font-semibold group-hover:text-white/80 transition-colors">Previous Project</p>
              <h4 className="text-3xl font-bold text-white group-hover:text-[var(--accent-1)] transition-colors line-clamp-1 drop-shadow-md">{prev.title}</h4>
            </div>
          </Link>
        )}
      </div>

      <div className="hidden md:block w-px h-24 bg-white/10 shrink-0 relative z-10" />

      <div className="flex-1 w-full flex justify-end relative z-10">
        {next && (
          <Link 
            to={`/work/${next.id}`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex flex-col md:flex-row items-end md:items-center gap-6 text-right w-full h-full p-4 rounded-xl hover:bg-white/5 transition-all duration-300 justify-end"
          >
            <div>
              <p className="text-sm tracking-wider uppercase text-white/50 mb-2 font-semibold group-hover:text-white/80 transition-colors">Next Project</p>
              <h4 className="text-3xl font-bold text-white group-hover:text-[var(--accent-1)] transition-colors line-clamp-1 drop-shadow-md">{next.title}</h4>
            </div>
            <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[var(--accent-1)] group-hover:bg-[var(--accent-1)] group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

