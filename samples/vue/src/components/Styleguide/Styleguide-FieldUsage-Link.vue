<!--
  Demonstrates usage of a General Link (hyperlink) content field within JSS.
-->
<template>
  <styleguide-specimen v-bind="$props">
    External link:&nbsp;
    <sc-link :field="fields.externalLink" />
    <br />
    Internal link:&nbsp;
    <sc-link :field="fields.internalLink">
      <em>HTML</em> or other components can be used within link renderers, for example links to
      images.
    </sc-link>
    <br />
    Email link:&nbsp;
    <sc-link :field="fields.emailLink" />
    <br />
    All possible content params link:&nbsp;
    <sc-link :field="fields.paramsLink" />
    <br />
    The link component accepts params of its own:&nbsp;
    <sc-link
      :field="fields.externalLink"
      :showLinkTextWithChildrenPresent="true"
      class="font-weight-bold"
      data-otherattributes="pass-through-to-anchor-tag"
    />
  </styleguide-specimen>
</template>

<script>
import { Link } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-FieldUsage-Link',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    ScLink: Link,
    StyleguideSpecimen,
  },
};
</script>
