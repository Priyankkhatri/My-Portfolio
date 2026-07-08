import { useRef, useState, useEffect, useCallback } from 'react'
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
        x: direction > 0 ? 120 : -120,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(3px)'
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 400, damping: 25 }
    },
    exit: (direction) => ({
        x: direction < 0 ? 120 : -120,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(3px)',
        transition: { type: 'spring', stiffness: 400, damping: 25 }
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
        'Connecting to mail server...',
        'Preparing message payload...',
        'Signing secure transmission...',
        'Sending message...',
        'Delivery logs updated.',
        'Message sent successfully!'
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
        
        el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = () => {
        const el = cardRef.current
        if (!el) return
        el.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)'
        setCursorVariant('default')
    }

    const themeColor = social.themeColor || '#60a5fa'
    
    // Modern Capsule Handle Mapping
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setCursorVariant('hover')}
            className="glass-card px-5 py-4 flex items-center justify-between cursor-pointer relative overflow-hidden group select-none transition-all duration-300 rounded-2xl border border-[var(--border-color)] hover:border-white/10"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease' }}
        >
            {/* Click action links */}
            {social.label === 'LeetCode' ? (
                <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLeetCodeClick(); }} 
                    className="absolute inset-0 z-10 w-full h-full bg-transparent border-none outline-none cursor-pointer"
                    aria-label="Open Leetcode Statistics"
                />
            ) : (
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
            )}

            {/* Gradient Glow backdrop */}
            <div 
                className="absolute -inset-16 opacity-0 group-hover:opacity-10 pointer-events-none rounded-full blur-[30px] transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
            />

            <div className="flex items-center gap-4 relative z-10" style={{ transform: 'translateZ(10px)' }}>
                <div 
                    style={{ color: themeColor }} 
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-white/[0.08] transition-colors duration-300"
                >
                    {social.icon}
                </div>
                
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">
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

