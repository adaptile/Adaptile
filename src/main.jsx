import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'

// Route-split: the project detail page (and its motion-driven gallery) is only
// needed at /work/* — keep it out of the homepage's initial bundle.
const ProjectDetail = lazy(() => import('./ProjectDetail.jsx'))

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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
