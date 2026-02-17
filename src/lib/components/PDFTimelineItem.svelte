<script lang="ts">
  import { formatDate } from '$lib/utils/date.js';
  import PDFTags from './PDFTags.svelte';

  interface Props {
    title: string;
    subtitle?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    description?: string;
    tags?: string[];
  }

  let { title, subtitle, location, startDate, endDate, description, tags = [] }: Props = $props();
</script>

<div class="break-inside-avoid">
  <div class="flex justify-between items-start mb-1 gap-4">
    <div class="flex flex-wrap items-baseline gap-1.5">
      <h3 class="text-sm font-bold text-pdf-fg m-0">{title}</h3>
      {#if subtitle}
        <span class="text-xs font-medium text-pdf-muted">{subtitle}</span>
      {/if}
      {#if location}
        <span class="text-xs text-pdf-muted italic">• {location}</span>
      {/if}
    </div>
    <div class="text-xs text-pdf-muted whitespace-nowrap tabular-nums">
      {formatDate(startDate)} — {endDate ? formatDate(endDate) : 'Present'}
    </div>
  </div>
  {#if description}
    <p class="my-1 text-xs leading-relaxed text-pdf-muted">
      {description}
    </p>
  {/if}
  <div class="mt-1.5">
    <PDFTags {tags} />
  </div>
</div>
