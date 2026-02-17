<script lang="ts">
  import type { Project } from '$lib/types.js';
  import ProjectCard from './ProjectCard.svelte';

  interface Props {
    title: string;
    projects: Project[];
    seeAllLink: string;
  }

  let { title, projects, seeAllLink }: Props = $props();
  $effect(() => console.log({ seeAllLink }));
</script>

{#if projects.length > 0}
  <div class="mb-8 last:mb-0">
    <h3 class="font-semibold mb-4 text-fg/70 text-2xl">
      {title}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
      {#each projects as project}
        <ProjectCard {project} />
      {/each}
    </div>

    <a
      class="text-accent hover:text-accent/80 transition-colors cursor-pointer"
      href={seeAllLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      See all
    </a>
  </div>
{/if}
