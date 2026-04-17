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

            <article className="relative min-h-screen bg-[var(--bg-primary)] overflow-visible">
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
            </article>
        </>
    )
}
