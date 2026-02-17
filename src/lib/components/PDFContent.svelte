<script lang="ts">
  import type { Profile, Experience, Education, Skill, Project } from '$lib/types.js';
  import PDFProjectItem from './PDFProjectItem.svelte';
  import PDFSection from './PDFSection.svelte';
  import PDFTags from './PDFTags.svelte';
  import PDFTimelineItem from './PDFTimelineItem.svelte';

  let {
    profile,
    experience,
    education,
    skills,
    ownProjects,
    contributions,
  }: {
    profile: Profile;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    ownProjects: Project[];
    contributions: Project[];
  } = $props();
</script>

<div
  class="font-sans max-w-[210mm] mx-auto px-[20mm] py-[18mm] bg-pdf-bg text-pdf-fg leading-relaxed text-sm"
>
  <!-- Header -->
  <header class="text-center mb-6 pb-4 border-b-2 border-pdf-fg">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-pdf-fg leading-tight m-0">
        {profile.name}
      </h1>
      <p class="text-base font-medium text-pdf-muted mt-1.5 mb-3">{profile.title}</p>
    </div>
    <div class="flex justify-center flex-wrap gap-x-6 gap-y-3 text-xs mb-2">
      {#if profile.email}
        <a class="inline-flex items-center gap-1.5 text-pdf-accent" href="mailto:{profile.email}">
          <svg
            class="w-3.5 h-3.5 text-pdf-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {profile.email}
        </a>
      {/if}
      <span class="inline-flex items-center gap-1.5 text-pdf-muted">
        <svg
          class="w-3.5 h-3.5 text-pdf-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {profile.location}
      </span>
    </div>
    <div class="flex justify-center flex-wrap gap-x-5 gap-y-2 text-xs text-pdf-accent">
      {#if profile.github}
        <a href="https://github.com/{profile.github}" class="no-underline"
          >github.com/{profile.github}</a
        >
      {/if}
      {#if profile.website}
        <a href={profile.website} class="no-underline"
          >{profile.website.replace(/^https?:\/\//, '')}</a
        >
      {/if}
    </div>
  </header>

  <!-- Summary -->
  <section class="mb-6 pb-3 text-sm leading-relaxed text-pdf-muted border-b border-pdf-muted/30">
    <p>{profile.summary}</p>
  </section>

  <!-- Experience -->
  <PDFSection title="Professional Experience">
    <div class="flex flex-col gap-4">
      {#each experience as job}
        <PDFTimelineItem
          title={job.position}
          subtitle={job.company}
          location={job.location}
          startDate={job.startDate}
          endDate={job.endDate}
          description={job.description}
          tags={job.technologies}
        />
      {/each}
    </div>
  </PDFSection>

  <!-- Education -->
  <PDFSection title="Education">
    <div class="flex flex-col gap-4">
      {#each education as edu}
        <PDFTimelineItem
          title={edu.degree}
          subtitle={edu.field}
          location={edu.institution}
          startDate={edu.startDate}
          endDate={edu.endDate}
          description={edu.description}
        />
      {/each}
    </div>
  </PDFSection>

  <!-- Skills -->
  <PDFSection title="Skills & Technologies">
    <div class="flex flex-col gap-2.5">
      {#each skills as skillCategory}
        <div class="grid items-baseline gap-3" style="grid-template-columns: 130px 1fr;">
          <span class="text-xs font-semibold text-pdf-fg text-left">{skillCategory.category}</span>
          <PDFTags tags={skillCategory.items} />
        </div>
      {/each}
    </div>
  </PDFSection>

  <!-- Projects -->
  {#if ownProjects.length > 0}
    <PDFSection title="Original Projects">
      <div class="flex flex-col gap-2.5">
        {#each ownProjects as project}
          <PDFProjectItem {project} />
        {/each}
      </div>
    </PDFSection>
  {/if}

  <!-- Contributions -->
  {#if contributions.length > 0}
    <PDFSection title="Contributions">
      <div class="flex flex-col gap-2.5">
        {#each contributions as project}
          <PDFProjectItem {project} />
        {/each}
      </div>
    </PDFSection>
  {/if}
</div>
