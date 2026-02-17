<script lang="ts">
  import type { Experience } from '$lib/types.js';
  import Section from './Section.svelte';
  import TimelineItem from './TimelineItem.svelte';

  let { experience }: { experience: Experience[] } = $props();
</script>

<Section title="experience">
  <div class="space-y-8">
    {#each experience as job}
      <TimelineItem
        title={job.position}
        subtitle={job.company}
        location={job.location}
        startDate={job.startDate}
        endDate={job.endDate}
        current={job.current}
        description={job.description}
        tags={job.technologies}
      />
    {/each}
  </div>
</Section>
