import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const formatKathmanduTime = () => new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Asia/Kathmandu'
}).format(new Date());

export default function Footer() {
  const [time, setTime] = useState(formatKathmanduTime);

  useEffect(() => {
    const updateTime = () => setTime(formatKathmanduTime());
    const intervalId = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

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
          <span className="mf-time" id="ktmTime">{time} • KATHMANDU</span>
          <span className="mf-divider">|</span>
          <button className="mf-back-top"  aria-label="Back to top">
            BACK TO TOP
            <ArrowUp size={11} strokeWidth={3} />
          </button>
        </div>
      </footer>
  );
}
