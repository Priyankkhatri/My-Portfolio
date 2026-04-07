import { Helmet } from 'react-helmet-async'
import Contact from '../sections/Contact'

/**
 * Contact page — renders the existing Contact section as a standalone route.
 */
export default function ContactPage() {
    return (
        <>
            <Helmet>
                <title>Contact & Socials | Priyank Khatri</title>
                <meta name="description" content="Get in touch with Priyank Khatri for collaborations, internships, or questions. Connect via LinkedIn, GitHub, or email." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/contact" />
            </Helmet>
            <Contact />
        </>
    )
}
