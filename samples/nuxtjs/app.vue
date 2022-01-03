<template>
  <NuxtPage />
</template>
<script setup>
  useState('ssrInitialState', () => ({ sitecoreContext: null }));
  useState('language', () => undefined);
</script>