<!--
  Demonstrates usage of a Number (decimal) content field within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props">
    <!-- Basic emission of a number field for editing can be done with the <Text> component. -->
      <sc-text :field="fields.sample" />

      <!-- Direct access to the value, which is a JS number, is also supported. -->
      <p>
        JS value type: {{ typeof fieldValue }}
        <br />
        JS value: {{ fieldValue }}
      </p>
  </styleguide-specimen>
</template>

<script>
import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-Number',
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
  computed: {
    fieldValue() {
      return getFieldValue(this.fields, 'sample');
    },
  },
};
</script>
