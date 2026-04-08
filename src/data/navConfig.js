/**
 * navConfig.js — Single source of truth for the Adaptive Navigation System.
 * All nav links, scroll thresholds, timing, and logo config.
 * Update this file to change navbar behavior — no component changes needed.
 */

export const navConfig = {
    /** Navigation links — label for full bar, shortLabel for compact pill */
    links: [
        { label: 'Home', to: '/', shortLabel: 'Home' },
        { label: 'Tech', to: '/tech', shortLabel: 'Tech' },
        { label: 'Work', to: '/work', shortLabel: 'Work' },
        { label: 'Credentials', to: '/credentials', shortLabel: 'Creds' },
        { label: 'Contact', to: '/contact', shortLabel: 'Contact' },
    ],

    /**
     * Scroll thresholds with hysteresis to prevent flicker.
     * Enter thresholds are higher than exit thresholds.
     */
    thresholds: {
        heroToActive: 100,    // scroll down past 100px → State 2
        activeToHero: 80,     // scroll up past 80px → State 1
        activeToPill: 700,    // scroll down past 700px → State 3
        pillToActive: 660,    // scroll up past 660px → State 2
    },

    /** Animation timing */
    timing: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        progressSpring: { stiffness: 100, damping: 30, restDelta: 0.001 },
    },

    /** Logo config */
    logo: {
        src: 'https://res.cloudinary.com/dqvpsorso/image/upload/v1775552783/logo_jatani.png',
        alt: 'Priyank Khatri Logo',
        text: 'PRIYANK',
    },

    /** Pill state visual config */
    pill: {
        maxWidth: 520,   // px — width of the floating pill
        height: 48,      // px
    },
}
