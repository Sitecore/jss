<!--
  Demonstrates gaining access to root route-level data from within components.
-->
<template>
  <div data-e2e-id="styleguide-customroutetype">
    <sc-text tag="h3" :field="routeData.fields.headline" />

    <p>
      <em>
        By <sc-text :field="routeData.fields.author" />
      </em>
    </p>

    <sc-rich-text :field="routeData.fields.content" />

    <router-link to="/styleguide">Return to the Styleguide</router-link>
  </div>
</template>

<script>
const Text = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.Text);
const RichText = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.RichText);

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
