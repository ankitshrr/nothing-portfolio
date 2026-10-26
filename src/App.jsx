import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contributions from './components/Contributions';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SkillSheet from './components/SkillSheet';
import useScrollSpy from './hooks/useScrollSpy';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'contributions', 'work', 'contact'];

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const { activeSection } = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  useEffect(() => {
    // Add page-loaded class to body to trigger initial animations (e.g. Navbar fade-in)
    setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 100);

    // Reset scroll to top on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = prefersReducedMotion ? null : new Lenis({
      autoRaf: true,
      smoothWheel: true
    });

    const handleDocumentClick = (e) => {
      const backToTop = e.target.closest('.mf-back-top');
      if (backToTop) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
        return;
      }

      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      history.replaceState(null, '', href);
      if (lenis) {
        lenis.scrollTo(target, { offset: -100 });
      } else {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'auto'
        });
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      lenis?.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <>
      <a href="#about" className="skip-link">Skip to content</a>
      <div id="scrollProgress"></div>
      
      <Navbar toggleTheme={toggleTheme} theme={theme} activeSection={activeSection} />

      <main className="container">
        <div className="grid-interface">
          <Hero containerVariants={containerVariants} itemVariants={itemVariants} />
          <About />
          <Experience />
          <Skills />
          <Contributions theme={theme} />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>

      <div id="bugToast" className="bug-toast"></div>
      </>
    </MotionConfig>
  );
}

export default App;
