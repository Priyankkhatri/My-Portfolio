import { Helmet } from 'react-helmet-async'
import About from '../sections/About'

/**
 * About page — renders the existing About section as a standalone route.
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
            <About />
        </>
    )
}
