<script lang="ts">
  import type { Project } from '$lib/types.js';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<a
  href={project.url}
  target="_blank"
  rel="noopener noreferrer"
  class="block p-4 border border-accent rounded-lg transition-shadow hover:shadow-glow"
>
  <article class="flex flex-col justify-between h-full">
    <div>
      <div class="flex items-start justify-between gap-4 mb-2">
        <span class="text-lg font-semibold text-fg">
          {project.name}
        </span>
        <div class="flex items-center gap-3 text-sm text-hot">
          <span class="flex items-center gap-1" aria-label="{project.stars} stars">
            <span class="text-xl">★</span>
            {project.stars}
          </span>
        </div>
      </div>

      <p class="text-muted text-sm mb-3 line-clamp-2">
        {project.description}
      </p>
    </div>

    <div class="flex items-center justify-between text-xs">
      {#if project.language}
        <span class="font-mono text-muted">
          <span class="inline-block w-2 h-2 rounded-full bg-accent mr-1"></span>
          {project.language}
        </span>
      {:else}
        <span></span>
      {/if}
    </div>
  </article>
</a>
