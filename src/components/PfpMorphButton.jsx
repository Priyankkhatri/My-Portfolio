/**
 * PfpMorphLogic
 *
 * This completely DOM-driven approach takes the ACTUAL `#heroPfpFrame` container inside
 * `Hero.jsx` and applies transforms on scroll. No clones. No duplicates.
 *
 * This calculates exactly where the element's natural un-transformed position is on
 * screen, factors in window.scrollY, and translates its delta to pin it to
 * the bottom right corner when fully scrolled.
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function PfpMorphButton() {
    const isLoaded = useStore((s) => s.isLoaded)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    )
    const [mobileVisible, setMobileVisible] = useState(false)

    const rafId = useRef(null)
    const naturalRect = useRef(null)
    const wasBtn = useRef(false)

    // Wait for the hero entry animation to complete before grabbing bounding client rect.
    const [readyToMeasure, setReadyToMeasure] = useState(false)

    useEffect(() => {
        if (!isLoaded) return
        const t = setTimeout(() => setReadyToMeasure(true), 1800)
        return () => clearTimeout(t)
    }, [isLoaded])

    const measure = useCallback(() => {
        const el = document.getElementById('heroPfpFrame')
        if (!el) return false

        // Temporarily clear any transform so it reports its standard DOM position
        const oldTrans = el.style.transform
        el.style.transform = 'none'

        const r = el.getBoundingClientRect()
        el.style.transform = oldTrans

        if (r.width === 0) return false

        naturalRect.current = {
            docX: r.left + window.scrollX,
            docY: r.top + window.scrollY,
            size: r.width,
        }
        return true
    }, [])

    // Store smoothed values outside the tick to persist across frames
    const smoothed = useRef({ p: 0 })

    // Linear interpolation for buttery smoothness
    const lerp = (start, end, factor) => start + (end - start) * factor

    const tick = useCallback(() => {
        const el = document.getElementById('heroPfpFrame')
        const rings = document.getElementById('heroPfpRings')
        if (!el || !naturalRect.current) return

        const ho = naturalRect.current
        const scrollY = window.scrollY
        const vh = window.innerHeight
        const vw = window.innerWidth

        // Calculate raw scroll progress p
        const rangeEnd = Math.max(ho.docY + ho.size, vh * 0.85)

        // Also figure out what the absolute furthest we can scroll is
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        )
        const maxScroll = docHeight - vh

        // Let it naturally reach 1 at rangeEnd, but guarantee it is 1 if we're near maxScroll
        let rawP = scrollY / rangeEnd
        if (scrollY >= maxScroll - 10) rawP = 1

        rawP = Math.min(Math.max(rawP, 0), 1)
        const targetP = prefersReducedMotion() ? (rawP > 0.3 ? 1 : 0) : ease(rawP)

        // Lerp the progress for buttery smooth scroll tracking
        smoothed.current.p = lerp(smoothed.current.p, targetP, 0.1)

        // Force snap at the very edges to avoid infinite micro-decimals
        if (smoothed.current.p < 0.001) smoothed.current.p = 0
        if (smoothed.current.p > 0.999) smoothed.current.p = 1

        const p = smoothed.current.p

        // Sizing Targets
        const TARGET_SIZE = 48
        const PAD = vw < 768 ? 24 : 40 // Mobile vs Desktop padding

        // Sizing & Positioning Targets
        const currentSize = ho.size + (TARGET_SIZE - ho.size) * p
        const scale = currentSize / ho.size

        // The morph fundamentally changes how the element is positioned
        // At p=0, it's relative to its native position in Hero layout.
        // At p>0, we mathematically pull it toward the bottom-right of the viewport window

        const targetVX = vw - TARGET_SIZE - PAD
        const targetVY = vh - TARGET_SIZE - PAD

        const naturalVX = ho.docX - window.scrollX
        const naturalVY = ho.docY - window.scrollY

        const deltaX = targetVX - naturalVX
        const deltaY = targetVY - naturalVY

        // CSS STACKING CONTEXT BUG: 
        // We cannot use position: fixed. The parent <motion.div> in App.jsx applies 
        // opacity/transforms which creates a new containing block, breaking position: fixed.
        // Therefore, we MUST keep position: absolute and mathematically pin it to the scroll window.

        el.style.position = 'absolute'
        el.style.bottom = 'auto'
        el.style.right = 'auto'
        el.style.left = '3rem' // inset-12 corresponds to 3rem
        el.style.top = '3rem'
        el.style.width = `${ho.size}px`
        el.style.height = `${ho.size}px`
        el.style.transformOrigin = '0 0'

        const tx = deltaX * p
        const ty = deltaY * p

        // If p >= 0.99, lock it perfectly to the target delta rather than interpolating
        if (p >= 0.99) {
            el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`
        } else {
            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
        }

        // Add blue border / glow as it morphs
        const bA = 0.15 + (0.45 - 0.15) * p
        el.style.border = `1.5px solid rgba(96,165,250,${bA})`

        const sA = 0.45 * p
        el.style.boxShadow = `0 0 ${28 * p}px ${8 * p}px rgba(96,165,250,${sA})`

        // Clear ring effect (optional halo)
        const haloW = 4 * (1 - p)
        const haloA = 0.15 * (1 - p)
        el.style.outline = `${haloW}px solid rgba(167,139,250,${haloA})`
        el.style.outlineOffset = `${6 * (1 - p)}px`

        // Reveal the arrow inside the hero frame
        const arrow = document.getElementById('heroPfpArrow')
        if (arrow) {
            arrow.style.opacity = p > 0.8 ? (p - 0.8) / 0.2 : 0
        }

        // Animate the concentric rings to follow the center and shrink
        if (rings) {
            const ringTx = tx + currentSize / 2 - ho.size / 2;
            const ringTy = ty + currentSize / 2 - ho.size / 2;

            // Fade out smoothly and shrink into the moving center
            const ringScale = Math.max(0, 1 - p * 1.2);
            const ringOpacity = Math.max(0, 1 - p * 1.5);

            // If the parent goes fixed, rings disappear entirely anyway, keep them absolute
            rings.style.transformOrigin = 'center';
            rings.style.transform = `translate3d(${ringTx}px, ${ringTy}px, 0) scale(${ringScale})`;
            rings.style.opacity = ringOpacity;
            // ensure it remains behind the image
            rings.style.zIndex = '9999';
        }

        const isBtn = p >= 0.99
        if (isBtn !== wasBtn.current) {
            wasBtn.current = isBtn
            if (isBtn) {
                el.classList.add('hero-pfp--button-mode')
                // Remove Hero's original group hover so button feels standalone
                el.classList.remove('group')
                el.setAttribute('tabindex', '0')
                el.setAttribute('aria-label', 'Back to top')
                el.style.cursor = 'pointer'
            } else {
                el.classList.remove('hero-pfp--button-mode')
                el.classList.add('group')
                el.setAttribute('tabindex', '-1')
                el.removeAttribute('aria-label')
                el.style.cursor = 'default'
            }
        }
    }, [])

    const loop = useCallback(() => {
        tick()
        rafId.current = requestAnimationFrame(loop)
    }, [tick])

    // Interaction Handlers (attached natively)
    useEffect(() => {
        const el = document.getElementById('heroPfpFrame')
        if (!el) return

        const onClick = () => {
            if (wasBtn.current) window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const onKeyDown = (e) => {
            if (wasBtn.current && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }

        const enterHover = () => wasBtn.current && setCursorVariant('hover')
        const leaveHover = () => wasBtn.current && setCursorVariant('default')

        el.addEventListener('click', onClick)
        el.addEventListener('keydown', onKeyDown)
        el.addEventListener('mouseenter', enterHover)
        el.addEventListener('mouseleave', leaveHover)

        return () => {
            el.removeEventListener('click', onClick)
            el.removeEventListener('keydown', onKeyDown)
            el.removeEventListener('mouseenter', enterHover)
            el.removeEventListener('mouseleave', leaveHover)
        }
    }, [setCursorVariant])

    // Main rAF setup
    useEffect(() => {
        if (!readyToMeasure) return

        const desktop = window.innerWidth >= 1024
        setIsDesktop(desktop)

        if (!desktop) {
            const onScroll = () => setMobileVisible(window.scrollY > 400)
            window.addEventListener('scroll', onScroll, { passive: true })
            return () => window.removeEventListener('scroll', onScroll)
        }

        // Initialize measuring
        if (!measure()) {
            // retry if DOM slow
            const t = setTimeout(measure, 500)
            return () => clearTimeout(t)
        }

        // Make sure it remains above everything during scroll morphing
        const el = document.getElementById('heroPfpFrame')
        if (el) el.style.zIndex = '10000'

        rafId.current = requestAnimationFrame(loop)

        let rt
        const onResize = () => {
            clearTimeout(rt)
            rt = setTimeout(() => {
                const nowDesktop = window.innerWidth >= 1024
                setIsDesktop(nowDesktop)

                if (nowDesktop) {
                    // PRE-MEASURE: We must completely strip any JS positioning 
                    // from the elements while measuring so the tracker doesn't 
                    // accidentally learn the "scrolled/morphed" position as home.
                    const frame = document.getElementById('heroPfpFrame')
                    const rings = document.getElementById('heroPfpRings')

                    if (frame) {
                        frame.style.transform = 'none'
                        frame.style.position = 'absolute'
                        frame.style.top = '3rem'
                        frame.style.left = '3rem'
                        frame.style.bottom = '3rem'
                        frame.style.right = '3rem'
                        frame.style.width = 'auto'
                        frame.style.height = 'auto'
                        frame.classList.remove('hero-pfp--button-mode')
                    }
                    if (rings) {
                        rings.style.transform = 'none'
                        rings.style.opacity = '1'
                    }

                    // Now measure the pure layout
                    measure()

                    // The rAF loop will immediately re-apply the correct 
                    // morph transforms on the next tick based on current scroll.
                } else {
                    if (rafId.current) cancelAnimationFrame(rafId.current)
                    const frame = document.getElementById('heroPfpFrame')
                    if (frame) {
                        frame.style.transform = 'none'
                        frame.style.position = 'absolute'
                        frame.classList.remove('hero-pfp--button-mode')
                    }
                    const rings = document.getElementById('heroPfpRings')
                    if (rings) {
                        rings.style.transform = 'none'
                        rings.style.opacity = '1'
                    }
                }
            }, 250) // slightly longer debounce for layout settling
        }
        window.addEventListener('resize', onResize, { passive: true })

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current)
            clearTimeout(rt)
            window.removeEventListener('resize', onResize)
            // Cleanup visually if unmounted
            if (el) {
                el.style.transform = 'none'
                el.classList.remove('hero-pfp--button-mode')
            }
            const rings = document.getElementById('heroPfpRings')
            if (rings) {
                rings.style.transform = 'none'
                rings.style.opacity = '1'
            }
        }
    }, [readyToMeasure, loop, measure])

    const scrollToTopFallback = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <AnimatePresence>
            {!isDesktop && mobileVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={scrollToTopFallback}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="!fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[10000] p-4 rounded-full glass-card glass-card-hover group border border-[#60a5fa]/20 bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-lg shadow-[#60a5fa]/10 hover:shadow-[#60a5fa]/30 hover:border-[#60a5fa]/50 transition-all duration-300 lg:hidden"
                    aria-label="Back to top"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] relative z-10"
                    >
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
