<!--
  Demonstrates using the dictionary functionality and defining route data in
  multiple languages.
-->
<template>
  <styleguide-specimen v-bind="$props" data-e2e-id="styleguide-multilingual">
    <sc-text :field="fields.sample" :encode="false" tag="p" />

    <p>
      <!-- $t is attached to the App instance by the vue-i18n plugin -->
      This is a static dictionary entry from <code>/data/dictionary</code>:&nbsp;{{
        $t('styleguide-sample')
      }}
    </p>

    <p>
      <router-link to="/en/styleguide">Show in English</router-link>
      <br />
          </p>

    <!-- $i18n is attached to the App instance by the vue-i18n plugin -->
    <p>The current language is: {{ $i18n.locale }}</p>
  </styleguide-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import StyleguideSpecimen from './Styleguide-Specimen';

export default {
  name: 'Styleguide-Multilingual',
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
};
</script>
