<script lang="ts">
  interface Props {
    title: string;
    id?: string;
    children: import('svelte').Snippet;
  }

  let { title, id, children }: Props = $props();

  const headingId = $derived(id ?? `${title.toLowerCase().replace(/\s+/g, '-')}-heading`);
</script>

<section class="pb-8 mb-10 border-b border-fg/20 last:border-b-0" aria-labelledby={headingId}>
  <h2 id={headingId} class="text-3xl font-bold mb-6 pb-2 text-fg">
    <span class="text-accent">$></span>
    {title}
  </h2>

  {@render children()}
</section>
