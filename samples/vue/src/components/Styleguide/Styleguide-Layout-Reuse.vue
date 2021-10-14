<!--
  Demonstrates how to reuse content within JSS. See /data/routes/styleguide/en.yml
  for the reused content definition sample. This component also demonstrates how to use
  the Placeholder component's scoped slots to wrap all components in the placeholder
  in a column tag (thus creating a horizontally laid out placeholder)
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-layout-reuse">
    <!--
      This placeholder is using a _slot_ to enable customizing the markup for each component within.
      In this case, it's placing each component in its own column of a flexbox layout - giving an n-up columnar layout.
      The component itself does not need to know it's living in a columnar layout.

      The default _slot_ receives an array of Vue component definitions. These are dynamic components instantiated by
      the Placeholder component from the layout service data for the placeholder.
      Note: in Experience Editor (EE), the array of components will contain EE specific components/elements, e.g. <code /> elements.
      You can conditionally handle those by using the `component.isxEditorComponent` property,
      which will be true for EE components/elements and undefined for non-EE components.

      If nothing is defined for the default scoped slot, the Placeholder component will iterate and render all child components.
      However, because Vue does not support component arrays or fragments, the Placeholder wraps its output with a `<div />` element.
      e.g.
      <div>
        <child-component-1 />
        <child-component-2 />
      </div>

      When you use the scoped slot, you still need to emit a top-level wrapping element, but you are able to customize that element as needed.
      The code below serves as an example.

      Customized empty placeholder rendering
      When using the default scoped slot for rendering, in some situations an _empty placeholder_ (with no components in it)
      may not be editable in the Sitecore Experience Editor. In this example, because of the use
      of flexbox by the bootstrap columns, adding a bare <div> for the selectable empty placeholder
      results in it being hidden as it does not have a column class.
      Using a separate template when the `isEmpty` scoped property is true allows us to customize the rendering of an empty placeholder
      and place it within a column div so that we can select it correctly.
    -->
    <sc-placeholder :rendering="rendering" name="JssVueWeb-jss-reuse-example">
      <template v-slot="{ components, isEmpty }">
        <div class="row">
          <template v-if="!isEmpty">
            <template v-for="(component, index) in components">
              <div v-if="!component.isxEditorComponent" v-bind:key="index" class="col-sm">
                <component :is="component" />
              </div>
              <component v-bind:key="index + 1" v-else :is="component" />
            </template>
          </template>
          <template v-else>
            <div class="col-sm">
              <component v-for="(component, index) in components" :is="component" :key="index" />
            </div>
          </template>
        </div>
      </template>
    </sc-placeholder>
  </styleguide-specimen>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-Layout-Reuse',
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
    StyleguideSpecimen,
  },
};
</script>
