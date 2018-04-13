<template>
  <div id="CenterColumn">
    <div id="InnerCenter">
      <div id="Header">
        <sc-image :media="fields.logoImage" id="scLogo" />
      </div>
      <div id="Content">
        <div id="LeftContent">
          <sc-text tag="h1" :field="fields.title" class="contentTitle" />
          <sc-rich-text class="contentDescription" :field="fields.text" />
        </div>
      </div>
      <div id="Footer">
        <hr class="divider" />
        {{ copyright }}
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Welcome',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    copyright: {
      type: String,
      default: 'Copyright Sitecore A/S',
    },
  },
  components: {
    ScImage: Image,
    ScText: Text,
    ScRichText: RichText,
  },
};
</script>

<style>

</style>
