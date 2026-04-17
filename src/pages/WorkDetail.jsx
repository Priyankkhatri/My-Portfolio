import { useParams, Navigate } from 'react-router-dom'
<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
import { useEffect } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
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

<<<<<<< HEAD
const StaticStarsBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static repeating stars pattern */}
        <div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='30' r='1' fill='white' opacity='0.8'/%3E%3Ccircle cx='60' cy='80' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='110' cy='150' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='180' cy='40' r='1' fill='white' opacity='0.9'/%3E%3Ccircle cx='140' cy='120' r='1' fill='white' opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '150px 150px'
            }}
        />
        {/* Liquid Glass Ambient Orbs (Static for performance) */}
        <div className="absolute top-[10%] left-[5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[var(--accent-1)]/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[0%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[var(--accent-2)]/15 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[10%] w-[450px] md:w-[600px] h-[450px] md:h-[600px] bg-[var(--accent-1)]/15 rounded-full blur-[130px] mix-blend-screen" />
    </div>
)

export default function WorkDetail() {
    const { id } = useParams()
    const { project, getAdjacentProjects } = useProjectData(id)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoaded(true)
=======
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
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
    }, [id])

    if (!project) {
        return <Navigate to="/404" replace />
    }

    const { prev, next } = getAdjacentProjects(id)

    return (
        <>
            <Helmet>
<<<<<<< HEAD
                <title>{project.title} — Priyank Khatri</title>
                <meta name="description" content={`Case study and details for ${project.title}.`} />
            </Helmet>

            <article className="relative min-h-screen bg-black overflow-hidden flex flex-col">
                <StaticStarsBackground />
                <div className="relative z-10">
                    <WorkHero project={project} />

                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
                    <div className="space-y-20 md:space-y-32">
                        
                        <SectionReveal>
                            <WorkOverview project={project} />
                        </SectionReveal>

                        {(id === 'clone-websites' || id === 'mini-games') && (
                            <SectionReveal>
                                <SubProjectGrid 
                                    type={id === 'clone-websites' ? 'clones' : 'games'} 
                                    data={id === 'clone-websites' ? cloneWebsites : miniGamesData} 
                                />
                            </SectionReveal>
                        )}

                        {(project.problem || project.solution) && (
                            <SectionReveal>
                                <ProblemSolution 
                                    problem={project.problem} 
                                    solution={project.solution} 
                                />
                            </SectionReveal>
                        )}

                        {project.gallery && project.gallery.length > 0 && (
                            <SectionReveal>
                                <ScreenshotGallery 
                                    gallery={project.gallery} 
                                    projectTitle={project.title} 
                                />
                            </SectionReveal>
                        )}

                        {project.challenges && (
                            <SectionReveal>
                                <ChallengesAccordion 
                                    challenges={project.challenges} 
                                    learnings={project.learnings} 
=======
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
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                                />
                            </SectionReveal>
                        )}

<<<<<<< HEAD
                        {(project.liveUrl || project.githubUrl) && (
                            <SectionReveal>
                                <WorkLinks 
                                    liveUrl={project.liveUrl} 
                                    githubUrl={project.githubUrl} 
                                />
                            </SectionReveal>
                        )}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-20 pt-10">
                    <div className="border-t border-[var(--border-color)] pt-16">
                        <NextWorkNav prev={prev} next={next} />
                    </div>
                </div>
                </div>
            </article>
        </>
    )
}
=======
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

>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
