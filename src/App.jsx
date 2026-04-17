import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from './components/RootLayout'

/* Lazy-loaded page components for code splitting */
const Home = lazy(() => import('./pages/Home'))
const Tech = lazy(() => import('./pages/Tech'))
const Work = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const CredentialsPage = lazy(() => import('./pages/CredentialsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] z-[9999]">
        <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-white/5 border-t-[var(--accent-1)] animate-spin" />
            <div className="text-center">
                <div className="text-[10px] tracking-[0.8em] font-mono text-[var(--accent-1)] uppercase animate-pulse">Initializing_Sector</div>
                <div className="text-[8px] font-mono text-white/20 uppercase mt-2">Dossier_Link_Active // Syncing_Data_Nodes</div>
            </div>
        </div>
    </div>
)

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="tech"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <Tech />
                        </Suspense>
                    }
                />
                <Route
                    path="work"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <Work />
                        </Suspense>
                    }
                />
                <Route
                    path="work/:id"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <WorkDetail />
                        </Suspense>
                    }
                />
                <Route
                    path="credentials"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <CredentialsPage />
                        </Suspense>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <ContactPage />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<LoadingFallback />}>
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}
