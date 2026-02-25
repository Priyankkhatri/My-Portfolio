import { motion } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import useStore from './store/useStore'
import PfpMorphButton from './components/PfpMorphButton'

/* Marquee text strip between sections */
function MarqueeStrip() {
    const text = 'REACT — NEXT.JS — NODE.JS — MONGODB — TAILWINDCSS — CREATIVE DEVELOPMENT — '
    return (
        <div className="relative py-6 overflow-hidden border-y border-[var(--border-color)] group cursor-default">
            <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] transition-all duration-500">
                {[...Array(4)].map((_, i) => (
                    <span
                        key={i}
                        className="text-xs tracking-[0.35em] text-[var(--text-muted)]/30 uppercase mx-4"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default function App() {
    const isLoaded = useStore((s) => s.isLoaded)

    return (
        <>
            {/* Custom Cursor (hidden on touch devices via CSS) */}
            <Cursor />

            {/* Preloader */}
            <Loader />

            {/* Scroll-driven PFP morph → back-to-top */}
            <PfpMorphButton />

            {/* DOM Layer */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Navbar />
                <main>
                    <Hero />
                    <MarqueeStrip />
                    <About />
                    <Projects />
                    <MarqueeStrip />
                    <Certificates />
                    <Contact />
                </main>
            </motion.div>
        </>
    )
}
