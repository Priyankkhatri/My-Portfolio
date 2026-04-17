import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

/**
 * ProgressIndicator — shows navigation progress.
 * ≤8 certificates: animated dot row with active pulse, all clickable.
 * >8 certificates: numeric display "4 / 12".
 */
export default function ProgressIndicator({ total, activeIndex, goTo }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    if (total > 8) {
        /* Numeric mode */
        return (
            <div 
                className="flex items-center gap-2 select-none"
                role="status"
                aria-live="polite"
                aria-label={`Certificate ${activeIndex + 1} of ${total}`}
            >
                <span 
                    className="text-lg font-bold text-[var(--text-primary)]"
                    style={{ fontVariantNumeric: 'tabular-nums', fontFamily: "'Poppins', sans-serif" }}
                >
                    {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-xs text-[var(--text-muted)]">/</span>
                <span 
                    className="text-xs text-[var(--text-muted)]"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                    {String(total).padStart(2, '0')}
                </span>
            </div>
        )
    }

    /* Dot mode */
    return (
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Certificate navigation">
            {Array.from({ length: total }, (_, i) => {
                const isActive = i === activeIndex
                return (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Go to certificate ${i + 1}`}
                        className="relative p-1 group"
                    >
                        <motion.div
                            className="rounded-full"
                            animate={{
                                width: isActive ? 24 : 8,
                                height: 8,
                                backgroundColor: isActive
                                    ? 'var(--accent-1)'
                                    : 'var(--bg-highlight-hover)',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                            }}
                            style={{
                                boxShadow: isActive
                                    ? '0 0 12px rgba(96, 165, 250, 0.4)'
                                    : 'none',
                            }}
                        />
                        {isActive && (
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{
                                    scale: [1, 1.8, 1],
                                    opacity: [0.4, 0, 0.4],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    background:
                                        'radial-gradient(circle, var(--accent-1), transparent)',
                                }}
                            />
                        )}
                    </button>
                )
            })}
        </div>
    )
}
