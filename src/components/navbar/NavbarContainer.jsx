import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function NavbarContainer({
    children,
    isCompact,
    isIdle,
    isMobile,
    reducedMotion,
    statePhase,
    transitionProfile,
    tokens,
    velocity,
    motion: motionTokens,
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [breathPhase, setBreathPhase] = useState(0)
    const breathRef = useRef(null)

    const tokenSet = isCompact ? tokens.compact : tokens.active
    const widthClass = isMobile ? tokens.mobile.widthClass : tokenSet.widthClass
    const isScrollActive = velocity > 0.03
    const blurBase = isIdle ? tokenSet.idleBlur : tokenSet.blur
    const blurValue = isScrollActive && !isIdle ? blurBase + 4 : blurBase
    const saturateValue = tokenSet.saturate || 100
    const shadowValue = isHovered && isCompact && !isMobile
        ? tokenSet.hoverShadow
        : isScrollActive && !isIdle
          ? tokenSet.scrollShadow
        : isIdle
          ? tokenSet.idleShadow
          : tokenSet.shadow

    const morphTransition = reducedMotion
        ? { duration: 0 }
        : {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        }
    const calmTransition = reducedMotion
        ? { duration: 0 }
        : {
            duration: isIdle ? motionTokens.idleDuration : motionTokens.restoreDuration,
            ease: isIdle ? motionTokens.idleEase : motionTokens.entryEase,
        }

    // Breathing effect — subtle opacity pulse every ~7s
    useEffect(() => {
        if (reducedMotion) return

        const cycle = () => {
            setBreathPhase((p) => (p === 0 ? 1 : 0))
            breathRef.current = window.setTimeout(cycle, 7000)
        }

        breathRef.current = window.setTimeout(cycle, 7000)
        return () => {
            if (breathRef.current) window.clearTimeout(breathRef.current)
        }
    }, [reducedMotion])

    const breathOpacity = reducedMotion ? 1 : (breathPhase === 0 ? 1 : 0.98)

    // Compute lift via transform only — top stays 0 always
    const liftY = isCompact && !isMobile ? -8 : 0
    const morphScale = isHovered && isCompact && !isMobile && !reducedMotion
        ? 1.01
        : (isCompact && !isMobile && !reducedMotion ? 0.97 : 1)

    return (
        <motion.div
            layout
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`pointer-events-auto relative overflow-hidden ${widthClass}`}
            style={{
                willChange: 'transform',
                transformOrigin: 'center top',
                paddingTop: tokenSet.paddingY,
                paddingBottom: tokenSet.paddingY,
                paddingLeft: tokenSet.paddingX,
                paddingRight: tokenSet.paddingX,
                marginTop: isCompact && !isMobile ? 16 : 0,
            }}
            animate={{
                // Transform-only properties (no layout shift)
                y: liftY,
                scale: morphScale,
                opacity: breathOpacity,

                // Visual properties animated smoothly
                borderRadius: tokenSet.radius,
                backgroundColor: tokenSet.background,
                boxShadow: shadowValue,
                backdropFilter: `blur(${blurValue}px) saturate(${saturateValue}%)`,
                WebkitBackdropFilter: `blur(${blurValue}px) saturate(${saturateValue}%)`,
            }}
            transition={{
                // Layout morph — single unified timing
                layout: morphTransition,

                // Transform properties — smooth, no layout shift
                y: morphTransition,
                scale: isHovered
                    ? { duration: 0.22, ease: motionTokens.entryEase }
                    : morphTransition,
                opacity: reducedMotion
                    ? { duration: 0 }
                    : { duration: 3.5, ease: [0.4, 0, 0.2, 1] },

                // Visual morph — same timing as layout
                borderRadius: morphTransition,
                backgroundColor: morphTransition,

                // Calm properties — gradual transitions
                boxShadow: calmTransition,
                backdropFilter: calmTransition,
                WebkitBackdropFilter: calmTransition,
            }}
        >
            {/* Border — rendered as a pseudo layer to avoid animating border-width */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
            />

            {/* Subtle depth gradient */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
                style={{
                    background: 'linear-gradient(to bottom, rgba(12, 16, 28, 0.35), rgba(8, 12, 22, 0.2))',
                }}
            />

            {/* Top edge micro-highlight */}
            <motion.div
                className="pointer-events-none absolute inset-x-6 top-0 h-px"
                animate={{
                    opacity: tokenSet.highlightOpacity * (isIdle ? 0.5 : 1),
                }}
                transition={calmTransition}
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                }}
            />

            {children}
        </motion.div>
    )
}
