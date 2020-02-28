<!--
 Helper component that displays explanatory information and where to find the definitions
 of styleguide specimens.
-->
<template>
  <div class="pt-3" :id="renderingId">
    <sc-text tag="h4" :field="fields.heading" />
    <sc-rich-text :field="fields.description" />

    <p>
      <small>
        Implementation: <code>/src/components/Styleguide/{{ rendering.componentName }}.vue</code>
        <br />
        Definition: <code>/sitecore/definitions/components/{{ rendering.componentName }}.sitecore.js</code>
      </small>
    </p>
    <div class="border p-2"><slot></slot></div>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'StyleguideSpecimen',
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
    ScRichText: RichText,
  },
  computed: {
    renderingId() {
      return `i${this.rendering && this.rendering.uid.replace(/[{}]/g, '')}`;
    },
  },
};
</script>
