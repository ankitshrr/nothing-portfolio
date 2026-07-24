import { useEffect, useState, useRef } from 'react';

export default function Navbar({ activeSection, onTriggerHero }) {
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const navRef = useRef(null);

  useEffect(() => {
    // Initial theme setup
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);

    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const triggerNavGlyphs = () => {
    if (!navRef.current) return;
    const segments = navRef.current.querySelectorAll('.ng-segment');
    segments.forEach((seg) => {
      seg.classList.remove('active');
      void seg.offsetWidth;
      const randomDelay = Math.floor(Math.random() * 150);
      setTimeout(() => seg.classList.add('active'), randomDelay);
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
    triggerNavGlyphs();
  };

  const handleNavClick = () => {
    setExpanded(false);
    triggerNavGlyphs();
  };

  const handleBrandClick = () => {
    if (onTriggerHero) onTriggerHero();
    triggerNavGlyphs();
  };

  return (
    <nav id="mainNav" aria-label="Primary navigation" ref={navRef} className={expanded ? 'expanded' : ''}>
      <div className="ng-segment ng-top-bar"></div>
      <div className="ng-segment ng-right-arc"></div>
      <div className="ng-segment ng-left-dot"></div>
      <div className="ng-segment ng-bottom-dash"></div>

      <a href="#home" className="nav-brand" id="brandBtn" onClick={handleBrandClick}>
        ANKIT
      </a>

      <div className="nav-menu" id="navMenu">
        {['about', 'skills', 'work', 'contact'].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link ${activeSection === id ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            {id === 'work' ? 'My Work' : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          id="themeBtn"
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={toggleTheme}
        >
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

        <button
          className="nav-hamburger"
          id="navToggle"
          aria-label="Open menu"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
