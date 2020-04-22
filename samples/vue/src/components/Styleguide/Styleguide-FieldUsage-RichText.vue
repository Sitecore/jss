<!--
  Demonstrates usage of a Rich Text (HTML) content field within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-richtext">
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
const RichText = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.RichText);
const StyleguideSpecimen = () => import('./Styleguide-Specimen');

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
