import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import RouterLink from 'next/link';

import { ConnectedDemoQueryDocument, AppRoute, Item, GraphQlConnectedDemo } from './query.graphql';
import initializeApollo from 'lib/GraphQLClientFactory';
import config from 'temp/config';
import {
  ComponentPropsFetchFunction,
  StyleguideComponentProps,
  useComponentProps,
} from 'lib/component-props';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GraphQlConnectedDemo;
  contextItem: RouteItem;
};

const GraphQLConnectedDemo = (props: StyleguideComponentProps): JSX.Element => {
  const data = useComponentProps<GraphQLConnectedDemoData>(props.rendering.componentName);

  const { datasource, contextItem } = data;

  return (
    <div data-e2e-id="graphql-connected">
      <h2>GraphQL Connected Demo</h2>

      <p>
        Connected GraphQL executes GraphQL queries directly against the Sitecore GraphQL endpoint.
        You can review the query execution in the browser devtools network tab. Note that Apollo
        Client maintains a query cache - so the same query will not execute twice (i.e. after route
        changes) unless either the page is refreshed, or the <em>fetch policy</em> is set to not use
        the cache. Consult the Apollo documentation for details.
      </p>

      {datasource && (
        <div>
          <h4>Datasource Item (via Connected GraphQL)</h4>
          id: {datasource.id}
          <br />
          name: {datasource.name}
          <br />
          sample1: {datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={datasource.sample1?.jss} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {datasource.sample2?.text}</li>
            <li>url: {datasource.sample2?.url}</li>
            <li>target: {datasource.sample2?.target}</li>
            <li>
              editable: <Link field={datasource.sample2?.jss} />
            </li>
            <li>field type: {datasource.sample2?.definition?.type}</li>
            <li>field is shared?: {datasource.sample2?.definition?.shared.toString()}</li>
          </ul>
        </div>
      )}
      {contextItem && (
        <div>
          <h4>Route Item (via Connected GraphQL)</h4>
          id: {contextItem.id}
          <br />
          page title: {contextItem.pageTitle?.value}
          <br />
          children:
          <ul>
            {contextItem.children.map((child) => {
              const routeItem = child as RouteItem;

              return (
                <li key={routeItem.id}>
                  <RouterLink href={routeItem.url}>{routeItem.pageTitle?.value}</RouterLink>&nbsp;
                  (editable title too! <Text field={routeItem.pageTitle?.jss} />)
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// Will be called during SSG
export const getStaticProps: ComponentPropsFetchFunction<GetStaticPropsContext> = async (
  rendering,
  routeData
) => {
  const apolloClient = initializeApollo({ endpoint: config.graphQLEndpoint });

  const result = await apolloClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: routeData?.sitecore.route.itemId,
    },
  });

  return result.data;
};

// Will be called during SSR
export const getServerSideProps: ComponentPropsFetchFunction<GetServerSidePropsContext> = async (
  rendering,
  routeData
) => {
  const apolloClient = initializeApollo({ endpoint: config.graphQLEndpoint });

  const result = await apolloClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: routeData?.sitecore.route.itemId,
    },
  });

  return result.data;
};

export default GraphQLConnectedDemo;
