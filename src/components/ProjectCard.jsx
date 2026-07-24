import { useState } from 'react';
import { useGitHubLangs } from '../hooks/useGitHub';

const PROJECT_OVERRIDES = {
  "nothing-portfolio": { title: "Nothing OS Portfolio", image: "/assets/img/projects/portfolio.webp", demo: "", pinned: true },
  "zhangjiajie-3d-parallax": { title: "Altitude 3D Parallax", image: "/assets/img/projects/altitude.webp", demo: "", pinned: true },
  "python-lyric-sync": { title: "Terminal Lyric Sync", image: "/assets/img/projects/terminal.webp", demo: "", pinned: true },
  "luxxtime-watch-store": { title: "LuxxTime Watch Store", image: "", demo: "", pinned: true }
};

function deviconName(lang) {
  const l = (lang || "").toLowerCase().trim();
  const map = {
    "c++": "cplusplus", "c#": "csharp", "f#": "fsharp",
    "vue": "vuejs", "react": "react", "react-native": "react",
    "next.js": "nextjs", "node.js": "nodejs",
    "jupyter notebook": "jupyter", "shell": "bash",
    "objective-c": "objectivec", "html": "html5",
    "css": "css3", "scss": "sass", "sass": "sass"
  };
  return map[l] || l;
}

export default function ProjectCard({ repo, GH_USERNAME, isActive, onToggle }) {
  const langs = useGitHubLangs(GH_USERNAME, repo.name);
  
  const ov = PROJECT_OVERRIDES[repo.name] || {};
  const title = ov.title || repo.name;
  const desc = repo.description || "";
  const img = ov.image || `https://opengraph.githubassets.com/1/${Date.now().toString(36)}/${GH_USERNAME}/${repo.name}`;
  const demo = ov.demo || repo.homepage || "";
  
  const keywordsStr = `${repo.name} ${desc} ${langs.join(' ')} ${repo.language || ''}`.toLowerCase();
  let projectType = "Other";
  if (['flutter', 'dart', 'react-native', 'swift', 'kotlin', 'ios', 'android'].some(k => keywordsStr.includes(k))) projectType = "Mobile App";
  else if (['html', 'css', 'javascript', 'js', 'react', 'vue', 'next', 'node', 'django', 'flask', 'web', 'portfolio'].some(k => keywordsStr.includes(k))) projectType = "Web App";

  const primary = (repo.language || "").trim();
  const list = langs.filter(Boolean);
  let finalLangs = list.length ? list.slice(0, 3) : primary ? [primary] : [];
  if (primary && !finalLangs.some((x) => x.toLowerCase() === primary.toLowerCase()) && finalLangs.length < 3) {
    finalLangs.push(primary);
  }

  const handleCardClick = (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    onToggle();
  };

  return (
    <div className={`work-card-inner fade-in-section ${isActive ? 'is-active' : ''}`} onClick={handleCardClick}>
      <div className="work-list-header">
        <div className="work-title-group">
          <h3 className="work-list-title">{title}</h3>
          <span className="project-type-badge" style={{ marginBottom: 0 }}>{projectType}</span>
        </div>
        <div className="work-expand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </div>
      <div className="work-list-body">
        <div className="work-list-content">
          <div className="work-list-text">
            {desc && <p className="card-desc" style={{ marginBottom: '24px', fontSize: '15px' }}>{desc}</p>}
            
            {finalLangs.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {finalLangs.map(lang => (
                  <span key={lang} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'var(--text-main)', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
                    <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName(lang)}/${deviconName(lang)}-original.svg`} width="14" height="14" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.85 }} onError={(e) => e.target.style.display='none'} alt="" />
                    {lang}
                  </span>
                ))}
              </div>
            )}

            <div className="card-actions">
              {demo && <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-system btn-tiny">Live Demo</a>}
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-system btn-ghost btn-tiny">GitHub Repo</a>
            </div>
          </div>
          <div className="work-list-img">
            <img src={img} alt={title} loading="lazy" onError={(e) => { e.target.onerror=null; e.target.src=`https://opengraph.githubassets.com/1/fallback/${GH_USERNAME}/${repo.name}`; }} />
          </div>
        </div>
      </div>
    </div>
  );
}
