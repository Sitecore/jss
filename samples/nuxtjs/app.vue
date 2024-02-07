<template>
  <NuxtPage />
</template>
<script setup>
  const config = useRuntimeConfig();
  const app = useNuxtApp();
  useState('ssrInitialState', () => ({ sitecoreContext: null }));
  useState('language', () => 'en');
  useState('site', () => config.public.sitecoreSiteName);
  useState('routeOverride', () => app.ssrContext?.event?.context?.routeOverride);
</script>