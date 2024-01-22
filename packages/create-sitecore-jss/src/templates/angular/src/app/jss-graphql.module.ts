import { makeStateKey, TransferState, NgModule, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { InMemoryCache, NormalizedCacheObject, PossibleTypesMap } from '@apollo/client/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';
import { isPlatformServer } from '@angular/common';
import { environment } from '../environments/environment';
import { JssGraphQLService } from './jss-graphql.service';

/*
  INTROSPECTION DATA
  See https://www.apollographql.com/docs/react/recipes/fragment-matching.html
  This enables the Apollo cache to process fragments on interface types correctly.
  If this file does not exist, you may need to run the `jss graphql:update` script.
*/
import introspectionQueryResultData from '../graphql-fragment-types';

// SSR transfer state key to serialize + rehydrate apollo cache on client side
// See https://www.apollographql.com/docs/angular/recipes/server-side-rendering.html
const STATE_KEY = makeStateKey<NormalizedCacheObject>('apollo.state');

@NgModule({
  imports: [
    ApolloModule,
    HttpClientModule, // provides HttpClient for HttpLink
  ],
  providers: [JssGraphQLService],
})
export class GraphQLModule {
  constructor(
    private readonly apollo: Apollo,
    private readonly httpLink: HttpBatchLink,
    private readonly transferState: TransferState,
    @Inject(PLATFORM_ID) private readonly platformId: string
  ) {
    this.createApolloClient();
  }

  onServer(cache: InMemoryCache) {
    this.transferState.onSerialize(STATE_KEY, () => cache.extract());
  }

  onBrowser(cache: InMemoryCache) {
    const state = this.transferState.get<NormalizedCacheObject>(STATE_KEY, null);

    cache.restore(state);
  }

  private createApolloClient(): void {
    /*
      QUERY LINK SELECTION
      A link is transport which GraphQL queries are pushed across.
      You have many choices.
      See the apollo-link documentation for more details.
    */

    // set sc_apikey header which is required for any GraphQL calls
    const sc_apikey = new HttpHeaders().set('sc_apikey', environment.sitecoreApiKey);

    // choose between a basic HTTP link to run queries...
    // import { createHttpLink } from 'apollo-angular-link-http';
    // const link = createHttpLink({ uri: endpoint });

    // ...or a batched link (multiple queries within 10ms all go in one HTTP request)
    const batchHttp = this.httpLink.create({
      uri: environment.graphQLEndpoint,
      headers: sc_apikey,
    });

    const possibleTypes = {} as PossibleTypesMap;

    introspectionQueryResultData.__schema.types.forEach((supertype) => {
      possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    });

    const cache = new InMemoryCache({
      possibleTypes,
    });

    this.apollo.create({
      link: batchHttp,
      cache,
      ssrMode: isPlatformServer(this.platformId),
      ssrForceFetchDelay: 100,
    });

    const isBrowser = this.transferState.hasKey(STATE_KEY);

    if (isBrowser) {
      this.onBrowser(cache);
    } else {
      this.onServer(cache);
    }
  }
}
