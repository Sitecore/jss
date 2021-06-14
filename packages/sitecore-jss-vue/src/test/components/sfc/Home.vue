<template>
  <div class="home-mock-sfc">
    <placeholder name="page-header" :rendering="rendering" />
    <placeholder
      name="page-content"
      :rendering="rendering"
      :arbitrary="arbitrary"
      v-bind="{ fields, params }"
    />
  </div>
</template>

<script lang="ts">
import { Placeholder } from '../../../components/Placeholder';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default {
  data() {
    return {
      arbitrary: { value: 'magical', withFunction: () => 'indeed' },
    };
  },
  props: {
    rendering: { type: Object, default: () => ({}) },
    fields: { type: Object, default: () => ({}) },
    params: { type: Object, default: () => ({}) },
  },
  components: {
    placeholder: Placeholder,
  },
};
</script>

<style></style>
