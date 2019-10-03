import { Injectable, PLATFORM_ID, Inject, } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ExtraSubscriptionOptions, R } from 'apollo-angular/types';
import { QueryOptions, ApolloQueryResult, SubscriptionOptions, MutationOptions } from 'apollo-client';
import { Observable, empty } from 'rxjs';
import { first } from 'rxjs/operators';
import { FetchResult, DocumentNode } from 'apollo-link';
import { ComponentRendering, isExperienceEditorActive, resetExperienceEditorChromes } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService } from './jss-context.service';
import { ExecutableDefinitionNode } from 'graphql';
import { isPlatformServer } from '@angular/common';

export interface JssGraphQLOptions {
  renderingContext?: ComponentRendering;
}

/**
 * Provides GraphQL querying services via Apollo Client.
 * This service is needed to use _connected GraphQL_ with your JSS app.
 * If you are not using GraphQL, or are only using the _integrated GraphQL_
 * that is within the Layout Service, you do not need this service.
 *
 * Compared to using apollo-angular directly, using this service:
 * * Handles Sitecore SSR issues
 * * Makes available ambient $datasource and $contextItem GQL variables based on current route data
 * * Integrates with Sitecore Experience Editor's DOM-based update needs
 *
 * The API is identical to apollo-angular's `Apollo` service otherwise.
 */
@Injectable()
export class JssGraphQLService {
  private isEditingOrPreviewingAndSsr: boolean;

  constructor(
    private readonly apollo: Apollo,
    private readonly sitecoreContext: JssContextService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {
    this.isEditingOrPreviewingAndSsr =
      isPlatformServer(this.platformId) &&
      this.sitecoreContext.state.value.sitecore.context.pageState !== 'normal';
  }

  private static extractVariableNames(query: DocumentNode) {
    const variableNames = {};
    query.definitions
      .map((def) => (def as ExecutableDefinitionNode).variableDefinitions)
      .filter((def) => def)
      .forEach((defs) =>
        defs.forEach((def) => {
          if (def.kind && def.kind === 'VariableDefinition') {
            variableNames[def.variable.name.value] = true;
          }
        })
      );

    return variableNames as { [key: string]: string };
  }

    private addJssAmbientVariables<V = R>(query: DocumentNode, variables: V, rendering?: ComponentRendering) {
    if (!variables) {
      variables = {} as V;
    }

    const usedVariables = JssGraphQLService.extractVariableNames(query);

    if (usedVariables.datasource && rendering && rendering.dataSource) {
      variables['datasource'] = rendering.dataSource;
    }

    if (
      usedVariables.contextItem &&
      this.sitecoreContext.state.value.sitecore &&
      this.sitecoreContext.state.value.sitecore.route &&
      this.sitecoreContext.state.value.sitecore.route.itemId
    ) {
      variables['contextItem'] = this.sitecoreContext.state.value.sitecore.route.itemId;
    }

    return variables;
  }

  /**
   * Executes a read query against the GraphQL endpoint
   */
  query<T, V = R>(options: QueryOptions<V> & JssGraphQLOptions): Observable<ApolloQueryResult<T>> {
    if (this.isEditingOrPreviewingAndSsr) {
      return empty();
    }

    options.variables = this.addJssAmbientVariables(options.query, options.variables, options.renderingContext);

    const observable = this.apollo.query<T>(options);

    // When a query reply is received, and we're in Experience Editor mode,
    // xEditor needs to know to rebind to the editable DOM elements after they get inserted
    // (assuming use of `jss` field in the GQL query). This accomplishes that.
    observable.pipe(first()).subscribe(() => {
      setTimeout(() => {
        if (isExperienceEditorActive()) {
          resetExperienceEditorChromes();
        }
      }, 1000);
    });

    return observable;
  }

  /**
   * Executes a GraphQL mutation (write) against the GraphQL endpoint
   */
  mutate<T, V = R>(options: MutationOptions<T, V> & JssGraphQLOptions): Observable<FetchResult<T>> {
    if (this.isEditingOrPreviewingAndSsr) {
      return empty();
    }

    this.addJssAmbientVariables(options.mutation, options.variables, options.renderingContext);

    return this.apollo.mutate(options);
  }

  /**
   * Executes a GraphQL subscription (real-time data) against the GraphQL endpoint
   */
  subscribe<T, V = R>(options: SubscriptionOptions<V> & JssGraphQLOptions, extra?: ExtraSubscriptionOptions): Observable<any> {
    if (this.isEditingOrPreviewingAndSsr) {
      return empty();
    }

    this.addJssAmbientVariables(options.query, options.variables, options.renderingContext);

    return this.apollo.subscribe<T, V>(options, extra);
  }
}
