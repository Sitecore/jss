import * as fs from 'fs';
import clientFactory from 'lib/graphql-client-factory';
import { getGraphQLClientFactoryConfig } from 'lib/graphql-client-factory/config';

// Apollo Client supports caching GraphQL responses, which can greatly reduce network traffic needs.
// In order to work correctly with interfaces in GraphQL, it needs to know some basic information about
// the shape of the GraphQL schema. This script pulls that necessary information from the GraphQL endpoint.
// See https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
//
// The `jss graphql:update` command should be executed when Sitecore templates related to the site are altered.

import './generate-config';

const clientFactoryConfig = getGraphQLClientFactoryConfig();

console.log(`Updating GraphQL fragment type data from ${clientFactoryConfig.endpoint}...`);

clientFactory()
  .request<{
    [key: string]: unknown;
    __schema: {
      kind: string;
      name: string;
      types: { possibleTypes?: { name: string } }[];
    };
  }>(
    `
      { 
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  )
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.__schema.types.filter((type) => type.possibleTypes !== null);

    const filteredResult = { ...result };
    filteredResult.__schema.types = filteredData;

    fs.writeFile(
      './src/graphql-fragment-types.ts',
      `export default ${JSON.stringify(filteredResult, null, 2)}`,
      (err) => {
        if (err) {
          console.error('Error writing GraphQLFragmentTypes file', err);
          return;
        }

        console.log('GraphQL Fragment types successfully extracted!');
      }
    );
  })
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
