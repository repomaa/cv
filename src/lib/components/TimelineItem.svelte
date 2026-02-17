<script lang="ts">
  import { formatDate } from '$lib/utils/date.js';
  import Tags from './Tags.svelte';

  interface Props {
    title: string;
    subtitle?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    tags?: string[];
  }

  let {
    title,
    subtitle,
    location,
    startDate,
    endDate,
    current = false,
    description,
    tags = [],
  }: Props = $props();
</script>

<article>
  <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
    <div class="flex flex-col">
      <h3 class="text-xl font-semibold text-fg">{title}</h3>
      {#if subtitle || location}
        <p class="text-fg font-medium">
          {subtitle}
          {#if subtitle && location}
            <span class="text-muted font-normal">• {location}</span>
          {:else if location}
            {location}
          {/if}
        </p>
      {/if}
    </div>
    <time class="text-sm text-muted font-mono whitespace-nowrap">
      {formatDate(startDate)} — {current || !endDate ? 'Present' : formatDate(endDate)}
    </time>
  </div>

  {#if description}
    <p class="text-muted leading-relaxed mb-3">
      {description}
    </p>
  {/if}

  <Tags {tags} />
</article>
