<script lang="ts">
  import '../../app.css';
  import PDFContent from '$lib/components/PDFContent.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.profile.name} — CV (Print Version)</title>
  <meta name="description" content="Printable CV for {data.profile.name}" />

  <!-- Print-specific styles -->
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }

    @media print {
      body {
        background: white;
        color: black;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Explicitly hide skip link in PDF */
      .skip-link,
      .no-print {
        display: none !important;
      }
    }
  </style>
</svelte:head>

<main class="min-h-screen bg-pdf-bg">
  <PDFContent
    profile={data.profile}
    experience={data.experience}
    education={data.education}
    skills={data.skills}
    ownProjects={data.ownProjects}
    contributions={data.contributions}
  />
</main>
