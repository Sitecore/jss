import React, { useEffect } from 'react';
import {
  Text,
  Link,
  GetServerSideComponentProps,
  GetStaticComponentProps,
  constants,
  GraphQLRequestClient,
  withDatasourceCheck,
  resetEditorChromes,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import {
  ConnectedDemoQueryDocument,
  <%- appPrefix ? `${helper.getPascalCaseName(appName)}` : "" %>AppRoute as AppRoute,
  Item,
  <%- appPrefix ? `${helper.getPascalCaseName(appName)}` : "" %>GraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from './GraphQL-ConnectedDemo.dynamic.graphql';
import { ComponentProps } from 'lib/component-props';
import config from 'temp/config';

type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
  contextItem: RouteItem;
};

type GraphQLConnectedDemoProps = StyleguideComponentProps & GraphQLConnectedDemoData;

const GraphQLConnectedDemo = (props: GraphQLConnectedDemoProps): JSX.Element => {
  useEffect(() => {
    resetEditorChromes();
  }, []);

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

      {props.datasource && (
        <div>
          <h4>Datasource Item (via Connected GraphQL)</h4>
          id: {props.datasource.id}
          <br />
          name: {props.datasource.name}
          <br />
          sample1: {props.datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={props.datasource.sample1?.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {props.datasource.sample2?.text}</li>
            <li>url: {props.datasource.sample2?.url}</li>
            <li>target: {props.datasource.sample2?.target}</li>
            <li>
              editable: <Link field={props.datasource.sample2?.jsonValue} />
            </li>
            <li>field type: {props.datasource.sample2?.definition?.type}</li>
            <li>field is shared?: {props.datasource.sample2?.definition?.shared.toString()}</li>
          </ul>
        </div>
      )}
      {props.contextItem && (
        <div>
          <h4>Route Item (via Connected GraphQL)</h4>
          id: {props.contextItem.id}
          <br />
          page title: {props.contextItem.pageTitle?.value}
          <br />
          children:
          <ul>
            {props.contextItem.children.results.map((child) => {
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
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const result = await graphQLClient.request<GraphQLConnectedDemoData>(ConnectedDemoQueryDocument, {
    datasource: rendering.dataSource,
    contextItem: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
  });

  return result;
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetServerSidePropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (rendering, layoutData) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const result = await graphQLClient.request<GraphQLConnectedDemoData>(ConnectedDemoQueryDocument, {
    datasource: rendering.dataSource,
    contextItem: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
  });

  return result;
};

export default withDatasourceCheck()<ComponentProps>(GraphQLConnectedDemo);
