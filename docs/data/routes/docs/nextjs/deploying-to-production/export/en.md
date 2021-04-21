---
name: export
routeTemplate: ./data/component-templates/article.yml
title: Using `next export` with the Next.js sample app
---
# Walkthrough: Using `next export` with the Next.js Sample Application

You can serve your JSS Next.js application as static HTML files using any static hosting service or content delivery network. 

> Static HTML export does not support: 
>
> * Server-side Rendered (SSR) pages (using `getServerSideProps`).
> * Internationalized routing.
> * Request rewrites.
> * Visitor identification. 
> * Exporting the Sitecore Media Library. You still need a running Content Delivery instance for the media library.
> * The default image `loader` used by the `next/image` component.
>
> See the  Next.js  [Static HTML Export Caveats](https://nextjs.org/docs/advanced-features/static-html-export/#caveats) documentation for more information.

To export your JSS Next.js application as static HTML files, you must: 

1. Prepare your application for static HTML export.
2. Export the application

## Prepare your application for static HTML export

Before exporting your application, you must: 

1. In `next.config.js`, remove `rewrites` and `i18n`.

2. In `JssNextWeb.config`:

   *  Include the Sitecore server URL as part of the media requests: 

     ```xml
     <IncludeServerUrlInMediaUrls>true</IncludeServerUrlInMediaUrls>
     ```

   * Or  remove the `<IncludeServerUrlInMediaUrls>` configuration patch:

     ```xml
     <layoutService>
     	<configurations>
     		<config name="jss">
     			<rendering>
     				<renderingContentsResolver>
     					<IncludeServerUrlInMediaUrls>false</IncludeServerUrlInMediaUrls>
     				</renderingContentsResolver>
     			</rendering>
     		</config>
     	</configurations>
     </layoutService>
     ```

   * Run `jss deploy config`.

3. Remove usage of `<VisitorIdentification />` component in `src/components/Layout.tsx`.

4. In `.env`, define the `PUBLIC_URL` variable.

5. In `package.json`, add the following scripts: 

   * `"next:export": "next export"`.

   * When using content from Sitecore ("Connected Mode"): `"export:connected": "cross-env-shell EXPORT_MODE=true \"npm-run-all --serial bootstrap next:build next:export\""`.

   * When using content from local files ("Disconnected Mode"): `"export": "cross-env-shell JSS_MODE=disconnected PORT=3042 EXPORT_MODE=true \"npm-run-all --serial bootstrap next:build next:export\""`.

      Replace the `PORT` value with the port of your disconnected server.

6. For disconnected mode only, run `jss start:disconnected-proxy`. During the build stage, Next.js will fetch the required data (layout, dictionary, sitemap) from your disconnected server.

## Export the application

* Run the `jss export` or `jss export:connected` script.  The script will place the files in the `out` directory.
