<script lang="ts">
  import type { Profile } from '$lib/types.js';
  import EncodedEmail from './EncodedEmail.svelte';

  let { profile }: { profile: Profile } = $props();
</script>

<header class="border-b-2 border-fg/10 pb-8 mb-8">
  <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
    <div class="flex-1">
      <h1 class="text-4xl font-bold mb-2 tracking-tight text-fg">
        {profile.name}
      </h1>
      <p class="text-xl text-muted mb-4 font-medium">
        {profile.title}
      </p>
      <p class="text-muted leading-relaxed max-w-2xl">
        {profile.summary}
      </p>
    </div>

    <div class="flex flex-col gap-2 text-sm">
      <div class="flex items-center gap-2 text-muted hover:text-accent transition-colors">
        <span class="text-accent">[E]</span>
        <EncodedEmail email={profile.email} class="hover:text-accent transition-colors" />
      </div>

      <div class="flex items-center gap-2 text-muted">
        <span class="text-accent">[L]</span>
        {profile.location}
      </div>

      <a
        href="https://github.com/{profile.github}"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-muted hover:text-accent transition-colors"
      >
        <span class="text-accent">[G]</span>
        github.com/{profile.github}
      </a>

      {#if profile.website}
        <a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-muted hover:text-accent transition-colors"
        >
          <span class="text-accent">[W]</span>
          {profile.website.replace(/^https?:\/\//, '')}
        </a>
      {/if}
    </div>
  </div>
</header>
