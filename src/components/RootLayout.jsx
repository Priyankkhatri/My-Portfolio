import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../sections/Navbar'
import Cursor from './Cursor'
import Loader from './Loader'
import PfpMorphButton from './PfpMorphButton'
import AiChatButton from './AiChatButton'
import ScrollToTopOnNav from './ScrollToTopOnNav'
import PageTransitionWrapper from './PageTransitionWrapper'
import useStore from '../store/useStore'

/* Lazy-loaded: splits Three.js (~500KB) out of critical path */
const HeroBackground = lazy(() => import('./HeroBackground'))

/**
 * RootLayout — persistent shell for the entire routed application.
 * Contains: Navbar, Three.js background, Cursor, Loader, and global UI.
 * Page content renders via <PageTransitionWrapper> which wraps <Outlet />.
 */
export default function RootLayout() {
    const loaderPhase = useStore((s) => s.loaderPhase)

    return (
        <>
            {/* Custom Cursor (hidden on touch devices via CSS) */}
            <Cursor />

            {/* Preloader — only fires on initial visit */}
            <Loader />

            {/* Scroll-driven PFP morph → back-to-top */}
            <PfpMorphButton />

            {/* AI Chat Assistant */}
            <AiChatButton />

            {/* Scroll to top on route change */}
            <ScrollToTopOnNav />

            {/* Global 3D Background — lazy-loaded, non-blocking, persistent */}
            <Suspense fallback={null}>
                <HeroBackground />
            </Suspense>

            {/* DOM Layer */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={loaderPhase >= 4 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Navbar />
                <main>
                    <PageTransitionWrapper />
                </main>
            </motion.div>
        </>
    )
}
