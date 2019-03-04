<!--
-->
<template>
  <div data-e2e-id="graphql-connected">
    <h2>GraphQL Connected Demo</h2>

    <p>
      Connected GraphQL executes GraphQL queries directly against the Sitecore GraphQL endpoint. You
      can review the query execution in the browser devtools network tab. Note that Apollo Client
      maintains a query cache - so the same query will not execute twice (i.e. after route changes)
      unless either the page is refreshed, or the <em>fetch policy</em> is set to not use the cache.
      Consult the Apollo documentation for details.
    </p>

    <p v-if="loadingQueriesCount > 0" class="alert alert-info">GraphQL query is executing...</p>
    <p v-if="error" class="alert alert-danger">GraphQL query error: {{ error.toString() }}</p>
    <div v-if="datasource">
      <h4>Datasource Item (via Connected GraphQL)</h4>
      id: {{ datasource.id }}
      <br />
      name: {{ datasource.name }}
      <br />
      sample1: {{ datasource.sample1.value }}
      <br />
      sample1 (editable): <sc-text :field="datasource.sample1.jss" />
      <br />
      sample2:<br />
      <ul>
        <li>text: {{ datasource.sample2.text }}</li>
        <li>url: {{ datasource.sample2.url }}</li>
        <li>target: {{ datasource.sample2.target }}</li>
        <li>editable: <sc-link :field="datasource.sample2.jss" /></li>
        <li>field type: {{ datasource.sample2.definition.type }}</li>
        <li>field is shared?: {{ datasource.sample2.definition.shared.toString() }}</li>
      </ul>
    </div>
    <div v-if="contextItem">
      <h4>Route Item (via Connected GraphQL)</h4>
      id: {{ contextItem.id }}
      <br />
      page title: {{ contextItem.pageTitle.value }}
      <br />
      children:
      <ul>
        <li v-for="child in contextItem.children" :key="child.id">
          <router-link :to="child.url">{{ child.pageTitle.value }}</router-link
          >&nbsp; (editable title too! <sc-text :field="child.pageTitle.jss" />)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Text, Link } from '@sitecore-jss/sitecore-jss-vue';
import { ConnectedDemoQuery } from './GraphQL-ConnectedDemo.query.graphql';

export default {
  name: 'GraphQL-ConnectedDemo',
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
    ScLink: Link,
  },
  data() {
    return {
      loadingQueriesCount: 0,
      error: null,
    };
  },
  computed: {
    datasource() {
      return this.queryData && this.queryData.datasource;
    },
    contextItem() {
      return this.queryData && this.queryData.contextItem;
    },
  },
  apollo: {
    queryData: {
      query: ConnectedDemoQuery,
      variables() {
        const defaultValue = '{00000000-0000-0000-0000-000000000000}';
        const variables = {
          contextItem: this.$jss ? this.$jss.sitecoreContext().itemId : defaultValue,
          datasource: (this.rendering && this.rendering.dataSource) || defaultValue,
        };

        if (!variables.contextItem) variables.contextItem = defaultValue;

        return variables;
      },
      error(error) {
        this.error = error;
      },
      loadingKey: 'loadingQueriesCount',
      update(data) {
        // By default, vue-apollo will try to add a property to the component instance
        // using the query key specified above, e.g. `queryData`.
        // Also by default, vue-apollo will try to extract data from the query result using
        // that same query key, e.g. result.data.queryData.
        // However, the demo query we use returns multiple (2) fields in the result data: `datasource` and `contextItem`.
        // Therefore, we need to use the `update` function to assign the result data object
        // to the component data property.
        // The end result is that you use `this.queryData.contextItem` or `this.queryData.datasource`
        // to access the query result data.
        return data;
      },
    },
  },
};
</script>
