import { Helmet } from 'react-helmet-async'
import About from '../sections/About'

/**
 * Tech page — renders the existing About/Tech section as a standalone route.
 */
export default function Tech() {
    return (
        <>
            <Helmet>
                <title>Technology Stack | Priyank Khatri</title>
                <meta name="description" content="Explore the technology stack and skills of Priyank Khatri, including React, Node.js, MongoDB, and more." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/tech" />
            </Helmet>
            <About />
        </>
    )
}
