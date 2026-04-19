import { Helmet } from 'react-helmet-async'
import SignatureSection from '../components/signature/SignatureSection'

export default function BeyondCode() {
    return (
        <>
            <Helmet>
                <title>Beyond Code | Priyank Khatri</title>
                <meta name="description" content="Discover what lies beyond the code — personal projects, music, and more." />
            </Helmet>
            <div className="pt-24 pb-12">
                <SignatureSection />
            </div>
        </>
    )
}
