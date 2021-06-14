<template>
  <div class="file-mock-sfc">
    <sc-file :field="fields.file">
      <template v-slot="file">
        <button v-on:click="doIt(file.src)">
          <span>{{ file.title || file.displayName }}</span>
        </button>
      </template>
    </sc-file>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { File } from '../../../components/File';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default defineComponent({
  props: {
    fields: { type: Object, default: () => ({}) },
    onDoIt: { type: Function },
  },
  components: {
    ScFile: File,
  },
  methods: {
    doIt(src) {
      this.onDoIt(src);
    },
  },
});
</script>

<style></style>
