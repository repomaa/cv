import type { PageServerLoad } from './$types.js';
import { loadAllContent } from '$lib/content/loader.js';
import { fetchGitHubProjects, fetchContributedRepos } from '$lib/github.js';

export const prerender = true;

export const load: PageServerLoad = async () => {
  const content = loadAllContent();

  // Fetch GitHub projects and contributions in parallel
  const [ownProjects, contributions] = await Promise.all([
    fetchGitHubProjects(content.profile.github),
    fetchContributedRepos(content.profile.github),
  ]);

  return {
    profile: content.profile,
    experience: content.experience,
    education: content.education,
    skills: content.skills,
    ownProjects: ownProjects.slice(0, 6),
    contributions: contributions.slice(0, 5),
  };
};
