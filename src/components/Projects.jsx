import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Globe, 
  Shield, 
  Zap, 
  MoreHorizontal, 
  ArrowRight, 
  Terminal, 
  Inbox,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const projectsData = [
  {
    id: 'portfolio',
    category: 'web',
    featured: true,
    title: 'Portfolio Website',
    metrics: ['Lighthouse 100', '60 FPS'],
    desc: 'A high-performance personal portfolio built with vanilla web technologies.',
    tech: 'HTML · CSS · JavaScript',
    demoUrl: 'https://ankitshrr.github.io/nothing-portfolio',
    githubUrl: 'https://github.com/ankitshrr/nothing-portfolio',
    imgSrc: 'assets/img/projects/portfolio.webp',
    fallbackImg: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    actionType: 'link'
  },
  {
    id: 'altitude',
    category: 'web',
    featured: false,
    title: 'Altitude 3D Parallax',
    metrics: ['60 FPS'],
    desc: 'An immersive 3D scrolling experience inspired by Zhangjiajie.',
    tech: 'HTML · CSS',
    demoUrl: 'https://ankitshrr.github.io/zhangjiajie-3d-parallax',
    githubUrl: 'https://github.com/ankitshrr/zhangjiajie-3d-parallax',
    imgSrc: 'assets/img/projects/altitude.webp',
    fallbackImg: 'https://images.unsplash.com/photo-1506744626753-140285396243?auto=format&fit=crop&w=600&q=80',
    actionType: 'link'
  },
  {
    id: 'terminal',
    category: 'other',
    featured: false,
    title: 'Terminal Lyric Sync',
    metrics: ['Python 3.10+'],
    desc: 'A lightweight CLI tool that fetches and synchronizes song lyrics to audio playback in real-time.',
    tech: 'Python · CLI',
    githubUrl: 'https://github.com/ankitshrr/python-lyric-sync',
    imgSrc: 'assets/img/projects/terminal.webp',
    fallbackImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    actionType: 'cli'
  }
];

const filterCategories = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: 'web', label: 'Web', icon: Globe },
  { key: 'qa', label: 'QA', icon: Shield },
  { key: 'automation', label: 'Automation', icon: Zap },
  { key: 'other', label: 'Other', icon: MoreHorizontal }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canPrev: false, canNext: true, activeIndex: 0 });

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeFilter);

  const updateScrollState = () => {
    if (!gridRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
    const canPrev = scrollLeft > 10;
    const canNext = scrollLeft < scrollWidth - clientWidth - 10;
    
    const card = gridRef.current.querySelector('.bento-card');
    const cardWidth = card ? card.offsetWidth + 20 : 1;
    const activeIndex = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      Math.max(0, filteredProjects.length - 1)
    );

    setScrollState({ canPrev, canNext, activeIndex });
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    updateScrollState();
    grid.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      grid.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredProjects.length]);

  const handleFilterClick = (key) => {
    setActiveFilter(key);
    if (gridRef.current) {
      gridRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (!gridRef.current) return;
    const card = gridRef.current.querySelector('.bento-card');
    const scrollAmount = card ? card.offsetWidth + 20 : 380;
    gridRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!gridRef.current) return;
    const card = gridRef.current.querySelector('.bento-card');
    const scrollAmount = card ? card.offsetWidth + 20 : 380;
    gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.bento-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <motion.section 
      className="widget projects-widget" 
      id="work"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="section-header projects-header">
        <div>
          <span className="label">Projects</span>
          <h2>My Work</h2>
        </div>
        
        <div className="projects-controls-group">
          <div className="project-filters" id="projectFilters">
            {filterCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                  data-filter={cat.key}
                  aria-pressed={activeFilter === cat.key}
                  onClick={() => handleFilterClick(cat.key)}
                >
                  <Icon size={14} strokeWidth={2} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="carousel-nav-desktop" aria-label="Carousel Navigation">
            <button
              type="button"
              className="carousel-nav-btn prev"
              onClick={handlePrev}
              disabled={!scrollState.canPrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="carousel-nav-btn next"
              onClick={handleNext}
              disabled={!scrollState.canNext}
              aria-label="Next project"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          <>
            <div id="featuredProjects" className="projects-grid" ref={gridRef}>
              {filteredProjects.map((project) => (
                <div className="bento-card" data-category={project.category} key={project.id}>
                  <div className="bento-img">
                    <img 
                      src={project.imgSrc} 
                      alt={project.title} 
                      loading="lazy" 
                      onError={(e) => { e.target.src = project.fallbackImg; }} 
                    />
                  </div>
                  <div className="bento-content">
                    <div className="bento-header">
                      <div>
                        {project.featured && (
                          <span className="bento-badge">
                            Featured
                          </span>
                        )}
                        <h3 className="bento-title">{project.title}</h3>
                      </div>
                    </div>
                    
                    <div className="bento-metrics">
                      {project.metrics.map((metric, idx) => (
                        <span 
                          key={idx}
                          className="qa-metric-badge">
                          {metric}
                        </span>
                      ))}
                    </div>
                    
                    <p className="bento-desc">{project.desc}</p>
                    
                    <div className="bento-tech">
                      {project.tech}
                    </div>
                    
                    <div className="bento-footer">
                      {project.actionType === 'link' ? (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="bento-link"
                        >
                          Live Demo
                          <ArrowRight size={14} strokeWidth={2} />
                        </a>
                      ) : (
                        <span className="bento-cli">
                          CLI Tool
                          <Terminal size={14} strokeWidth={2} />
                        </span>
                      )}

                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener" 
                        className="bento-gh"
                        aria-label="GitHub Repository"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Carousel Indicators */}
            <div className="carousel-pagination-desktop">
              <div className="carousel-dots">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${scrollState.activeIndex === idx ? 'active' : ''}`}
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="carousel-counter">
                <span className="current">{String(scrollState.activeIndex + 1).padStart(2, '0')}</span>
                <span className="divider">/</span>
                <span className="total">{String(filteredProjects.length).padStart(2, '0')}</span>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div id="emptyState" className="empty-state" style={{ display: 'flex' }}>
            <Inbox className="empty-state-icon" size={48} strokeWidth={1.5} />
            <h3>Data Not Found</h3>
            <p>Projects in this category are currently in development or under NDA. New case studies will be deployed here soon.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
