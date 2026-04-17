import { Helmet } from 'react-helmet-async'
import Contact from '../sections/Contact'

/**
 * Contact page — renders the existing Contact section as a standalone route.
 */
export default function ContactPage() {
    return (
        <>
            <Helmet>
                <title>Contact & Socials | Priyank Khatri — Get in Touch</title>
                <meta name="description" content="Connect with Priyank Khatri for web development projects, internships, or technical collaborations. Available on LinkedIn, GitHub, X, and Instagram." />
                <meta name="keywords" content="Priyank Khatri, Contact, Hire Developer, Web Developer India, GitHub, LinkedIn, Social Media" />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/contact" />
            </Helmet>
            <Contact />
        </>
    )
}
