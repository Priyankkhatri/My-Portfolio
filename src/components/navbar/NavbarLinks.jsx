import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function DesktopNavLink({
    item,
    isCompact,
    reducedMotion,
    setCursorVariant,
    motion: motionTokens,
    pulsePath,
}) {
    return (
        <NavLink
            to={item.to}
            end={item.exact}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group relative inline-flex h-11 items-center rounded-full px-1"
        >
            {({ isActive }) => (
                <motion.span
                    variants={{
                        active: {
                            opacity: 1,
                            paddingLeft: isCompact ? 14 : 16,
                            paddingRight: isCompact ? 14 : 16,
                        },
                        compact: {
                            opacity: 1,
                            paddingLeft: 14,
                            paddingRight: 14,
                        },
                    }}
                    whileHover={reducedMotion ? undefined : { scale: 1.015 }}
                    transition={
                        reducedMotion
                            ? { duration: 0 }
                            : {
                                opacity: { duration: motionTokens.hoverDuration },
                                paddingLeft: { duration: 0.18, ease: motionTokens.entryEase },
                                paddingRight: { duration: 0.18, ease: motionTokens.entryEase },
                                scale: { type: 'spring', stiffness: 500, damping: 35 },
                            }
                    }
                    className={`inline-flex min-w-[88px] items-center justify-center rounded-full py-2.5 text-sm transition-all duration-200 ${
                        isActive
                            ? 'bg-[rgba(96,165,250,0.12)] font-semibold text-[rgba(232,237,245,0.98)]'
                            : 'bg-transparent font-medium text-[var(--text-secondary)] hover:bg-[rgba(96,165,250,0.07)] hover:text-[var(--text-primary)]'
                    }`}
                    animate={
                        pulsePath === item.to && isActive && !reducedMotion
                            ? {
                                filter: ['brightness(1)', 'brightness(1.05)', 'brightness(1)'],
                            }
                            : { filter: 'brightness(1)' }
                    }
                >
                    <span className="pointer-events-none">{item.label}</span>
                </motion.span>
            )}
        </NavLink>
    )
}

export default function NavbarLinks({
    items,
    isCompact,
    reducedMotion,
    setCursorVariant,
    statePhase,
    transitionProfile,
    motion: motionTokens,
}) {
    const location = useLocation()
    const [pulsePath, setPulsePath] = useState(location.pathname)

    useEffect(() => {
        setPulsePath(location.pathname)

        const timeoutId = window.setTimeout(() => {
            setPulsePath('')
        }, 220)

        return () => window.clearTimeout(timeoutId)
    }, [location.pathname])

    return (
        <motion.div
            className="flex min-w-0 items-center rounded-full bg-white/[0.03] p-1"
            initial={false}
            animate={statePhase}
            variants={{
                active: {
                    transition: reducedMotion
                        ? { duration: 0 }
                        : {
                            delayChildren: transitionProfile.childDelay,
                            staggerChildren: transitionProfile.stagger,
                        },
                },
                compact: {
                    transition: reducedMotion
                        ? { duration: 0 }
                        : {
                            delayChildren: transitionProfile.childDelay,
                            staggerChildren: transitionProfile.stagger,
                        },
                },
            }}
        >
            {items.map((item) => (
                <DesktopNavLink
                    key={item.to}
                    item={item}
                    isCompact={isCompact}
                    reducedMotion={reducedMotion}
                    setCursorVariant={setCursorVariant}
                    motion={motionTokens}
                    pulsePath={pulsePath}
                />
            ))}
        </motion.div>
    )
}
