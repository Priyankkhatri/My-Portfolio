import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import useStore from '../../store/useStore'

/**
 * StackNavButtons — Up/Down arrow buttons for the certificate stack.
 * Positioned absolutely on the right side of the stack.
 * Supports fast scroll (hold detection) for 6+ certificates.
 */
export default function StackNavButtons({
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
    startFastScroll,
    stopFastScroll,
}) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const buttonBase =
        'flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md transition-all duration-300'
    const enabledStyle =
        'hover:bg-[var(--glass-bg)] hover:border-[var(--accent-1)]/30 hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]'
    const disabledStyle = 'opacity-30 cursor-not-allowed'

    return (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            {/* Up */}
            <motion.button
                onClick={goPrev}
                disabled={!canGoPrev}
                onMouseDown={() => startFastScroll('prev')}
                onMouseUp={stopFastScroll}
                onMouseLeave={() => {
                    stopFastScroll()
                    setCursorVariant('default')
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                whileTap={canGoPrev ? { scale: 0.9 } : {}}
                className={`${buttonBase} ${canGoPrev ? enabledStyle : disabledStyle}`}
                aria-label="Previous certificate"
            >
                <ChevronUp size={18} className="text-[var(--text-secondary)]" />
            </motion.button>

            {/* Down */}
            <motion.button
                onClick={goNext}
                disabled={!canGoNext}
                onMouseDown={() => startFastScroll('next')}
                onMouseUp={stopFastScroll}
                onMouseLeave={() => {
                    stopFastScroll()
                    setCursorVariant('default')
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                whileTap={canGoNext ? { scale: 0.9 } : {}}
                className={`${buttonBase} ${canGoNext ? enabledStyle : disabledStyle}`}
                aria-label="Next certificate"
            >
                <ChevronDown size={18} className="text-[var(--text-secondary)]" />
            </motion.button>
        </div>
    )
}
