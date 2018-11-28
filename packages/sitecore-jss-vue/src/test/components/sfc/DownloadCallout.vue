<template>
  <div class="download-callout-mock-sfc">
    message: {{ fields.message ? fields.message.value : 'no message' }}<br />
    arbitrary: {{ arbitrary.value || 'no value' }}<br />
    arbitrary function: {{arbitrary.withFunction ? arbitrary.withFunction() : 'no function'}}
  </div>
</template>

<script lang="ts">
// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default {
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    arbitrary: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>


