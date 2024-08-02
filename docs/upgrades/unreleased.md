## Unreleased

# Angular - XMCloud

If you plan to use the Angular SDK with XMCloud, you will need to perform next steps:

* On top of existing Angular sample, apply changes from "angular-xmcloud" add-on.
* Update package.json "build:client" script to use explicit "production" configuration:

    ```shell
    "build:client": "cross-env-shell ng build --configuration=production --base-href $npm_package_config_sitecoreDistPath/browser/ --output-path=$npm_package_config_buildArtifactsPath/browser/"
    ```

* Update "server.bundle.ts" to additionally expose new properties:

    ```ts
    import { environment } from './src/environments/environment';
    import { clientFactory } from './src/app/lib/graphql-client-factory';
    import { dictionaryServiceFactory } from './src/app/lib/dictionary-service-factory';
    import { layoutServiceFactory } from './src/app/lib/layout-service-factory';

    ...
    const defaultLanguage = environment.defaultLanguage;
    const graphQLEndpointPath = environment.graphQLEndpointPath;
    const graphQLEndpoint = environment.graphQLEndpoint;

    export {
        ...
        clientFactory,
        dictionaryServiceFactory,
        layoutServiceFactory,
        defaultLanguage,
        graphQLEndpointPath,
        graphQLEndpoint,
    };
    ```

* GraphQL FETCH_WITH method is required to be used, REST is not supported. Update FETCH_WITH environment variable if needed.
