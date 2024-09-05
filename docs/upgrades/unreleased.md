## Unreleased

# Angular

* Update several services to use updated Jss Context service:
    * In `\src\app\jss-context.service.ts`:
        * Replace the import from `sitecore-jss-angular`:
            ```
            import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-angular';
            ```  
            with
            ```
            import { LayoutServiceData, LayoutServiceError, JssState, JssStateService } from '@sitecore-jss/sitecore-jss-angular';
            ```
        * Remove `BehaviorSubject` import
        * Remove `LayoutServiceError` from `./layout/jss-layout.service`
        * Remove the `state` field (`state: BehaviorSubject<JssState>;`) 
        * Add two getters and replace constuctor as below:
        ```
        get state() {
            return this.stateService.state;
        }
        get stateValue() {
            return this.stateService.getStateValue();
        }
        constructor(protected transferState: TransferState, protected layoutService: JssLayoutService, protected stateService: JssStateService) {
        }
        ```
        * Replace all `this.state.next` calls with `this.stateService.setState`
        * Replace all `this.state.value` calls with `this.stateService.getStateValue()`
    * In `\src\app\jss-graphql.service.ts`:
        * Replace all `this.sitecoreContext.state.value` calls with `this.sitecoreContext.stateValue`
    * In `\src\app\layout\jss-layout.service.ts`:
        * Remove the `LayoutServiceError` class
        * Remove `LayoutServiceContextData` import
        * Add `LayoutServiceError` import from `@sitecore-jss/sitecore-jss-angular`

# Angular - XMCloud

If you plan to use the Angular SDK with XMCloud, you will need to perform next steps:

* On top of existing Angular sample, apply changes from "angular-xmcloud" add-on.
* Update package.json "build:client" script to use explicit "production" configuration:

    ```shell
    "build:client": "cross-env-shell ng build --configuration=production --base-href $npm_package_config_sitecoreDistPath/browser/ --output-path=$npm_package_config_buildArtifactsPath/browser/"
    ```

* Restructure /src/app/lib/client-factory.ts. This is needed in order to separate the GraphQL client factory configuration from the client factory itself, so we have a single source of GraphQL endpoint resolution that can be used in different places. For example node-xmcloud-proxy, scripts/update-graphql-fragment-data.ts, etc.
  * Introduce /src/app/lib/graphql-client-factory/config.ts. It should expose the _getGraphQLClientFactoryConfig_ that returns the configuration object for the GraphQL client factory, for example (full code snippet you can find in the "angular-xmcloud" add-on):

    ```ts
    import { GraphQLRequestClientFactoryConfig } from '@sitecore-jss/sitecore-jss-angular/cjs';
    import { environment as env } from '../../../environments/environment';

    export const getGraphQLClientFactoryConfig = () => {
        let clientConfig: GraphQLRequestClientFactoryConfig;

        if (env.graphQLEndpoint && env.sitecoreApiKey) {
            clientConfig = {
            endpoint: env.graphQLEndpoint,
            apiKey: env.sitecoreApiKey,
            };
        }

        ...

        return clientConfig;
    };
    ```

    * Introduce /src/app/lib/graphql-client-factory/index.ts. It should contain the _default_ export that returns the GraphQL client factory, for example:

    ```ts
    import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-angular/cjs';
    import { getGraphQLClientFactoryConfig } from './config';

    const createGraphQLClientFactory = () => {
        const clientConfig = getGraphQLClientFactoryConfig();

        return GraphQLRequestClient.createClientFactory(clientConfig);
    };

    export default createGraphQLClientFactory();
    ```

    * Make sure to import variables from @sitecore-jss/sitecore-jss-angular/cjs, not from @sitecore-jss/sitecore-jss-angular, since graphql-client-factory is used in the server bundle.

    * Update all the references to the GraphQL client factory in the application to use the new structure.

* Update /scripts/update-graphql-fragment-data.ts to utilize the GraphQL client factory and client factory configuration. The implementation you can find in the "angular" template (/scripts/update-graphql-fragment-data.ts
)
  * Remove "isomorphic-fetch" npm dependency

* Update /scripts/generate-config.ts, it's needed since generate-config can be called outside of /scripts/bootstrap.ts file. Add dotenv import:

    ```ts
    import 'dotenv/config';
    ```


* Update /server.bundle.ts to additionally expose new properties:

    ```ts
    import { environment } from './src/environments/environment';
    import clientFactory from './src/app/lib/graphql-client-factory';
    import { getGraphQLClientFactoryConfig } from './src/app/lib/graphql-client-factory/config';
    import { dictionaryServiceFactory } from './src/app/lib/dictionary-service-factory';
    import { layoutServiceFactory } from './src/app/lib/layout-service-factory';

    ...
    const defaultLanguage = environment.defaultLanguage;
    const getClientFactoryConfig = getGraphQLClientFactoryConfig;

    export {
        ...
        clientFactory,
        getClientFactoryConfig,
        dictionaryServiceFactory,
        layoutServiceFactory,
        defaultLanguage,
    };
    ```

* GraphQL FETCH_WITH method is required to be used, REST is not supported. Update FETCH_WITH environment variable if needed.

* Update /src/app/lib/dictionary-service-factory.ts to use new `useSiteQuery` property. You will be able to use a Site query to get the dictionary data:

    ```ts
    new GraphQLDictionaryService({
        clientFactory,
        siteName: env.sitecoreSiteName,
        useSiteQuery: true,
    });
    ```
