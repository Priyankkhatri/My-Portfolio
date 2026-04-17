import { useParams, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

    }, [id])

    if (!project) {
        return <Navigate to="/404" replace />
    }

    const { prev, next } = getAdjacentProjects(id)

    return (
        <>
            <Helmet>
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

                                />
                            </SectionReveal>
                        )}

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

