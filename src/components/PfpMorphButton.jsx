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
import { useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const prefersReducedMotion = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function PfpMorphButton() {
    const isLoaded = useStore((s) => s.isLoaded)
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const { pathname } = useLocation()
    const isHomePage = pathname === '/'

    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    )
    const [mobileVisible, setMobileVisible] = useState(false)

    const rafId = useRef(null)
    const naturalRect = useRef(null)
    const wasBtn = useRef(false)
    const smoothed = useRef({ p: 0, lastP: -1, lastScrollY: -1 })
    const maxScrollRef = useRef(0)

    // ── Reset all scroll-dependent state on route change ──
    useEffect(() => {
        // Always reset morph state on any route change
        setMobileVisible(false)
        smoothed.current = { p: 0, lastP: -1, lastScrollY: -1 }
        wasBtn.current = false
        naturalRect.current = null
        maxScrollRef.current = 0

        // Helper: nuke every inline style the morph could have set
        const resetEl = () => {
            const el = document.getElementById('heroPfpFrame')
            if (el) {
                // Completely clear and restore initial state
                el.style.cssText = '' 
                el.style.pointerEvents = 'none'
                el.classList.remove('hero-pfp--button-mode')
                el.classList.add('group')
                el.setAttribute('tabindex', '-1')
                el.removeAttribute('aria-label')
                
                // Allow CSS to reclaim control of positioning and sizing
                el.style.position = ''
                el.style.top = ''
                el.style.left = ''
                el.style.width = ''
                el.style.height = ''
            }
            const rings = document.getElementById('heroPfpRings')
            if (rings) {
                rings.style.transform = ''
                rings.style.opacity = ''
                rings.style.zIndex = ''
            }
            const arrow = document.getElementById('heroPfpArrow')
            if (arrow) arrow.style.opacity = '0'
        }

        // Try immediately, then multiple times during the route transition period
        resetEl()
        const t1 = setTimeout(resetEl, 400)
        const t2 = setTimeout(resetEl, 1200)
        const t3 = setTimeout(resetEl, 2400)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [pathname])

    // Wait for the hero entry animation to complete before grabbing bounding client rect.
    const [readyToMeasure, setReadyToMeasure] = useState(false)

    useEffect(() => {
        if (!isLoaded || !isHomePage) {
            setReadyToMeasure(false)
            return
        }
        // Wait for Cyber Shutter + Hero entrance animations to fully complete
        const t = setTimeout(() => setReadyToMeasure(true), 2500)
        return () => clearTimeout(t)
    }, [isLoaded, isHomePage])

    const measure = useCallback(() => {
        const el = document.getElementById('heroPfpFrame')
        if (!el) return false

        // CRITICAL: Clear ALL inline styles before measuring.
        // If we measure while it has inline 'width: 48px' from a previous 
        // morphed state, we will permanently lock it to that tiny size.
        const oldStyle = el.style.cssText
        el.style.cssText = ''

        const r = el.getBoundingClientRect()
        
        // Restore old style so we don't cause a flicker before the loop takes over
        el.style.cssText = oldStyle

        if (r.width === 0) return false

        naturalRect.current = {
            docX: r.left + window.scrollX,
            docY: r.top + window.scrollY,
            size: r.width,
        }
        return true
    }, [])

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

        // Cache the maximal scroll height to prevent synchronous layout thrashing (forced reflow)
        // Recalculate roughly once every few hundred frames or whenever it's 0
        if (maxScrollRef.current === 0 || Math.random() < 0.01) {
            maxScrollRef.current = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ) - vh;
        }
        
        // Ensure maxScroll isn't negative
        const maxScroll = Math.max(0, maxScrollRef.current)

        // Compress the animation safely into the available scrolling space!
        // We want the morph to complete within the first 60% of max scroll or within a fixed 400px window.
        let targetRange = Math.min(maxScroll * 0.6, 400)
        if (targetRange < 100) targetRange = maxScroll // fallback for ultra-short pages
        
        let rangeEnd = targetRange || 1
        let rawP = scrollY / rangeEnd
        if (scrollY >= maxScroll - 5 && maxScroll > 50) rawP = 1

        rawP = Math.min(Math.max(rawP, 0), 1)
        const targetP = prefersReducedMotion() ? (rawP > 0.3 ? 1 : 0) : ease(rawP)

        // Lerp the progress for buttery smooth scroll tracking
        smoothed.current.p = lerp(smoothed.current.p, targetP, 0.1)

        // Force snap at the very edges to avoid infinite micro-decimals
        if (smoothed.current.p < 0.001) smoothed.current.p = 0
        if (smoothed.current.p > 0.999) smoothed.current.p = 1

        const p = smoothed.current.p
        
        // Prevent layout thrashing if completely idle
        if (p === 0 && smoothed.current.lastP === 0) return;
        
        // Only completely pause execution if morph is fully settled AND the user isn't actively scrolling
        if (p === 1 && smoothed.current.lastP === 1 && smoothed.current.lastScrollY === scrollY) return;

        smoothed.current.lastP = p;
        smoothed.current.lastScrollY = scrollY;

        // ── When at the very top, reset all inline styles so Tailwind classes apply cleanly ──
        if (p === 0) {
            el.style.transform = ''
            el.style.position = ''
            el.style.top = ''
            el.style.left = ''
            el.style.right = ''
            el.style.bottom = ''
            el.style.width = ''
            el.style.height = ''
            el.style.transformOrigin = ''
            el.style.border = ''
            el.style.boxShadow = ''
            el.style.outline = ''
            el.style.outlineOffset = ''
            el.style.cursor = ''
            el.style.pointerEvents = 'none'

            if (rings) {
                rings.style.transform = ''
                rings.style.opacity = ''
            }

            const arrow = document.getElementById('heroPfpArrow')
            if (arrow) arrow.style.opacity = '0'

            if (wasBtn.current) {
                wasBtn.current = false
                el.classList.remove('hero-pfp--button-mode')
                el.classList.add('group')
                el.setAttribute('tabindex', '-1')
                el.removeAttribute('aria-label')
            }
            return
        }

        // ── Morphing is active (p > 0) ──

        // Sizing Targets
        const TARGET_SIZE = 48
        const PAD = vw < 768 ? 24 : 40 // Mobile vs Desktop padding

        // Sizing & Positioning Targets
        const currentSize = ho.size + (TARGET_SIZE - ho.size) * p
        const scale = currentSize / ho.size

        const targetVX = vw - TARGET_SIZE - PAD
        const targetVY = vh - TARGET_SIZE - PAD

        const naturalVX = ho.docX - window.scrollX
        const naturalVY = ho.docY - window.scrollY

        const deltaX = targetVX - naturalVX
        const deltaY = targetVY - naturalVY

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
        el.style.pointerEvents = p > 0.1 ? 'auto' : 'none'

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

            rings.style.transformOrigin = 'center';
            rings.style.transform = `translate3d(${ringTx}px, ${ringTy}px, 0) scale(${ringScale})`;
            rings.style.opacity = ringOpacity;
            rings.style.zIndex = '9999';
        }

        const isBtn = p >= 0.7
        if (isBtn !== wasBtn.current) {
            wasBtn.current = isBtn
            if (isBtn) {
                el.classList.add('hero-pfp--button-mode')
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

    // Main rAF setup
    useEffect(() => {
        if (!isLoaded) return

        // ── Case 1: Not on Home Page ──
        // On other routes (About, Work), we just show a simple static scroll-to-top button.
        if (!isHomePage) {
            const onScroll = () => setMobileVisible(window.scrollY > 400)
            window.addEventListener('scroll', onScroll, { passive: true })
            // Initialize state immediately in case we're already scrolled
            onScroll()
            return () => window.removeEventListener('scroll', onScroll)
        }

        // ── Case 2: On Home Page ──
        // Complex morphing logic depends on the Hero section being ready to measure.
        if (!readyToMeasure) return

        const desktop = window.innerWidth >= 1024
        setIsDesktop(desktop)

        if (!desktop) {
            const onScroll = () => setMobileVisible(window.scrollY > 400)
            window.addEventListener('scroll', onScroll, { passive: true })
            onScroll()
            return () => window.removeEventListener('scroll', onScroll)
        }

        // Initialize measuring and loop for Desktop Home
        let retryTimeout = null
        let resizeTimeout = null
        
        const init = () => {
            const success = measure()
            // If measure fails OR the Hero section is anomalously pushed way down the page 
            // (e.g. due to the old route still exiting above it), wait for layout to settle.
            if (!success || (naturalRect.current && naturalRect.current.docY > window.innerHeight * 1.2)) {
                retryTimeout = setTimeout(init, 200)
                return
            }

            // Make sure it remains above everything during scroll morphing
            const el = document.getElementById('heroPfpFrame')
            if (el) el.style.zIndex = '10000'

            rafId.current = requestAnimationFrame(loop)

            const onResize = () => {
                clearTimeout(resizeTimeout)
                resizeTimeout = setTimeout(() => {
                    const nowDesktop = window.innerWidth >= 1024
                    setIsDesktop(nowDesktop)

                    if (nowDesktop) {
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

                        measure()
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
            
            // Expose cleanup inside a closure or manage outside
            cleanupFn = () => {
                if (rafId.current) cancelAnimationFrame(rafId.current)
                clearTimeout(resizeTimeout)
                window.removeEventListener('resize', onResize)
                const el = document.getElementById('heroPfpFrame')
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
        }

        let cleanupFn = null
        init()

        return () => {
            clearTimeout(retryTimeout)
            if (cleanupFn) cleanupFn()
        }
    }, [readyToMeasure, loop, measure, isHomePage])

    const scrollToTopFallback = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <AnimatePresence>
            {((!isDesktop && mobileVisible) || (!isHomePage && mobileVisible)) && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={scrollToTopFallback}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="!fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[10000] w-12 h-12 rounded-full overflow-hidden border-2 border-[#60a5fa]/40 shadow-[0_0_20px_rgba(96,165,250,0.3)] bg-[var(--bg-primary)] group active:scale-95 transition-all duration-300"
                    aria-label="Back to top"
                >
                    {/* The same PFP image used in the fallback button */}
                    <img 
                      src="https://res.cloudinary.com/dqvpsorso/image/upload/v1775455094/compressed-pfp_ibccwh.png" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      alt="Back to top"
                    />
                    
                    {/* Overlay Arrow on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
