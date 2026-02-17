<script lang="ts">
  import type { Project } from '$lib/types.js';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<div class="flex justify-between">
  <div class="break-inside-avoid">
    <a href={project.url} class="font-bold text-pdf-accent no-underline">
      {project.name}
    </a>
    <p class="text-pdf-muted leading-snug text-xs">{project.description}</p>
  </div>
  <div class="flex flex-col items-end text-xs">
    <span class="text-pdf-fg font-medium">★ {project.stars}</span>
    {#if project.language}
      <span class="bg-pdf-fg/5 text-pdf-muted px-1 py-0.5 rounded font-medium">
        {project.language}
      </span>
    {/if}
  </div>
</div>
