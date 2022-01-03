<!--
  Demonstrates advanced component techniques in JSS.
  This example implements a simple-looking tabs component.
  Each tab is itself a child component added to a placeholder defined on the tabs component.
  The tab component introspects its child components to render the tab headings (i.e. the tab children render partial content in two places).
  When this component is edited in Sitecore Experience Editor, the tabbing behavior is turned off and each tab stacks on top of each other
  for easy inline editing.
-->
<template>
  <StyleguideSpecimen v-bind="$props" data-e2e-id="styleguide-layout-tabs">
    <ul class="nav nav-tabs">
      <!--
        When the page is editing, we hide the tab headings, because they are not updated when xEditor adds or removes a tab rendering.
        Instead, we show the tab header inline with the tab contents (see Styleguide-Layout-Tabs-Tab).
      -->
      <li
        v-for="(tab, index) in $options.computed.tabsPlaceholder"
        :key="`tab${index}`"
        class="nav-item"
      >
        <button
          :class="`nav-link ${index === activeTabIndex ? 'active' : ''}`"
          v-on:click="activeTabIndex = index"
        >
          <sc-text :field="tab.$props.fields.title" />
        </button>
      </li>
    </ul>
    <div className="p-3 border-left border-right border-bottom">
      <!--
        We only want to render the _active_ tab when we're not editing.
      -->
      <component :is="activeTab" />
    </div>
  </StyleguideSpecimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Styleguide-Layout-Tabs',
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
  },
  setup() {
    const activeTabIndex = ref(0);

    return { activeTabIndex }
  },
  // If withPlaceholder is defined on a component instance, the SitecoreJssPlugin will
  // attempt to inject placeholder data for the requested placeholders as computed properties
  // on the component instance (in this case, `computed.tabsPlaceholder`, a.k.a. `this.tabsPlaceholder`).
  // This is another option compared to using the <Placeholder> component;
  // in this case, chosen because we primarily need access to the _data_ of the placeholder.
  withPlaceholder() {
    return {
      placeholders: [
        {
          placeholder: 'Nuxtjs-jss-tabs',
          computedPropName: 'tabsPlaceholder',
        },
      ],
    };
  },
  computed: {
    activeTab() {
      console.log('test, test')
      const tab =
        this.$options.computed.tabsPlaceholder &&
        this.$options.computed.tabsPlaceholder[this.activeTabIndex];
      return tab;
    },
  },
};
</script>
