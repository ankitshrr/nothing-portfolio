import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import useTerminal from '../hooks/useTerminal';

export default function Hero({ containerVariants, itemVariants }) {
  const { prompt, command, output, showCursor, runAnimation } = useTerminal();
  const termBodyRef = useRef(null);

  // Auto-scroll terminal when output changes
  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [output, command]);

  return (
      <section className="widget hero-widget" id="home">
        <motion.div 
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content">
            <motion.span variants={itemVariants} className="hero-greeting">Hi, I'm</motion.span>
            <motion.h1 variants={itemVariants} className="hero-title">
              <span className="dot-matrix">Ankit</span>
              QA<br />Engineer
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-desc">
              I test and validate software to ensure it is reliable, functional, and ready for real-world use.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <a href="#work" className="btn-system">See My Work</a>
              <a href="assets/resume.pdf" className="btn-system btn-ghost" target="_blank" rel="noopener" download>
                <Download size={16} strokeWidth={2} />
                Resume
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-socials">
              <span className="socials-label">Let's Connect</span>
              <div className="socials-group">
                <a href="https://github.com/ankitshrr" target="_blank" rel="noopener" className="social-icon" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="mailto:ankitprogressx@gmail.com" className="social-icon" aria-label="Mail">
                  <Mail size={18} strokeWidth={2} />
                </a>
                <a href="https://instagram.com/ankitshrr" target="_blank" rel="noopener" className="social-icon" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://linkedin.com/in/ankitshrr" target="_blank" rel="noopener" className="social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/*  AUTOMATION TERMINAL  */}
          <motion.div variants={itemVariants} className="hero-terminal" aria-hidden="true" onClick={runAnimation} title="Click to replay" style={{cursor: 'pointer'}}>
            <div className="terminal-header">
              <div className="term-dots">
                <span className="term-dot close"></span>
                <span className="term-dot min"></span>
                <span className="term-dot max"></span>
              </div>
              <div className="term-title">ankit@qa-automation:~</div>
              <span className="term-replay">click to replay</span>
            </div>
            <div className="terminal-body" ref={termBodyRef}>
              <div className="term-line">
                <span className="term-prompt">{prompt}</span> 
                <span className="term-command-text">{command}</span>
                {showCursor && <span className="term-cursor"></span>}
              </div>
              <div>
                {output.map((line, idx) => (
                  <div key={idx} className="term-line" dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
  );
}
