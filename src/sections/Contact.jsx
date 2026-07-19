import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import useStore from '../store/useStore'
import emailjs from '@emailjs/browser'

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/Priyankkhatri',
        desc: 'Explore my student projects, repositories, and open source code.',
        themeColor: '#a855f7',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        desc: 'Connect with me on my professional network for collaborations.',
        themeColor: '#3b82f6',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@PriyankCreates',
        desc: 'Watch my project walkthroughs, development demos, and vlogs.',
        themeColor: '#ef4444',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
        ),
    },
    {
        label: 'LeetCode',
        href: 'https://leetcode.com/u/Priyank_Khatri/',
        desc: 'Check my algorithm rankings, resolved problems, and stats.',
        themeColor: '#f59e0b',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/priyankhatrii/',
        desc: 'Follow my personal life updates, designs, and creations.',
        themeColor: '#ec4899',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        ),
    },
    {
        label: 'X (Twitter)',
        href: 'https://x.com/PriyankKhatrii',
        desc: 'Follow my daily developer updates, posts, and thoughts.',
        themeColor: '#ffffff',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
                <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
            </svg>
        ),
    },
]

const slideVariants = {
    initial: (direction) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        filter: 'blur(3px)'
    }),
    animate: {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 400, damping: 28 }
    },
    exit: (direction) => ({
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        filter: 'blur(3px)',
        transition: { type: 'spring', stiffness: 400, damping: 28 }
    })
}

