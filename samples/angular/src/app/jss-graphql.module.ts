import { NgModule, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { InMemoryCache, NormalizedCacheObject, PossibleTypesMap } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { sha256 } from 'js-sha256';
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

      NOTE: to use Sitecore Experience Editor it is essential that your
      link passes cookies along with requests (withCredentials: true).
    */


    // set sc_apikey header which is required for any GraphQL calls
    const sc_apikey = new HttpHeaders().set('sc_apikey', environment.sitecoreApiKey);

    // choose between a basic HTTP link to run queries...
    // import { createHttpLink } from 'apollo-angular-link-http';
    // const link = createHttpLink({ uri: endpoint, withCredentials: 'include' });

    // ...or a batched link (multiple queries within 10ms all go in one HTTP request)
    const batchHttp = this.httpLink.create({
      uri: environment.graphQLEndpoint,
      withCredentials: true,
      headers: sc_apikey
    });

    // ...and an automatic persisted query link, which reduces bandwidth by using query hashes to alias content
    // the APQ link is _chained_ behind another link that performs the actual HTTP calls, so you can choose
    // APQ + batched, or APQ + http links for example.
    const automaticPersistHttp = createPersistedQueryLink({ sha256 }).concat(batchHttp);

    const possibleTypes = {} as PossibleTypesMap;

    introspectionQueryResultData.__schema.types.forEach((supertype) => {
      possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    });

    const cache = new InMemoryCache({
      possibleTypes,
    });

    this.apollo.create({
      link: automaticPersistHttp,
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
