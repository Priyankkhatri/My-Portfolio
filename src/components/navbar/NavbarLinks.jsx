import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function DesktopNavLink({
    item,
    isCompact,
    reducedMotion,
    setCursorVariant,
    motion: motionTokens,
    pulsePath,
}) {
    const linkRef = useRef(null)
    const [lightPos, setLightPos] = useState({ x: 50, y: 50 })
    const [isLinkHovered, setIsLinkHovered] = useState(false)

    const handleMouseMove = useCallback((e) => {
        if (reducedMotion || !linkRef.current) return
        const rect = linkRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setLightPos({ x, y })
    }, [reducedMotion])

    return (
        <NavLink
            to={item.to}
            end={item.exact}
            ref={linkRef}
            onMouseEnter={() => {
                setCursorVariant('hover')
                setIsLinkHovered(true)
            }}
            onMouseLeave={() => {
                setCursorVariant('default')
                setIsLinkHovered(false)
            }}
            onMouseMove={handleMouseMove}
            className="group relative inline-flex h-10 items-center rounded-full px-0.5"
        >
            {({ isActive }) => (
                <>
                    {/* Active capsule background */}
                    {isActive && (
                        <motion.span
                            layoutId="nav-active-capsule"
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 32,
                                mass: 0.8,
                            }}
                        />
                    )}

                    {/* Light field hover — cursor-following radial glow */}
                    {isLinkHovered && !reducedMotion && (
                        <motion.span
                            className="pointer-events-none absolute inset-0 rounded-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                background: `radial-gradient(circle 60px at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.07), transparent)`,
                            }}
                        />
                    )}

                    <motion.span
                        variants={{
                            active: {
                                opacity: 1,
                                paddingLeft: isCompact ? 12 : 14,
                                paddingRight: isCompact ? 12 : 14,
                            },
                            compact: {
                                opacity: 1,
                                paddingLeft: 12,
                                paddingRight: 12,
                            },
                        }}
                        transition={
                            reducedMotion
                                ? { duration: 0 }
                                : {
                                    opacity: { duration: motionTokens.hoverDuration },
                                    paddingLeft: { duration: 0.18, ease: motionTokens.entryEase },
                                    paddingRight: { duration: 0.18, ease: motionTokens.entryEase },
                                }
                        }
                        className={`relative z-[1] inline-flex items-center justify-center text-[13px] tracking-wide transition-all duration-200 ${
                            isActive
                                ? 'font-semibold text-[rgba(232,237,245,0.98)]'
                                : 'font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                        }`}
                        style={{
                            transform: isLinkHovered && !reducedMotion ? 'translateY(-0.5px)' : 'translateY(0)',
                            transition: 'transform 0.2s ease',
                        }}
                        animate={
                            pulsePath === item.to && isActive && !reducedMotion
                                ? {
                                    filter: ['brightness(1)', 'brightness(1.04)', 'brightness(1)'],
                                }
                                : { filter: 'brightness(1)' }
                        }
                    >
                        <span className="pointer-events-none">{item.label}</span>
                    </motion.span>
                </>
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
            className="flex min-w-0 items-center rounded-full bg-white/[0.02] p-0.5"
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
