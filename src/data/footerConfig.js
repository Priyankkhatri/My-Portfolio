/**
 * footerConfig.js — Single source of truth for the Global Footer Experience.
 * All footer copy, navigation links, social links, and legal content.
 * Update this file to change footer content — no component changes needed.
 */

export const footerConfig = {
    /* ── Layer 1: CTA Hero ──────────────────────────────────── */
    cta: {
        heading: "Let's build something real.",
        subtext: 'Open to full-time roles and meaningful projects.',
        buttonLabel: "Let's Work Together",
        buttonPath: '/contact',
        contactRouteHeading: 'You made it.',
        contactRouteSubtext: "Already here — let's talk.",
    },

    /* ── Layer 2: Identity Block ────────────────────────────── */
    identity: {
        name: 'Priyank Khatri',
        description:
            'Frontend developer building fast, thoughtful interfaces with React and motion.',
    },

    /* ── Layer 2: Navigation Columns ────────────────────────── */
    navColumns: [
        {
            title: 'General',
            links: [
                { label: 'Home', path: '/' },
                { label: 'Work', path: '/work' },
                { label: 'Tech', path: '/tech' },
                { label: 'Credentials', path: '/credentials' },
            ],
        },
        {
            title: 'Connect',
            links: [
                { label: 'Contact', path: '/contact' },
                { label: 'GitHub', href: 'https://github.com/Priyankkhatri' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyankkhatrii/' },
            ],
        },
    ],

    /* ── Layer 3: Social Icon Links ─────────────────────────── */
    socialLinks: [
        {
            platform: 'github',
            href: 'https://github.com/Priyankkhatri',
            label: 'GitHub',
        },
        {
            platform: 'linkedin',
            href: 'https://www.linkedin.com/in/priyankkhatrii/',
            label: 'LinkedIn',
        },
        {
            platform: 'x',
            href: 'https://x.com/PriyankKhatrii',
            label: 'X',
        },
        {
            platform: 'instagram',
            href: 'https://www.instagram.com/priyankhatrii/',
            label: 'Instagram',
        },
    ],

    /* ── Layer 2: Legal / Trust (optional) ──────────────────── */
    legalLinks: [],

    /* ── Layer 3: Copyright ─────────────────────────────────── */
    copyrightName: 'Priyank Khatri',
}
