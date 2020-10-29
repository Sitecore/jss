<template>
  <div>
    <h1>Page not found</h1>
    <p>This page does not exist.</p>
    <p v-if="context && context.site">
      Site: {{ context.site.name }}
      <br />
      Language: {{ context.language }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'not-found',
  metaInfo() {
    return {
      title: this.$t('page-not-found'),
    };
  },
  props: {
    context: {
      type: Object,
    },
  },
};
</script>
