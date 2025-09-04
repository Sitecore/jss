import { Component, Input, OnInit } from '@angular/core';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss-angular';
import { DocumentNode } from 'graphql';
import { JssGraphQLService } from '../../jss-graphql.service';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

// We can directly import .graphql files by specifying a Webpack loader in the require statement.
// Direct importing means we don't need to use the `gql` helper from `graphql-tag` to parse the query;
// it's done at build-time instead. Using a separate file is a best practice as it simplifies static analysis
// of your GraphQL queries.
const ComponentQuery: DocumentNode = require('graphql-tag/loader!./graph-ql-connected-demo.component.graphql');

@Component({
  selector: 'app-graph-ql-connected-demo',
  templateUrl: './graph-ql-connected-demo.component.html',
})
export class GraphQLConnectedDemoComponent implements OnInit {
  @Input() rendering: ComponentRendering;
  query$: Observable<ApolloQueryResult<unknown>>;

  // inject the JssGraphQLService to make GraphQL queries
  // note that it's possible to use Apollo directly, but the JSS
  // service provides automatic GraphQL variables and SSR assistance.
  constructor(private graphQLService: JssGraphQLService) {}

  ngOnInit(): void {
    // the query result is an Rx Observable, so any observable patterns
    // are usable here - async pipe (like this sample), subscribing manually,
    // (don't forget to unsubscribe in ngOnDestroy), etc.
    this.query$ = this.graphQLService.query({
      query: ComponentQuery,
      // passing in a rendering allows usage of the ambient $datasource GraphQL variable.
      // if it's not passed, the variable will not be defined (but $contextItem is still available)
      renderingContext: this.rendering
    });
  }
}
