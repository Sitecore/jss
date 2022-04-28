<!--
  Demonstrates usage of a Content List field type within JSS.
  Content Lists are references to 0..n other content items.
  In Sitecore terms, this maps by default to a Treelist field.
-->

<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-content-list">
    <h5>Shared Content List</h5>
    <!--
      Content list fields are returned with their value as an array of the referenced items.
      So we can use the .map() array function to traverse them. Ensure a `key` attribute is set
      on each element to make React's DOM updating happy:
    -->
    <template v-if="fields.sharedContentList">
      <div v-for="(listItem, index) in fields.sharedContentList" :key="`sharedListItem-${index}`">
        <!-- The referenced item's fields can be rendered and edited using normal helper components: -->
        <p>Field: <sc-text :field="listItem.fields.textField" /></p>
      </div>
    </template>

    <h5>Local Content List</h5>
    <template v-if="fields.localContentList">
      <div v-for="(listItem, index) in fields.localContentList" :key="`localListItem-${index}`">
        <!-- The referenced item's fields can be rendered and edited using normal helper components: -->
        <p>Field: <sc-text :field="listItem.fields.textField" /></p>
      </div>
    </template>
  </styleguide-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-ContentList',
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
    StyleguideSpecimen,
  },
};
</script>
