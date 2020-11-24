import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import RouterLink from 'next/link';
import {
  ConnectedDemoQueryDocument,
  AppRoute,
  Item,
  GraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from './query.graphql';
import GraphQLClientFactory from 'lib/GraphQLClientFactory';
import {
  GetServerSideComponentProps,
  GetStaticComponentProps,
  StyleguideComponentProps,
  useComponentProps,
} from 'lib/component-props';

type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
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

/**
 * Will be called during SSG
 * @param rendering
 * @param layoutData
 * @param context
 */
export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === 'disconnected') {
    return null;
  }

  const graphQLClient = GraphQLClientFactory();

  const result = await graphQLClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: layoutData?.sitecore.route.itemId,
    },
  });

  return result.data;
};

/**
 * Will be called during SSR
 * @param rendering
 * @param layoutData
 * @param context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === 'disconnected') {
    return null;
  }

  const graphQLClient = GraphQLClientFactory();

  const result = await graphQLClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: layoutData?.sitecore.route.itemId,
    },
  });

  return result.data;
};

export default GraphQLConnectedDemo;
