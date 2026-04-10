import { motion } from 'framer-motion'
import { useState } from 'react'

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

    const tokenSet = isCompact ? tokens.compact : tokens.active
    const widthClass = isMobile ? tokens.mobile.widthClass : tokenSet.widthClass
    const isScrollActive = velocity > 0.03
    const blurBase = isIdle ? tokenSet.idleBlur : tokenSet.blur
    const blurValue = isScrollActive && !isIdle ? blurBase + 2 : blurBase
    const shadowValue = isHovered && isCompact && !isMobile
        ? tokenSet.hoverShadow
        : isScrollActive && !isIdle
          ? tokenSet.scrollShadow
        : isIdle
          ? tokenSet.idleShadow
          : tokenSet.shadow
    const visualTransition = reducedMotion
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

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                paddingTop: tokenSet.top,
                y: isCompact && !isMobile ? -6 : 0,
                scale: isHovered && isCompact && !isMobile && !reducedMotion ? 1.01 : 1,
            }}
            transition={{
                opacity: reducedMotion ? { duration: 0 } : { duration: 0.4, ease: motionTokens.entryEase },
                paddingTop: visualTransition,
                y: visualTransition,
                scale: reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.18, ease: motionTokens.entryEase },
            }}
        >
            <motion.div
                layout
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                    className={`pointer-events-auto relative overflow-hidden ${widthClass}`}
                animate={{
                    borderRadius: tokenSet.radius,
                    paddingTop: tokenSet.paddingY,
                    paddingBottom: tokenSet.paddingY,
                    paddingLeft: tokenSet.paddingX,
                    paddingRight: tokenSet.paddingX,
                    backgroundColor: tokenSet.background,
                    borderWidth: isCompact ? '1px' : '0px 0px 1px 0px',
                    borderStyle: 'solid',
                    borderColor: isCompact ? 'rgba(0, 140, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                    boxShadow: shadowValue,
                    backdropFilter: `blur(${blurValue}px)`,
                    WebkitBackdropFilter: `blur(${blurValue}px)`,
                    opacity: 1,
                }}
                transition={{
                    layout: visualTransition,
                    borderRadius: visualTransition,
                    paddingTop: visualTransition,
                    paddingBottom: visualTransition,
                    paddingLeft: visualTransition,
                    paddingRight: visualTransition,
                    backgroundColor: visualTransition,
                    borderWidth: visualTransition,
                    borderColor: calmTransition,
                    boxShadow: calmTransition,
                    backdropFilter: calmTransition,
                    WebkitBackdropFilter: calmTransition,
                    opacity: visualTransition,
                }}
            >
                <motion.div
                    className="pointer-events-none absolute inset-0 -z-10"
                    animate={{ opacity: isCompact ? 0 : 1 }}
                    transition={visualTransition}
                    style={{
                        background: 'linear-gradient(to bottom, rgba(10, 20, 45, 0.9), rgba(10, 20, 45, 0.65))',
                    }}
                />
                <motion.div
                    className="pointer-events-none absolute inset-0 -z-10"
                    animate={{ opacity: isCompact ? 1 : 0 }}
                    transition={visualTransition}
                    style={{
                        background: 'linear-gradient(120deg, rgba(10, 20, 45, 0.85), rgba(5, 10, 30, 0.75))',
                    }}
                />

                {!reducedMotion && (
                    <motion.div
                        className="pointer-events-none absolute inset-y-0 left-[-20%] w-[34%]"
                        animate={{ x: ['0%', '360%'] }}
                        transition={{
                            duration: 12,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                            opacity: 0.45,
                        }}
                    />
                )}

                <motion.div
                    className="pointer-events-none absolute inset-x-2 top-0 h-px"
                    animate={{
                        opacity: tokenSet.highlightOpacity * (isIdle ? 0.62 : 1),
                    }}
                    transition={calmTransition}
                    style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.1), rgba(255,255,255,0.06))',
                    }}
                />

                <motion.div
                    className="pointer-events-none absolute inset-[1px] rounded-[inherit]"
                    animate={{
                        opacity: tokenSet.borderGlowOpacity * (isIdle ? 0.55 : 1),
                    }}
                    transition={calmTransition}
                    style={{
                        border: '1px solid transparent',
                        background: 'linear-gradient(120deg, rgba(96,165,250,0.15), rgba(96,165,250,0.02), rgba(167,139,250,0.12)) border-box',
                        mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                    }}
                />

                {children}
            </motion.div>
        </motion.div>
    )
}
