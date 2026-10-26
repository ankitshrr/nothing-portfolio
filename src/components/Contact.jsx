import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target['cf-name'].value.trim();
    const email = e.target['cf-email'].value.trim();
    const subject = e.target['cf-subject'].value.trim() || 'Hello Ankit';
    const message = e.target['cf-message'].value.trim();
    
    const mailto = `mailto:ankitprogressx@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    setToastMsg('Opening your email app...');
    setToastVisible(true);
    
    if (isMobile) {
      window.location.href = mailto;
    } else {
      window.open(mailto, '_blank', 'noopener,noreferrer');
    }
    
    e.target.reset();
    
    setTimeout(() => {
      setToastMsg('Thanks for reaching out.');
      setTimeout(() => setToastVisible(false), 1800);
    }, 1000);
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
      <motion.section className="widget contact-widget" id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
>
        <div className="contact-left">
          <div className="cf-form-header">
            <span className="label" style={{marginBottom: '0'}}>Contact Info</span>
          </div>

          <div className="status-tag" style={{marginBottom: '-8px'}}>
            <span className="red-dot"></span>
            <span>Available for opportunities</span>
          </div>

          <h2 className="contact-title">Let's work<br /><span className="highlight">together.</span></h2>
          <p className="contact-desc">Open to new opportunities and projects. Drop me a message and I'll get back to you.</p>

          <div className="contact-meta-row">
            <div className="contact-meta-chip">
              <Clock size={11} strokeWidth={2.5} />
              <span>Replies within 24h</span>
            </div>
            <div className="contact-meta-chip">
              <MapPin size={11} strokeWidth={2.5} />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          <div className="contact-divider"></div>

          <div className="contact-actions">
            <a href="https://linkedin.com/in/ankitshrr" target="_blank" rel="noopener" className="contact-pill contact-pill-ghost">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/ankitshrr" target="_blank" rel="noopener" className="contact-pill contact-pill-ghost">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="cf-form-header">
            <span className="label" style={{marginBottom: '0'}}>Send a message</span>
          </div>
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="cf-row">
              <div className="cf-group">
                <label className="cf-label" htmlFor="cf-name">Your Name</label>
                <input className="cf-input" id="cf-name" type="text" placeholder="Jane Doe" required autoComplete="name" />
              </div>
              <div className="cf-group">
                <label className="cf-label" htmlFor="cf-email">Email Address</label>
                <input className="cf-input" id="cf-email" type="email" placeholder="hello@example.com" required autoComplete="email" />
              </div>
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf-subject">Subject</label>
              <input className="cf-input" id="cf-subject" type="text" placeholder="Job opportunity / Collaboration" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="cf-message">Message</label>
              <textarea className="cf-input cf-textarea" id="cf-message" placeholder="Hi Ankit, I wanted to reach out about..." rows="4" required onInput={handleTextareaInput}></textarea>
            </div>
            <button type="submit" className="cf-submit btn-system" id="cfSubmitBtn">
              Send Message
              <Send size={16} strokeWidth={2.5} />
            </button>
            <div id="cfToast" className="cf-toast" role="status" aria-live="polite" style={{ opacity: toastVisible ? 1 : 0 }}>{toastMsg}</div>
          </form>
        </div>
      </motion.section>
  );
}
