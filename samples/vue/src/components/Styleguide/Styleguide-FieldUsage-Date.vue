<!--
  Demonstrates usage of date and time content field types within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-fieldusage-date">
    <ul>
      <li>
        Date helper: <sc-date :field="fields.date" />
      </li>
      <li>
        Date helper (datetime): <sc-date :field="fields.dateTime" />
      </li>
      <li>
        UTC Date string:&nbsp;
        <!--
          Date helper provides a `formatter` prop to give you direct access to the JS Date object for formatting.
          IMPORTANT: the formatter prop is ignored when in Experience Editor mode to support inline editing.
        -->
        <sc-date :field="fields.date" :formatter="(date) => date ? date.toUTCString() : null" />
      </li>
      <li>
        Localized Date string (local timezone):&nbsp;
        <sc-date :field="fields.date" :formatter="(date) => date ? date.toLocaleDateString() : null" />
      </li>
      <li>
        Localized DateTime string (local timezone):&nbsp;
        <!--
          Date helper also has a scoped slot that allows more granular control over the rendered output.
          For instance, you may wish to wrap the value in custom markup.
          IMPORTANT: the scoped slot is ignored when in Experience Editor mode to support inline editing.
        -->
        <sc-date
          :field="fields.dateTime">
          <em slot-scope="date">{{ date ? date.toLocaleDateString() : null }}</em>
        </sc-date>
      </li>
    </ul>
  </styleguide-specimen>
</template>

<script>
const DateField = () => import('@sitecore-jss/sitecore-jss-vue').then((m) => m.DateField);
const StyleguideSpecimen = () => import('./Styleguide-Specimen');

export default {
  name: 'Styleguide-FieldUsage-Date',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScDate: DateField,
    StyleguideSpecimen,
  },
};
</script>
