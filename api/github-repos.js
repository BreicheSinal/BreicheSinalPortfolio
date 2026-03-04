const DEFAULT_USER = 'BreicheSinal';
const DEFAULT_MAX_LANGUAGE_REPOS = 8;
const MAX_LANGUAGE_REPOS_CAP = 20;
const USERNAME_RE = /^[a-zA-Z0-9-]{1,39}$/;
const FEATURED_REPOS = process.env.FEATURED_REPOS
  ? process.env.FEATURED_REPOS.split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : [];
const HIDE_REPOS = process.env.HIDE_REPOS
  ? process.env.HIDE_REPOS.split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : [];

let lastSuccessfulPayload = null;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 60;
const rateLimitStore = new Map();
const RATE_LIMIT_MAX_ENTRIES = 5000;
const FETCH_TIMEOUT_MS = 8000;

const pickTopLanguages = (languages, limit = 6) =>
  Object.entries(languages || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name]) => name);

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : null;
  const origin = req.headers.origin;
  if (allowedOrigins && origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ error: 'Origin not allowed.' });
    return;
  }
  if (origin && (!allowedOrigins || allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');

  const ip =
    (req.headers['x-forwarded-for'] || '')
      .toString()
      .split(',')[0]
      .trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  if (rateLimitStore.size > RATE_LIMIT_MAX_ENTRIES) {
    for (const [key, value] of rateLimitStore) {
      if (now > value.resetAt) {
        rateLimitStore.delete(key);
      }
      if (rateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) {
        break;
      }
    }
  }

  res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX);
  res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX - entry.count));
  res.setHeader('X-RateLimit-Reset', Math.ceil(entry.resetAt / 1000));

  if (entry.count > RATE_LIMIT_MAX) {
    res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
    res.status(429).json({ error: 'Too many requests. Please try again soon.' });
    return;
  }

  const user = typeof req.query.user === 'string' ? req.query.user : DEFAULT_USER;
  if (!USERNAME_RE.test(user)) {
    res.status(400).json({ error: 'Invalid GitHub username.' });
    return;
  }
  const includeLanguages =
    typeof req.query.includeLanguages === 'string'
      ? req.query.includeLanguages !== '0'
      : true;
  const featuredOnly =
    typeof req.query.featuredOnly === 'string' ? req.query.featuredOnly === '1' : false;
  const featuredFirst =
    typeof req.query.featuredFirst === 'string' ? req.query.featuredFirst === '1' : true;
  const maxLanguageReposRaw =
    typeof req.query.maxLanguageRepos === 'string'
      ? Number.parseInt(req.query.maxLanguageRepos, 10)
      : DEFAULT_MAX_LANGUAGE_REPOS;
  const maxLanguageRepos = Number.isFinite(maxLanguageReposRaw)
    ? Math.max(0, Math.min(MAX_LANGUAGE_REPOS_CAP, maxLanguageReposRaw))
    : DEFAULT_MAX_LANGUAGE_REPOS;

  const headers = {
    'User-Agent': 'portfolio-site',
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const repoController = new AbortController();
    const repoTimeout = setTimeout(() => repoController.abort(), FETCH_TIMEOUT_MS);
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      { headers, signal: repoController.signal }
    );
    clearTimeout(repoTimeout);

    if (!repoResponse.ok) {
      const status = repoResponse.status;
      const isRateLimit = status === 403 || status === 429;
      res.status(status).json({
        error: isRateLimit
          ? 'GitHub rate limit reached. Please try again later.'
          : 'Failed to load GitHub repositories.',
      });
      return;
    }

    const repos = await repoResponse.json();
    const hideSet = new Set(HIDE_REPOS.map((name) => name.toLowerCase()));
    const publicRepos = repos.filter(
      (repo) => !repo.fork && !hideSet.has(repo.name.toLowerCase())
    );
    const featuredSet = new Set(FEATURED_REPOS.map((name) => name.toLowerCase()));
    const featuredRepos =
      FEATURED_REPOS.length > 0
        ? publicRepos.filter((repo) => featuredSet.has(repo.name.toLowerCase()))
        : publicRepos;
    const baseRepos = featuredOnly && FEATURED_REPOS.length > 0 ? featuredRepos : publicRepos;

    const enriched = await Promise.all(
      baseRepos.map(async (repo, index) => {
        let tech = [];
        const shouldFetchLanguages =
          includeLanguages && Number.isFinite(maxLanguageRepos) && index < maxLanguageRepos;

        if (shouldFetchLanguages) {
          try {
            const langController = new AbortController();
            const langTimeout = setTimeout(
              () => langController.abort(),
              FETCH_TIMEOUT_MS
            );
            const languagesResponse = await fetch(repo.languages_url, {
              headers,
              signal: langController.signal,
            });
            clearTimeout(langTimeout);
            if (languagesResponse.ok) {
              const languages = await languagesResponse.json();
              tech = pickTopLanguages(languages);
            }
          } catch {
            tech = [];
          }
        }

        if (!tech.length && repo.language) {
          tech = [repo.language];
        }

        return {
          id: `REPO-${String(index + 1).padStart(3, '0')}`,
          title: repo.name.replace(/[-_]/g, ' '),
          description: repo.description || null,
          tech,
          status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
          codeUrl: repo.html_url,
          demoUrl: repo.homepage || undefined,
          featured:
            FEATURED_REPOS.length > 0 && featuredSet.has(repo.name.toLowerCase()),
        };
      })
    );

    const sorted =
      featuredFirst && FEATURED_REPOS.length > 0
        ? enriched.sort((a, b) => Number(b.featured) - Number(a.featured))
        : enriched;

    lastSuccessfulPayload = sorted;
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(sorted);
  } catch (error) {
    if (error?.name === 'AbortError') {
      res.status(504).json({ error: 'Upstream request timed out.' });
      return;
    }
    if (lastSuccessfulPayload) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      res.setHeader('X-Cache', 'stale');
      res.status(200).json(lastSuccessfulPayload);
      return;
    }

    res.status(500).json({ error: 'Unexpected error fetching GitHub repositories.' });
  }
}
