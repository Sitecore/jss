<!--
  Demonstrates usage of a Rich Text (HTML) content field within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props">
    <!-- Basic use of a rich text field. Wraps in a <div>. -->
    <sc-rich-text :field="fields.sample" />

    <!-- Advanced usage of rich text field. Specifies a custom wrapper tag, turns off Sitecore editing, and has a CSS class on the wrapper -->
    <sc-rich-text
      :field="fields.sample2"
      tag="section"
      :editable="false"
      class="text-center"
      data-sample="other-attributes-pass-through"
    />
  </styleguide-specimen>
</template>

<script>
import { RichText } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-RichText',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScRichText: RichText,
    StyleguideSpecimen,
  },
};
</script>
