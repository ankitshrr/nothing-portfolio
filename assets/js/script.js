// script.js
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

// Footer stamps
document.getElementById("yearNow").textContent = new Date().getFullYear();
document.getElementById("buildStamp").textContent = new Date().toISOString().slice(0, 10);

// Nav expand
const brandBtn = document.getElementById("brandBtn");
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");

// NAV_ONLY GLYPH EFFECT
function triggerNavGlyphs() {
  const segments = mainNav.querySelectorAll(".ng-segment");
  segments.forEach((seg) => {
    seg.classList.remove("active");
    void seg.offsetWidth;
    const randomDelay = Math.floor(Math.random() * 150);
    setTimeout(() => seg.classList.add("active"), randomDelay);
  });
}
window.triggerNavGlyphs = triggerNavGlyphs;

// Theme toggle
themeBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);

  themeBtn.innerHTML =
    newTheme === "dark"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  triggerNavGlyphs();
});

// Mini glyph trigger
function triggerGlyph(element) {
  const glyphs = element.querySelectorAll(".p-glyph");
  glyphs.forEach((glyph, i) => {
    glyph.classList.remove("triggered");
    void glyph.offsetWidth;
    setTimeout(() => glyph.classList.add("triggered"), i * 50);
    setTimeout(() => glyph.classList.remove("triggered"), 700);
  });
}
window.triggerGlyph = triggerGlyph;

// Hero glyph
function runGlyphSequence() {
  const segments = document.querySelectorAll(".glyph-segment");
  segments.forEach((seg, i) => {
    const delay = i === 0 ? 0 : i * 120 + Math.random() * 100;
    setTimeout(() => {
      seg.classList.add("active");
      setTimeout(() => seg.classList.remove("active"), 150);
      if (seg.classList.contains("gs-arc") || seg.classList.contains("gs-bottom-bar")) {
        setTimeout(() => {
          seg.classList.add("active");
          setTimeout(() => seg.classList.remove("active"), 100);
        }, 250);
      }
    }, delay);
  });
  setTimeout(() => segments.forEach((seg) => seg.classList.add("idle")), 1200);
}

function heroGlyphBurst() {
  const segments = document.querySelectorAll(".glyph-segment");
  segments.forEach((seg) => seg.classList.remove("idle", "active"));
  void document.getElementById("glyphSystem").offsetWidth;
  runGlyphSequence();
}

let heroAutoTimer = null;
function startHeroAutoplay() {
  if (heroAutoTimer) clearInterval(heroAutoTimer);
  heroAutoTimer = setInterval(() => {
    const home = document.getElementById("home");
    if (!home) return;
    const rect = home.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2) heroGlyphBurst();
  }, 2300);
}

brandBtn.addEventListener("click", () => heroGlyphBurst());

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("expanded");
  const expanded = mainNav.classList.contains("expanded");
  navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("expanded");
    navToggle.setAttribute("aria-expanded", "false");
    triggerNavGlyphs();
  }),
);

document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target)) {
    mainNav.classList.remove("expanded");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

mainNav.addEventListener("click", (e) => {
  if (e.target.closest("a") || e.target.closest("button")) return;
  triggerNavGlyphs();
});

// Active link on scroll
const sectionEls = Array.from(document.querySelectorAll("section.widget"));
function setActiveByScroll() {
  const y = window.scrollY + 140;
  let currentId = sectionEls[0]?.id || "home";
  for (const s of sectionEls) {
    if (s.offsetTop <= y) currentId = s.id;
  }
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });

  // Scroll Progress Bar calculation
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollVal = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
    scrollProgress.style.width = scrollVal + "%";
  }
}
window.addEventListener("scroll", setActiveByScroll, { passive: true });


// Copy email
const copyBtn = document.getElementById("copyEmailBtn");
const copyToast = document.getElementById("copyToast");
copyBtn.addEventListener("click", () => {
  const email = "ankitprogressx@gmail.com";
  const t = document.createElement("textarea");
  t.value = email;
  t.style.position = "fixed";
  t.style.left = "-9999px";
  document.body.appendChild(t);
  t.focus();
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);

  copyToast.style.opacity = "1";
  copyToast.style.transform = "translateY(0)";
  setTimeout(() => {
    copyToast.style.opacity = "0";
    copyToast.style.transform = "translateY(4px)";
  }, 900);
});

// =========================
// GITHUB TRACKER
// =========================
const GH_USERNAME = "ankitshrr";
const ghUserEl = document.getElementById("ghUser");
const ghRepoCountEl = document.getElementById("ghRepoCount");
const ghFollowersEl = document.getElementById("ghFollowers");
const ghStatusEl = document.getElementById("ghStatus");
const ghReposEl = document.getElementById("ghRepos");

