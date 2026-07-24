import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [loadPercent, setLoadPercent] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 15) + 5;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(interval);
        setLoadPercent(100);
        setTimeout(() => {
          setHidden(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Wait for transition
        }, 600); // Hold at 100%
      } else {
        setLoadPercent(currentPercent);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div id="preloader" className={`preloader ${loadPercent === 100 ? 'fade-out' : ''}`}>
      <div className="circle-bounce-shadow preloader-spinner">
        <div className="bounce-circle"></div>
        <div className="bounce-circle"></div>
        <div className="bounce-circle"></div>
        <div className="bounce-shadow"></div>
        <div className="bounce-shadow"></div>
        <div className="bounce-shadow"></div>
      </div>
      <div className="loader-counter">
        <span id="loaderPercent">{loadPercent}</span>%
      </div>
    </div>
  );
}
