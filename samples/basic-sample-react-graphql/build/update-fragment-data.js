/* eslint-disable no-console, no-underscore-dangle */

const fetch = require('isomorphic-fetch');
const fs = require('fs');
const jssConfig = require('./config');

// See https://www.apollographql.com/docs/react/recipes/fragment-matching.html

console.log(`Updating GraphQL fragment type data from ${jssConfig.graphQLEndpoint}...`);

fetch(jssConfig.graphQLEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
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
    `,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);

    const filteredResult = { ...result };
    filteredResult.data.__schema.types = filteredData;

    fs.writeFile(
      './sitecore/GraphQLFragmentTypes.json',
      JSON.stringify(filteredResult.data),
      (err) => {
        if (err) {
          console.error('Error writing GraphQLFragmentTypes file', err);
          return;
        }

        console.log('GraphQL Fragment types successfully extracted!');
      }
    );
  });
