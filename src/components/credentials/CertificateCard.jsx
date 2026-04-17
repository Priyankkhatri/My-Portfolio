import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'

export default function CertificateCard({
    cert,
    index,
    activeIndex,
    goTo,
    isMobile,
    prefersReducedMotion,
    total,
}) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const cardRef = useRef(null)
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glintX: 50, glintY: 50 })

    let offset = index - activeIndex

    const isActive = offset === 0
    const isAdjacent = Math.abs(offset) === 1
    const isVisible = Math.abs(offset) <= 2 
    const isBehind = offset > 0

    const handleMouseMove = useCallback(
        (e) => {
            if (isMobile || !isActive || prefersReducedMotion) return
            const card = cardRef.current
            if (!card) return
            const rect = card.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            setTilt({ 
                rotateY: (x - 0.5) * 12, 
                rotateX: (y - 0.5) * -12,
                glintX: x * 100,
                glintY: y * 100
            })
        },
        [isMobile, isActive, prefersReducedMotion]
    )

    const handleMouseLeave = useCallback(() => {
        setTilt({ rotateX: 0, rotateY: 0, glintX: 50, glintY: 50 })
    }, [])

    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        if (!isActive) {
            goTo(index)
        } else {
            setIsClicked(true)
            setTimeout(() => setIsClicked(false), 300)
        }
    }

        const getAnimate = () => {
        // PRD Layout Constraints: fit cards within viewport without layout breach
        const VERTICAL_SPACING = 165 
        const HORIZONTAL_SPACING = 280 
        
        const base = {
            rotateX: tilt.rotateX, 
            rotateY: tilt.rotateY,
        }

        if (isMobile) {
            // Horizontal Carousel Mobile Logic
            return {
                ...base,
                x: offset * HORIZONTAL_SPACING,
                y: 0,
                scale: offset === 0 ? 1.02 : 0.85,
                opacity: offset === 0 ? 1 : Math.abs(offset) <= 1 ? 0.35 : 0,
            }
        }
        
        // Vertical Floating Stack Desktop Logic
        const verticalAnimate = {
            ...base,
            y: offset * VERTICAL_SPACING,
            x: 0,
        }

        if (isActive) {
            return {
                ...verticalAnimate,
                scale: isClicked ? 1.12 : 1.08, 
                opacity: 1,
            }
        }
        
        if (isAdjacent) {
            return {
                ...verticalAnimate,
                scale: 0.82,
                opacity: 0.35,
            }
        }

        return { 
            ...verticalAnimate, 
            scale: 0.70, 
            opacity: 0,
        }
    }

    // Clean and modern: subtle inner glow and very gentle drop shadow on active hover instead of loud outer glow
    const hoverStyle =
        !isMobile && isActive && !prefersReducedMotion
            ? {
                  scale: 1.10, 
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.06)',
                  transition: { type: 'spring', stiffness: 350, damping: 20 }
              }
            : {}

    // Adjacent: subtle scale down on hover (0.83)
    const adjacentHoverStyle =
        !isMobile && isAdjacent && !prefersReducedMotion ? { scale: 0.83, opacity: 0.7 } : {}

    // Smooth spring animation with more pronounced bounce/snapping
    const springTransition = { type: 'spring', stiffness: 280, damping: 22, mass: 0.9 }

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={getAnimate()}
            whileHover={isActive ? hoverStyle : adjacentHoverStyle}
            transition={prefersReducedMotion ? { duration: 0.15 } : springTransition}
            style={{
                // PRD: Active zIndex 10, Adjacent zIndex 5
                zIndex: isActive ? 10 : isAdjacent ? 5 : 1, 
                visibility: isVisible ? 'visible' : 'hidden',
                perspective: 800,
            }}
        >
                {/* Active Card Reflection (rendered below the card) */}
                {isActive && cert.image && (
                    <div
                        className="absolute -bottom-8 left-0 w-full aspect-[4/3] rounded-xl pointer-events-none"
                        style={{
                            backgroundImage: `url(${cert.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: isMobile ? 0.08 : 0.15 + (Math.abs(tilt.rotateX) + Math.abs(tilt.rotateY)) * 0.005,
                            transform: `scaleY(-1) translateY(12px) skewX(${tilt.rotateY * 0.5}deg)`,
                            maskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 100%)',
                            willChange: 'transform, opacity',
                            transition: isMobile ? 'none' : 'opacity 0.4s ease, transform 0.4s ease'
                        }}
                    />
                )}

                <div
                    ref={cardRef}
                    id={`cert-card-${index}`}
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => isVisible && setCursorVariant('hover')}
                    onMouseOut={() => setCursorVariant('default')}
                    className={`w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden bg-[var(--bg-highlight)] shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)] relative select-none ${isVisible ? 'pointer-events-auto' : ''}`}
                    style={{
                        cursor: isActive ? 'default' : 'pointer',
                        transformStyle: 'preserve-3d',
                    }}
                    role="button"
                    tabIndex={isVisible ? 0 : -1}
                    aria-label={`${cert.title} by ${cert.issuer}${isActive ? ' (active)' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                >
                    {cert.image ? (
                        <img
                            src={cert.image}
                            alt={`${cert.title} Certificate`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-secondary)]">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="4" width="18" height="16" rx="2" />
                                <path d="M7 8h10M7 12h6M7 16h3" />
                                <circle cx="17" cy="15" r="2" />
                            </svg>
                        </div>
                    )}
                    
                    {/* Dynamic Glint (Shiny Effect) */}
                    {isActive && !isMobile && (
                        <div 
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                background: `radial-gradient(circle at ${tilt.glintX}% ${tilt.glintY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
                                mixBlendMode: 'soft-light'
                            }}
                        />
                    )}

                    {/* Subtle dark gradient to give depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                    
                    {/* Gentle highlight ring to define edges without making it a box */}
                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
                </div>
        </motion.div>
    )
}
