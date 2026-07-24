export default function Footer() {
  const currentYear = new Date().getFullYear();
  const buildStamp = new Date().toISOString().slice(0, 10);

  return (
    <footer className="widget premium-footer">
      <div className="pf-top">
        <div className="pf-brand">
          <h2>Ankit Shrestha</h2>
          <div className="status-tag">
            <span className="blue-dot"></span>
            <span>Software Developer • Available for work</span>
          </div>
        </div>

        <div className="pf-links">
          <div className="pf-col">
            <span className="label">INDEX</span>
            <a href="#home" className="pf-link">Home</a>
            <a href="#about" className="pf-link">About</a>
            <a href="#work" className="pf-link">Work</a>
          </div>
          <div className="pf-col">
            <span className="label">SOCIALS</span>
            <a href="https://github.com/ankitshrr" target="_blank" rel="noopener noreferrer" className="pf-link">GitHub</a>
            <a href="https://linkedin.com/in/ankitshrr" target="_blank" rel="noopener noreferrer" className="pf-link">LinkedIn</a>
            <a href="mailto:ankitprogressx@gmail.com" className="pf-link">Email</a>
          </div>
        </div>
      </div>

      <div className="divider pf-divider"></div>

      <div className="pf-bottom">
        <div className="pf-copy">
          <span>© {currentYear} Ankit Shrestha.</span> All rights reserved.<br />
          This is a personal portfolio. “Nothing OS” style is used as design inspiration only.
        </div>
        <div className="pf-status">
          <span>Designed in Kathmandu</span>
          <span>Status: <span className="pf-live">{buildStamp}</span></span>
        </div>
      </div>
    </footer>
  );
}
