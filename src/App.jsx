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

<<<<<<< HEAD
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

=======
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                    index
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="tech"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <Tech />
                        </Suspense>
                    }
                />
                <Route
                    path="work"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <Work />
                        </Suspense>
                    }
                />
                <Route
                    path="work/:id"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <WorkDetail />
                        </Suspense>
                    }
                />
                <Route
                    path="credentials"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <CredentialsPage />
                        </Suspense>
                    }
                />
                <Route
                    path="contact"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <ContactPage />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
<<<<<<< HEAD
                        <Suspense fallback={<LoadingFallback />}>
=======
                        <Suspense fallback={null}>
>>>>>>> c4b6c7b8407dc03d55306bd76767749aacc265fa
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}
