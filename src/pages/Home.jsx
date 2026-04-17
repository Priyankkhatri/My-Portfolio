import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Hero from '../sections/Hero'
import About from '../sections/About'
import SignatureSection from '../components/signature/SignatureSection'
import useStore from '../store/useStore'

import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiVite, SiGithub } from 'react-icons/si'

/* ── Marquee logo strip ─────────────────────────────────── */
const marqueeLogos = [
    { label: 'React', Icon: SiReact, color: '#61DAFB' },
    { label: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
    { label: 'Express', Icon: SiExpress, color: '#e8edf5' },
    { label: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { label: 'CSS3', Icon: SiCss, color: '#1572B6' },
    { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    { label: 'Vite', Icon: SiVite, color: '#646CFF' },
    { label: 'Github', Icon: SiGithub, color: '#e8edf5' },
]

function MarqueeStrip() {
    return (
        <div className="w-full relative overflow-hidden py-2 my-4">
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((item, i) => (
                    <div 
                        key={i} 
                        className="flex items-center justify-center mx-6 md:mx-10 opacity-90 hover:opacity-100 transition-all duration-300 select-none group cursor-pointer" 
                        title={item.label}
                    >
                        <item.Icon 
                            className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:scale-125 group-hover:filter group-hover:drop-shadow-[0_0_12px_currentColor]" 
                            style={{ color: item.color }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Home page — Hero section + MarqueeStrip.
 * MarqueeStrip only appears on the Home route (per user decision).
 */
export default function Home() {
    return (
        <>
            <Helmet>
                <title>Priyank Khatri | Software Developer & Frontend Architect</title>
                <meta name="description" content="Official portfolio of Priyank Khatri. BTech CSE student at Coding Gita, specializing in high-performance React applications, REST APIs, and immersive web experiences." />
                <meta name="keywords" content="Priyank Khatri, Priyanka Khatri, Software Developer, React Developer, Frontend Developer, Coding Gita, Full-stack Developer, Web Architecture" />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/" />
            </Helmet>
            <Hero />
            <MarqueeStrip />
            <About />
            <SignatureSection />
        </>
    )
}
