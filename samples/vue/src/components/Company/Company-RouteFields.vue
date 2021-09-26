<!--
  Demonstrates gaining access to route-level fields.
  This technique builds on the Company-SitecoreContext technique,
  to also get the route level field data and make it editable.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-route-fields">
    <p>
      Route level <code>pageTitle</code> field:&nbsp;
      <sc-text :field="routeData.fields.pageTitle" />
    </p>
    <p>
      <router-link to="/company/custom-route-type"
        >Sample of using a custom route type</router-link
      >
    </p>
  </company-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-RouteFields',
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
    ScText: Text,
  },
  computed: {
    routeData() {
      // this.$jss is defined on the App instance by the SitecoreJssPlugin and provides
      // reactive access to the root level route data provided in layout service data.
      return this.$jss.routeData();
    },
  },
};
</script>
