import { motion } from 'framer-motion'

/**
 * CardSkeleton — shared loading placeholder for GitHub & Spotify cards.
 * Matches exact card dimensions to prevent CLS.
 */
export default function CardSkeleton() {
    return (
        <div className="glass-card p-6 flex flex-col gap-4 min-h-[220px]">
            {/* Top label */}
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
                <div className="h-3 w-24 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col gap-3 mt-2">
                <div className="h-4 w-3/4 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
                <div className="h-3 w-full rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
                <div className="h-3 w-5/6 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
            </div>

            {/* Bottom row */}
            <div className="flex items-center gap-3 mt-auto pt-2">
                <div className="h-3 w-20 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
                <div className="h-3 w-16 rounded-full bg-[var(--bg-highlight-hover)] animate-pulse" />
            </div>
        </div>
    )
}
