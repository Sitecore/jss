<!--
  Demonstrates usage of a custom content field type within JSS.
  See /sitecore/definitions/components/Company-FieldUsage-Custom.sitecore.js
  for the definition of the structure of the custom field. This code is just for display.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-fieldusage-custom">
    <!-- Because the integer field is essentially text, we can render it with the Text helper -->
    <sc-text :field="fields.customIntField" />
  </company-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-FieldUsage-Custom',
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
};
</script>
