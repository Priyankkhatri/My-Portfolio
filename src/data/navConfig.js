/**
 * navConfig.js - Single source of truth for the adaptive navbar system.
 */

export const navConfig = {
    links: [
        { label: 'Home', to: '/', shortLabel: 'Home' },
        { label: 'Tech', to: '/tech', shortLabel: 'Tech' },
        { label: 'Work', to: '/work', shortLabel: 'Work' },
        { label: 'Credentials', to: '/credentials', shortLabel: 'Creds' },
        { label: 'Contact', to: '/contact', shortLabel: 'Contact' },
    ],

    thresholds: {
        enterCompact: 700,
        exitCompact: 600,
        exitCompactWhileUp: 550,
    },

    timing: {
        activeToCompact: 0.45,
        compactToActive: 0.3,
        ease: [0.22, 1, 0.36, 1],
        progressSpring: { stiffness: 140, damping: 28, restDelta: 0.001 },
        transitionLock: 400,
        idleDelay: 1500,
        idleDuration: 0.8,
    },

    logo: {
        src: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775552783/logo_jatani.png',
        alt: 'Priyank Khatri Logo',
        text: 'PRIYANK',
    },

    desktop: {
        maxWidth: 1200,
        height: 68,
        paddingX: 24,
        paddingY: 14,
        compactMaxWidth: 620,
        compactHeight: 52,
        compactPaddingX: 18,
        compactPaddingY: 10,
        compactTopOffset: 16,
    },

    mobile: {
        breakpoint: 768,
        height: 56,
        paddingX: 14,
        paddingY: 10,
        topOffset: 12,
    },

    visuals: {
        active: {
            backgroundColor: 'rgba(10, 15, 30, 0.66)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            shadow:
                '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            idleShadow:
                '0 6px 22px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            borderRadius: 18,
            blur: 16,
            idleBlur: 8,
        },
        compact: {
            backgroundColor: 'rgba(10, 15, 30, 0.76)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            shadow:
                '0 12px 36px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            idleShadow:
                '0 8px 22px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            borderRadius: 9999,
            blur: 14,
            idleBlur: 8,
        },
        mobile: {
            backgroundColor: 'rgba(10, 15, 30, 0.76)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            shadow:
                '0 10px 28px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
            idleShadow:
                '0 6px 18px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
            borderRadius: 9999,
            blur: 14,
            idleBlur: 8,
        },
    },
}
