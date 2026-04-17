import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

export default function NextWorkNav({ prev, next }) {
  const setCursorVariant = useStore((s) => s.setCursorVariant)

  if (!prev && !next) return null

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
      <div className="flex-1 w-full flex justify-start">
        {prev && (
          <Link 
            to={`/work/${prev.id}`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex items-center gap-6 text-left max-w-sm"
          >
            <div className="w-14 h-14 rounded-full border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-1)] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm tracking-wider uppercase text-[var(--text-muted)] mb-2 font-semibold">Previous</p>
              <h4 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-1)] transition-colors line-clamp-1">{prev.title}</h4>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 w-full flex justify-end">
        {next && (
          <Link 
            to={`/work/${next.id}`}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex items-center gap-6 text-right max-w-sm"
          >
            <div>
              <p className="text-sm tracking-wider uppercase text-[var(--text-muted)] mb-2 font-semibold">Next</p>
              <h4 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-1)] transition-colors line-clamp-1">{next.title}</h4>
            </div>
            <div className="w-14 h-14 rounded-full border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-1)] transition-colors">
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
