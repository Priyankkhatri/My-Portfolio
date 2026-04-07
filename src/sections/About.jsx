import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Trophy, Camera, Zap, Cpu } from 'lucide-react'
import useStore from '../store/useStore'

/* ── Tilt Card ──────────────────────────────────────────── */
function TiltCard({ children, className = '', span = '', delay = 0 }) {
    const ref = useRef(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const handleMouse = (e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setTilt({ x: y * -8, y: x * 8 })
    }
    const handleLeave = () => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
        setCursorVariant('default')
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseEnter={() => { setIsHovered(true); setCursorVariant('hover') }}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 40 }}
            animate={
                inView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotateX: tilt.x,
                        rotateY: tilt.y,
                    }
                    : {}
            }
            whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
            transition={
                isHovered
                    ? { rotateX: { duration: 0.15, ease: 'easeOut' }, rotateY: { duration: 0.15, ease: 'easeOut' }, default: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
                    : { rotateX: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }, rotateY: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }, default: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } }
            }
            style={{ perspective: 800 }}
            className={`glass-card glass-card-hover p-6 md:p-8 relative ${span} ${className}`}
        >
            {children}
        </motion.div>
    )
}


/* ── Tech Brand SVG Icons ───────────────────────────────── */
const IconC = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 9.4l-1.9-1.1c-.5 1.8-1.8 3.7-4.6 3.7C7.2 12 5 9.8 5 7s2.2-5 5-5c2.7 0 4 1.8 4.5 3.5l1.9-1.1C15.5 2 13.4 0 10 0 5.6 0 2 3.6 2 7s3.6 7 8 7c3.3 0 5.5-2 6.5-4.6z" fill="#00599C"/>
        <text x="13" y="18" fontSize="10" fontWeight="bold" fill="#659CC8">++</text>
    </svg>
)

const IconHTML = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
    </svg>
)

const IconJS = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#F7DF1E"/>
    </svg>
)

const IconReact = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225.013.4.07.558.162.73.422.943 2.304.465 4.729-1.027-.202-2.131-.33-3.279-.375a27.9 27.9 0 0 0-2.147-2.214c1.246-1.17 2.428-1.852 3.403-2.302zm-9.61.21c.98.44 2.167 1.125 3.413 2.295A27.65 27.65 0 0 0 8.52 7.017c-.47-2.42-.258-4.298.48-4.716.157-.09.33-.147.555-.157zm4.846 9.694c-.452-.736-.908-1.416-1.37-2.04.429.02.87.033 1.32.033.45 0 .895-.012 1.324-.034-.46.624-.914 1.303-1.274 2.041zm-5.22-2.614c-.44.615-.9 1.294-1.352 2.034-.455-.74-.9-1.42-1.352-2.034.44.012.885.02 1.34.02.453 0 .9-.01 1.364-.02zm1.284-1.944c-.38.568-.75 1.153-1.103 1.753-.352-.598-.723-1.183-1.104-1.75.352-.27.72-.53 1.104-.76.384.23.752.49 1.103.757zM9.18 14.04c-.47.626-.93 1.307-1.38 2.044-.46-2.427-.25-4.31.492-4.737.164-.094.34-.15.57-.162.23.012.404.07.558.163.74.428.96 2.31.484 4.734-.45.74-.91 1.42-1.353 2.048a33.52 33.52 0 0 1-.37-4.09zm6.67.01c.454-.734.91-1.414 1.363-2.05.45 2.443.235 4.333-.5 4.752-.162.094-.343.15-.577.16-.225-.01-.4-.067-.554-.16-.745-.43-.962-2.323-.48-4.755.452-.735.912-1.415 1.37-2.05zm-2.93 4.77c.456-.736.914-1.42 1.376-2.056a26.34 26.34 0 0 0 2.154 2.217c-1.247 1.174-2.43 1.857-3.407 2.305-.224-.013-.4-.07-.556-.162-.74-.427-.953-2.313-.463-4.742 1.03.2 2.135.327 3.285.373a27.62 27.62 0 0 0 2.144 2.21c-1.244 1.174-2.427 1.857-3.402 2.305zm-4.848-.178c-.43-.195-.914-.468-1.414-.84.45-.18.915-.39 1.393-.637A26.25 26.25 0 0 0 9.84 20.11c-1.245-1.173-2.43-1.854-3.406-2.302-.224.013-.4.07-.558.162-.74.43-.946 2.31-.455 4.736zm-1.485-6.53a27.63 27.63 0 0 0 2.147 2.21C8.527 14.944 7.43 14.818 6.28 14.617c-.473-2.43-.257-4.311.48-4.73.155-.09.33-.15.557-.16.234.01.41.07.567.163.74.43.958 2.315.474 4.744" fill="#61DAFB"/>
    </svg>
)

