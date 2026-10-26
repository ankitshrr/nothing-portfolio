import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#work', label: 'My Work', id: 'work' },
  { href: '#contact', label: 'Contact', id: 'contact' }
];

export default function Navbar({ toggleTheme, theme, activeSection }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const triggerNavGlyphs = () => {
    const segments = document.querySelectorAll("#mainNav .ng-segment");
    segments.forEach((seg) => {
      seg.classList.remove("active");
      void seg.offsetWidth;
      setTimeout(() => seg.classList.add("active"), Math.floor(Math.random() * 150));
    });
  };

  useEffect(() => {
    triggerNavGlyphs();
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
        document.body.classList.remove('no-scroll');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  const handleNavClick = () => {
    setIsExpanded(false);
    document.body.classList.remove("no-scroll");
    triggerNavGlyphs();
  };

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
    document.body.classList.toggle("no-scroll", !isExpanded);
  };

  return (
    <>
      <header className="site-header">
        <nav id="mainNav" className={isExpanded ? "expanded" : ""} aria-label="Primary navigation">
          <div className="ng-segment ng-top-bar"></div>
          <div className="ng-segment ng-right-arc"></div>
          <div className="ng-segment ng-bottom-dash"></div>

          <a href="#home" className="nav-brand" id="brandBtn" aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 12 48 L 20 16 L 28 48 M 15 38 H 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 52 16 H 40 A 4 4 0 0 0 36 20 V 28 A 4 4 0 0 0 40 32 H 48 A 4 4 0 0 1 52 36 V 44 A 4 4 0 0 1 48 48 H 36" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="56" cy="12" r="4" fill="#3b82f6" />
            </svg>
          </a>

          <div className="nav-menu" id="navMenu">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" id="themeBtn" aria-label="Toggle theme" title="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button className="nav-hamburger" onClick={toggleNav} aria-label={isExpanded ? 'Close menu' : 'Open menu'} aria-expanded={isExpanded}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>
      {/*  MOBILE SIDE PANEL  */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="mobile-side-panel" 
            id="mobileSidePanel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="side-panel-links">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`side-link ${activeSection === link.id ? 'active' : ''}`}
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.15 + (idx * 0.08) 
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
