import { Helmet } from 'react-helmet-async'
import CinematicHero from '../components/about/CinematicHero'
import IdentityPanel from '../components/about/IdentityPanel'
import ProjectHighlight from '../components/about/ProjectHighlight'
import Philosophy from '../components/about/Philosophy'
import { TechStackSection } from '../sections/TechStack/index'

/**
 * About page — Immersive cinematic storytelling experience.
 * 7 progressive sections that reveal identity, mindset, and journey.
 */
export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About | Priyank Khatri — Frontend Developer & Programmer</title>
                <meta name="description" content="Learn more about Priyank Khatri, a frontend developer and BTech student. Discover his journey, technology stack, and passion for building seamless digital experiences." />
                <meta name="keywords" content="Priyank Khatri, Priyanka Khatri, About, Profile, Frontend Developer, Coding Gita, Technology Stack" />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/about" />
            </Helmet>

            <CinematicHero />

            <IdentityPanel />
            <ProjectHighlight />
            <Philosophy />
            <TechStackSection />
        </>
    )
}
