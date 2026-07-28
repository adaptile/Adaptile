import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'

const ProjectDetail = lazy(() => import('./ProjectDetail.jsx'))
const CaseStudy = lazy(() => import('./CaseStudy.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/work/:projectId"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050508' }} />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path="/case-study/watcherguru"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050508' }} />}>
              <CaseStudy />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
