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

    <p v-if="loading" class="alert alert-info">GraphQL query is executing...</p>
    <p v-if="error" class="alert alert-danger">GraphQL query error: {{ error.toString() }}</p>
    <div v-if="!loading && result && result.datasource">
      <h4>Datasource Item (via Connected GraphQL)</h4>
      id: {{ result.datasource.id }}
      <br />
      name: {{ result.datasource.name }}
      <br />
      sample1: {{ result.datasource.sample1.value }}
      <br />
      sample1 (editable): <sc-text :field="result.datasource.sample1.jsonValue" />
      <br />
      sample2:<br />
      <ul>
        <li>text: {{ result.datasource.sample2.text }}</li>
        <li>url: {{ result.datasource.sample2.url }}</li>
        <li>target: {{ result.datasource.sample2.target }}</li>
        <li>editable: <sc-link :field="result.datasource.sample2.jsonValue" /></li>
        <li>field type: {{ result.datasource.sample2.definition.type }}</li>
        <li>field is shared?: {{ result.datasource.sample2.definition.shared.toString() }}</li>
      </ul>
    </div>
    <div v-if="!loading && result && result.contextItem">
      <h4>Route Item (via Connected GraphQL)</h4>
      id: {{ result.contextItem.id }}
      <br />
      page title: {{ result.contextItem.pageTitle.value }}
      <br />
      children:
      <ul>
        <li v-for="child in result.contextItem.children.results" :key="child.id">
          <router-link :to="child.url.path">{{ child.pageTitle.value }}</router-link
          >&nbsp; (editable title too! <sc-text :field="child.pageTitle.jsonValue" />)
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { ConnectedDemoQuery } from './GraphQL-ConnectedDemo.query.graphql';
import config from '../../../package.json';

import { Text, Link } from '@sitecore-jss/sitecore-jss-vue';

export default defineComponent({
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
  setup(props) {
    const instance = getCurrentInstance();

    const variables = () => {
      const properties = instance.appContext.config.globalProperties.$jss;
      const defaultValue = '{00000000-0000-0000-0000-000000000000}';
      const variables = {
        contextItem: properties ? properties.sitecoreContext().itemId : defaultValue,
        datasource: (props.rendering && props.rendering.dataSource) || defaultValue,
        language: properties ? properties.sitecoreContext().language : config.language,
      };

      if (!variables.contextItem) variables.contextItem = defaultValue;

      return variables;
    };

    const { result, loading, error } = useQuery(ConnectedDemoQuery, variables());

    return {
      result,
      loading,
      error,
    };
  },
});
</script>
