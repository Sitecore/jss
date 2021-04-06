# Walkthrough: Add Support for Redirects Managed by Content Authors in Headless Server-Side Rendered Applications

To redirect pages based on redirect links provided by Content Authors: 

1. [Create a page template with a redirect field.](#create-a-page-template-with-a-redirect-field) 
2. [Use the redirect template for new and existing pages.](#use-the-redirect-template-with-new-and-existing-pages)
3. [Customize the `node-headless-ssr-proxy` sample to handle redirects.](#customize-the-node-headless-ssr-proxy-sample-to-handle-redirects)

> This walkthrough assumes you have followed the ["Headless SSR via `sitecore-jss-proxy`" documentation](/docs/techniques/ssr/headless-mode-ssr) to set up the headless server-side rendering of your application.

## Create a page template with a redirect field

In your Sitecore instance:

1. Create a route template called **Redirect Route** that inherits the default `App Route`. 
2. Under the **Builder** tab, add a **General Link** field named **Destination** and **Save**.

## Use the redirect template with new and existing items

1. To create new items with redirect capability, [insert new items in the application's content folder using the new Redirect Route template](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/create-an-item-in-the-content-editor.html#UUID-33faf7af-c5e7-5bc5-5ad9-42325eeb16d2_id__Insert_an_item_1). 
2. To apply the template to existing items, [edit or change the template that an item is based on](https://doc.sitecore.com/users/101/sitecore-experience-platform/en/edit-or-change-the-template-that-an-item-is-based-on.html).

## Customize the `node-headless-ssr-proxy` sample to handle redirects

1. In the  `/.env` file, define environment variables: 

   ```
   SITECORE_JSS_APP_NAME="JssReactWeb"
   SITECORE_API_HOST="https://cm.jss16.localhost"
   SITECORE_HOSTNAME="https://react.jss16.localhost"
   SITECORE_API_KEY="{5379B475-A885-4B62-9A51-EE79E5434650}"
   SITECORE_GRAPHQL_ENDPOINT="https://cm.jss16.localhost/api/jssreactweb?sc_apikey={5379B475-A885-4B62-9A51-EE79E5434650}"
   DEFAULT_LANGUAGE="en"
   ```

2. Install the `dotenv` npm package to load the environment variables into the Node `process.env`:

   ```
   npm install --save-dev dotenv
   ```

3. In `/config.js`:

   1. Require and configure `dotenv`:

   ```javascript
   require('dotenv').config();
   ```

   2. Declare the following constants: 

      ```javascript
      const graphQLEndpoint = process.env.SITECORE_GRAPHQL_ENDPOINT || serverBundle.graphQLEndpoint || `${apiHost}/api/${appName}`;
      
      const defaultLanguage = process.env.DEFAULT_LANGUAGE || serverBundle.defaultLanguage || 'en';
      
      const hostname = process.env.SITECORE_HOSTNAME || serverBundle.hostname || apiHost;
      ```

   3. For the `config` module, define a new member function `getRedirects`. This example uses a GraphQL query: 

      ```javascript
      getRedirects: () => {
          return fetch(graphQLEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
              query {
                search(fieldsEqual: [{ name: "_templatename", value: "Redirect Route" }]) {
                  results {
                    items {
                      item {
                        url
                        field(name: "Destination") {
                          ... on LinkField {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            `
            })
          }).then(response => response.json())
            .then(response => {
              // Layout Service returns paths with language included. But end-user may not have
              // language in the URL if site is in the default language. We can account for this using regular expression matching.
              const re = new RegExp(`^(?:${hostname})(?:\/${defaultLanguage})?(\/.+)$`);
              function getNormalizedPath(url) {
                return re.test(url) ? url.match(re)[1] : url;
              }
      
              return response.data.search.results.items.reduce((redirects, searchResult) => {
                const source = searchResult.item?.url;
                const destination = searchResult.item?.field?.url;
      
                if (source && destination) {
                  redirects[getNormalizedPath(source)] = getNormalizedPath(destination);
                }
      
                console.log(JSON.stringify(redirects, null, 4));
                return redirects;
              }, {});
            });
        }
      ```

4. In `/index.js`, leverage the new `getRedirects` method: 

   ```javascript
   let redirectPromise;
   
   server.use('*', (req, res, next) => {
     if (redirectPromise === undefined) {
       // cache list of redirects in memory
       redirectPromise = config.getRedirects();
     }
   
     redirectPromise.then(redirects => {
       if (redirects && redirects.hasOwnProperty(req.baseUrl)) {
         req.url = redirects[req.baseUrl];
         res.redirect(301, req.url);
       } else {
         next();
       }
     }).catch(error => {
       console.log(error);
       next();
     });
   });
   ```

