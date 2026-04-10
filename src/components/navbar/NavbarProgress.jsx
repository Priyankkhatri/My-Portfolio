import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function NavbarProgress({
    isCompact,
    isIdle,
    progress,
    reducedMotion,
    transitionProfile,
    tokens,
}) {
    const progressValue = useMotionValue(progress)
    const progressSpring = useSpring(progressValue, {
        stiffness: 180,
        damping: 28,
        mass: 0.3,
    })

    useEffect(() => {
        progressValue.set(progress)
    }, [progress, progressValue])

    const tokenSet = isCompact ? tokens.compact : tokens.active

    return (
        <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.78)] to-[rgba(167,139,250,0.72)]"
            style={{
                scaleX: reducedMotion ? progress : progressSpring,
                boxShadow: `0 0 6px rgba(96,165,250,${isIdle ? 0.16 : 0.3})`,
            }}
            initial={false}
            animate={{
                opacity: isIdle ? tokenSet.progressIdleOpacity : tokenSet.progressOpacity,
            }}
            transition={
                reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: transitionProfile.duration,
                        delay: transitionProfile.progressDelay,
                        ease: transitionProfile.ease,
                    }
            }
        />
    )
}
