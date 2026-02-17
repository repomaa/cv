import type { Project } from './content/types.js';

const GITHUB_API_BASE = 'https://api.github.com';

interface SearchIssue {
  repository_url: string;
  pull_request?: {
    merged_at: string | null;
    url: string;
  };
}

interface SearchResponse {
  items: SearchIssue[];
  total_count: number;
}

interface RepoInfo {
  full_name: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second
const MAX_RETRY_DELAY = 10000; // 10 seconds
const RATE_LIMIT_DELAY = 60000; // 1 minute for rate limit (403/429)

// Owners to exclude from contributed repos
const EXCLUDED_REPO_OWNERS = new Set(['everii-Group', 'hundertzehn', 'meso-unimpressed']);

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  // Use GitHub token if available (for higher rate limits during build)
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  return headers;
}

// Exponential backoff retry for fetch
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> {
  try {
    const response = await fetch(url, { ...options, headers: getHeaders() });

    if (response.status === 429) {
      if (retryCount < MAX_RETRIES) {
        const retryAfter = response.headers.get('retry-after');
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : Math.min(RATE_LIMIT_DELAY, INITIAL_RETRY_DELAY * Math.pow(2, retryCount));

        console.warn(
          `Rate limited for ${url}, waiting ${delay}ms before retry ${retryCount + 1}/${MAX_RETRIES}`
        );
        return new Promise((resolve) =>
          setTimeout(() => resolve(fetchWithRetry(url, options, retryCount + 1)), delay)
        );
      }
    }

    return response;
  } catch (error) {
    // Network errors (timeout, connection refused, etc.)
    if (retryCount < MAX_RETRIES) {
      const delay = Math.min(MAX_RETRY_DELAY, INITIAL_RETRY_DELAY * Math.pow(2, retryCount));
      console.warn(
        `Network error for ${url}, retrying in ${delay}ms (${retryCount + 1}/${MAX_RETRIES}):`,
        error
      );
      return new Promise((resolve) =>
        setTimeout(() => resolve(fetchWithRetry(url, options, retryCount + 1)), delay)
      );
    }

    throw error;
  }
}

export async function fetchGitHubProjects(username: string): Promise<Project[]> {
  try {
    // Use search API to filter non-forks and sort by stars
    const response = await fetchWithRetry(
      `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(`user:${username} fork:false`)}&sort=stars&order=desc&per_page=100`,
      {}
    );

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        console.warn(
          `GitHub API rate limit exceeded for user repos. Set GITHUB_TOKEN env var for higher limits.`
        );
      } else {
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
      return [];
    }

    const searchData = await response.json();

    return searchData.items.map(
      (repo: {
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        forks_count: number;
        language: string | null;
        pushed_at: string;
      }) => ({
        name: repo.name,
        description: repo.description ?? '',
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language ?? undefined,
        isFork: false,
      })
    );
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

export async function fetchContributedRepos(username: string): Promise<Project[]> {
  try {
    // Search for merged PRs by this user
    const searchResponse = await fetchWithRetry(
      `${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(`type:pr author:${username} is:merged`)}&per_page=100`,
      {}
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 403 || searchResponse.status === 429) {
        console.warn(
          `GitHub Search API rate limit exceeded. Set GITHUB_TOKEN env var for higher limits.`
        );
      } else {
        console.error(
          `GitHub Search API error: ${searchResponse.status} ${searchResponse.statusText}`
        );
      }
      return [];
    }

    const searchData: SearchResponse = await searchResponse.json();

    if (searchData.total_count === 0 || !searchData.items || searchData.items.length === 0) {
      return [];
    }

    // Extract unique repositories from closed PRs
    const repoData = new Map<string, { owner: string; name: string; stars: number }>();
    for (const item of searchData.items) {
      if (item.pull_request?.merged_at && item.repository_url) {
        const repoUrl = item.repository_url;
        if (!repoData.has(repoUrl)) {
          // Parse owner and repo name from API URL: https://api.github.com/repos/owner/name
          const match = repoUrl.match(/\/repos\/([^\/]+)\/([^\/]+)$/);
          if (match) {
            const [, owner, name] = match;
            // Skip repos from excluded owners
            if (!EXCLUDED_REPO_OWNERS.has(owner)) {
              repoData.set(repoUrl, { owner, name, stars: 0 });
            }
          }
        }
      }
    }

    if (repoData.size === 0) {
      return [];
    }

    const repos = await Promise.all(
      [...repoData.entries()].map(async ([repoUrl, data]) => {
        try {
          const repoResponse = await fetchWithRetry(repoUrl, {});

          if (!repoResponse.ok) {
            console.warn(`Could not fetch repo ${repoUrl}: ${repoResponse.status}`);
            return null;
          }

          const repo: RepoInfo = await repoResponse.json();

          // Create URL to user's closed PRs in this repo
          const prsUrl = `https://github.com/${data.owner}/${data.name}/pulls?q=is:pr+author:${encodeURIComponent(username)}+is:merged`;

          return {
            name: repo.full_name,
            description: repo.description ?? '',
            url: prsUrl,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language ?? undefined,
            isFork: false,
          };
        } catch (error) {
          console.warn(`Error fetching repo details for ${repoUrl}:`, error);
          return null;
        }
      })
    );

    // Sort by stars descending and take top 5
    return repos
      .filter((repo) => repo !== null)
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 5);
  } catch (error) {
    console.error('Error fetching contributed repos:', error);
    return [];
  }
}

// Helper to get top projects from array
export function getTopProjects(projects: Project[], limit: number): Project[] {
  return projects.slice(0, limit);
}
