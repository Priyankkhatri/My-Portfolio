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
     * Scroll thresholds with wide hysteresis to prevent flicker.
     * Enter thresholds are significantly higher than exit thresholds.
     * The gap between enter/exit prevents rapid toggling near boundaries.
     */
    thresholds: {
        heroToActive: 120,    // scroll down past 120px → State 2   ┐ 60px gap
        activeToHero: 60,     // scroll up past 60px  → State 1     ┘
        activeToPill: 720,    // scroll down past 720px → State 3   ┐ 100px gap
        pillToActive: 620,    // scroll up past 620px  → State 2    ┘
    },

    /** Animation timing */
    timing: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        progressSpring: { stiffness: 100, damping: 30, restDelta: 0.001 },
        transitionLock: 400,  // ms — freeze state after transition to prevent re-trigger
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
