import { Helmet } from 'react-helmet-async'
import CredentialsLayout from '../components/credentials/CredentialsLayout'

/**
 * Credentials page — cinematic split-panel certificate showcase.
 */
export default function CredentialsPage() {
    return (
        <>
            <Helmet>
                <title>Credentials & Certifications | Priyank Khatri — Academic Record</title>
                <meta name="description" content="View the professional certifications and academic credentials of Priyank Khatri. Featuring certifications from Meta and various hackathon achievements." />
                <meta name="keywords" content="Priyank Khatri, Certifications, Meta Frontend, Resume, Credentials, BTech CSE, Coding Gita" />
                <link rel="canonical" href="https://priyankkhatri.vercel.app/credentials" />
            </Helmet>
            <CredentialsLayout />
        </>
    )
}
