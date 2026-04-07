import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import useProjectData from '../hooks/useProjectData'
import WorkHero from '../components/work/WorkHero'
import WorkOverview from '../components/work/WorkOverview'
import ProblemSolution from '../components/work/ProblemSolution'
import ScreenshotGallery from '../components/work/ScreenshotGallery'
import WorkLinks from '../components/work/WorkLinks'
import ChallengesAccordion from '../components/work/ChallengesAccordion'
import NextWorkNav from '../components/work/NextWorkNav'
import SubProjectGrid from '../components/work/SubProjectGrid'
import SectionReveal from '../components/animations/SectionReveal'
import cloneWebsites from '../data/clone-websites.json'
import miniGamesData from '../data/mini-games.json'

/**
 * WorkDetail — Reconstructed as an 'Industrial Technical Dossier'.
 * Layout: Split column (Left: Narrative, Right: Sticky Technical Specs).
 */
export default function WorkDetail() {
    const { id } = useParams()
    const { project, getAdjacentProjects } = useProjectData(id)
    
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Reset scroll to top on project change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!project) {
        return <Navigate to="/404" replace />
    }

    const { prev, next } = getAdjacentProjects(id)

    return (
        <>
            <Helmet>
                <title>{project.title} | Priyank Khatri Projects</title>
                <meta name="description" content={project.tagline || `Technical details and overview for ${project.title}.`} />
                <link rel="canonical" href={`https://priyankkhatri.vercel.app/work/${id}`} />
            </Helmet>
            <article className="relative bg-[var(--bg-primary)] min-h-screen flex flex-col overflow-hidden">
            
            {/* Professional Film Grain Overlay (Page-wide) */}
            <div className="fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 opacity-[0.03] mix-blend-overlay overflow-hidden">
                <div className="absolute inset-[-200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-1)] origin-left z-[110] pointer-events-none"
                style={{ scaleX }}
            />

            {/* 1. Hero Archive Header */}
            <WorkHero project={project} />

            {/* Main Dossier Layout */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8 md:py-16 flex-1">
                <div className="flex flex-col lg:grid lg:grid-cols-[1fr,360px] gap-12 lg:gap-24 relative">
                    
                    {/* Left Column: Narrative Dossier */}
                    <div className="space-y-12 md:space-y-16">
                        
                        {/* 2. Overview Entry */}
                        <SectionReveal>
                            <WorkOverview project={project} hideMetadata />
                        </SectionReveal>

                        {/* Sub Projects (Clones & Games) — Use Masonry inside */}
                        {id === 'clone-websites' && (
                            <SectionReveal>
                                <SubProjectGrid type="clones" data={cloneWebsites} />
                            </SectionReveal>
                        )}
                        {id === 'mini-games' && (
                            <SectionReveal>
                                <SubProjectGrid type="games" data={miniGamesData} />
                            </SectionReveal>
                        )}

                        {/* 3. Problem → Solution (Blueprint Study) */}
                        <SectionReveal>
                            <ProblemSolution
                                problem={project.problem}
                                solution={project.solution}
                            />
                        </SectionReveal>

                        {/* 5. Production Visuals */}
                        <SectionReveal>
                            <ScreenshotGallery
                                gallery={project.gallery}
                                projectTitle={project.title}
                            />
                        </SectionReveal>

                        {/* 7. Reflections (Optional) */}
                        {project.challenges && (
                            <SectionReveal>
                                <ChallengesAccordion
                                    challenges={project.challenges}
                                    learnings={project.learnings}
                                />
                            </SectionReveal>
                        )}

                        {/* 6. Technical Access (Links) */}
                        <SectionReveal>
                            <WorkLinks
                                liveUrl={project.liveUrl}
                                githubUrl={project.githubUrl}
                            />
                        </SectionReveal>
                    </div>

                    {/* Right Column: Sticky Technical Specs (Space Management) */}
                    <aside className="relative lg:pt-12">
                        <div className="lg:sticky lg:top-36 space-y-12">
                            
                            {/* Specs Header */}
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--accent-1)]">
                                    Technical_Specs
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                            </div>

                            {/* Metadata List */}
                            <div className="space-y-8 p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-highlight)]/30 backdrop-blur-md">
                                {[
                                    { label: 'Role', value: project.role },
                                    { label: 'Timeline', value: project.year },
                                    { label: 'Platform', value: project.status },
                                ].map((spec) => (
                                    <div key={spec.label} className="group">
                                        <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] mb-2 font-mono">
                                            [{spec.label}]
                                        </div>
                                        <div className="text-base text-[var(--text-primary)] font-bold group-hover:text-[var(--accent-1)] transition-colors">
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sticky Tech Chips */}
                            <div className="space-y-6">
                                <div className="text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono">
                                    [Core_Stack]
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span 
                                            key={tech.name}
                                            className="px-3 py-1.5 text-[10px] tracking-widest uppercase border border-[var(--border-color)] bg-[var(--bg-highlight)]/50 text-[var(--text-secondary)] rounded-md hover:border-[var(--accent-1)]/40 hover:text-[var(--text-primary)] transition-all"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ID Ornament */}
                            <div className="pt-8 opacity-20 font-mono text-[9px] tracking-[0.8em] uppercase rotate-90 origin-left inline-block">
                                PRJ_{id.toUpperCase()}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* 8. Global Navigation */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-auto">
                <NextWorkNav prev={prev} next={next} />
            </div>
        </article>
        </>
    )
}

