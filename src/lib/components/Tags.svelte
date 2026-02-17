<script lang="ts">
  interface Props {
    tags: string[];
  }

  let { tags }: Props = $props();
</script>

{#if tags.length > 0}
  <div class="flex flex-wrap gap-2">
    {#each tags as tag}
      <span class="px-2 py-1 text-xs font-mono bg-fg/5 text-fg/70 rounded border border-fg/10">
        {tag}
      </span>
    {/each}
  </div>
{/if}
