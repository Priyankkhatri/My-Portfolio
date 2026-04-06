import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import CertificateCard from './CertificateCard'
import useIsMobile from '../../hooks/useIsMobile'

/**
 * CertificateStack — right panel showing the vertically-stacked card carousel.
 * Desktop: vertical stack with 3 visible cards (active center, ±1 adjacent).
 * Mobile: horizontal drag carousel.
 */
export default function CertificateStack({
    certs,
    activeIndex,
    absoluteIndex,
    goTo,
    handleWheel,
    handleKeyDown,
    prefersReducedMotion,
}) {
    const isMobile = useIsMobile()
    const containerRef = useRef(null)

    /* ── Bind wheel listener (non-passive for preventDefault) ── */
    useEffect(() => {
        const el = containerRef.current
        if (!el || isMobile) return
        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [handleWheel, isMobile])

    if (isMobile) {
        /* ── Mobile: Horizontal carousel ───────────────────── */
        return (
            <div className="relative w-full overflow-hidden" ref={containerRef}>
                <div className="relative w-full flex items-center justify-center" style={{ height: 320 }}>
                    {[-2, -1, 0, 1, 2].map((offset) => {
                        const absIdx = absoluteIndex + offset
                        const wrappedIndex = ((absIdx % certs.length) + certs.length) % certs.length
                        const cert = certs[wrappedIndex]
                        if (!cert) return null

                        return (
                            <CertificateCard
                                key={absIdx}
                                cert={cert}
                                index={absIdx}
                                activeIndex={absoluteIndex}
                                goTo={goTo}
                                isMobile={true}
                                prefersReducedMotion={prefersReducedMotion}
                                total={certs.length}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    /* ── Desktop: Vertical stack ────────────────────────── */
    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative w-full h-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-1)]/30 rounded-3xl"
            role="listbox"
            aria-label="Certificate stack — use arrow keys or scroll to navigate"
            aria-activedescendant={`cert-card-${activeIndex}`}
        >
            {/* Dramatically enhanced vertical light beam (Spotlight) */}
            <div
                className="absolute inset-0 pointer-events-none flex justify-center"
            >
                <div
                    className="w-[180px] h-full"
                    style={{
                        background: `linear-gradient(to bottom, transparent, ${
                            certs[activeIndex]?.themeColor
                                ? certs[activeIndex].themeColor + '30' // Increased to 30%
                                : 'rgba(96, 165, 250, 0.15)'
                        }, transparent)`,
                        filter: 'blur(60px)', // Increased blur
                        transition: 'background 0.8s ease',
                    }}
                />
            </div>

            {/* Cards rendered inside a full-sized relative container */}
            <div className="relative w-full h-full" style={{ maxWidth: 500 }}>
                {[-2, -1, 0, 1, 2].map((offset) => {
                    const absIdx = absoluteIndex + offset
                    const wrappedIndex = ((absIdx % certs.length) + certs.length) % certs.length
                    const cert = certs[wrappedIndex]
                    if (!cert) return null

                    return (
                        <CertificateCard
                            key={absIdx}
                            cert={cert}
                            index={absIdx}
                            activeIndex={absoluteIndex}
                            goTo={goTo}
                            isMobile={false}
                            prefersReducedMotion={prefersReducedMotion}
                            total={certs.length}
                        />
                    )
                })}
            </div>
        </div>
    )
}

