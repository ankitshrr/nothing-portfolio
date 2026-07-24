export default function Skills() {
  return (
    <section className="widget skills-widget fade-in-section" id="skills">
      <div className="section-header">
        <div>
          <span className="label">Technical Skills</span>
          <h2>Tools & Technologies</h2>
        </div>
      </div>

      <div className="bento-skills">
        {/* Bento Box 1: Languages (Wide Marquee) */}
        <div className="bento-box bento-wide bento-marquee-box">
          <div className="bento-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Programming
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              <span>PYTHON</span><span className="dim">•</span>
              <span>JAVASCRIPT</span><span className="dim">•</span>
              <span>HTML</span><span className="dim">•</span>
              <span>CSS</span><span className="dim">•</span>
              <span>PYTHON</span><span className="dim">•</span>
              <span>JAVASCRIPT</span><span className="dim">•</span>
              <span>HTML</span><span className="dim">•</span>
              <span>CSS</span><span className="dim">•</span>
              <span>PYTHON</span><span className="dim">•</span>
              <span>JAVASCRIPT</span><span className="dim">•</span>
              <span>HTML</span><span className="dim">•</span>
              <span>CSS</span><span className="dim">•</span>
            </div>
          </div>
        </div>

        {/* Bento Box 2: Dev & Design (Square) */}
        <div className="bento-box bento-square">
          <div className="bento-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Dev & Design
          </div>
          <div className="bento-icons-grid">
            <div className="bento-icon-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" />
              <span>Linux</span>
            </div>
            <div className="bento-icon-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
              <span>Docker</span>
            </div>
            <div className="bento-icon-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" />
              <span>Jenkins</span>
            </div>
            <div className="bento-icon-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" />
              <span>Photoshop</span>
            </div>
          </div>
        </div>

        {/* Bento Box 3: Tools (Square) */}
        <div className="bento-box bento-square bento-tools">
          <div className="bento-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            Workflow Tools
          </div>
          <div className="bento-tools-list">
            <div className="bento-tool-item">
              <div className="bento-tool-item-left">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
                <span className="bento-tool-name">GitHub</span>
              </div>
              <div className="bento-tool-status">
                <div className="dot"></div>
                <span>ACTIVE</span>
              </div>
            </div>
            <div className="bento-tool-item">
              <div className="bento-tool-item-left">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" style={{width: '20px', height: '20px'}} />
                <span className="bento-tool-name">VS Code</span>
              </div>
              <div className="bento-tool-status">
                <div className="dot"></div>
                <span>PRIMARY IDE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