const GH_CACHE_KEY = `gh_repos_cache_${GH_USERNAME}_v1`;
const GH_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

const LANG_CACHE_KEY = "gh_lang_cache_v4";
const LANG_CACHE_TTL_MS = 60 * 60 * 1000;

function fmtDate(iso) {
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch (e) {
    return "--";
  }
}

function safeText(s) {
  return (s ?? "")
    .toString()
    .replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]);
}

function ogRepoImage(owner, repo) {
  const buster = Date.now().toString(36);
  return `https://opengraph.githubassets.com/1/${buster}/${owner}/${repo}`;
}

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

function loadRepoCache() {
  const obj = loadJSON(GH_CACHE_KEY, { ts: 0, user: null, repos: [] });
  const fresh = Date.now() - (obj.ts || 0) < GH_CACHE_TTL_MS;
  return { fresh, ...obj };
}
function saveRepoCache(user, repos) {
  saveJSON(GH_CACHE_KEY, { ts: Date.now(), user, repos });
}

function loadLangCache() {
  try {
    const raw = localStorage.getItem(LANG_CACHE_KEY);
    if (!raw) return { ts: 0, data: {} };
    const parsed = JSON.parse(raw);
    return { ts: parsed.ts || 0, data: parsed.data || {} };
  } catch (e) {
    return { ts: 0, data: {} };
  }
}

