<!--
  Demonstrates usage of a Number (decimal) content field within JSS.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-fieldusage-number">
    <!-- Basic emission of a number field for editing can be done with the <Text> component. -->
    <sc-text :field="fields.sample" />

    <!-- Direct access to the value, which is a JS number, is also supported. -->
    <p>
      JS value type: {{ typeof fieldValue }}
      <br />
      JS value: {{ fieldValue }}
    </p>
  </company-specimen>
</template>

<script>
import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-FieldUsage-Number',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScText: Text,
    CompanySpecimen,
  },
  computed: {
    fieldValue() {
      return getFieldValue(this.fields, 'sample');
    },
  },
};
</script>
