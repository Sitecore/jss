<!--
  Demonstrates usage of a Content Link content field within JSS.
  Content links are a reference to a single other piece of content.
-->

<template>
  <company-specimen v-bind="$props" data-e2e-id="company-fieldusage-itemlink">
    <h5>Shared Item Link</h5>
    <!--
        Item link fields are returned with their value as the referenced item value.
      -->
    <div v-if="sharedItemLink">
      <!-- The referenced item's fields can be rendered and edited using normal helper components: -->
      <p>Field: <sc-text :field="sharedItemLink.fields.textField" /></p>
    </div>

    <h5>Local Item Link</h5>
    <div v-if="localItemLink">
      <p>Field: <sc-text :field="localItemLink.fields.textField" /></p>
    </div>
  </company-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-FieldUsage-ItemLink',
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
    CompanySpecimen,
  },
  computed: {
    sharedItemLink() {
      return this.fields.sharedItemLink;
    },
    localItemLink() {
      return this.fields.localItemLink;
    },
  },
};
</script>
