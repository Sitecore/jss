import fetch from 'cross-fetch';
import fs from 'fs';
import { getIntrospectionQuery } from 'graphql';
import { generateConfig } from './generate-config';

// This script load graphql introspection data in order to use graphql code generator and generate typescript types
// The `jss graphql:update` command should be executed when Sitecore templates related to the site are altered.

generateConfig();

let jssConfig;

try {
  // eslint-disable-next-line
  jssConfig = require('../src/temp/config');
} catch (e) {
  console.error(
    'Unable to require JSS config. Ensure `jss setup` has been run, and the app has been started at least once after setup.'
  );
  console.error(e);
  process.exit(1);
}

console.log(`Fetch graphql introspection data from ${jssConfig.graphQLEndpoint}...`);

fetch(jssConfig.graphQLEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: getIntrospectionQuery(),
  }),
})
  .then((result) => result.json())
  .then((result) => {
    fs.writeFile(
      './src/temp/GraphQLIntrospectionResult.json',
      JSON.stringify(result, null, 2),
      (err) => {
        if (err) {
          console.error('Error writing GraphQLIntrospectionResult file', err);
          return;
        }

        console.log('GraphQL Introspection Data successfully fetched!');
      }
    );
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
