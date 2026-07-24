import { useState, useEffect } from 'react';

const GH_USERNAME = 'ankitshrr';
const GH_CACHE_KEY = `gh_repos_cache_${GH_USERNAME}_v1`;
const GH_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const LANG_CACHE_KEY = 'gh_lang_cache_v4';
const LANG_CACHE_TTL_MS = 60 * 60 * 1000;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useGitHubRepos() {
  const [data, setData] = useState({ user: null, repos: [] });
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    let isMounted = true;
    
    const loadGitHub = async () => {
      const cache = loadJSON(GH_CACHE_KEY, { ts: 0, user: null, repos: [] });
      const fresh = Date.now() - (cache.ts || 0) < GH_CACHE_TTL_MS;

      if (cache.user && Array.isArray(cache.repos) && cache.repos.length) {
        if (isMounted) {
          setData({ user: cache.user, repos: cache.repos });
          setStatus(fresh ? 'Cached' : 'Stale');
        }
      }

      try {
        const userUrl = `https://api.github.com/users/${GH_USERNAME}`;
        const reposUrl = `https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=9`;
        
        const [userRes, reposRes] = await Promise.all([fetch(userUrl), fetch(reposUrl)]);
        
        if (!userRes.ok || !reposRes.ok) {
          throw new Error(userRes.status === 403 ? 'RATE_LIMIT' : 'ERROR');
        }
        
        const user = await userRes.json();
        const repos = await reposRes.json();
        
        saveJSON(GH_CACHE_KEY, { ts: Date.now(), user, repos });
        
        if (isMounted) {
          setData({ user, repos });
          setStatus('Active');
        }
      } catch (err) {
        if (isMounted) {
          setStatus(err.message === 'RATE_LIMIT' ? 'Rate Limited' : 'Error');
        }
      }
    };

    loadGitHub();
    const interval = setInterval(loadGitHub, 10 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { ...data, status, GH_USERNAME };
}

export function useGitHubLangs(owner, repo) {
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLangs = async () => {
      const key = `${owner}/${repo}`;
      const cache = loadJSON(LANG_CACHE_KEY, { ts: 0, data: {} });
      const fresh = Date.now() - (cache.ts || 0) < LANG_CACHE_TTL_MS;

      if (fresh && cache.data && Array.isArray(cache.data[key])) {
        if (isMounted) setLangs(cache.data[key]);
        return;
      }

      try {
        const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
        const res = await fetch(url);
        if (!res.ok) return;

        const obj = await res.json();
        const items = Object.entries(obj || {});
        items.sort((a, b) => (b[1] || 0) - (a[1] || 0));
        const fetchedLangs = items.map(([name]) => name).slice(0, 3);

        const nextCache = loadJSON(LANG_CACHE_KEY, { ts: 0, data: {} });
        nextCache.ts = Date.now();
        nextCache.data = nextCache.data || {};
        nextCache.data[key] = fetchedLangs;
        saveJSON(LANG_CACHE_KEY, nextCache);

        if (isMounted) setLangs(fetchedLangs);
      } catch {}
    };

    fetchLangs();
    return () => { isMounted = false; };
  }, [owner, repo]);

  return langs;
}

export function usePacManContributions() {
  const [stats, setStats] = useState({ total: 0, best: 0, streak: 0, longestStreak: 0 });

  useEffect(() => {
    let isMounted = true;
    const fetchContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USERNAME}?y=last`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const contributions = data.contributions || [];

        const sortedDesc = [...contributions].sort((a,b)=>b.date.localeCompare(a.date));
        const sortedAsc = [...contributions].sort((a,b)=>a.date.localeCompare(b.date));

        const total = contributions.reduce((s,c)=>s+(c.count||0),0);
        const best  = contributions.reduce((m,c)=>c.count>m?c.count:m,0);

        // Streak
        const prevDay = (ds) => { const d=new Date(ds); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); };
        const todayStr=new Date().toISOString().slice(0,10);
        const yesterdayStr=prevDay(todayStr);
        let streak=0, expected=todayStr;
        
        const todayData = sortedDesc.find(c => c.date === todayStr);
        if (!todayData || (todayData.count || 0) === 0) {
          expected = yesterdayStr;
        }

        for(const c of sortedDesc){
          if(c.date>expected) continue;
          if(c.date===expected){ if((c.count||0)>0){streak++;expected=prevDay(c.date);}else break; }
          else break;
        }

        // Longest Streak
        let maxStr=0, curStr=0, prevStrDate=null;
        for(const c of sortedAsc){
          if((c.count||0)>0){
            if(!prevStrDate) curStr=1;
            else{
              const d=new Date(prevStrDate); d.setDate(d.getDate()+1);
              const exp=d.toISOString().slice(0,10);
              if(c.date===exp) curStr++;
              else if(c.date>exp) curStr=1;
            }
            if(curStr>maxStr) maxStr=curStr;
            prevStrDate=c.date;
          }
        }

        if (isMounted) {
          setStats({ total, best, streak, longestStreak: maxStr });
        }
      } catch (err) {
        // Mock fallback if fails
        if (isMounted) setStats({ total: 104, best: 14, streak: 2, longestStreak: 10 });
      }
    };
    fetchContributions();
    return () => { isMounted = false; };
  }, []);

  return stats;
}
