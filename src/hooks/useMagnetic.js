import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * useMagnetic — Magnetic cursor-tracking for hover interactions.
 *
 * Returns x/y pixel offsets to pull an element toward the cursor.
 * Disabled on touch devices for performance.
 *
 * @param {Object} options
 * @param {number} options.strength - Multiplier for pull distance (default 0.3)
 * @param {number} options.maxOffset - Maximum pixel offset in any direction
 * @param {boolean} options.disabled - Force disable (e.g. on mobile)
 * @returns {{ x: number, y: number, handleMouseMove: Function, handleMouseLeave: Function }}
 */
export default function useMagnetic({
    strength = 0.3,
    maxOffset = 2,
    disabled = false,
} = {}) {
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const rafRef = useRef(null)
    const isTouchDevice = useRef(false)

    /* ── Detect touch device on mount ─────────────────────── */
    useEffect(() => {
        isTouchDevice.current = window.matchMedia('(hover: none)').matches
    }, [])

    const handleMouseMove = useCallback(
        (e) => {
            if (disabled || isTouchDevice.current) return

            if (rafRef.current) cancelAnimationFrame(rafRef.current)

            rafRef.current = requestAnimationFrame(() => {
                const rect = e.currentTarget.getBoundingClientRect()
                const centerX = rect.left + rect.width / 2
                const centerY = rect.top + rect.height / 2
                const deltaX = Math.max(
                    -maxOffset,
                    Math.min(maxOffset, (e.clientX - centerX) * strength)
                )
                const deltaY = Math.max(
                    -maxOffset,
                    Math.min(maxOffset, (e.clientY - centerY) * strength)
                )

                setOffset({ x: deltaX, y: deltaY })
                rafRef.current = null
            })
        },
        [disabled, maxOffset, strength]
    )

    const handleMouseLeave = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        setOffset({ x: 0, y: 0 })
    }, [])

    /* ── Cleanup on unmount ────────────────────────────────── */
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return {
        x: offset.x,
        y: offset.y,
        handleMouseMove,
        handleMouseLeave,
    }
}
