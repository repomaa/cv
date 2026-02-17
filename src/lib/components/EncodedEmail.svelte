<script lang="ts">
  interface Props {
    email: string;
    class?: string;
    label?: string;
  }

  let { email, class: className = '', label }: Props = $props();

  let encodedEmail = $state('');
  let isEncoding = $state(true);

  $effect(() => {
    if (typeof window !== 'undefined') {
      try {
        encodedEmail = btoa(email);
      } catch {
        encodedEmail = '';
      }
      isEncoding = false;
    }
  });

  function decodeEmail(): string {
    try {
      return atob(encodedEmail);
    } catch {
      return '';
    }
  }
</script>

{#if !isEncoding && encodedEmail}
  <a href="mailto:{decodeEmail()}" class={className}>
    {label || decodeEmail()}
  </a>
{:else}
  <span class={className}>{label || '[email]'}</span>
{/if}
