import { useState, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Contributions from './sections/Contributions';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const homeRef = useRef(null);

  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let animationFrameId;

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const renderSmoothScroll = () => {
      targetScroll = window.scrollY;
      currentScroll = lerp(currentScroll, targetScroll, 0.08);
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
      setScrollProgress(progress);
      
      animationFrameId = requestAnimationFrame(renderSmoothScroll);
    };
    
    renderSmoothScroll();
    
    const handleScroll = () => {
      const y = window.scrollY + 140;
      const sections = ['home', 'about', 'skills', 'contributions', 'work', 'contact'];
      let currentId = 'home';
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) {
          currentId = id;
        }
      }
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const handlePreloaderComplete = () => {
    document.body.classList.remove('loading');
    document.body.classList.add('page-loaded');
  };

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div id="scrollProgress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="nt-canvas"></div>
      
      <Navbar activeSection={activeSection} onTriggerHero={() => homeRef.current?.triggerBurst()} />

      <main className="container">
        <div className="grid-interface">
          <Home ref={homeRef} />
          <About />
          <Skills />
          <Contributions />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
