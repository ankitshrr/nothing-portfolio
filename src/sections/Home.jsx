import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Home = forwardRef((props, ref) => {
  const glyphRef = useRef(null);
  const timerRef = useRef(null);

  const runGlyphSequence = () => {
    if (!glyphRef.current) return;
    const segments = glyphRef.current.querySelectorAll('.glyph-segment');
    segments.forEach((seg, i) => {
      const delay = i === 0 ? 0 : i * 120 + Math.random() * 100;
      setTimeout(() => {
        seg.classList.add('active');
        setTimeout(() => seg.classList.remove('active'), 150);
        if (seg.classList.contains('gs-arc') || seg.classList.contains('gs-bottom-bar')) {
          setTimeout(() => {
            seg.classList.add('active');
            setTimeout(() => seg.classList.remove('active'), 100);
          }, 250);
        }
      }, delay);
    });
    setTimeout(() => {
      segments.forEach((seg) => seg.classList.add('idle'));
    }, 1200);
  };

  const heroGlyphBurst = () => {
    if (!glyphRef.current) return;
    const segments = glyphRef.current.querySelectorAll('.glyph-segment');
    segments.forEach((seg) => seg.classList.remove('idle', 'active'));
    void glyphRef.current.offsetWidth;
    runGlyphSequence();
  };

  useImperativeHandle(ref, () => ({
    triggerBurst: heroGlyphBurst
  }));

  useEffect(() => {
    // startHeroAutoplay
    timerRef.current = setInterval(() => {
      const home = document.getElementById('home');
      if (!home) return;
      const rect = home.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2) {
        heroGlyphBurst();
      }
    }, 2300);

    // Initial burst after a short delay
    const initTimer = setTimeout(() => {
      heroGlyphBurst();
    }, 600);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <section className="widget hero-widget fade-in-section" id="home">
      <div className="glyph-container" id="glyphSystem" ref={glyphRef}>
        <div className="glyph-segment gs-arc"></div>
        <div className="glyph-segment gs-slant-top"></div>
        <div className="glyph-segment gs-mid-slant"></div>
        <div className="glyph-segment gs-bottom-bar"></div>
        <div className="glyph-segment gs-tail"></div>
      </div>

      <div className="hero-content">
        <div className="status-tag">
          <span className="blue-dot"></span>
          <span>Available for work</span>
        </div>

        <h1 className="hero-title">
          ANKIT SHRESTHA<br />
          SOFTWARE<br />DEVELOPER.
        </h1>

        <p className="hero-desc">
          I am a developer exploring and improving my skills. I focus on writing clean code, building simple
          solutions, and continuously learning new technologies.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn-system">See My Work</a>
          <a href="#contact" className="btn-system btn-ghost">Connect</a>
        </div>

        <p className="hero-foot">
          Current Focus: Web Development • Problem Solving • Programming
        </p>
      </div>
    </section>
  );
});

export default Home;
