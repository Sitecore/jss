<template>
  <h1>Page not found</h1>
</template>

<script>
export default {
  name: 'not-found',
  metaInfo() {
    return {
      title: this.$t('page-not-found'),
    };
  },
};
</script>
