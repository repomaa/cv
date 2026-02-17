<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Education from '$lib/components/Education.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Projects from '$lib/components/Projects.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.profile.name} — {data.profile.title}</title>
  <meta name="description" content={data.profile.summary.substring(0, 160)} />
</svelte:head>

<main id="main-content" class="min-h-screen bg-bg">
  <div class="max-w-5xl mx-auto px-6 py-12">
    <Header profile={data.profile} />

    <Experience experience={data.experience} />

    <Education education={data.education} />

    <Skills skills={data.skills} />

    <Projects
      ownProjects={data.ownProjects}
      contributions={data.contributions}
      username={data.profile.github}
    />
  </div>

  <a
    href="/joakim-repomaa-cv.pdf"
    download
    class="no-print fixed top-0 right-0 w-24 h-24 z-50 group"
    style="clip-path: polygon(0 0, 100% 0, 100% 100%);"
    data-sveltekit-preload-data="off"
    aria-label="Download PDF"
  >
    <div
      class="absolute top-0 right-0 w-0 h-0 border-t-80 border-t-accent border-l-80 border-l-transparent group-hover:opacity-80 transition-opacity"
    ></div>
    <span
      class="absolute inset-0 flex items-start justify-end p-4 text-bg font-mono text-sm font-bold"
    >
      <span class="inline-block rotate-45 origin-center group-focus:ring ring-fg">PDF</span>
    </span>
  </a>

  <footer class="max-w-5xl mx-auto mt-16 py-8 border-t border-fg/20 text-center text-sm text-muted">
    <p class="font-mono">
      <span class="text-accent">$</span>
      Built with SvelteKit + Sveltia CMS
    </p>
    <p class="mt-2">
      <a href="/admin/index.html" class="text-accent hover:text-accent/80 transition-colors">
        Edit Content →
      </a>
    </p>
  </footer>
</main>

<style>
  /* Ensure proper print styling */
  @media print {
    main {
      background: white !important;
    }
  }
</style>
