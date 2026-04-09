import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { navConfig } from '../../data/navConfig'

function getModeKey(navState, isMobile) {
    if (isMobile) {
        return 'mobile'
    }

    return navState === 'compact' ? 'compact' : 'active'
}

export default function NavbarContainer({
    navState,
    isMobile,
    isIdle,
    reducedMotion,
    snapInstantly,
    children,
    progress,
}) {
    const previousRef = useRef({
        modeKey: getModeKey(navState, isMobile),
        isIdle,
    })

    const modeKey = getModeKey(navState, isMobile)
    const visuals = navConfig.visuals[modeKey]
    const isCompact = modeKey !== 'active'
    const previous = previousRef.current
    const modeChanged = previous.modeKey !== modeKey
    const idleChanged = previous.isIdle !== isIdle && !modeChanged

    const duration = snapInstantly || reducedMotion
        ? 0
        : idleChanged
          ? navConfig.timing.idleDuration
          : modeKey === 'compact'
            ? navConfig.timing.activeToCompact
            : navConfig.timing.compactToActive

    const transition = {
        duration,
        ease: idleChanged ? 'easeInOut' : navConfig.timing.ease,
        layout: {
            duration,
            ease: idleChanged ? 'easeInOut' : navConfig.timing.ease,
        },
    }

    useEffect(() => {
        previousRef.current = { modeKey, isIdle }
    }, [modeKey, isIdle])

    const minHeight = isMobile
        ? navConfig.mobile.height
        : isCompact
          ? navConfig.desktop.compactHeight
          : navConfig.desktop.height

    const paddingY = isMobile
        ? navConfig.mobile.paddingY
        : isCompact
          ? navConfig.desktop.compactPaddingY
          : navConfig.desktop.paddingY

    const contentPaddingX = isMobile
        ? navConfig.mobile.paddingX
        : isCompact
          ? navConfig.desktop.compactPaddingX
          : navConfig.desktop.paddingX

    const blurValue = isIdle ? visuals.idleBlur : visuals.blur
    const shadowValue = isIdle ? visuals.idleShadow : visuals.shadow
    const offsetY = isMobile
        ? navConfig.mobile.topOffset
        : isCompact
          ? navConfig.desktop.compactTopOffset
          : 0
    const shellWidth = isMobile ? '100%' : isCompact ? 'fit-content' : '100%'
    const shellMaxWidth = isMobile
        ? '100%'
        : isCompact
          ? `${navConfig.desktop.compactMaxWidth}px`
          : '100%'
    const contentMaxWidth = isCompact ? 'none' : `${navConfig.desktop.maxWidth}px`

    return (
        <motion.div
            className={`relative border ${
                isMobile || !isCompact ? 'w-full' : 'mx-auto'
            } overflow-visible`}
            layout
            initial={false}
            animate={{
                y: offsetY,
                borderRadius: visuals.borderRadius,
                paddingTop: paddingY,
                paddingBottom: paddingY,
            }}
            transition={transition}
            style={{
                width: shellWidth,
                maxWidth: shellMaxWidth,
                minHeight,
                backgroundColor: visuals.backgroundColor,
                borderColor: visuals.borderColor,
                boxShadow: shadowValue,
                backdropFilter: `blur(${blurValue}px)`,
                WebkitBackdropFilter: `blur(${blurValue}px)`,
                borderStyle: 'solid',
                borderWidth: 1,
                willChange: 'transform',
                transformOrigin: 'top center',
            }}
        >
            <div
                className={`relative mx-auto flex items-center justify-between gap-4 ${
                    isMobile || !isCompact ? 'w-full' : 'w-auto'
                }`}
                style={{
                    maxWidth: contentMaxWidth,
                    paddingLeft: contentPaddingX,
                    paddingRight: contentPaddingX,
                }}
            >
                {children}
            </div>
            {progress}
        </motion.div>
    )
}
