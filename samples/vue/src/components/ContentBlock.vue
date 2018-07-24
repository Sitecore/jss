<template>
  <div class="contentBlock">
    <sc-text tag="h2" class="display-4" :field="fields.heading" />
    <sc-rich-text class="contentDescription" :field="fields.content" />
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'ContentBlock',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ScText: Text,
    ScRichText: RichText,
  },
};
</script>
