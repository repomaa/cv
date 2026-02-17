<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    children: Snippet;
  }

  let { title, children }: Props = $props();
</script>

<section class="mb-6 pb-3 border-b border-pdf-muted/30 last:border-b-0">
  <h2 class="text-sm font-bold text-pdf-fg flex items-center uppercase tracking-wide">
    {title}
  </h2>
  <div class="mt-3">
    {@render children()}
  </div>
</section>
