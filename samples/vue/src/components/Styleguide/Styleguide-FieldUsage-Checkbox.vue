<!--
 Demonstrates usage of a Checkbox (boolean) content field within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-checkbox">
    <!-- Checkbox fields do not have the ability to be inline edited, so they are directly accessed via their value: -->
    <ul>
      <!--
        The getFieldValue helper allows safely extracting a field value that could be undefined,
        without needing to check that props.fields or props.fields.checkbox are traversable,
        and allowing the specification of an optional default value (default is undefined if unspecified).
      -->
      <li v-if="fields && fields.checkbox && fields.checkbox.value">
        <code>checkbox</code> is true
      </li>
      <li v-if="!fields || !fields.checkbox || !fields.checkbox.value">
        <code>checkbox</code> is false
      </li>
      <li v-if="getFieldValue(fields, 'checkbox2', false)">
        <code>checkbox2</code> is true
      </li>
      <li v-if="!getFieldValue(fields, 'checkbox2', false)">
        <code>checkbox2</code> is false
      </li>
    </ul>
  </styleguide-specimen>
</template>

<script>
import { getFieldValue } from '@sitecore-jss/sitecore-jss-vue';

const StyleguideSpecimen = () => import('./Styleguide-Specimen');

export default {
  name: 'Styleguide-FieldUsage-Checkbox',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  methods: {
    getFieldValue,
  },
  components: {
    StyleguideSpecimen,
  },
};
</script>
