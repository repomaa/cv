<script lang="ts">
  interface Props {
    tags: string[];
  }

  let { tags }: Props = $props();
</script>

{#if tags.length > 0}
  <div class="text-xs text-pdf-muted">
    {#each tags as tag}
      <span class="first:before:content-[''] before:content-['_•_']">{tag}</span>
    {/each}
  </div>
{/if}
