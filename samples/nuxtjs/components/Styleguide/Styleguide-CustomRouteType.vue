<!--
  Demonstrates gaining access to root route-level data from within components.
-->
<template>
  <div data-e2e-id="styleguide-customroutetype">
    <sc-text tag="h3" :field="ssrInitialState.routeData.fields.headline" />

    <p>
      <em> By <sc-text :field="ssrInitialState.routeData.fields.author" /> </em>
    </p>

    <sc-rich-text :field="ssrInitialState.routeData.fields.content" />

    <a href="/styleguide">Return to the Styleguide</a>
  </div>
</template>
<script setup>
const ssrInitialState = useState('ssrInitialState');
</script>
<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Styleguide-CustomRouteType',
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
  }
};
</script>
