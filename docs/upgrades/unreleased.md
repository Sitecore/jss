## Unreleased

# Angular - XMCloud

If you plan to use the Angular SDK with XMCloud, you will need to perform next steps:

* On top of existing Angular sample, apply changes from "angular-xmcloud" add-on.
* Updated package.json "build" script to set "JSS_MODE=production":

    ```shell
    "cross-env-shell JSS_MODE=production \"npm-run-all --serial bootstrap --serial build:client build:server\""
    ```

* Update "scripts/generate-config.ts" to handle tempalte literals in the output "environment" file:

    ```ts
    Object.keys(config).forEach((prop) => {
        let value = config[prop]?.toString().trim();
        const usesTemplateLiteral = /\$\{.*?\}/.test(config[prop].toString());

        value = usesTemplateLiteral ? `\`${value}\`` : `"${value}"`;

        configText += `config.${prop} = process.env.${constantCase(prop)} || ${value};\n`;
    });
    ```

* Updated "server.bundle.ts" to additionally expose new properties:

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

* GraphQL FETCH_WITH method is required to be used, REST is not supported. Updated FETCH_WITH environment variable if needed.
