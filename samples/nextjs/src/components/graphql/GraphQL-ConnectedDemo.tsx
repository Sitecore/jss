import React from 'react';
import {
  Text,
  Link,
  GetServerSideComponentProps,
  GetStaticComponentProps,
  useComponentProps,
  JSS_MODE_DISCONNECTED,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import {
  ConnectedDemoQueryDocument,
  AppRoute,
  Item,
  GraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from './GraphQL-ConnectedDemo.graphql';
import GraphQLClientFactory from 'lib/GraphQLClientFactory';
import { StyleguideComponentProps } from 'lib/component-props';

type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
  contextItem: RouteItem;
};

const GraphQLConnectedDemo = (props: StyleguideComponentProps): JSX.Element => {
  const data = props.rendering.uid
    ? useComponentProps<GraphQLConnectedDemoData>(props.rendering.uid)
    : undefined;

  return (
    <div data-e2e-id="graphql-connected">
      <h2>GraphQL Connected Demo</h2>

      <p>
        Connected GraphQL executes GraphQL queries directly against the Sitecore GraphQL endpoint.
        This example runs the query server-side using component-level <code>getStaticProps</code>/
        <code>getServerSideProps</code>, a feature of the Sitecore JSS Next.js SDK. These are
        aggregated during the the Next.js page-level <code>getStaticProps</code>/
        <code>getServerSideProps</code> execution.
      </p>

      {data && data.datasource && (
        <div>
          <h4>Datasource Item (via Connected GraphQL)</h4>
          id: {data.datasource.id}
          <br />
          name: {data.datasource.name}
          <br />
          sample1: {data.datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={data.datasource.sample1?.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {data.datasource.sample2?.text}</li>
            <li>url: {data.datasource.sample2?.url}</li>
            <li>target: {data.datasource.sample2?.target}</li>
            <li>
              editable: <Link field={data.datasource.sample2?.jsonValue} />
            </li>
            <li>field type: {data.datasource.sample2?.definition?.type}</li>
            <li>field is shared?: {data.datasource.sample2?.definition?.shared.toString()}</li>
          </ul>
        </div>
      )}
      {data && data.contextItem && (
        <div>
          <h4>Route Item (via Connected GraphQL)</h4>
          id: {data.contextItem.id}
          <br />
          page title: {data.contextItem.pageTitle?.value}
          <br />
          children:
          <ul>
            {data.contextItem.children.map((child) => {
              const routeItem = child as RouteItem;

              return (
                <li key={routeItem.id}>
                  <NextLink href={routeItem.url.path}>{routeItem.pageTitle?.value}</NextLink>
                  (editable title too! <Text field={routeItem.pageTitle?.jsonValue} />)
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
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === JSS_MODE_DISCONNECTED) {
    return null;
  }

  const graphQLClient = GraphQLClientFactory();

  const result = await graphQLClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: layoutData?.sitecore?.route?.itemId,
    },
  });

  return result.data;
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetServerSidePropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === JSS_MODE_DISCONNECTED) {
    return null;
  }

  const graphQLClient = GraphQLClientFactory();

  const result = await graphQLClient.query({
    query: ConnectedDemoQueryDocument,
    variables: {
      datasource: rendering.dataSource,
      contextItem: layoutData?.sitecore?.route?.itemId,
    },
  });

  return result.data;
};

export default GraphQLConnectedDemo;
