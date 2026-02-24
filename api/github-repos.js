const DEFAULT_USER = 'BreicheSinal';
const DEFAULT_MAX_LANGUAGE_REPOS = 8;
const FEATURED_REPOS = process.env.FEATURED_REPOS
  ? process.env.FEATURED_REPOS.split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : [];

let lastSuccessfulPayload = null;

const pickTopLanguages = (languages, limit = 6) =>
  Object.entries(languages || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name]) => name);

export default async function handler(req, res) {
  const user = typeof req.query.user === 'string' ? req.query.user : DEFAULT_USER;
  const includeLanguages =
    typeof req.query.includeLanguages === 'string'
      ? req.query.includeLanguages !== '0'
      : true;
  const featuredOnly =
    typeof req.query.featuredOnly === 'string' ? req.query.featuredOnly === '1' : false;
  const featuredFirst =
    typeof req.query.featuredFirst === 'string' ? req.query.featuredFirst === '1' : true;
  const maxLanguageRepos =
    typeof req.query.maxLanguageRepos === 'string'
      ? Number.parseInt(req.query.maxLanguageRepos, 10)
      : DEFAULT_MAX_LANGUAGE_REPOS;

  const headers = {
    'User-Agent': 'portfolio-site',
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      { headers }
    );

    if (!repoResponse.ok) {
      const message = await repoResponse.text();
      res.status(repoResponse.status).json({
        error: 'Failed to load GitHub repositories.',
        details: message,
      });
      return;
    }

    const repos = await repoResponse.json();
    const publicRepos = repos.filter((repo) => !repo.fork);
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
            const languagesResponse = await fetch(repo.languages_url, { headers });
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
    if (lastSuccessfulPayload) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      res.setHeader('X-Cache', 'stale');
      res.status(200).json(lastSuccessfulPayload);
      return;
    }

    res.status(500).json({ error: 'Unexpected error fetching GitHub repositories.' });
  }
}
