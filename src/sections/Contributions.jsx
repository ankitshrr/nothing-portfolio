import { usePacManContributions } from '../hooks/useGitHub';

export default function Contributions() {
  const { total, best, streak, longestStreak } = usePacManContributions();
  const GH_USER = 'ankitshrr';

  return (
    <section className="widget pac-contribution-widget scroll-reveal fade-in-section" id="contributions">
      <div className="pac-top-bar">
        <div>
          <span className="label">GitHub Activity</span>
          <h2 className="pac-widget-title">Contribution Graph</h2>
        </div>
        <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer" className="pac-gh-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          @{GH_USER}
        </a>
      </div>

      <div className="pac-hero-stat">
        <div className="pac-hero-inner">
          <span className="pac-hero-label">Total Contributions</span>
          <span className="pac-hero-value" id="pacTotalContrib">{total > 0 ? total.toLocaleString() : '—'}</span>
        </div>
        <div className="pac-secondary-stats">
          <div className="pac-sec-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="pac-sec-label">Best Day</span>
            <span className="pac-sec-value" id="pacBestDay">{best > 0 ? best : '—'}</span>
          </div>
          <div className="pac-sec-divider"></div>
          <div className={`pac-sec-chip ${streak > 0 ? 'streak-active' : ''}`} id="pacStreakChip">
            <span className="pac-streak-icon">🔥</span>
            <span className="pac-sec-label">Current Streak</span>
            <span className="pac-sec-value" id="pacStreak">{streak > 0 ? `${streak}d` : '0d'}</span>
          </div>
          <div className="pac-sec-divider"></div>
          <div className={`pac-sec-chip ${longestStreak > 0 ? 'streak-active' : ''}`} id="pacLongestStreakChip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="pac-sec-label">Longest Streak</span>
            <span className="pac-sec-value" id="pacLongestStreak">{longestStreak > 0 ? `${longestStreak}d` : '0d'}</span>
          </div>
        </div>
      </div>

      <div className="pac-graph-wrapper">
        <img className="pacman-graph-img theme-adaptive" alt="pacman contribution graph" src={`https://raw.githubusercontent.com/${GH_USER}/${GH_USER}/output/pacman-contribution-graph.svg`} />
      </div>

      <div className="pac-legend-row">
        <span className="pac-legend-text">Less</span>
        <div className="pac-legend-cell" style={{ background: '#161b22', border: '1px solid rgba(255,255,255,0.1)' }}></div>
        <div className="pac-legend-cell" style={{ background: '#0e4429' }}></div>
        <div className="pac-legend-cell" style={{ background: '#006d32' }}></div>
        <div className="pac-legend-cell" style={{ background: '#26a641' }}></div>
        <div className="pac-legend-cell" style={{ background: '#39d353' }}></div>
        <span className="pac-legend-text">More</span>
      </div>
    </section>
  );
}
