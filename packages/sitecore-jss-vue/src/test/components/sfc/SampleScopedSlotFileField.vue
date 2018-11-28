<template>
  <div class="file-mock-sfc">
    <sc-file :field="fields.file">
      <button slot-scope="file" v-on:click="doIt(file.src)">
        <span>{{ file.title || file.displayName }}</span>
      </button>
    </sc-file>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { File } from '../../../components/File';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default Vue.extend({
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

<style>
</style>


