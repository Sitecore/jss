<!--
  The main layout (columns) of the styleguide.
  Navigation is automatically generated based on the components added to the layout,
  and does not need to be manually maintained.
-->
<template>
  <div class="row">
    <div class="col-sm-8 col-lg-10">
      <sc-placeholder
        name=" <%- helper.getAppPrefix(appPrefix, appName) %>Web-jss-styleguide-layout"
        :rendering="rendering"
      />
    </div>
    <div class="col-sm-4 col-lg-2 order-sm-first pt-2">
      <nav v-for="section in sections" :key="section.heading" class="nav flex-column pt-2">
        <a :href="`#${section.id}`" class="nav-item font-weight-bold">{{ section.heading }}</a>
        <nav class="nav flex-column" v-if="section.children">
          <a v-for="child in section.children" :key="child.id" :href="`#${child.id}`">{{
            child.heading
          }}</a>
        </nav>
      </nav>
    </div>
  </div>
</template>

<script>
import { Placeholder, getChildPlaceholder, getFieldValue } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Styleguide-Layout',
  props: {
    rendering: {
      type: Object,
    },
    params: {
      type: Object,
    },
  },
  computed: {
    sections() {
      // this code reads the components in the child placeholders of this component,
      // and the template projects them into the left navigation column for the styleguide
      return getChildPlaceholder(
        this.rendering,
        ' <%- helper.getAppPrefix(appPrefix, appName) %>Web-jss-styleguide-layout'
      )
        .filter((section) => getFieldValue(section, 'heading'))
        .map((section) => ({
          heading: getFieldValue(section, 'heading'),
          id: `i${section.uid.replace(/[{}]/g, '')}`,
          children: getChildPlaceholder(
            section,
            ' <%- helper.getAppPrefix(appPrefix, appName) %>Web-jss-styleguide-section'
          )
            .filter((component) => getFieldValue(component, 'heading'))
            .map((component) => ({
              heading: getFieldValue(component, 'heading'),
              id: `i${component.uid.replace(/[{}]/g, '')}`,
            })),
        }));
    },
  },
  components: {
    ScPlaceholder: Placeholder,
  },
};
</script>
