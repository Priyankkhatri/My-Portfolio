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
                height: '70vh',
                minHeight: '600px',
                overflow: 'hidden',
                background: 'transparent',
                // Smoothly fade the section at top and bottom
                maskImage: 'linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 150px, black calc(100% - 150px), transparent)',
            }}
        >
            {/* 3D Scene */}
            <Suspense fallback={null}>
                <TechOrbitCanvas />
            </Suspense>

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


        </section>
    )
}
