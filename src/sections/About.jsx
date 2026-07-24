export default function About() {
  return (
    <section className="widget about-widget fade-in-section" id="about">
      <span className="label">About</span>
      <div className="about-grid">
        <div className="about-text-container fade-in-section" style={{ transitionDelay: '0.12s' }}>
          <p className="about-desc">
            I’m Ankit Shrestha, a developer building simple and effective applications.
            Right now I’m exploring new development tools and strengthening my programming fundamentals.
            I enjoy writing clean code, solving problems, and continuously improving my skills.
          </p>

          <div className="about-links">
            <a className="btn-system btn-ghost btn-mini" href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Resume
            </a>

            <a className="btn-system btn-ghost btn-mini" href="https://github.com/ankitshrr" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>

            <a className="btn-system btn-ghost btn-mini" href="https://linkedin.com/in/ankitshrr" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          <p className="about-foot">
            Location: Kathmandu, Nepal • Target Role: Junior Developer / Intern
          </p>
        </div>

        <div className="about-photo-container fade-in-section" aria-label="Profile photo" style={{ transitionDelay: '0.24s' }}>
          <div className="corner-mark corner-tl"></div>
          <div className="corner-mark corner-br"></div>
          <img src="/assets/img/ankit.webp" alt="Profile" />
        </div>
      </div>
    </section>
  );
}
