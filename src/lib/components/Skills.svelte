<script lang="ts">
  import type { Skill } from '$lib/types.js';
  import Section from './Section.svelte';
  import Tags from './Tags.svelte';

  let { skills }: { skills: Skill[] } = $props();
</script>

<Section title="skills">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each skills as skillCategory}
      <div>
        <h3 class="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
          {skillCategory.category}
        </h3>
        <Tags tags={skillCategory.items} />
      </div>
    {/each}
  </div>
</Section>
