import { Injectable, PLATFORM_ID, Inject, } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ExtraSubscriptionOptions, EmptyObject, MutationResult } from 'apollo-angular/types';
import {
  QueryOptions,
  ApolloQueryResult,
  SubscriptionOptions,
  MutationOptions,
  DocumentNode
} from '@apollo/client/core';
import { Observable, EMPTY } from 'rxjs';
import { first } from 'rxjs/operators';
import { ComponentRendering, isEditorActive, resetEditorChromes } from '@sitecore-jss/sitecore-jss-angular';
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
      this.sitecoreContext.stateValue.sitecore.context.pageState !== 'normal';
  }

  private static extractVariableNames(query: DocumentNode) {
    const variableNames: { [key: string]: boolean } = {};
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

    return variableNames;
  }

  /**
   * Executes a read query against the GraphQL endpoint
   */
  query<T, V = EmptyObject>(options: QueryOptions<V> & JssGraphQLOptions): Observable<ApolloQueryResult<T>> {
    if (this.isEditingOrPreviewingAndSsr) {
      return EMPTY;
    }

    options.variables = this.addJssAmbientVariables(options.query, options.variables, options.renderingContext);

    const observable = this.apollo.query<T>(options);

    // When a query reply is received, and we're in Experience Editor mode,
    // xEditor needs to know to rebind to the editable DOM elements after they get inserted
    // (assuming use of `jss` field in the GQL query). This accomplishes that.
    observable.pipe(first()).subscribe(() => {
      setTimeout(() => {
        if (isEditorActive()) {
          resetEditorChromes();
        }
      }, 1000);
    });

    return observable;
  }

  /**
   * Executes a GraphQL mutation (write) against the GraphQL endpoint
   */
  mutate<T, V = EmptyObject>(options: MutationOptions<T, V> & JssGraphQLOptions): Observable<MutationResult<T>> {
    if (this.isEditingOrPreviewingAndSsr) {
      return EMPTY;
    }

    this.addJssAmbientVariables(options.mutation, options.variables, options.renderingContext);

    return this.apollo.mutate(options);
  }

  /**
   * Executes a GraphQL subscription (real-time data) against the GraphQL endpoint
   */
  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V> & JssGraphQLOptions, extra?: ExtraSubscriptionOptions) {
    if (this.isEditingOrPreviewingAndSsr) {
      return EMPTY;
    }

    this.addJssAmbientVariables(options.query, options.variables, options.renderingContext);

    return this.apollo.subscribe<T, V>(options, extra);
  }

  private addJssAmbientVariables<V = EmptyObject>(query: DocumentNode, variables: V, rendering?: ComponentRendering) {
    if (!variables) {
      variables = {} as V;
    }

    const usedVariables = JssGraphQLService.extractVariableNames(query);

    if (usedVariables.datasource && rendering && rendering.dataSource) {
      (variables as EmptyObject).datasource = rendering.dataSource;
    }

    if (
      usedVariables.contextItem &&
      this.sitecoreContext.stateValue.sitecore &&
      this.sitecoreContext.stateValue.sitecore.route &&
      this.sitecoreContext.stateValue.sitecore.route.itemId
    ) {
      (variables as EmptyObject).contextItem = this.sitecoreContext.stateValue.sitecore.route.itemId;
    }

    // pass language as a variable to the query, if language exists as a variable and in sitecoreContext
    if (
      usedVariables.language &&
      this.sitecoreContext.stateValue.language
    ) {
      (variables as EmptyObject).language = this.sitecoreContext.stateValue.language;
    }

    return variables;
  }
}
