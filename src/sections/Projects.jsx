import { useState, useMemo } from 'react';
import { useGitHubRepos } from '../hooks/useGitHub';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { user, repos, status, GH_USERNAME } = useGitHubRepos();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated');
  const [activeRepo, setActiveRepo] = useState(null);

  const visibleRepos = useMemo(() => {
    let list = (Array.isArray(repos) ? repos : []).filter((r) => !r.fork && r.language);
    
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((r) => {
        const name = (r.name || "").toLowerCase();
        const desc = (r.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }

    if (sort === "stars") list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    if (sort === "name") list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    if (sort === "updated") list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // pinned first override check
    const isPinned = (name) => ['nothing-portfolio', 'zhangjiajie-3d-parallax', 'python-lyric-sync', 'luxxtime-watch-store'].includes(name);
    list.sort((a, b) => (isPinned(b.name) ? 1 : 0) - (isPinned(a.name) ? 1 : 0));

    return list.slice(0, 9);
  }, [repos, search, sort]);

  return (
    <section className="widget projects-widget fade-in-section" id="work">
      <div className="section-header sm-margin">
        <div>
          <span className="label">Portfolio</span>
          <h2>Selected Works</h2>
        </div>

        <div style={{ display: 'none' }}>
          <div className="play-chips" style={{ marginTop: '10px' }}>
            <span className="chip">GitHub: <b>@{GH_USERNAME}</b></span>
            <span className="chip">Repositories: <b>{user?.public_repos ?? '--'}</b></span>
            <span className="chip">Followers: <b>{user?.followers ?? '--'}</b></span>
            <span className="chip">Status: <b>{status}</b></span>
          </div>

          <div className="divider"></div>

          <div className="work-controls" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
            <input 
              className="work-input" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="work-input" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="updated">Sort: Recently updated</option>
              <option value="stars">Sort: Most stars</option>
              <option value="name">Sort: Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="projects-container">
        {visibleRepos.length === 0 ? (
          <div className="work-card-inner" style={{ cursor: 'default' }}>
            <span className="label">{search ? 'EMPTY' : 'STATUS'}</span>
            <h3>{search ? 'No projects found' : (status === 'Rate Limited' ? 'GitHub data unavailable' : 'Loading...')}</h3>
            <p className="card-desc">{search ? 'No project matches your search. Try a different keyword.' : (status === 'Rate Limited' ? 'GitHub API rate limit hit. Refresh later.' : 'Fetching projects...')}</p>
          </div>
        ) : (
          visibleRepos.map((repo) => (
            <ProjectCard 
              key={repo.id} 
              repo={repo} 
              GH_USERNAME={GH_USERNAME} 
              isActive={activeRepo === repo.id}
              onToggle={() => setActiveRepo(activeRepo === repo.id ? null : repo.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
