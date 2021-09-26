<!--
  Demonstrates using the dictionary functionality and defining route data in
  multiple languages.
-->
<template>
  <company-specimen v-bind="$props" data-e2e-id="company-multilingual">
    <sc-text :field="fields.sample" :encode="false" tag="p" />

    <p>
      <!-- $t is attached to the App instance by the vue-i18n plugin -->
      This is a static dictionary entry from <code>/data/dictionary</code>:&nbsp;{{
        $t('company-sample')
      }}
    </p>

    <p>
      <router-link to="/en/company">Show in English</router-link>
      <br />
      <router-link to="/da-DK/company">Show in Danish</router-link>
    </p>

    <!-- $i18n is attached to the App instance by the vue-i18n plugin -->
    <p>The current language is: {{ $i18n.locale }}</p>
  </company-specimen>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import CompanySpecimen from './Company-Specimen';

export default {
  name: 'Company-Multilingual',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
  },
  components: {
    CompanySpecimen,
    ScText: Text,
  },
};
</script>
