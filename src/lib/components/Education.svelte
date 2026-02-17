<script lang="ts">
  import type { Education } from '$lib/types.js';
  import Section from './Section.svelte';
  import TimelineItem from './TimelineItem.svelte';

  let { education }: { education: Education[] } = $props();
</script>

<Section title="education">
  <div class="space-y-6">
    {#each education as edu}
      <TimelineItem
        title={edu.degree}
        subtitle={edu.field}
        location={edu.location}
        startDate={edu.startDate}
        endDate={edu.endDate}
        current={edu.current}
        description={edu.description}
      />
    {/each}
  </div>
</Section>
