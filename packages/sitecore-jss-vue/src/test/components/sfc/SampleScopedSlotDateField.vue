<template>
  <div class="date-mock-sfc">
    <sc-date :field="fields.date">
      <template v-slot="{ date }">
        <em>{{ date.toISOString() }}</em>
      </template>
    </sc-date>
  </div>
</template>

<script lang="ts">
import { DateField } from '../../../components/Date';

// If VSCode shows "Default export of the module has or is using private name 'VueConstructor'.",
// you can ignore it. The test and component should still compile and run.
export default {
  props: {
    fields: { type: Object, default: () => ({}) },
  },
  components: {
    ScDate: DateField,
  },
};
</script>

<style></style>
