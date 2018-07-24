<!--
  Demonstrates usage of a File content field within JSS.
  File types are stored within Sitecore's Media Library data, and can be edited.
-->

<template>
  <styleguide-specimen v-bind="$props">
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
      <button slot-scope="file" v-on:click="handleClick(file.src)">
        <span>{{ file.title || file.displayName }} using scoped slot for custom rendering</span>
      </button>
    </sc-file>
  </styleguide-specimen>
</template>

<script>
import { File } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

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
