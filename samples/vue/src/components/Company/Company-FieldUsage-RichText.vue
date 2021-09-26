<!--
  Demonstrates usage of a Rich Text (HTML) content field within JSS.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-fieldusage-richtext">
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
  </company-specimen>
</template>

<script>
import { RichText } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-FieldUsage-RichText',
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
    CompanySpecimen,
  },
};
</script>
