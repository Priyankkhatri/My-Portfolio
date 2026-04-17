import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Cursor from './Cursor'
import Loader from './Loader'
import Navbar from './Navbar'
import PfpMorphButton from './PfpMorphButton'
import AiChatButton from './AiChatButton'
import ScrollToRouteTop from './ScrollToRouteTop'
import PageTransitionWrapper from './PageTransitionWrapper'
import FooterExperience from './footer/FooterExperience'
import useStore from '../store/useStore'

/* Lazy-loaded: splits Three.js (~500KB) out of critical path */
const HeroBackground = lazy(() => import('./HeroBackground'))

/**
 * RootLayout persists shared chrome across the routed application.
 * Page content renders via <PageTransitionWrapper>.
 */
export default function RootLayout() {
    const isLoading = useStore((s) => s.isLoading)
    const loaderPhase = useStore((s) => s.loaderPhase)

    return (
        <>
            {/* Custom Cursor (hidden on touch devices via CSS) */}
            <Cursor />

            {!isLoading && <Navbar />}

            {/* Preloader - only fires on initial visit */}
            <Loader />

            {/* Scroll-driven PFP morph -> back-to-top */}
            <PfpMorphButton />

            {/* AI Chat Assistant */}
            <AiChatButton />

            {/* Scroll to top on route change */}
            <ScrollToRouteTop />

            {/* Global 3D background - lazy-loaded, non-blocking, persistent */}
            {loaderPhase >= 3 && (
                <Suspense fallback={null}>
                    <HeroBackground />
                </Suspense>
            )}

            <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={loaderPhase >= 4 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <main>
                    <PageTransitionWrapper />
                </main>
                <FooterExperience />
            </motion.div>
        </>
    )
}