function saveLangCache(cache) {
  try {
    localStorage.setItem(LANG_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {}
}

async function fetchRepoLanguages(owner, repo) {
  const key = `${owner}/${repo}`;
  const cache = loadLangCache();
  const fresh = Date.now() - (cache.ts || 0) < LANG_CACHE_TTL_MS;

  if (fresh && cache.data && Array.isArray(cache.data[key])) return cache.data[key];

  const url = `https://api.github.com/repos/${owner}/${repo}/languages`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const obj = await res.json();
  const items = Object.entries(obj || {});
  items.sort((a, b) => (b[1] || 0) - (a[1] || 0));
  const langs = items.map(([name]) => name).slice(0, 3);

  const next = loadLangCache();
  next.ts = Date.now();
  next.data = next.data || {};
  next.data[key] = langs;
  saveLangCache(next);

  return langs;
}

function normalizeLangForDevicon(lang) {
  const L = (lang || "").trim();
  const map = {
    HTML: "html5",
    CSS: "css3",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Python: "python",
    Java: "java",
    C: "c",
    "C++": "cplusplus",
    "C#": "csharp",
    Go: "go",
    PHP: "php",
    Rust: "rust",
    Ruby: "ruby",
    Kotlin: "kotlin",
    Swift: "swift",
    Dart: "dart",
    Scala: "scala",
    R: "r",
    Shell: "bash",
    PowerShell: "powershell",
    "Jupyter Notebook": "jupyter",
    Vue: "vuejs",
    "Vue.js": "vuejs",
    Svelte: "svelte",
    Dockerfile: "docker",
  };
  if (map[L]) return map[L];
  return L.toLowerCase().replace(/\./g, "").replace(/\s+/g, "").replace(/#/g, "sharp").replace(/\+/g, "plus");
}

function deviconUrl(lang) {
  const key = normalizeLangForDevicon(lang);
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${key}/${key}-original.svg`;
}

function renderLangChips(langs, fallbackPrimary) {
  const list = Array.isArray(langs) ? langs.filter(Boolean) : [];
  const primary = (fallbackPrimary || "").trim();

  let final = list.length ? list.slice(0, 3) : primary ? [primary] : [];
  if (primary && !final.some((x) => x.toLowerCase() === primary.toLowerCase()) && final.length < 3) {
    final.push(primary);
  }
  if (!final.length) return `<span class="chip">LANG: <b>—</b></span>`;

  const fallbackSvg =
    "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' width='16' height='16'>" +
    "<path d='M8 9l-3 3 3 3'/><path d='M16 9l3 3-3 3'/><path d='M14 7l-4 10'/>" +
    "</svg>";

  const items = final
    .map((lang, idx) => {
      const safe = safeText(lang);
      const url = deviconUrl(lang);

      const itemHTML = `
        <span class="lang-item" title="Language: ${safe}">
          <span class="lang-ico">
            <img src="${url}" alt="${safe}"
              onerror="this.remove(); this.parentElement.insertAdjacentHTML('beforeend','${fallbackSvg.replace(/'/g, "&#39;")}');" />
          </span>
          <span class="lang-text"><b>${safe}</b></span>
        </span>
      `;

      if (idx === final.length - 1) return itemHTML;
      return itemHTML + `<span class="lang-sep" aria-hidden="true"></span>`;
    })
    .join("");

  return `<span class="lang-strip">${items}</span>`;
}


function loadProjectOverrides() {
  const el = document.getElementById("projectOverrides");
  if (!el) return {};
  try {
    return JSON.parse(el.textContent || "{}") || {};
  } catch {
    return {};
  }
}
const PROJECT_OVERRIDES = loadProjectOverrides();

function pickProjectTitle(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const t = (ov?.title || "").trim();
  return t ? t : repo.name; // fallback to repo name
}

function pickProjectImage(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const img = (ov?.image || "").trim();
  return img ? img : ogRepoImage(GH_USERNAME, repo.name); // fallback to GitHub OG
}

function pickProjectDemo(repo) {
  const ov = PROJECT_OVERRIDES?.[repo.name];
  const demo = (ov?.demo || "").trim();
  return demo ? demo : (repo.homepage || "").trim();
}

function isPinned(repoName) {
  return !!PROJECT_OVERRIDES?.[repoName]?.pinned;
}

function repoCard(repo, langs) {
  const title = safeText(pickProjectTitle(repo));
  const desc = safeText(repo.description || "");
  const stars = repo.stargazers_count ?? 0;
  const forks = repo.forks_count ?? 0;
  const updated = fmtDate(repo.updated_at);
  const url = repo.html_url;

  const img = pickProjectImage(repo);
  const fallbackImg = ogRepoImage(GH_USERNAME, repo.name);
  const langHTML = renderLangChips(langs, repo.language);

  const demo = pickProjectDemo(repo);
  const demoBtn = demo
    ? `<a href="${safeText(demo)}" target="_blank" rel="noopener" class="btn-system btn-tiny">Live Demo</a>`
    : "";

  return `
    <div class="work-card-inner" onclick="triggerGlyph(this)">
      <span class="label">REPO</span>

      <div class="project-img-container">
        <div class="p-glyph pg-arc"></div><div class="p-glyph pg-bar"></div><div class="p-glyph pg-dot"></div>
        <img src="${img}" alt="${title}" loading="lazy"
          onerror="this.onerror=null; this.src='${fallbackImg}';" />
      </div>

      <h3 style="word-break:break-word">${title}</h3>
      ${desc ? `<p class="card-desc">${desc}</p>` : ``}

      <div class="lang-row">
        ${langHTML}
      </div>

      <div class="meta-row" aria-label="Project meta">
        <span class="chip" title="Last updated"><b>${updated}</b></span>
        <span class="chip" title="Stars"><b>${stars}</b></span>
        <span class="chip" title="Forks"><b>${forks}</b></span>
      </div>

      <div class="card-actions">
        ${demoBtn}
        <a href="${url}" target="_blank" rel="noopener" class="btn-system btn-ghost btn-tiny">Open Repo</a>
        <a href="https://github.com/${GH_USERNAME}" target="_blank" rel="noopener" class="btn-system btn-ghost btn-tiny">Profile</a>
      </div>
    </div>
  `;
}


async function fetchGitHubLive() {
  const userUrl = `https://api.github.com/users/${GH_USERNAME}`;
  const reposUrl = `https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=9`;
  const [userRes, reposRes] = await Promise.all([fetch(userUrl), fetch(reposUrl)]);
  if (!userRes.ok || !reposRes.ok) {
    const rateLimited = userRes.status === 403 || reposRes.status === 403;
    throw new Error(rateLimited ? "RATE_LIMIT" : "ERROR");
  }
  const user = await userRes.json();
  const repos = await reposRes.json();
  return { user, repos };
}


function applyWorkFilters(repos) {
  const q = (document.getElementById("repoSearch")?.value || "").trim().toLowerCase();
  const sort = document.getElementById("repoSort")?.value || "updated";

  let list = (Array.isArray(repos) ? repos : []).filter((r) => !r.fork);

  if (q) {
    list = list.filter((r) => {
      const name = (r.name || "").toLowerCase();
      const desc = (r.description || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }

  if (sort === "stars") list.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  if (sort === "name") list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  if (sort === "updated") list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // pinned first
  list.sort((a, b) => (isPinned(b.name) ? 1 : 0) - (isPinned(a.name) ? 1 : 0));

  return list.slice(0, 9);
}

function renderGitHub(user, repos) {
  ghUserEl.textContent = `@${GH_USERNAME}`;
  ghRepoCountEl.textContent = user?.public_repos ?? "--";
  ghFollowersEl.textContent = user?.followers ?? "--";
  ghStatusEl.textContent = "LIVE";

  const visible = applyWorkFilters(repos);

  if (!visible.length) {
    const q = (document.getElementById("repoSearch")?.value || "").trim();
    const title = q ? "No projects found" : "No repos found";
    const desc = q
      ? "No project matches your search. Try a different keyword."
      : "Public projects will appear here automatically when repos are available.";
    ghReposEl.innerHTML = `
      <div class="work-card-inner" style="cursor:default">
        <span class="label">EMPTY</span>
        <h3>${title}</h3>
        <p class="card-desc">${desc}</p>
      </div>
    `;
    return;
  }

  // Render fast first (no langs)
  ghReposEl.innerHTML = visible.map((r) => repoCard(r, [])).join("");

  // Then enhance with langs
  Promise.allSettled(visible.map((r) => fetchRepoLanguages(GH_USERNAME, r.name))).then((langResults) => {
    ghReposEl.innerHTML = visible
      .map((r, idx) => {
        const langs = langResults[idx] && langResults[idx].status === "fulfilled" ? langResults[idx].value : [];
        return repoCard(r, langs);
      })
      .join("");
  });
}

async function loadGitHub() {
  ghUserEl.textContent = `@${GH_USERNAME}`;

  // 1) Try cache first
  const cache = loadRepoCache();
  if (cache.user && Array.isArray(cache.repos) && cache.repos.length) {
    ghStatusEl.textContent = cache.fresh ? "CACHED" : "STALE";
    renderGitHub(cache.user, cache.repos);
  } else {
    ghStatusEl.textContent = "LOADING";
  }

  // 2) Refresh live
  try {
    const { user, repos } = await fetchGitHubLive();
    saveRepoCache(user, repos);
    renderGitHub(user, repos);
  } catch (err) {
    const msg = (err && err.message) || "ERROR";
    const rateLimited = msg === "RATE_LIMIT";
    ghStatusEl.textContent = rateLimited ? "RATE_LIMIT" : "ERROR";

    const cache2 = loadRepoCache();
    const hasCache = cache2.user && Array.isArray(cache2.repos) && cache2.repos.length;
    if (!hasCache) {
      ghRepoCountEl.textContent = "--";
      ghFollowersEl.textContent = "--";
      ghReposEl.innerHTML = `
        <div class="work-card-inner" style="cursor:default">
          <span class="label">STATUS</span>
          <h3>GitHub data unavailable</h3>
          <p class="card-desc">${rateLimited ? "GitHub API rate limit hit. Refresh later." : "Could not fetch GitHub right now."}</p>
          <div class="card-actions">
            <a href="https://github.com/${GH_USERNAME}" target="_blank" rel="noopener" class="btn-system btn-ghost btn-tiny">Open GitHub</a>
          </div>
        </div>
      `;
    }
  }
}

// Typewriter
function initTypewriter() {
  const target = document.getElementById("status-text");
  const phrases = [
    "Okay",
  "Here",
  "Now",
  "Fine",
  "Ready",
  ];

  let i = 0;
  let j = 0;
  let isDeleting = false;
  let speed = 80;

  function cycle() {
    const fullText = phrases[i];

    if (isDeleting) {
      target.textContent = fullText.substring(0, j - 1);
      j--;
      speed = 40;
    } else {
      target.textContent = fullText.substring(0, j + 1);
      j++;
      speed = 80;
    }

    if (!isDeleting && j === fullText.length) {
      isDeleting = true;
      speed = 2000;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(cycle, speed);
  }

  cycle();
}

// Scroll Animation Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Remove visible class to repeat animation when scrolling back
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.widget').forEach(widget => {
  if (!widget.classList.contains('hero-widget')) {
    widget.classList.add('fade-in-section');
    observer.observe(widget);
    
    // Stagger inner elements within this widget
    const inners = widget.querySelectorAll('.timeline-item, .skill-group, .contact-card, .about-photo-container, .work-card-inner');
    inners.forEach((el, index) => {
      el.classList.add('fade-in-section');
      el.style.transitionDelay = `${(index + 1) * 0.12}s`;
      observer.observe(el);
    });
  }
});

window.addEventListener("load", () => {
  document.body.classList.add('page-loaded');

  runGlyphSequence();
  startHeroAutoplay();

  setActiveByScroll();
  setTimeout(triggerNavGlyphs, 500);

  loadGitHub();
  initTypewriter();

  setInterval(loadGitHub, 10 * 60 * 1000);
});




// Work controls: search + sort (uses cached repos if available)
document.addEventListener("DOMContentLoaded", () => {
  ["repoSearch", "repoSort"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const cache = loadRepoCache();
      if (cache.user && Array.isArray(cache.repos)) renderGitHub(cache.user, cache.repos);
    });
  });
});
