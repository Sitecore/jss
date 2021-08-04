<!--
-->
<template>
  <div data-e2e-id="graphql-integrated">
    <h2>GraphQL Integrated Demo</h2>

    <p>
      Integrated GraphQL executes GraphQL queries within the Layout Service endpoint, and merges the
      query results into the Layout Service result JSON. The query results can be seen by inspecting
      the Layout Service response in the browser devtools network tab.
    </p>

    <div v-if="datasource">
      <h4>Datasource Item (via Integrated GraphQL)</h4>
      id: {{ datasource.id }}
      <br />
      name: {{ datasource.name }}
      <br />
      sample1: {{ datasource.sample1.value }}
      <br />
      sample1 (editable): <sc-text :field="datasource.sample1.jsonValue" />
      <br />
      sample2:<br />
      <ul>
        <li>text: {{ datasource.sample2.text }}</li>
        <li>url: {{ datasource.sample2.url }}</li>
        <li>target: {{ datasource.sample2.target }}</li>
        <li>editable: <sc-link :field="datasource.sample2.jsonValue" /></li>
        <li>field type: {{ datasource.sample2.definition.type }}</li>
        <li>field is shared?: {{ datasource.sample2.definition.shared.toString() }}</li>
      </ul>
    </div>

    <div v-if="contextItem">
      <h4>Route Item (via Integrated GraphQL)</h4>
      id: {{ contextItem.id }}
      <br />
      page title: {{ contextItem.pageTitle.value }}
      <br />
      children:
      <ul>
        <li v-for="child in contextItem.children" :key="child.id">
          <router-link :to="child.url.path">{{ child.pageTitle.value }}</router-link
          >&nbsp; (editable title too! <sc-text :field="child.pageTitle.jss" />)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Text, Link } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'GraphQL-IntegratedDemo',
  props: {
    fields: {
      type: Object,
    },
    rendering: {
      type: Object,
    },
    data: {
      type: Object,
    },
  },
  components: {
    ScText: Text,
    ScLink: Link,
  },
  computed: {
    datasource() {
      return this.fields.data && this.fields.data.datasource;
    },
    contextItem() {
      return this.fields.data && this.fields.data.contextItem;
    },
  },
};
</script>
