<!--
-->
<template>
  <div data-e2e-id="graphql-layout">
    <sc-placeholder
      name="VueApp-jss-graphql-layout"
      :rendering="rendering"
    />
  </div>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'GraphQL-Layout',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScPlaceholder: Placeholder,
  },
};
</script>
