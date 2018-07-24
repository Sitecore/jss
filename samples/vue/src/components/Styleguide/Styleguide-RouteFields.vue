<!--
  Demonstrates gaining access to route-level fields.
  This technique builds on the Styleguide-SitecoreContext technique,
  to also get the route level field data and make it editable.
-->
<template>
  <styleguide-specimen v-bind="$props">
    <p>
      Route level <code>pageTitle</code> field:&nbsp;
      <sc-text :field="routeData.fields.pageTitle" />
    </p>
    <p>
      <router-link to="/styleguide/custom-route-type">Sample of using a custom route type</router-link>
    </p>
  </styleguide-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-RouteFields',
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
    ScText: Text,
  },
  computed: {
    routeData() {
      // this.$jss is defined on the Vue instance by the SitecoreJssPlugin and provides
      // reactive access to the root level route data provided in layout service data.
      return this.$jss.routeData();
    },
  },
};
</script>
