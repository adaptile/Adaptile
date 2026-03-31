import { useParams, Link, useNavigate } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { PROJECTS, isVideo } from './App.jsx'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find((p) => p.id === projectId)
  const galleryRef = useRef(null)
  const [loadedImages, setLoadedImages] = useState(new Set())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [projectId])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') navigate('/') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  if (!project) {
    return (
      <div className="pd-not-found">
        <h1>Project Not Found</h1>
        <Link to="/" className="pd-back-link">Back to Home</Link>
      </div>
    )
  }

  const currentIdx = PROJECTS.indexOf(project)
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length]
  const services = project.tag.split(' · ')
  const mediaCount = project.images.length
  const videoCount = project.images.filter(isVideo).length
  const imageCount = mediaCount - videoCount

  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => new Set(prev).add(idx))
  }

  return (
    <div className="pd">
      {/* Navigation bar */}
      <nav className="pd-nav">
        <Link to="/" className="pd-nav-back">
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>
        <Link to="/" className="pd-nav-logo">
          <img src="/adaptile-logo.jpg" alt="Adaptile" />
          <span>Adaptile</span>
        </Link>
        <a href="#contact-cta" className="pd-nav-cta">Start a Project</a>
      </nav>

      {/* Hero section */}
      <section className="pd-hero">
        <div className="pd-hero-bg">
          {isVideo(project.thumbnail) ? (
            <video src={project.thumbnail} autoPlay loop muted playsInline preload="auto" />
          ) : (
            <img src={project.thumbnail} alt={project.title} />
          )}
          <div className="pd-hero-overlay" />
        </div>

        <motion.div
          className="pd-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pd-hero-services">
            {services.map((s) => (
              <span key={s} className="pd-service-tag">{s.trim()}</span>
            ))}
          </div>
          <h1 className="pd-hero-title">{project.title}</h1>
          <p className="pd-hero-desc">
            Full creative presentation and brand architecture for {project.title}.
          </p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="pd-hero-link">
              View Live <ExternalLink size={14} />
            </a>
          )}
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="pd-stats">
        <div className="pd-stat">
          <span className="pd-stat-value">{mediaCount}</span>
          <span className="pd-stat-label">Total Assets</span>
        </div>
        <div className="pd-stat">
          <span className="pd-stat-value">{imageCount}</span>
          <span className="pd-stat-label">Images</span>
        </div>
        <div className="pd-stat">
          <span className="pd-stat-value">{videoCount}</span>
          <span className="pd-stat-label">Videos</span>
        </div>
        <div className="pd-stat">
          <span className="pd-stat-value">{services.length}</span>
          <span className="pd-stat-label">Services</span>
        </div>
      </section>

      {/* Gallery */}
      <section className="pd-gallery" ref={galleryRef}>
        <div className="pd-gallery-header">
          <span className="pd-section-label">Creative Assets</span>
          <h2 className="pd-section-title">Project Gallery</h2>
        </div>
        <div className="pd-gallery-grid">
          {project.images.map((src, idx) => (
            <motion.div
              key={idx}
              className="pd-gallery-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
            >
              {isVideo(src) ? (
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="pd-gallery-media"
                />
              ) : (
                <>
                  {!loadedImages.has(idx) && <div className="pd-gallery-placeholder" />}
                  <img
                    src={src}
                    alt={`${project.title} ${idx + 1}`}
                    className={`pd-gallery-media ${loadedImages.has(idx) ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(idx)}
                  />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="pd-next">
        <span className="pd-section-label">Next Project</span>
        <Link to={`/work/${nextProject.id}`} className="pd-next-link">
          <h2 className="pd-next-title">{nextProject.title}</h2>
          <ArrowUpRight size={32} />
        </Link>
        <span className="pd-next-tag">{nextProject.tag}</span>
      </section>

      {/* CTA */}
      <section className="pd-cta" id="contact-cta">
        <h2 className="pd-cta-title">Ready to Build Something <em>Remarkable?</em></h2>
        <p className="pd-cta-sub">Let's architect your brand's next chapter.</p>
        <Link to="/#contact" className="pd-cta-btn">Start a Project</Link>
      </section>

      {/* Footer */}
      <footer className="pd-footer">
        <Link to="/" className="pd-footer-logo">
          <img src="/adaptile-logo.jpg" alt="Adaptile" />
          <span>Adaptile</span>
        </Link>
        <span className="pd-footer-copy">&copy; {new Date().getFullYear()} Adaptile. All rights reserved.</span>
      </footer>
    </div>
  )
}