export default function Contact() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)

    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [emailError, setEmailError] = useState('')
    const [showLeetCodeModal, setShowLeetCodeModal] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [sentSuccessfully, setSentSuccessfully] = useState(false)

    // Interactive coordinate grid background effect
    const bgRef = useRef(null)
    useEffect(() => {
        const handleMove = (e) => {
            const bg = bgRef.current
            if (!bg) return
            const x = (e.clientX / window.innerWidth - 0.5) * 15
            const y = (e.clientY / window.innerHeight - 0.5) * 15
            bg.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
        window.addEventListener('mousemove', handleMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

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
        setStep(6) // Set to loader screen

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
            console.error("EmailJS SMTP blocked. Opening fallback client...", error)
            const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
            const mailtoLink = `mailto:priyank.khatri.cg@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(mailtoBody)}`
            window.open(mailtoLink, '_blank')
            setSentSuccessfully(true)
        } finally {
            setIsSending(false)
        }
    }

    const resetTerminal = () => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setStep(0)
        setSentSuccessfully(false)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowLeetCodeModal(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

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

            <div className="max-w-4xl w-full flex flex-col items-center gap-16 md:gap-24 relative z-10">
                
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

                {/* macOS Terminal Form Card */}
                <div className="w-full max-w-xl relative">
                    <div className="glass-card relative overflow-hidden flex flex-col min-h-[380px] shadow-2xl border-[var(--border-color)] hover:border-white/10 transition-colors">
                        
                        {/* Progress Bar at the very top edge */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden z-20">
                            <motion.div 
                                animate={{ width: `${progress}%` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="h-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa]" 
                            />
                        </div>

                        {/* macOS Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-[var(--border-color)] relative z-10">
                            {/* Window Circles */}
                            <div className="flex items-center gap-2 select-none">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                            </div>
                            <span className="text-[10px] font-mono tracking-widest text-[var(--text-secondary)] uppercase">Direct Message Terminal</span>
                            <div className="w-12" /> {/* Spacer */}
                        </div>

                        {/* Content Area */}
                        <div className="p-8 flex-1 flex flex-col justify-between relative z-10">
                            <AnimatePresence mode="wait" custom={direction}>
                                
                                {/* STEP 0: Welcome Compose screen */}
                                {step === 0 && (
                                    <motion.div
                                        key="step0"
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex-1 flex flex-col items-center justify-center text-center gap-6"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-[9px] font-mono tracking-[0.3em] text-[#60a5fa] uppercase font-bold">Connection Stable</span>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Direct Message
                                            </h3>
                                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
                                                Start a conversation by typing a direct message below. I'm always open to discussing new projects, internships, or technical collaborations.
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleNext}
                                            onMouseEnter={() => setCursorVariant('hover')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                            className="mt-4 px-8 py-3.5 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/30 text-[var(--text-primary)] font-mono text-[10px] tracking-widest uppercase rounded-full hover:border-[#60a5fa]/60 transition-all duration-300 btn-shine"
                                        >
                                            Compose Message
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
                                        <div>
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#60a5fa] block mb-2 font-semibold">Step 1 of 4 — Identification</span>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Please enter your name:
                                            </h3>

                                            <div className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl font-mono text-sm focus-within:border-[#60a5fa]/40 focus-within:bg-[var(--bg-secondary)] transition-all duration-300">
                                                <span className="text-[#60a5fa] select-none font-bold">Name:</span>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="bg-transparent border-none outline-none flex-1 text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-base"
                                                    placeholder="type your name..."
                                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                    autoFocus
                                                />
                                                <span className="inline-block w-2 h-4 bg-[var(--text-primary)]/80 animate-pulse" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                            <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[10px] tracking-wider uppercase transition-colors">BACK</button>
                                            <button 
                                                onClick={handleNext} 
                                                disabled={!formData.name.trim()}
                                                className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/20 to-[#a78bfa]/20 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[10px] tracking-wider uppercase transition-all ${!formData.name.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                            >
                                                NEXT &gt;
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
                                        <div>
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#60a5fa] block mb-2 font-semibold">Step 2 of 4 — Reply Address</span>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Where can I reply back to you, {formData.name}?
                                            </h3>

                                            <div className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl font-mono text-sm focus-within:border-[#60a5fa]/40 focus-within:bg-[var(--bg-secondary)] transition-all duration-300">
                                                <span className="text-[#60a5fa] select-none font-bold">Email:</span>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, email: e.target.value })
                                                        if (emailError) setEmailError('')
                                                    }}
                                                    className="bg-transparent border-none outline-none flex-1 text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-base"
                                                    placeholder="type your email address..."
                                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                    autoFocus
                                                />
                                                <span className="inline-block w-2 h-4 bg-[var(--text-primary)]/80 animate-pulse" />
                                            </div>
                                            {emailError && <span className="text-[9px] font-mono text-red-400 mt-2 block">&gt; {emailError}</span>}
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                            <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[10px] tracking-wider uppercase transition-colors">BACK</button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!formData.email.trim()}
                                                className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/20 to-[#a78bfa]/20 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[10px] tracking-wider uppercase transition-all ${!formData.email.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                            >
                                                NEXT &gt;
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
                                        <div>
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#60a5fa] block mb-2 font-semibold">Step 3 of 4 — Subject</span>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                What is the subject of your message?
                                            </h3>

                                            <div className="flex items-center gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl font-mono text-sm focus-within:border-[#60a5fa]/40 focus-within:bg-[var(--bg-secondary)] transition-all duration-300">
                                                <span className="text-[#60a5fa] select-none font-bold">Subject:</span>
                                                <input
                                                    type="text"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="bg-transparent border-none outline-none flex-1 text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 text-base"
                                                    placeholder="type subject..."
                                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                                    autoFocus
                                                />
                                                <span className="inline-block w-2 h-4 bg-[var(--text-primary)]/80 animate-pulse" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                            <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[10px] tracking-wider uppercase transition-colors">BACK</button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!formData.subject.trim()}
                                                className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/20 to-[#a78bfa]/20 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[10px] tracking-wider uppercase transition-all ${!formData.subject.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                            >
                                                NEXT &gt;
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
                                        <div>
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#60a5fa] block mb-2 font-semibold">Step 4 of 4 — Compose</span>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Write your message:
                                            </h3>

                                            <div className="flex flex-col gap-2 p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl font-mono text-sm focus-within:border-[#60a5fa]/40 focus-within:bg-[var(--bg-secondary)] transition-all duration-300">
                                                <span className="text-[#60a5fa] select-none font-bold">Message:</span>
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="bg-transparent border-none outline-none w-full min-h-[100px] text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 resize-none pt-2 text-sm"
                                                    placeholder="type your message here..."
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                            <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[10px] tracking-wider uppercase transition-colors">BACK</button>
                                            <button 
                                                onClick={handleNext}
                                                disabled={!formData.message.trim()}
                                                className={`px-6 py-2.5 bg-gradient-to-r from-[#60a5fa]/20 to-[#a78bfa]/20 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[10px] tracking-wider uppercase transition-all ${!formData.message.trim() ? 'opacity-40 cursor-not-allowed' : 'btn-shine'}`}
                                            >
                                                REVIEW &gt;
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
                                            <span className="text-[9px] font-mono tracking-[0.2em] text-[#a78bfa] block mb-4 font-semibold">Summary — Verification</span>
                                            
                                            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono text-[11px] leading-relaxed text-[var(--text-primary)]/90 overflow-y-auto max-h-[180px] select-text">
                                                <div className="text-[var(--text-muted)] border-b border-[var(--border-color)] pb-2 mb-2 uppercase tracking-wider">Direct Message Summary</div>
                                                <div><span className="text-[#60a5fa]">Name   :</span> {formData.name}</div>
                                                <div><span className="text-[#60a5fa]">Email  :</span> {formData.email}</div>
                                                <div><span className="text-[#60a5fa]">Subject:</span> {formData.subject}</div>
                                                <div className="border-t border-[var(--border-color)] mt-2 pt-2"><span className="text-[#a78bfa]">Message:</span></div>
                                                <div className="whitespace-pre-wrap pl-2 italic mt-1 text-[var(--text-primary)]">{formData.message}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-6 border-t border-white/5 pt-4">
                                            <button onClick={handleBack} className="px-5 py-2 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-xl font-mono text-[10px] tracking-wider uppercase transition-colors">EDIT</button>
                                            <button
                                                onClick={transmitPayload}
                                                className="px-8 py-3 bg-gradient-to-r from-[#60a5fa]/20 to-[#a78bfa]/20 border border-[#60a5fa]/30 hover:border-[#60a5fa]/60 rounded-xl text-[var(--text-primary)] font-mono text-[10px] tracking-widest uppercase transition-all duration-300 btn-shine"
                                            >
                                                SEND MESSAGE
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
                                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#60a5fa] uppercase font-bold">Transmitting...</span>
                                                </div>
                                                <TerminalLoader onComplete={() => {}} />
                                            </div>
                                        ) : (
                                            <div className="my-auto flex flex-col justify-center items-center gap-4">
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ type: 'spring', delay: 0.2 }}
                                                    className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2 animate-bounce"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                                </motion.div>
                                                <span className="text-[9px] font-mono tracking-[0.2em] text-emerald-400 uppercase font-semibold">Message Delivered</span>
                                                <h3 className="text-xl font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                    Message Sent!
                                                </h3>
                                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                                                    Thank you, {formData.name}. Your message has been successfully sent. I will get back to you shortly.
                                                </p>
                                            </div>
                                        )}

                                        {!isSending && (
                                            <div className="flex justify-center mt-6 border-t border-white/5 pt-4">
                                                <button
                                                    onClick={resetTerminal}
                                                    className="px-6 py-2.5 bg-[var(--bg-highlight)] border border-[var(--border-color)] hover:bg-[var(--bg-highlight-hover)] text-[var(--text-primary)] rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all"
                                                >
                                                    Close Link
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                            </AnimatePresence>
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