const IconNode = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.275-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.127-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,16.997,19.099,15.91,19.099,13.993z" fill="#339933"/>
    </svg>
)

const IconExpress = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 18.588a1.528 1.528 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" fill="#ffffff" fillOpacity="0.85"/>
    </svg>
)

const IconMongo = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" fill="#47A248"/>
    </svg>
)

const IconGit = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.999 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.082-.73.082-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.493.998.108-.775.42-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.22-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 6.803a11.54 11.54 0 0 1 3.004.404c2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.292 0 .32.216.695.824.578C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12.001-12z" fill="#F05032"/>
    </svg>
)

const IconChrome = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.188.015.378.022.571.022 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.37zM12 10.545a1.455 1.455 0 1 0 0 2.91 1.455 1.455 0 0 0 0-2.91z" fill="#4285F4"/>
    </svg>
)

const IconNetlify = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.07 15.41l-2.36-2.36 4.2-4.2 2.36 2.36-4.2 4.2zm-2.9-2.9L5.67 10.15l1.41-1.41 2.36 2.36-1.41 1.41zm7.47-5.24l1.41 1.41-6.37 6.37-1.41-1.41 6.37-6.37z" fill="#00C7B7"/>
    </svg>
)

const techStack = [
    { label: 'C / C++', Icon: IconC },
    { label: 'HTML / CSS', Icon: IconHTML },
    { label: 'JavaScript', Icon: IconJS },
    { label: 'React / Next.js', Icon: IconReact },
    { label: 'Node.js', Icon: IconNode },
    { label: 'Express', Icon: IconExpress },
    { label: 'MongoDB', Icon: IconMongo },
    { label: 'Netlify / Render', Icon: IconNetlify },
    { label: 'Git / GitHub', Icon: IconGit },
    { label: 'Chrome DevTools', Icon: IconChrome },
]

const interests = [
    { Icon: Target,  label: 'Badminton',      desc: 'Competitive player',            color: '#60a5fa' },
    { Icon: Trophy,  label: 'Football',        desc: 'Casual/competitive',            color: '#f59e0b' },
    { Icon: Camera,  label: 'Photography',     desc: 'Street & landscape',            color: '#a78bfa' },
    { Icon: Zap,     label: 'Cars',            desc: 'BMW M4 enthusiast',             color: '#f87171' },
    { Icon: Cpu,     label: 'Tech Tinkering',  desc: 'Android rooting & custom ROMs', color: '#34d399' },
]

/* ── Experience Timeline ────────────────────────────────── */
const experience = [
    { year: 'Currently', title: '2nd-Semester BE/B.Tech CSE', desc: 'Coding Gita (Offline Institute)' },
    { year: '2026', title: 'Building Projects', desc: 'Creating APIs, and React apps to learn' },
    { year: '2025', title: 'Started Journey', desc: 'Exploring fundamentals of computer science' },
]

