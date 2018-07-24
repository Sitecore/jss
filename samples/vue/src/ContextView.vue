<template>
  <div class="d-flex flex-column">
    <div class="ml-auto" v-if="visible">
      <pre :style="{maxHeight: '400px', maxWidth: '400px', overflow: 'scroll'}">{{ JSON.stringify($jss.sitecoreContext(), null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
};
</script>
<style scoped>
pre {
  font-size: 11px;
}
</style>
