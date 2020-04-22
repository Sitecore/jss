<!--
  Demonstrates usage of a custom content field type within JSS.
  See /sitecore/definitions/components/Styleguide-FieldUsage-Custom.sitecore.js
  for the definition of the structure of the custom field. This code is just for display.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-custom">
    <!-- Because the integer field is essentially text, we can render it with the Text helper -->
    <sc-text :field="fields.customIntField" />
  </styleguide-specimen>
</template>

<script>
const Text = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.Text);
const StyleguideSpecimen = () => import('./Styleguide-Specimen');

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
