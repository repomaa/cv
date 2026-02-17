<script lang="ts">
  import type { Project } from '$lib/types.js';
  import ProjectList from './ProjectList.svelte';
  import Section from './Section.svelte';

  let {
    ownProjects,
    contributions,
    username,
  }: { ownProjects: Project[]; contributions: Project[]; username: string } = $props();
</script>

<Section title="projects">
  <ProjectList
    title="Original Projects"
    projects={ownProjects}
    seeAllLink="https://github.com/{username}?tab=repositories&type=source&sort=stargazers"
  />
  <ProjectList
    title="Contributions"
    projects={contributions}
    seeAllLink="https://github.com/{username}?tab=repositories&type=fork"
  />
</Section>
