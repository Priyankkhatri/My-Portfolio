import { Link } from 'react-router-dom'
import { navConfig } from '../../data/navConfig'
import useStore from '../../store/useStore'

/**
 * NavbarLogo — Logo mark + optional text.
 * In compact (pill) mode: smaller icon, no text.
 */
export default function NavbarLogo({ compact = false }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const { logo } = navConfig

    return (
        <Link
            to="/"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="flex items-center gap-3 group shrink-0"
        >
            <div
                className={`
                    ${compact ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'}
                    border border-[var(--border-color)] flex items-center justify-center
                    group-hover:border-[#60a5fa]/50 transition-all duration-500
                    overflow-hidden group-hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]
                    bg-[var(--bg-highlight)]/30
                `}
            >
                <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-full h-full object-contain ${compact ? 'p-1' : 'p-1.5'} transition-transform duration-700 group-hover:scale-110`}
                />
            </div>
            {!compact && (
                <span
                    className="text-sm font-medium tracking-[0.15em] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500 hidden sm:block"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    {logo.text}
                </span>
            )}
        </Link>
    )
}
