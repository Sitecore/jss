<template>
  <div class="date-mock-sfc">
    <sc-date :field="fields.date">
      <template slot-scope="date">
        <em>{{ date.toISOString() }}</em>
      </template>
    </sc-date>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateField } from '../../../components/Date';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default Vue.extend({
  props: {
    fields: { type: Object, default: () => ({}) },
  },
  components: {
    ScDate: DateField,
  },
});
</script>

<style>
</style>


