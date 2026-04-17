import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'
import certificatesData from '../../data/certificatesData'
import useCertificateNav from '../../hooks/useCertificateNav'
import DetailsPanel from './DetailsPanel'
import CertificateStack from './CertificateStack'
import ProgressIndicator from './ProgressIndicator'
import StackNavButtons from './StackNavButtons'

/**
 * CredentialsLayout — root component for the cinematic credentials showcase.
 * Desktop: 40/60 split panel, fixed viewport height.
 * Mobile:  single column — carousel on top, details below.
 */
export default function CredentialsLayout() {
    const isMobile = useIsMobile()
    const certs = certificatesData
    const nav = useCertificateNav(certs.length)
    const activeCert = certs[nav.activeIndex]
    const prefersReducedMotion = useReducedMotion()

    /* Heading animation */
    const headingVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <section
            id="credentials-page"
            className={`relative w-full ${!isMobile ? 'h-screen overflow-hidden' : ''}`}
            style={{ minHeight: isMobile ? 'auto' : '100vh' }}
        >
            {/* ── Desktop Layout ─────────────────────────── */}
            {!isMobile ? (
                <div className="h-screen flex flex-col">
                    {/* Top-level heading */}
                    <motion.div
                        className="pt-28 pb-6 px-8 md:px-16 lg:px-24"
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-px bg-[var(--bg-highlight-hover)]" />
                            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--text-secondary)]">
                                004 &mdash; Credentials
                            </p>
                        </div>
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Certificates &{' '}
                            <span className="text-gradient-silver">Awards</span>
                        </h1>
                    </motion.div>

                    {/* Split panel */}
                    <div className="flex-1 grid grid-cols-[40%_60%] min-h-0 px-8 md:px-16 lg:px-24 pb-8 gap-6">
                        {/* Left — Details */}
                        <div className="flex flex-col justify-center pr-6 min-h-0 overflow-y-auto no-scrollbar">
                            <DetailsPanel
                                cert={activeCert}
                                activeIndex={nav.activeIndex}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                            <div className="mt-8">
                                <ProgressIndicator
                                    total={certs.length}
                                    activeIndex={nav.activeIndex}
                                    goTo={nav.goTo}
                                />
                            </div>
                        </div>

                        {/* Right — Stack */}
                        <div className="relative flex items-center justify-center min-h-0">
                            <CertificateStack
                                certs={certs}
                                activeIndex={nav.activeIndex}
                                absoluteIndex={nav.absoluteIndex}
                                goTo={nav.goTo}
                                handleWheel={nav.handleWheel}
                                handleKeyDown={nav.handleKeyDown}
                                isMobile={false}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                            <StackNavButtons
                                goNext={nav.goNext}
                                goPrev={nav.goPrev}
                                canGoNext={nav.canGoNext}
                                canGoPrev={nav.canGoPrev}
                                startFastScroll={nav.startFastScroll}
                                stopFastScroll={nav.stopFastScroll}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                /* ── Mobile Layout ───────────────────────── */
                <div className="pt-24 pb-12 px-5">
                    {/* Heading */}
                    <motion.div
                        className="mb-8"
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-px bg-[var(--bg-highlight-hover)]" />
                            <p className="text-[10px] tracking-[0.35em] uppercase text-[var(--text-secondary)]">
                                Credentials
                            </p>
                        </div>
                        <h1
                            className="text-2xl font-bold text-[var(--text-primary)]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Certificates &{' '}
                            <span className="text-gradient-silver">Awards</span>
                        </h1>
                    </motion.div>

                    {/* Carousel */}
                    <div className="mb-8">
                        <CertificateStack
                            certs={certs}
                            activeIndex={nav.activeIndex}
                            absoluteIndex={nav.absoluteIndex}
                            goTo={nav.goTo}
                            handleWheel={nav.handleWheel}
                            handleKeyDown={nav.handleKeyDown}
                            isMobile={true}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </div>

                    {/* Progress */}
                    <div className="flex justify-center mb-8">
                        <ProgressIndicator
                            total={certs.length}
                            activeIndex={nav.activeIndex}
                            goTo={nav.goTo}
                        />
                    </div>

                    {/* Details */}
                    <DetailsPanel
                        cert={activeCert}
                        activeIndex={nav.activeIndex}
                        prefersReducedMotion={prefersReducedMotion}
                    />
                </div>
            )}
        </section>
    )
}
