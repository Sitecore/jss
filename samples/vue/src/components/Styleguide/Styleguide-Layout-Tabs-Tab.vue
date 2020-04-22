<!--
  This is a single tab within the tabs sample component. These are added to the tabs placeholder.
  This component demonstrates conditionally altering rendering when in the Sitecore Experience Editor to improve
  author experience.
-->
<template>
  <div data-e2e-class="styleguide-layout-tabs-tab">
    <sc-text v-if="isEditing" tag="h5" :field="fields.title" />
    <sc-rich-text :field="fields.content" />
  </div>
</template>

<script>
const Text = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.Text);
const RichText = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.RichText);

export default {
  name: 'Styleguide-Layout-Tabs-Tab',
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
    isEditing() {
      // this.$jss is defined on the Vue instance by the SitecoreJssPlugin and provides
      // reactive access to the `sitecoreContext` provided in layout service data.
      return this.$jss.sitecoreContext().pageEditing;
    },
  },
};
</script>
