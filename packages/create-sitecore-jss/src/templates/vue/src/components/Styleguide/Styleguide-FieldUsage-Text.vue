<!--
  Demonstrates usage of a Text content field within JSS.
  Text fields are HTML encoded by default.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-text">
    <!-- Basic use of a text field. No wrapper. -->
    <sc-text :field="fields.sample" />

    <!-- Advanced usage of text field. Specifies a wrapper tag, turns off Sitecore editing, supports raw HTML, and has a CSS class on the wrapper -->
    <sc-text
      :field="fields.sample2"
      tag="section"
      :editable="false"
      :encode="false"
      class="font-weight-bold"
      data-sample="other-attributes-pass-through"
    />

    <!--
      Use this API when you need direct programmatic access to a field as a variable.
      Note: editing such a value in Experience Editor is not possible, and direct field
      editing must be used to edit a value emitted like this (the pencil icon when the rendering
      is selected in xEditor)
    -->
    <div>Raw value (not editable): {{ getFieldValue(fields, 'sample') }}</div>
  </styleguide-specimen>
</template>

<script>
import { Text, getFieldValue } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-Text',
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
  methods: {
    getFieldValue,
  },
};
</script>
