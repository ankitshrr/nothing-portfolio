import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="minimal-footer">
        <div className="mf-left">
          <span className="mf-copy">© <span id="yearNow">{new Date().getFullYear()}</span> ANKIT SHRESTHA</span>
          <span className="mf-status">
            <span className="mf-dot"></span>
            <span>AVAILABLE FOR WORK</span>
          </span>
        </div>

        <div className="mf-right">
          <span className="mf-time" id="ktmTime">08:23 PM • KATHMANDU</span>
          <span className="mf-divider">|</span>
          <button className="mf-back-top"  aria-label="Back to top">
            BACK TO TOP
            <ArrowUp size={11} strokeWidth={3} />
          </button>
        </div>
      </footer>
  );
}
