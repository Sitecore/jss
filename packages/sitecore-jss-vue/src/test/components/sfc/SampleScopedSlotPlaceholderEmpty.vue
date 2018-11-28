<template>
  <div class="placeholder-empty-scoped-slot-mock-sfc">
    <sc-placeholder :name="name" :rendering="rendering" :componentFactory="componentFactory">
      <ul slot-scope="{components, isEmpty}">
        <template v-if="!isEmpty">
          <template v-for="(component, index) in components" >
            <li v-if="!component.isxEditorComponent" :key="index">
              <component :is="component" />
            </li>
            <component v-else :is="component" :key="index" />
          </template>
        </template>
        <template v-else>
          <li>
            <component v-for="(component, index) in components" :is="component" :key="index" />
          </li>
        </template>
      </ul>
    </sc-placeholder>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Placeholder } from '../../../components/Placeholder';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default Vue.extend({
  props: {
    name: { type: String },
    componentFactory: { type: Function },
    rendering: { type: Object, default: () => ({}) },
  },
  components: {
    ScPlaceholder: Placeholder,
  },
});
</script>

<style>
</style>