export default function About() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    return (
        <section id="about" ref={sectionRef} className="py-16 sm:py-32 px-6 md:px-12 lg:px-24 relative">
            {/* Section divider */}
            <div className="section-divider mb-16 sm:mb-32" />

            {/* Floating decorative orbs */}
            <div className="floating-orb w-72 h-72 bg-blue-500 top-20 -right-32" />
            <div className="floating-orb w-48 h-48 bg-violet-800 bottom-40 left-10" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">002 &mdash; About</p>
                </div>
                <h2
                    className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Building with <span className="text-gradient-silver">Purpose</span>
                </h2>
                <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl mb-16 leading-relaxed">
                    A dedicated explorer of the digital landscape, merging technical rigor with creative problem-solving. My work is fueled by a desire to understand 'the why' behind the code, ensuring every project is built with scalability, efficiency, and a human-centric approach at its core.
                </p>

                {/* ── Bento Grid ────────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">

                    {/* Bio Card — large */}
                    <TiltCard span="lg:col-span-2 lg:row-span-2" delay={0}>
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-6">Who I Am</p>
                                <h3
                                    className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Priyank
                                </h3>
                                <p className="text-sm text-[var(--text-secondary)] mb-8 font-medium tracking-wide">BE/B.Tech CSE &bull; MERN / Full-Stack</p>
                                
                                <div className="space-y-6">
                                    <p className="text-sm leading-[1.8] text-[var(--text-secondary)]">
                                        I’m a 2nd-semester Computer Science student at <span className="text-[var(--text-primary)] font-medium">Coding Gita</span>. My journey into development started with a fascination for digital systems, which has now evolved into a high-speed pursuit of mastering the <span className="text-[#60a5fa] font-medium">Full-Stack MERN ecosystem</span>.
                                    </p>
                                    <p className="text-sm leading-[1.8] text-[var(--text-secondary)]">
                                        I specialize in building tools that aren't just functional, but <span className="text-[var(--text-primary)] font-medium">purpose-built</span>. I bridge the gap between elegant frontend design and robust backend logic, with a deep focus on performance, accessibility, and intuitive system architecture.
                                    </p>
                                    
                                    <div className="pt-2">
                                        <h4 className="text-[10px] tracking-[0.2em] font-bold text-[var(--text-primary)] uppercase mb-3">Technical Philosophy</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] mt-1.5 shrink-0" />
                                                <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]"><span className="text-[var(--text-primary)] font-medium">Efficiency First</span>: Optimizing code for speed and resource management is non-negotiable.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-1.5 shrink-0" />
                                                <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]"><span className="text-[var(--text-primary)] font-medium">Accessibility by Design</span>: Building products that everyone can use, regardless of their hardware or ability.</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <p className="text-sm leading-[1.8] text-[var(--text-secondary)] italic border-l-2 border-[#60a5fa]/30 pl-4 py-1">
                                        "I don't just write code; I aim to build tools that solve real-world problems and provide seamless user experiences."
                                    </p>
                                </div>

                                {/* Quick Facts Grid */}
                                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border-color)]">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[9px] tracking-[0.2em] font-bold text-[var(--accent-1)] uppercase">Current Focus</h4>
                                        <p className="text-[11px] text-[var(--text-muted)]">Scalable & Responsive Systems</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[9px] tracking-[0.2em] font-bold text-[var(--accent-2)] uppercase">Goal</h4>
                                        <p className="text-[11px] text-[var(--text-muted)]">Building a Production-Level SaaS</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[9px] tracking-[0.2em] font-bold text-[var(--accent-1)] uppercase">Fueled By</h4>
                                        <p className="text-[11px] text-[var(--text-muted)]">Curiosity & Pure Black Coffee</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[var(--border-color)]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                <span className="text-xs text-[var(--text-secondary)]">India</span>
                                <span className="ml-auto flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-[#60a5fa]/60 rounded-full animate-pulse-glow" />
                                    <span className="text-[10px] text-[var(--text-secondary)]">Open to internships</span>
                                </span>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Experience Timeline */}
                    <TiltCard span="lg:col-span-2" delay={0.1}>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-6">Journey</p>
                        <div className="flex flex-col gap-5">
                            {experience.map((exp, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-2 h-2 rounded-full bg-[var(--bg-highlight-hover)] group-hover:bg-[var(--border-color)] transition-colors mt-1.5" />
                                        {i < experience.length - 1 && <div className="w-px h-full bg-[var(--bg-highlight)] mt-1" />}
                                    </div>
                                    <div className="pb-4">
                                        <span className="text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">{exp.year}</span>
                                        <h4 className="text-sm font-medium text-[var(--text-primary)] mt-1">{exp.title}</h4>
                                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TiltCard>

                    {/* Interests Card */}
                    <TiltCard span="lg:col-span-2" delay={0.15}>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-6">Beyond Code</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {interests.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-20px' }}
                                    transition={{ delay: i * 0.08, duration: 0.5 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight)] hover:border-[var(--border-color)] transition-all duration-300"
                                >
                                    <item.Icon size={18} style={{ color: item.color }} className="mt-0.5 shrink-0" />
                                    <div>
                                        <span className="text-sm font-medium text-[var(--text-secondary)] block">{item.label}</span>
                                        <span className="text-[10px] text-[var(--text-secondary)]">{item.desc}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TiltCard>

                    {/* Tech Stack — full width */}
                    <TiltCard span="lg:col-span-4" delay={0.2}>
                        <div className="flex items-start justify-between mb-6">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-secondary)]">Tech Stack</p>
                            <span className="text-[10px] text-[var(--text-secondary)]">{techStack.length} technologies</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {techStack.map((tech, i) => (
                                <motion.span
                                    key={tech.label}
                                    className="tech-pill flex items-center gap-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
                                >
                                    <tech.Icon />
                                    {tech.label}
                                </motion.span>
                            ))}
                        </div>
                    </TiltCard>
                </div>
            </motion.div>
        </section>
    )
}
