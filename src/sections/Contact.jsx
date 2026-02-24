import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import emailjs from '@emailjs/browser'

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/Priyankkhatri',
        desc: 'Student projects & code',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/priyankkhatrii/',
        desc: 'Professional network',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@PriyankCreates',
        desc: 'Project demos & videos',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
        ),
    },
    {
        label: 'LeetCode',
        href: 'https://leetcode.com/u/priyankkhatrii/',
        desc: 'DSA & problem solving',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
]

function AnimatedInput({ label, name, type = 'text', textarea = false, required = false }) {
    const [focused, setFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const InputTag = textarea ? 'textarea' : 'input'

    return (
        <div className="relative group">
            {/* Floating label */}
            <motion.label
                className="absolute left-0 text-white/20 pointer-events-none"
                animate={{
                    top: focused || hasValue ? -8 : textarea ? 12 : 12,
                    fontSize: focused || hasValue ? '10px' : '14px',
                    letterSpacing: focused || hasValue ? '0.2em' : '0.05em',
                    color: focused ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {label}
            </motion.label>

            <InputTag
                name={name}
                type={type}
                required={required}
                rows={textarea ? 5 : undefined}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    setFocused(false)
                    setHasValue(!!e.target.value)
                }}
                onChange={(e) => setHasValue(!!e.target.value)}
                className="w-full bg-transparent border-b border-white/[0.06] text-white/80 text-sm py-3 focus:outline-none resize-none"
            />

            {/* Animated underline */}
            <div className="relative h-px w-full">
                <div className="absolute inset-0 bg-white/[0.04]" />
                <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.4), rgba(167, 139, 250, 0.4))' }}
                    initial={{ width: '0%' }}
                    animate={{ width: focused ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            </div>
        </div>
    )
}

export default function Contact() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const setCursorVariant = useStore((s) => s.setCursorVariant)
    const [showLeetCodeModal, setShowLeetCodeModal] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // { type: 'success' | 'error', message: string } | null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        const name = e.target.name.value
        const email = e.target.email.value
        const subject = e.target.subject.value
        const message = e.target.message.value

        try {
            await emailjs.send(
                'service_hzjoj3w', // Service ID
                'template_3krwhas', // Template ID
                {
                    name: name,
                    email: email, // Used for Reply To
                    title: subject, // Maps to {{title}} in subject line
                    message: message,
                },
                'AHVDMXtJzrCI9bLIp' // Public Key
            )

            setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
            e.target.reset()
        } catch (error) {
            console.error("EmailJS Error:", error)
            // Network or config blocked — fallback to mailto
            const mailtoBody = `Name: ${name}\nEmail: ${email}\n\n${message}`
            const mailtoLink = `mailto:priyank.khatri.cg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`
            window.open(mailtoLink, '_blank')
            setSubmitStatus({ type: 'success', message: 'Opening your email client to send the message...' })
            e.target.reset()
        } finally {
            setIsSubmitting(false)
            setTimeout(() => setSubmitStatus(null), 5000)
        }
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

    return (
        <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
            <div className="section-divider mb-32" />

            <div className="floating-orb w-64 h-64 bg-blue-500 top-40 -right-20" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-px bg-white/10" />
                    <p className="text-[11px] tracking-[0.4em] uppercase text-white/20">005 &mdash; Contact</p>
                </div>
                <h2
                    className="text-3xl md:text-5xl font-bold mb-3 text-white/90"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Let's Build <span className="text-gradient-silver">Together</span>
                </h2>
                <p className="text-sm text-white/25 max-w-lg mb-20">
                    Have a project in mind or just want to start a conversation? I'm always excited
                    about new challenges and meaningful collaborations.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
                    {/* Form — 3 cols */}
                    <div className="lg:col-span-3">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-10"
                        >
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <AnimatedInput label="Name" name="name" required />
                                <AnimatedInput label="Email" name="email" type="email" required />
                            </div>
                            <AnimatedInput label="Subject" name="subject" required />
                            <AnimatedInput label="Message" name="message" textarea required />

                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center gap-6">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                                        className={`group btn-shine inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#60a5fa]/15 to-[#a78bfa]/15 border border-[#60a5fa]/25 text-white/90 text-sm font-medium tracking-wide rounded-full shadow-lg shadow-[#60a5fa]/5 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#60a5fa]/45'}`}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        {!isSubmitting && (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                                                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                            </svg>
                                        )}
                                    </motion.button>
                                    <span className="text-[10px] text-white/10">Usually replies within 24h</span>
                                </div>

                                <AnimatePresence>
                                    {submitStatus?.type === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-emerald-400 text-xs tracking-wide flex items-center gap-2"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            {submitStatus.message}
                                        </motion.div>
                                    )}
                                    {submitStatus?.type === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-red-400 text-xs tracking-wide flex items-center gap-2"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                            {submitStatus.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </div>

                    {/* Socials — 2 cols */}
                    <div className="lg:col-span-2 flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-white/15 mb-8">Find me on</p>
                            <div className="flex flex-col gap-3">
                                {socials.map((s, i) => (
                                    <motion.div
                                        key={s.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                        className="relative flex items-center p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.08] transition-[background-color,border-color] duration-300 group"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0 rounded-xl" />
                                        <div className="relative z-10 flex items-center gap-4 w-full pointer-events-none">
                                            <span className="text-white/15 group-hover:text-white/40 transition-colors duration-300">
                                                {s.icon}
                                            </span>
                                            <div className="flex-1">
                                                <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors block">{s.label}</span>
                                                <span className="text-[10px] text-white/15">{s.desc}</span>
                                            </div>
                                            {s.label === 'LeetCode' && (
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowLeetCodeModal(true); }}
                                                    className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#60a5fa]/10 border border-[#60a5fa]/20 text-[#60a5fa] hover:bg-[#60a5fa]/20 hover:text-white transition-colors text-[10px] font-medium tracking-wide uppercase mr-2"
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                                                    Analysis
                                                </button>
                                            )}
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-[color,transform] duration-300">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Availability badge */}
                        <div className="mt-12 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-2 h-2 bg-[#60a5fa]/70 rounded-full animate-pulse-glow" />
                                <span className="text-xs text-white/40 font-medium">Open to internships</span>
                            </div>
                            <p className="text-[11px] text-white/20 leading-relaxed">
                                Currently looking for internships and small collaborations to apply my fundamentals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-32 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 border border-white/10 rounded-md flex items-center justify-center">
                            <span className="text-[10px] text-white/30 font-medium" style={{ fontFamily: "'Poppins'" }}>P</span>
                        </div>
                        <span className="text-xs text-white/15">Designed & Built by Priyank</span>
                    </div>
                    <span className="text-[10px] text-white/10">
                        &copy; {new Date().getFullYear()} &mdash; All rights reserved
                    </span>
                </div>
            </motion.div>

            {/* LeetCode Analysis Modal */}
            <AnimatePresence>
                {showLeetCodeModal && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLeetCodeModal(false)}
                    >
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

                        <motion.div
                            className="relative glass-card max-w-2xl w-full z-10 overflow-hidden"
                            initial={{ scale: 0.95, opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ scale: 0.95, opacity: 0, y: 20, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top bar */}
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent" />

                            <div className="p-8 md:p-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h3
                                        className="text-xl md:text-2xl font-bold text-white/90"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        LeetCode <span className="text-gradient-silver">Analysis</span>
                                    </h3>
                                    <a
                                        href="https://leetcode.com/u/priyankkhatrii/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.1] transition-all text-xs text-white/60 flex items-center gap-2"
                                    >
                                        View Profile
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                </div>

                                <div className="w-full bg-[#1e1e1e] rounded-xl border border-white/5 p-4 flex items-center justify-center overflow-hidden min-h-[200px]">
                                    <img
                                        src="https://leetcard.jacoblin.cool/priyankkhatrii?theme=dark&font=Inter&ext=activity"
                                        alt="LeetCode Stats"
                                        className="max-w-full h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-6 mt-8 border-t border-white/[0.04]">
                                    <button
                                        onClick={() => setShowLeetCodeModal(false)}
                                        className="text-xs tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors flex items-center gap-2"
                                    >
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        Close
                                    </button>
                                    <span className="text-[10px] text-white/10">ESC to dismiss</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
