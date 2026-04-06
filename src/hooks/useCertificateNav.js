import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * useCertificateNav — manages activeIndex and all navigation methods
 * for the credentials card stack.
 *
 * @param {number} total — total number of certificates
 * @returns navigation state and handlers
 */
export default function useCertificateNav(total) {
    const [absoluteIndex, setAbsoluteIndex] = useState(0)
    const lastScrollTime = useRef(0)
    const SCROLL_COOLDOWN = 350 // ~300ms debounce for float stack
    const holdTimerRef = useRef(null)
    const holdIntervalRef = useRef(null)

    const goNext = useCallback(() => {
        if (total <= 1) return
        setAbsoluteIndex((prev) => prev + 1)
    }, [total])

    const goPrev = useCallback(() => {
        if (total <= 1) return
        setAbsoluteIndex((prev) => prev - 1)
    }, [total])

    const goTo = useCallback(
        (targetActual) => {
            setAbsoluteIndex((prev) => {
                const currentActual = ((prev % total) + total) % total;
                let diff = targetActual - currentActual;
                // find shortest path
                if (diff > total / 2) diff -= total;
                else if (diff < -total / 2) diff += total;
                return prev + diff;
            })
        },
        [total]
    )

    const activeIndex = ((absoluteIndex % total) + total) % total;

    const canGoNext = total > 1
    const canGoPrev = total > 1

    /* ── Mouse wheel (strict timestamp cooldown) ───────── */
    const handleWheel = useCallback(
        (e) => {
            e.preventDefault()
            const now = Date.now()
            if (now - lastScrollTime.current < SCROLL_COOLDOWN) return
            lastScrollTime.current = now

            if (e.deltaY > 0) goNext()
            else if (e.deltaY < 0) goPrev()
        },
        [goNext, goPrev]
    )

    /* ── Keyboard ↑↓ (only when container is focused) ──── */
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault()
                goNext()
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault()
                goPrev()
            }
        },
        [goNext, goPrev]
    )

    /* ── Fast scroll (hold arrow ≥ 400ms for 6+ certs) ── */
    const startFastScroll = useCallback(
        (direction) => {
            if (total < 6) return
            holdTimerRef.current = setTimeout(() => {
                holdIntervalRef.current = setInterval(() => {
                    if (direction === 'next') goNext()
                    else goPrev()
                }, 100)
            }, 400)
        },
        [total, goNext, goPrev]
    )

    const stopFastScroll = useCallback(() => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current)
            holdTimerRef.current = null
        }
        if (holdIntervalRef.current) {
            clearInterval(holdIntervalRef.current)
            holdIntervalRef.current = null
        }
    }, [])

    /* Cleanup on unmount */
    useEffect(() => {
        return () => {
            stopFastScroll()
        }
    }, [stopFastScroll])

    return {
        absoluteIndex,
        activeIndex,
        goNext,
        goPrev,
        goTo,
        canGoNext,
        canGoPrev,
        handleWheel,
        handleKeyDown,
        startFastScroll,
        stopFastScroll,
    }
}
