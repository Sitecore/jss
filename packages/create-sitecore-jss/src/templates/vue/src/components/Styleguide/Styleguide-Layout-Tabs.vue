<!--
  Demonstrates advanced component techniques in JSS.
  This example implements a simple-looking tabs component.
  Each tab is itself a child component added to a placeholder defined on the tabs component.
  The tab component introspects its child components to render the tab headings (i.e. the tab children render partial content in two places).
  When this component is edited in Sitecore Experience Editor, the tabbing behavior is turned off and each tab stacks on top of each other
  for easy inline editing.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-layout-tabs">
    <ul class="nav nav-tabs">
      <!--
        When the page is editing, we hide the tab headings, because they are not updated when xEditor adds or removes a tab rendering.
        Instead, we show the tab header inline with the tab contents (see Styleguide-Layout-Tabs-Tab).
      -->
      <template v-if="!isEditing">
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
      </template>
    </ul>
    <div className="p-3 border-left border-right border-bottom">
      <template v-if="isEditing">
        <!--
          When experience editor is active we want to render all tabs in a stack,
          to simplify editing.
          Note: additional props passed to the `<component />` here will not be forwarded to the actual Tab component.
        -->
        <component
          v-for="(tab, index) in $options.computed.tabsPlaceholder"
          :is="tab"
          :key="`tab${index}`"
        />
      </template>
      <template v-else>
        <!--
          We only want to render the _active_ tab when we're not editing.
        -->
        <component :is="activeTab" />
      </template>
    </div>
  </styleguide-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

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
    StyleguideSpecimen,
    ScText: Text,
  },
  data() {
    return {
      activeTabIndex: 0,
    };
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
          placeholder: 'JssVueWeb-jss-tabs',
          computedPropName: 'tabsPlaceholder',
        },
      ],
    };
  },
  computed: {
    isEditing() {
      // this.$jss is defined on the App instance by the SitecoreJssPlugin and provides
      // reactive access to the `sitecoreContext` provided in layout service data.
      return this.$jss.sitecoreContext().pageEditing;
    },
    activeTab() {
      const tab =
        this.$options.computed.tabsPlaceholder &&
        this.$options.computed.tabsPlaceholder[this.activeTabIndex];
      return tab;
    },
  },
};
</script>
