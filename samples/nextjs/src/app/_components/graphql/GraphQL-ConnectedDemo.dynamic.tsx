'use client';

import React, { use, useEffect } from 'react';
import {
  Text,
  Link,
  constants,
  GraphQLRequestClient,
  resetEditorChromes,
  withDatasourceCheck,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextLink from 'next/link';
import { ConnectedDemoQueryDocument } from './GraphQL-ConnectedDemo.dynamic.graphql';
import {
  NextjsAppAppRoute as AppRoute,
  Item,
  NextjsAppGraphQlConnectedDemo as GrapQLConnectedDemoDatasource,
} from 'graphql-types';
import { ComponentProps } from 'lib/component-props';
import config from 'temp/config';

type RouteItem = AppRoute & Item;

type GraphQLConnectedDemoData = {
  datasource: GrapQLConnectedDemoDatasource;
  contextItem: RouteItem;
};

type GraphQLConnectedDemoProps = ComponentProps & GraphQLConnectedDemoData;

const GraphQLConnectedDemo = (props: GraphQLConnectedDemoProps) => {
  const {
    sitecoreContext: { route, language },
  } = useSitecoreContext();

  useEffect(() => {
    resetEditorChromes();
  }, []);

  let graphQLResult: GraphQLConnectedDemoData | undefined;

  if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) {
    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

    graphQLResult = use(
      graphQLClient.request<GraphQLConnectedDemoData>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ConnectedDemoQueryDocument as any,
        {
          datasource: props.rendering.dataSource,
          contextItem: route?.itemId,
          language,
        }
      )
    );
  }

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

      {graphQLResult?.datasource && (
        <div>
          <h4>Datasource Item (via Connected GraphQL)</h4>
          id: {graphQLResult.datasource.id}
          <br />
          name: {graphQLResult.datasource.name}
          <br />
          sample1: {graphQLResult.datasource.sample1?.value}
          <br />
          sample1 (editable): <Text field={graphQLResult.datasource.sample1?.jsonValue} />
          <br />
          sample2:
          <br />
          <ul>
            <li>text: {graphQLResult.datasource.sample2?.text}</li>
            <li>url: {graphQLResult.datasource.sample2?.url}</li>
            <li>target: {graphQLResult.datasource.sample2?.target}</li>
            <li>
              editable: <Link field={graphQLResult.datasource.sample2?.jsonValue} />
            </li>
            <li>field type: {graphQLResult.datasource.sample2?.definition?.type}</li>
            <li>
              field is shared?: {graphQLResult.datasource.sample2?.definition?.shared.toString()}
            </li>
          </ul>
        </div>
      )}
      {graphQLResult?.contextItem && (
        <div>
          <h4>Route Item (via Connected GraphQL)</h4>
          id: {graphQLResult.contextItem.id}
          <br />
          page title: {graphQLResult.contextItem.pageTitle?.value}
          <br />
          children:
          <ul>
            {graphQLResult.contextItem.children.results.map((child) => {
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

export default withDatasourceCheck()<ComponentProps>(GraphQLConnectedDemo);
