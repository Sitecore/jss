<!--
  Demonstrates gaining access to the route-level Sitecore Context from
  within other components.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-sitecore-context">
    <p>The current Sitecore Context is...</p>
    <!--
      this.$jss is defined on the Vue instance by the SitecoreJssPlugin and provides
      reactive access to the `sitecoreContext` provided in layout service data.
    -->
    <pre :style="{ maxHeight: '400px', overflow: 'scroll' }">
  {{ JSON.stringify($jss.sitecoreContext(), null, 2) }}
    </pre>
  </styleguide-specimen>
</template>

<script>
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-SitecoreContext',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    StyleguideSpecimen,
  },
};
</script>
