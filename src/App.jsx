import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
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

const Scene = lazy(() => import('./canvas/Scene'))

/* Marquee text strip between sections */
function MarqueeStrip() {
    const text = 'REACT — THREE.JS — NEXT.JS — NODE.JS — MONGODB — TYPESCRIPT — TAILWINDCSS — CREATIVE DEVELOPMENT — '
    return (
        <div className="relative py-6 overflow-hidden border-y border-white/[0.03]">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                    <span
                        key={i}
                        className="text-xs tracking-[0.35em] text-white/[0.06] uppercase mx-4"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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

            {/* 3D Background — fixed behind DOM */}
            <div className="fixed inset-0 z-0">
                <Canvas
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: false }}
                    camera={{ position: [0, 0, 12], fov: 45 }}
                    style={{ background: '#0a0a0a' }}
                >
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

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
