<!--
  Demonstrates gaining access to the route-level Sitecore Context from
  within other components.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-sitecore-context">
    <p>The current Sitecore Context is...</p>
    <!--
      this.$jss is defined on the App instance by the SitecoreJssPlugin and provides
      reactive access to the `sitecoreContext` provided in layout service data.
    -->
    <pre :style="{ maxHeight: '400px', overflow: 'scroll' }">
  {{ JSON.stringify($jss.sitecoreContext(), null, 2) }}
    </pre>
  </company-specimen>
</template>

<script>
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-SitecoreContext',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    CompanySpecimen,
  },
};
</script>