function HolographicFrame({ children }) {
    const frameRef = useRef(null)
    
    const handleMouseMove = (e) => {
        const frame = frameRef.current
        if (!frame) return
        const rect = frame.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((centerY - y) / centerY) * 8
        const rotateY = ((x - centerX) / centerX) * 8
        
        frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    }
    
    const handleMouseLeave = () => {
        const frame = frameRef.current
        if (!frame) return
        frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
    
    return (
        <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.15s ease-out' }}
            className="w-full bg-[var(--bg-secondary)] rounded-2xl border border-[#f59e0b]/20 p-4 sm:p-6 flex items-center justify-center overflow-hidden min-h-[220px] shadow-[0_0_25px_rgba(245,158,11,0.04)] relative group"
        >
            <div className="absolute -inset-10 opacity-0 group-hover:opacity-10 pointer-events-none rounded-full blur-3xl transition-opacity duration-700 bg-gradient-radial from-[#f59e0b] to-transparent" />
            <div className="relative z-10 w-full flex justify-center">
                {children}
            </div>
        </div>
    )
}

function TerminalLoader({ onComplete }) {
    const [lines, setLines] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const sequence = [
        'Establishing connection node...',
        'Creating message tunnel...',
        'Applying secure transmission encryption...',
        'Delivering datagram packets...',
        'Broadcasting stream successful.'
    ]

    useEffect(() => {
        if (currentIndex < sequence.length) {
            const t = setTimeout(() => {
                setLines(prev => [...prev, sequence[currentIndex]])
                setCurrentIndex(idx => idx + 1)
            }, 300)
            return () => clearTimeout(t)
        } else {
            const t = setTimeout(() => {
                onComplete()
            }, 800)
            return () => clearTimeout(t)
        }
    }, [currentIndex, onComplete])

    return (
        <div className="flex flex-col gap-2 min-h-[160px] font-mono text-[11px] text-[#60a5fa] leading-relaxed pt-2 text-left">
            {lines.map((line, idx) => (
                <div key={idx} className={idx === sequence.length - 1 ? 'text-emerald-400 font-bold animate-pulse' : ''}>
                    {`> ${line}`}
                </div>
            ))}
            {currentIndex < sequence.length && (
                <span className="text-white">
                    &gt; <span className="inline-block w-1.5 h-3.5 bg-[var(--text-primary)]/80 animate-pulse ml-0.5" style={{ verticalAlign: 'middle' }} />
                </span>
            )}
        </div>
    )
}

function SocialCard({ social, onLeetCodeClick }) {
    const cardRef = useRef(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const handleMouseMove = (e) => {
        const el = cardRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        el.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 0) scale3d(1.01, 1.01, 1.01)`
    }

    const handleMouseLeave = () => {
        const el = cardRef.current
        if (!el) return
        el.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)'
        setCursorVariant('default')
    }

    const themeColor = social.themeColor || '#60a5fa'
    
    const handleDisplay = social.label === 'GitHub' ? '@Priyankkhatri'
        : social.label === 'LinkedIn' ? 'in/priyankkhatrii'
        : social.label === 'YouTube' ? '@PriyankCreates'
        : social.label === 'LeetCode' ? '@Priyank_Khatri'
        : social.label === 'Instagram' ? '@priyankhatrii'
        : social.label === 'X (Twitter)' ? '@PriyankKhatrii'
        : '';

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setCursorVariant('hover')}
            className="glass-card px-5 py-4 flex items-center justify-between cursor-pointer relative overflow-hidden group select-none transition-all duration-300 rounded-2xl border border-[var(--border-color)] hover:border-white/10"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease' }}
        >
            {social.label === 'LeetCode' ? (
                <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLeetCodeClick(); }} 
                    className="absolute inset-0 z-10 w-full h-full bg-transparent border-none outline-none cursor-pointer"
                    aria-label="Open Leetcode Statistics"
                />
            ) : (
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
            )}

            <div 
                className="absolute -inset-16 opacity-0 group-hover:opacity-10 pointer-events-none rounded-full blur-[30px] transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
            />

            <div className="flex items-center gap-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>
                <div 
                    style={{ color: themeColor }} 
                    className="w-10 h-10 rounded-xl bg-white/[0.02] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors duration-300"
                >
                    {social.icon}
                </div>
                
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-medium font-mono">
                        {social.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[var(--text-primary)] mt-0.5">
                        {handleDisplay}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex items-center gap-2" style={{ transform: 'translateZ(15px)' }}>
                {social.label === 'LeetCode' && (
                    <span className="px-1.5 py-0.5 text-[7px] font-mono tracking-wider uppercase bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] rounded">
                        Stats
                    </span>
                )}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-[color,transform] duration-300">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>
        </motion.div>
    )
}

function DecryptText({ text }) {
    const [display, setDisplay] = useState('')
    
    useEffect(() => {
        if (!text) return
        let iterations = 0
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&'
        const interval = setInterval(() => {
            const resolved = text.split('').map((char, index) => {
                if (char === ' ' || char === '\n') return char
                if (index < iterations) return text[index]
                return chars[Math.floor(Math.random() * chars.length)]
            }).join('')
            
            setDisplay(resolved)
            if (iterations >= text.length) {
                clearInterval(interval)
            }
            iterations += 0.45
        }, 35) // Optimized to 35ms interval to minimize layout calculations
        return () => clearInterval(interval)
    }, [text])

    return <span>{display}</span>
}

export default function Contact() {
    const sectionRef = useRef(null)
    const cardRef = useRef(null)
    const glowRef = useRef(null)
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [emailError, setEmailError] = useState('')
    const [showLeetCodeModal, setShowLeetCodeModal] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [sentSuccessfully, setSentSuccessfully] = useState(false)
    const [sendFailed, setSendFailed] = useState(false)
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }))
        }
        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    // Interactive coordinate grid background effect
    const bgRef = useRef(null)
    useEffect(() => {
        const handleMove = (e) => {
            const bg = bgRef.current
            if (!bg) return
            const x = (e.clientX / window.innerWidth - 0.5) * 8
            const y = (e.clientY / window.innerHeight - 0.5) * 8
            bg.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
        window.addEventListener('mousemove', handleMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

    // HIGH PERFORMANCE: Manipulate DOM styles directly on mousemove to avoid React re-renders (at 60fps)
    const handleCardMouseMove = (e) => {
        const card = cardRef.current
        const glow = glowRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((centerY - y) / centerY) * 3 // Max 3 degree 3D rotation
        const rotateY = ((x - centerX) / centerX) * 3
        
        card.style.transform = `perspective(1200px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
        if (glow) {
            glow.style.left = `${x}px`
            glow.style.top = `${y}px`
            glow.style.opacity = '1'
        }
    }

    const handleCardMouseLeave = () => {
        const card = cardRef.current
        const glow = glowRef.current
        if (card) {
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
        }
        if (glow) {
            glow.style.opacity = '0'
        }
        setCursorVariant('default')
    }

    const handleNext = () => {
        if (step === 1 && !formData.name.trim()) return
        if (step === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                setEmailError('Please enter a valid email address')
                return
            }
            setEmailError('')
        }
        if (step === 3 && !formData.subject.trim()) return
        if (step === 4 && !formData.message.trim()) return

        setDirection(1)
        setStep(prev => prev + 1)
    }

    const handleBack = () => {
        setDirection(-1)
        setStep(prev => Math.max(0, prev - 1))
    }

    const transmitPayload = async () => {
        setIsSending(true)
        setSendFailed(false)
        setStep(6)

        try {
            await emailjs.send(
                'service_hzjoj3w',
                'template_3krwhas',
                {
                    name: formData.name,
                    email: formData.email,
                    title: formData.subject,
                    message: formData.message,
                },
                'AHVDMXtJzrCI9bLIp'
            )
            setSentSuccessfully(true)
        } catch (error) {
            console.error('EmailJS send failed:', error)
            setSendFailed(true)
        } finally {
            setIsSending(false)
        }
    }

    const mailtoFallback = `mailto:priyank.khatri.cg@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`

    const resetTerminal = () => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setStep(0)
        setSentSuccessfully(false)
        setSendFailed(false)
    }

    const progress = (step / 5) * 100

    return (
        <section id="contact" ref={sectionRef} className="py-16 sm:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col items-center">
            
            {/* Ambient Space Grid Backdrop */}
            <div 
                ref={bgRef}
                className="absolute inset-0 z-0 pointer-events-none opacity-20 transition-transform duration-300 ease-out"
                style={{
                    backgroundImage: 'radial-gradient(circle at center, var(--border-color) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
            />
            
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 bg-gradient-to-tr from-[#60a5fa] to-[#a78bfa] pointer-events-none" />

            <div className="max-w-5xl w-full flex flex-col items-center gap-16 md:gap-24 relative z-10">
                
                {/* Header */}
                <div className="w-full text-center max-w-xl">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                        <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">005 &mdash; Contact</p>
                        <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                    </div>
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-3 text-[var(--text-primary)]"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Let's Build <span className="text-gradient-silver">Together</span>
                    </h2>
                </div>

                {/* Holographic Aurora Deck */}
                <div className="w-full relative">
                    <div 
                        ref={cardRef}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="aurora-deck w-full relative"
                    >
                        {/* Interactive glow mesh spot */}
                        <div 
                            ref={glowRef}
                            className="aurora-glow opacity-0"
                            style={{ transition: 'opacity 0.4s ease' }}
                        />

                        {/* Subtle blueprint grid overlay */}
                        <div className="aurora-blueprint absolute inset-0 opacity-40 pointer-events-none" />

                        {/* Header telemetry details */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--border-color)] relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="cyber-led cyber-led-blue" />
                                <span className="text-[10px] font-mono tracking-widest text-[var(--text-primary)] uppercase font-semibold">
                                    Transmission Portal
                                </span>
                            </div>
                            <div className="flex items-center gap-4 font-mono text-[9px] text-[var(--text-secondary)] font-semibold">
                                <div>
                                    <span className="text-[var(--text-muted)]">Secure Gateway</span>
                                </div>
                                <div className="w-px h-3 bg-white/10" />
                                <div>
                                    <span>{currentTime || '00:00:00'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Split Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10 min-h-[440px]">
                            
                            {/* Left Pane - Evolving Energy Core (5 columns) */}
                            <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-[var(--border-color)] flex flex-col justify-center items-center relative overflow-hidden bg-black/[0.04]">
                                
                                <div className="relative w-56 h-56 flex items-center justify-center">
                                    
                                    {/* Central glowing dynamic orb */}
                                    <motion.div
                                        className="absolute rounded-full"
                                        animate={{
                                            width: step === 0 ? 50 : step === 1 ? 70 : step === 2 ? 90 : step === 3 ? 110 : step === 4 ? 130 : 100,
                                            height: step === 0 ? 50 : step === 1 ? 70 : step === 2 ? 90 : step === 3 ? 110 : step === 4 ? 130 : 100,
                                            background: step <= 1 
                                                ? 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)'
                                                : step <= 3
                                                ? 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(96,165,250,0.1) 50%, transparent 70%)'
                                                : 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(167,139,250,0.15) 45%, transparent 70%)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                                    />

                                    {/* Core sphere element */}
                                    <motion.div
                                        className="w-14 h-14 rounded-full border border-white/20 relative z-10 flex items-center justify-center energy-core-pulse"
                                        animate={{
                                            scale: step === 6 ? 0 : [1, 1.06, 1],
                                            borderColor: step <= 2 ? 'rgba(96,165,250,0.4)' : step <= 4 ? 'rgba(167,139,250,0.5)' : 'rgba(16,185,129,0.6)',
                                        }}
                                        transition={{
                                            scale: step === 6 ? { duration: 0.5, ease: 'easeIn' } : { duration: step === 4 ? 1.4 : 3, repeat: Infinity, ease: 'easeInOut' }
                                        }}
                                        style={{
                                            background: 'radial-gradient(circle at 35% 35%, var(--accent-1) 0%, var(--accent-2) 65%, rgba(0,0,0,0.7) 100%)',
                                            boxShadow: '0 0 25px rgba(96,165,250,0.25)',
                                        }}
                                    >
                                        <span className="text-[10px] font-mono font-bold text-white tracking-widest">{step <= 5 ? `0${step}` : 'TX'}</span>
                                    </motion.div>

                                    {/* Ring 1 (Active from Step 1 onwards) — HIGH PERFORMANCE NATIVE CSS ANIMATION */}
                                    {step >= 1 && (
                                        <svg
                                            className="absolute w-28 h-28 text-[#60a5fa]/30 rotate-clockwise"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" />
                                        </svg>
                                    )}

                                    {/* Ring 2 (Active from Step 2 onwards) — HIGH PERFORMANCE NATIVE CSS ANIMATION */}
                                    {step >= 2 && (
                                        <svg
                                            className="absolute w-36 h-36 text-[#a78bfa]/40 rotate-counter-clockwise"
                                            viewBox="0 0 100 100"
                                        >
                                            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="30 10 5 10" />
                                        </svg>
                                    )}

                                    {/* Constellation nodes (Active from Step 3 onwards) */}
                                    {step >= 3 && (
                                        <motion.div
                                            className="absolute w-44 h-44 rotate-clockwise"
                                            style={{ animationDuration: '24s' }}
                                        >
                                            {[...Array(6)].map((_, i) => {
                                                const angle = (i * 360) / 6
                                                const rad = (angle * Math.PI) / 180
                                                const radius = 76 
                                                const x = Math.cos(rad) * radius + 85 
                                                const y = Math.sin(rad) * radius + 85
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]"
                                                        style={{ left: x, top: y }}
                                                        animate={{ scale: [0.6, 1.2, 0.6] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                    />
                                                )
                                            })}
                                        </motion.div>
                                    )}

                                    {/* Orbiting particles (Active from Step 4 onwards) */}
                                    {step >= 4 && (
                                        <div className="absolute inset-0 pointer-events-none">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 rounded-full bg-[#60a5fa] shadow-[0_0_8px_#60a5fa]"
                                                    initial={{ x: 108, y: 108 }}
                                                    animate={{
                                                        x: [108, 108 + Math.cos(i) * 65, 108 + Math.cos(i + 1.2) * 55, 108],
                                                        y: [108, 108 + Math.sin(i) * 65, 108 + Math.sin(i + 1.2) * 55, 108],
                                                        scale: [0.3, 1.1, 0.3],
                                                        opacity: [0, 0.85, 0],
                                                    }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Sending Beam Laser (Step 6) */}
                                    {step === 6 && (
                                        <motion.div
                                            className="absolute w-[2px] bg-gradient-to-t from-transparent via-[#60a5fa] to-white"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 260, opacity: [0, 1, 1, 0] }}
                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                        />
                                    )}

                                </div>

                                {/* Dynamic labels matching current step */}
                                <div className="mt-6 text-center font-mono text-[9px] text-[var(--text-secondary)] tracking-widest h-4">
                                    {step === 0 && 'INITIALIZING SIGNAL DECK'}
                                    {step === 1 && 'ESTABLISHING SENDER KEY'}
                                    {step === 2 && 'CONFIGURING REPLY NODE'}
                                    {step === 3 && 'COMPILING TRANSMIT TITLE'}
                                    {step === 4 && 'GENERATING PAYLOAD PACKET'}
                                    {step === 5 && 'SECURITY HANDSHAKE'}
                                    {step === 6 && 'BROADCASTING DATAGRAM'}
                                </div>
                            </div>

                            {/* Right Pane - Form Compiler Console (7 columns) */}
                            <div className="lg:col-span-7 p-8 flex flex-col justify-between relative min-h-[380px]">
                                
                                <AnimatePresence mode="wait" custom={direction}>
                                    
                                    {/* STEP 0: Welcome */}
                                    {step === 0 && (
                                        <motion.div
                                            key="step0"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-center items-start text-left gap-6 max-w-md"
                                        >
                                            <div className="space-y-3">
                                                <h3 className="text-2xl font-bold text-[var(--text-primary)] leading-snug font-display">
                                                    Establish Connection
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                                                    Initialize a secure portal to send details on custom web dev projects, technical contracts, or collaborations.
                                                </p>
                                            </div>

                                            <button
                                                onClick={handleNext}
                                                onMouseEnter={() => setCursorVariant('hover')}
                                                onMouseLeave={() => setCursorVariant('default')}
                                                className="px-7 py-3 bg-gradient-to-r from-[#60a5fa]/10 to-[#a78bfa]/10 border border-[#60a5fa]/20 text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase rounded-xl hover:border-[#60a5fa]/50 hover:bg-[#60a5fa]/15 transition-all duration-300 btn-shine"
                                            >
                                                Begin Setup
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* STEP 1: Name Input */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between"
                                        >
                                            <div className="max-w-md space-y-8">
                                                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">01 / Identify Designation</span>
                                                
                                                <div className="aurora-input-wrapper flex flex-col gap-2 group/input">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-[#60a5fa] scale-0 group-focus-within/input:scale-100 transition-transform duration-300" />
                                                        <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] group-focus-within/input:text-[#60a5fa] uppercase font-bold transition-colors duration-300">Your Name</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="bg-transparent text-[var(--text-primary)] text-sm tracking-wide py-1 font-sans border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                                                        placeholder="Name..."
                                                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                                <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-colors">Back</button>
                                                <button 
                                                    onClick={handleNext} 
                                                    disabled={!formData.name.trim()}
                                                    className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/10 to-[#a78bfa]/10 border border-[#60a5fa]/25 hover:border-[#60a5fa]/50 rounded-xl text-[var(--text-primary)] font-mono text-[9px] tracking-wider uppercase transition-all ${!formData.name.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                                >
                                                    Continue &gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: Email Input */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between"
                                        >
                                            <div className="max-w-md space-y-8">
                                                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">02 / Reply Node Configuration</span>
                                                
                                                <div className="aurora-input-wrapper flex flex-col gap-2 group/input">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-[#60a5fa] scale-0 group-focus-within/input:scale-100 transition-transform duration-300" />
                                                        <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] group-focus-within/input:text-[#60a5fa] uppercase font-bold transition-colors duration-300">Your Email Address</span>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, email: e.target.value })
                                                            if (emailError) setEmailError('')
                                                        }}
                                                        className="bg-transparent text-[var(--text-primary)] text-sm tracking-wide py-1 font-sans border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                                                        placeholder="Email Address..."
                                                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                        autoFocus
                                                    />
                                                </div>
                                                {emailError && <span className="text-[9px] font-mono text-red-400 mt-2 block">&gt; {emailError}</span>}
                                            </div>

                                            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                                <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-colors">Back</button>
                                                <button 
                                                    onClick={handleNext}
                                                    disabled={!formData.email.trim()}
                                                    className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/10 to-[#a78bfa]/10 border border-[#60a5fa]/25 hover:border-[#60a5fa]/50 rounded-xl text-[var(--text-primary)] font-mono text-[9px] tracking-wider uppercase transition-all ${!formData.email.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                                >
                                                    Continue &gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: Subject Input */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between"
                                        >
                                            <div className="max-w-md space-y-8">
                                                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">03 / Subject Header</span>
                                                
                                                <div className="aurora-input-wrapper flex flex-col gap-2 group/input">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-[#60a5fa] scale-0 group-focus-within/input:scale-100 transition-transform duration-300" />
                                                        <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] group-focus-within/input:text-[#60a5fa] uppercase font-bold transition-colors duration-300">Message Subject</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                        className="bg-transparent text-[var(--text-primary)] text-sm tracking-wide py-1 font-sans border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                                                        placeholder="Subject..."
                                                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                                <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-colors">Back</button>
                                                <button 
                                                    onClick={handleNext}
                                                    disabled={!formData.subject.trim()}
                                                    className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/10 to-[#a78bfa]/10 border border-[#60a5fa]/25 hover:border-[#60a5fa]/50 rounded-xl text-[var(--text-primary)] font-mono text-[9px] tracking-wider uppercase transition-all ${!formData.subject.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                                >
                                                    Continue &gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 4: Message Content */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between"
                                        >
                                            <div className="max-w-md space-y-8">
                                                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">04 / Datagram Compiler</span>
                                                
                                                <div className="aurora-input-wrapper flex flex-col gap-2 group/input">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-[#60a5fa] scale-0 group-focus-within/input:scale-100 transition-transform duration-300" />
                                                        <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] group-focus-within/input:text-[#60a5fa] uppercase font-bold transition-colors duration-300">Write Message</span>
                                                    </div>
                                                    <textarea
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="bg-transparent w-full min-h-[110px] text-[var(--text-primary)] text-sm tracking-wide resize-none pt-2 font-sans border-none outline-none focus:outline-none focus:ring-0 focus:border-none"
                                                        placeholder="Type message content here..."
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                                <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-colors">Back</button>
                                                <button 
                                                    onClick={handleNext}
                                                    disabled={!formData.message.trim()}
                                                    className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/10 to-[#a78bfa]/10 border border-[#60a5fa]/25 hover:border-[#60a5fa]/50 rounded-xl text-[var(--text-primary)] font-mono text-[9px] tracking-wider uppercase transition-all ${!formData.message.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                                >
                                                    Compile &gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 5: Review */}
                                    {step === 5 && (
                                        <motion.div
                                            key="step5"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between"
                                        >
                                            <div>
                                                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase block mb-4">05 / Security Verification</span>
                                                
                                                <div className="p-5 rounded-2xl bg-white/[0.02] border border-[var(--border-color)] font-mono text-[11px] leading-relaxed text-[var(--text-primary)]/90 overflow-y-auto max-h-[180px] select-text">
                                                    <div className="text-[var(--text-muted)] border-b border-white/5 pb-2 mb-2 uppercase tracking-wider text-[9px] flex items-center justify-between">
                                                        <span>encrypted package data</span>
                                                        <span className="text-emerald-400">ready</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <span className="text-[#60a5fa]">Sender  :</span> <DecryptText text={formData.name} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[#60a5fa]">Gateway :</span> <DecryptText text={formData.email} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[#60a5fa]">Subject :</span> <DecryptText text={formData.subject} />
                                                    </div>
                                                    <div className="border-t border-white/5 mt-2 pt-2">
                                                        <span className="text-[#a78bfa]">Message Content:</span>
                                                    </div>
                                                    <div className="whitespace-pre-wrap pl-2 italic mt-1 text-[var(--text-primary)] border-l border-[#a78bfa]/30">
                                                        <DecryptText text={formData.message} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                                <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[9px] tracking-wider uppercase transition-colors">Edit</button>
                                                <button
                                                    onClick={transmitPayload}
                                                    className="px-8 py-3 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[9px] tracking-widest uppercase transition-all duration-300 btn-shine"
                                                >
                                                    Transmit Stream
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 6: Sending Loader / Successful Delivery */}
                                    {step === 6 && (
                                        <motion.div
                                            key="step6"
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="flex-1 flex flex-col justify-between text-center min-h-[260px]"
                                        >
                                            {isSending ? (
                                                <div className="my-auto flex flex-col justify-center">
                                                    <div className="flex items-center justify-center gap-2 mb-6">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                                                        <span className="text-[10px] font-mono tracking-[0.3em] text-[#60a5fa] uppercase font-bold">Broadcasting message...</span>
                                                    </div>
                                                    <TerminalLoader onComplete={() => {}} />
                                                </div>
                                            ) : sendFailed ? (
                                                <div className="my-auto flex flex-col justify-center items-center gap-4 py-6">
                                                    <motion.div
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ type: 'spring', delay: 0.2 }}
                                                        className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 mb-2"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                                    </motion.div>
                                                    <span className="text-[9px] font-mono tracking-[0.2em] text-red-400 uppercase font-semibold">Transmission Failed</span>
                                                    <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                        Message Not Sent
                                                    </h3>
                                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto font-sans">
                                                        Something went wrong on the mail relay. You can retry, or email me directly instead.
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <button
                                                            onClick={transmitPayload}
                                                            className="px-5 py-2.5 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all"
                                                        >
                                                            Retry
                                                        </button>
                                                        <a
                                                            href={mailtoFallback}
                                                            className="px-5 py-2.5 border border-red-500/30 hover:bg-red-500/10 text-red-400 rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all"
                                                        >
                                                            Email Directly
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="my-auto flex flex-col justify-center items-center gap-4 py-6">
                                                    <motion.div
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ type: 'spring', delay: 0.2 }}
                                                        className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2 animate-bounce"
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                                    </motion.div>
                                                    <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400 uppercase font-semibold">Broadcast Confirmed</span>
                                                    <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                        Message Transmitted!
                                                    </h3>
                                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto font-sans">
                                                        Your message has been delivered securely. I will get back to you shortly, {formData.name}.
                                                    </p>
                                                </div>
                                            )}

                                            {!isSending && (
                                                <div className="flex justify-center mt-6 border-t border-white/5 pt-4">
                                                    <button
                                                        onClick={resetTerminal}
                                                        className="px-6 py-2.5 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all"
                                                    >
                                                        Reset Terminal
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modern Capsule Social Coordinates Section */}
                <div className="w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                        <h3 className="text-xs tracking-[0.3em] uppercase text-[var(--text-secondary)] font-mono">Social Coordinates</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {socials.map((s, idx) => (
                            <SocialCard 
                                key={s.label} 
                                social={s} 
                                onLeetCodeClick={() => setShowLeetCodeModal(true)} 
                            />
                        ))}
                    </div>
                </div>

                {/* Footer element */}
                <div className="text-center text-[10px] font-mono text-[var(--text-secondary)] opacity-50 tracking-wider">
                    &copy; {new Date().getFullYear()} PRIYANK KHATRI &bull; ALL RIGHTS RESERVED
                </div>
            </div>

            {/* Holographic LeetCode Modal */}
            <AnimatePresence>
                {showLeetCodeModal && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLeetCodeModal(false)}
                    >
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

                        <motion.div
                            className="relative glass-card max-w-2xl w-full z-[100] overflow-hidden border-white/10"
                            initial={{ scale: 0.95, opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f59e0b]/30 to-transparent" />

                            <div className="p-6 sm:p-8 md:p-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h3
                                        className="text-xl md:text-2xl font-bold text-[var(--text-primary)]"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        LeetCode <span className="text-[#f59e0b]">Analysis</span>
                                    </h3>
                                    <a
                                        href="https://leetcode.com/u/Priyank_Khatri/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] hover:border-[var(--border-color)] transition-all text-xs text-[var(--text-secondary)] flex items-center gap-2 group"
                                    >
                                        View Profile
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                </div>

                                <HolographicFrame>
                                    <img
                                        src="https://leetcard.jacoblin.cool/Priyank_Khatri?theme=dark&font=Inter&ext=activity"
                                        alt="LeetCode Stats Card"
                                        className="max-w-full max-h-[40vh] sm:max-h-[50vh] h-auto object-contain select-none"
                                        loading="lazy"
                                    />
                                </HolographicFrame>

                                <div className="flex items-center justify-between pt-6 mt-8 border-t border-[var(--border-color)]">
                                    <button
                                        onClick={() => setShowLeetCodeModal(false)}
                                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-white transition-colors"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Close
                                    </button>
                                    <span className="text-[9px] tracking-wider text-[var(--text-muted)] uppercase">ESC to dismiss</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
