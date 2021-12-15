<!--
-->
<template>
  <div data-e2e-id="graphql-layout">
    <template v-if="disconnectedMode">
      <p>
        This app is running in disconnected mode. GraphQL requires connected mode, headless
        connected mode, or integrated mode to work.
      </p>
      <p>
        Libraries such as <code>graphql-tools</code> can provide GraphQL API mocking capabilities,
        which could enable disconnected GraphQL. This is not supported out of the box, however.
      </p>
      <p>
        To view the GraphQL samples, restart the app using <code>jss start:connected</code>&nbsp; or
        deploy the app to Sitecore to run in integrated mode per the JSS documentation.
      </p>
    </template>
    <sc-placeholder
      name=" <%- helper.getAppPrefix(appPrefix, appName) %>Web-jss-graphql-layout"
      :rendering="rendering"
      v-else
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
  computed: {
    disconnectedMode() {
      return this.$jss.sitecoreContext().itemId === 'available-in-connected-mode';
    },
  },
};
</script>
