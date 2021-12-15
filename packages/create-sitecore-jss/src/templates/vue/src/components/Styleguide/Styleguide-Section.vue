<!--
  Represents a category of styleguide specimens within the Styleguide-Layout.
  Usage examples are added to the `styleguide-section` placeholder that this
  exposes.
-->
<template>
  <div class="pt-3" :id="`i${rendering.uid.replace(/[{}]/g, '')}`">
    <sc-text class="border-bottom" :field="fields.heading" tag="h3" />
    <sc-placeholder
      name=" <%- helper.getAppPrefix(appPrefix, appName) %>Web-jss-styleguide-section"
      :rendering="rendering"
    />
  </div>
</template>

<script>
import { Placeholder, Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Styleguide-Section',
  props: {
    rendering: {
      type: Object,
    },
    fields: {
      type: Object,
    },
    params: {
      type: Object,
    },
  },
  components: {
    ScPlaceholder: Placeholder,
    ScText: Text,
  },
};
</script>
