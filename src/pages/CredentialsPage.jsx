import { Helmet } from 'react-helmet-async'
import CredentialsLayout from '../components/credentials/CredentialsLayout'

/**
 * Credentials page — cinematic split-panel certificate showcase.
 */
export default function CredentialsPage() {
    return (
        <>
            <Helmet>
                <title>Credentials & Certifications | Priyank Khatri</title>
                <meta name="description" content="View the professional certifications and academic credentials of Priyank Khatri, including Meta Front-End Development and hackathon participations." />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/credentials" />
            </Helmet>
            <CredentialsLayout />
        </>
    )
}
