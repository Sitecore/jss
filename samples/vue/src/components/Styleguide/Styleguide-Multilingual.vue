<!--
  Demonstrates using the dictionary functionality and defining route data in
  multiple languages.
-->
<template>
  <styleguide-specimen v-bind="$props">
    <sc-text :field="fields.sample" :encode="false" tag="p" />

    <p>
      <!-- $t is attached to the Vue instance by the i18n plugin -->
      This is a static dictionary entry from <code>/data/dictionary</code>:&nbsp;{{$t(
        'styleguide-sample'
      )}}
    </p>

    <p>
      <router-link to="/en/styleguide">Show in English</router-link>
      <br />
      <router-link to="/da-DK/styleguide">Show in Danish</router-link>
    </p>

    <!-- $i18n is attached to the Vue instance by the i18n plugin -->
    <p>The current language is: {{$i18n.i18next.language}}</p>

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
