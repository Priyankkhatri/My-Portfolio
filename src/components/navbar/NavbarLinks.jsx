import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navConfig } from '../../data/navConfig'
import useStore from '../../store/useStore'
import useMagnetic from '../../hooks/useMagnetic'

/**
 * NavbarLinks — Navigation links with spring-animated active indicator.
 * In compact (pill) mode: shorter labels, smaller text, tighter gaps.
 *
 * Enhanced with:
 *   - Magnetic cursor pull (desktop only)
 *   - Background glow bubble on hover
 *   - Animated underline from center
 *   - Micro scale + depth on hover
 *   - Active link persistent glow
 */
export default function NavbarLinks({ compact = false, isMobile = false }) {
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    return (
        <div
            className={`flex items-center ${compact ? 'gap-2.5' : 'gap-5 xl:gap-6'}`}
        >
            {navConfig.links.map((item, index) => (
                <NavLinkItem
                    key={item.label}
                    item={item}
                    compact={compact}
                    isMobile={isMobile}
                    index={index}
                    setCursorVariant={setCursorVariant}
                />
            ))}
        </div>
    )
}

/**
 * NavLinkItem — Individual nav link with premium hover interactions.
 */
function NavLinkItem({ item, compact, isMobile, index, setCursorVariant }) {
    const [isHovered, setIsHovered] = useState(false)
    const { x, y, handleMouseMove, handleMouseLeave } = useMagnetic({
        strength: 0.16,
        disabled: isMobile,
    })

    const onMouseEnter = () => {
        setIsHovered(true)
        setCursorVariant('hover')
    }

    const onMouseLeave = (e) => {
        setIsHovered(false)
        handleMouseLeave(e)
        setCursorVariant('default')
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            animate={{
                x: isMobile ? 0 : x,
                y: isMobile ? 0 : y,
            }}
            transition={{
                type: 'spring',
                stiffness: 350,
                damping: 20,
                mass: 0.5,
            }}
            className="relative overflow-hidden rounded-xl"
        >
            <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                    `relative inline-flex min-h-9 items-center rounded-xl px-2 ${
                        compact ? 'text-xs' : 'text-sm'
                    } tracking-wide nav-link-magnetic ${
                        isActive
                            ? 'text-[var(--text-primary)] nav-link-active-glow'
                            : 'text-[var(--text-secondary)]'
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        {/* ── Background Glow Bubble ──────────── */}
                        <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                                background:
                                    'radial-gradient(ellipse at center, rgba(96,165,250,0.05) 0%, transparent 72%)',
                            }}
                            initial={false}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1 : 0.92,
                            }}
                            transition={{
                                duration: 0.24,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        {/* ── Text with Micro Scale ───────────── */}
                        <motion.span
                            className="relative z-10 block"
                            initial={false}
                            animate={{
                                scale: isHovered ? 1.02 : 1,
                                y: isHovered ? -1 : 0,
                            }}
                            transition={{
                                duration: 0.25,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {compact ? item.shortLabel : item.label}
                        </motion.span>

                        {/* ── Active Indicator (spring-animated) ─ */}
                        {isActive && (
                            <motion.div
                                layoutId="navbar-indicator"
                                className={`absolute -bottom-1 left-0 right-0 ${
                                    compact ? 'h-[1.5px]' : 'h-[2px]'
                                } bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] rounded-full`}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            />
                        )}

                        {/* ── Hover Underline (expands from center) ── */}
                        {!isActive && (
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full"
                                style={{
                                    background:
                                        'linear-gradient(90deg, var(--accent-1), var(--accent-2))',
                                    transformOrigin: 'center',
                                }}
                                initial={false}
                                animate={{
                                    scaleX: isHovered ? 1 : 0,
                                    opacity: isHovered ? 0.55 : 0,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            />
                        )}
                    </>
                )}
            </NavLink>
        </motion.div>
    )
}
