<script>
  let { children } = $props();
  import '../app.css';
</script>

<div
  class="font-mono bg-background text-foreground dark:bg-background-dark dark:text-shadow-foreground-dark"
>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute">
    Skip to main content
  </a>
  {@render children()}
</div>
