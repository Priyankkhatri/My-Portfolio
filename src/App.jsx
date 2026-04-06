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

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={null}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="tech"
                    element={
                        <Suspense fallback={null}>
                            <Tech />
                        </Suspense>
                    }
                />
                <Route
                    path="work"
                    element={
                        <Suspense fallback={null}>
                            <Work />
                        </Suspense>
                    }
                />
                <Route
                    path="work/:id"
                    element={
                        <Suspense fallback={null}>
                            <WorkDetail />
                        </Suspense>
                    }
                />
                <Route
                    path="credentials"
                    element={
                        <Suspense fallback={null}>
                            <CredentialsPage />
                        </Suspense>
                    }
                />
                <Route
                    path="contact"
                    element={
                        <Suspense fallback={null}>
                            <ContactPage />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={null}>
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}
