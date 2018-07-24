<!--
  Demonstrates usage of a custom content field type within JSS.
  See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
  for the definition of the structure of the custom field. This code is just for display.
-->
<template>
  <styleguide-specimen v-bind="$props">
    <!-- Because the integer field is essentially text, we can render it with the Text helper -->
    <sc-text :field="fields.customIntField" />
  </styleguide-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-Custom',
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
    StyleguideSpecimen,
  },
};
</script>
