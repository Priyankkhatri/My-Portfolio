import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { TechOrbitCanvas } from './TechOrbitCanvas'

export function TechStackSection() {
    return (
        <section
            id="tech-stack"
            style={{
                position: 'relative',
                width: '100%',
                height: '80vh',
                minHeight: '700px',
                overflow: 'hidden',
                background: 'transparent',
            }}
        >
            {/* 3D Scene */}
            <Suspense fallback={null}>
                <TechOrbitCanvas />
            </Suspense>

            {/* Top/bottom fades removed to ensure the global background is fully visible */}

            {/* Text overlay — centered horizontally, upper third of screen */}
            <div style={{
                position: 'absolute',
                top: '6%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 30,
                pointerEvents: 'none',
                width: 'max-content',
                maxWidth: '90vw',
            }}>
                {/* Eyebrow label */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginBottom: '14px',
                    }}
                >
                    <span style={{ display: 'block', width: '22px', height: '1px', background: '#7C6FCD' }} />
                    <span style={{
                        fontSize: '11px',
                        letterSpacing: '0.22em',
                        color: '#7C6FCD',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                    }}>
                        Tech Stack
                    </span>
                    <span style={{ display: 'block', width: '22px', height: '1px', background: '#7C6FCD' }} />
                </motion.div>

                {/* Main heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.25 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        margin: 0,
                        whiteSpace: 'nowrap',
                    }}
                >
                    The Universe I{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        build
                    </span>
                    {' '}with.
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '15px',
                        color: '#6B7280',
                        marginTop: '14px',
                        fontWeight: 400,
                    }}
                >
                    Technologies I use daily to turn ideas into real-world products.
                </motion.p>
            </div>

            {/* Left Floating Cards */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="hidden lg:flex absolute top-[35%] left-[5%] z-20 pointer-events-none flex-col"
            >
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="glass-morphism-premium px-6 py-4 rounded-2xl flex flex-col gap-2"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400">Frontend Architecture</span>
                    <span className="text-[14px] text-slate-100 font-semibold">React & Three.js</span>
                </motion.div>
                
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="glass-morphism-premium px-6 py-4 rounded-2xl flex flex-col gap-2 mt-6 ml-8"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400">Styling Systems</span>
                    <span className="text-[14px] text-slate-100 font-semibold">TailwindCSS & Framer</span>
                </motion.div>
            </motion.div>

            {/* Right Floating Cards */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="hidden lg:flex absolute top-[30%] right-[5%] z-20 pointer-events-none flex-col items-end text-right"
            >
                <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="glass-morphism-premium px-6 py-4 rounded-2xl flex flex-col items-end gap-2"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400">Backend Systems</span>
                    <span className="text-[14px] text-slate-100 font-semibold">Node.js & Postgres</span>
                </motion.div>

                <motion.div
                    animate={{ y: [15, -15, 15] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    className="glass-morphism-premium px-6 py-4 rounded-2xl flex flex-col items-end gap-2 mt-6 mr-8"
                    style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400">Architecture</span>
                    <span className="text-[14px] text-slate-100 font-semibold">System Design & CI/CD</span>
                </motion.div>
            </motion.div>
        </section>
    )
}
