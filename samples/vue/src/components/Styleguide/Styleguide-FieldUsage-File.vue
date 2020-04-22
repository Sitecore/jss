<!--
  Demonstrates usage of a File content field within JSS.
  File types are stored within Sitecore's Media Library data, and can be edited.
-->

<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-file">
    <!--
      Renders a file link
      Note: the rendered link element text will be the file field `title` or `displayName` if title is not defined.
    -->
    <sc-file :field="fields.file" />
    <br /><br />

    <!--
      File helper exposes a scoped slot that allows more granular control over the rendered output.
      For instance, you may wish to render a button (<button />) instead of a link (<a />).
    -->
    <sc-file :field="fields.file" target="_blank">
      <a slot-scope="file" target="_blank" v-bind:href="file.src">Custom link body ({{file.title || file.displayName}})</a>
    </sc-file>
  </styleguide-specimen>
</template>

<script>
const File = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.File);
const StyleguideSpecimen = () => import('./Styleguide-Specimen');

export default {
  name: 'Styleguide-FieldUsage-File',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScFile: File,
    StyleguideSpecimen,
  },
  methods: {
    handleClick(src) {
      alert(src);
    },
  },
};
</script>
