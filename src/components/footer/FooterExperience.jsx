import FooterCTA from './FooterCTA'
import FooterContent from './FooterContent'
import FooterBottom from './FooterBottom'

/**
 * FooterExperience — Root wrapper for the three-layer footer system.
 * Mounted once in RootLayout, outside AnimatePresence.
 * Never remounts during route transitions.
 *
 * Layer 1: FooterCTA     — CTA Hero with bold heading + button
 * Layer 2: FooterContent — Identity + multi-column navigation
 * Layer 3: FooterBottom  — Copyright + social icons
 */
export default function FooterExperience() {
    return (
        <footer
            id="footer-experience"
            className="relative w-full"
        >
            {/* ── Gradient separator from page content ────── */}
            <div className="footer-gradient-separator" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Layer 1 — CTA Hero */}
                <div className="py-20 md:py-24">
                    <FooterCTA />
                </div>

                {/* Layer 2 — Main Content */}
                <div className="pb-10 md:pb-12">
                    <FooterContent />
                </div>

                {/* Layer 3 — Bottom Strip */}
                <div className="pb-8">
                    <FooterBottom />
                </div>
            </div>
        </footer>
    )
}
