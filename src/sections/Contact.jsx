import { useState } from 'react';

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = 'ankitprogressx@gmail.com';
    const subject = encodeURIComponent('Hello Ankit');
    const body = encodeURIComponent('Hi Ankit,\n\nI saw your portfolio and wanted to connect regarding an opportunity.');
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
    }
  };

  const handleCopy = () => {
    const email = "ankitprogressx@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 900);
    });
  };

  return (
    <section className="widget contact-widget fade-in-section" id="contact">
      <div className="status-tag contact-tag-wrap">
        <span className="red-dot"></span>
        <span>Available for Opportunities</span>
      </div>

      <h2 className="contact-title">
        Let’s build something <br /><span className="highlight">together.</span>
      </h2>

      <p className="contact-desc">
        I'm currently looking for Junior Developer or Internship roles. My inbox is always open for new opportunities
        or just to say hi!
      </p>

      <div className="contact-actions">
        <a href="#" id="sendEmailBtn" className="btn-system" onClick={handleEmailClick}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Send an Email
        </a>
        <button className="btn-system btn-ghost" id="copyEmailBtn" onClick={handleCopy}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Address
        </button>
      </div>

      <div id="copyToast" className="mono copy-toast" style={{ opacity: toastVisible ? 1 : 0, transform: toastVisible ? 'translateY(0)' : 'translateY(4px)' }}>
        EMAIL COPIED ✅
      </div>

      <div className="contact-socials">
        <a className="chip" href="https://github.com/ankitshrr" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <b>GitHub</b>
        </a>
        <a className="chip" href="https://linkedin.com/in/ankitshrr" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          <b>LinkedIn</b>
        </a>
        <a className="chip" href="https://wa.me/97796346975" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <b>WhatsApp</b>
        </a>
      </div>
    </section>
  );
}
