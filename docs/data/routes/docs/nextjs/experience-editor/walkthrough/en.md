---
name: walkthrough
routeTemplate: ./data/component-templates/article.yml
title: Connect to the Experience Editor
---
# Walkthrough: Connect your Next.js app to the Experience Editor

A Next.js application utilizes the [JSS Http rendering engine](/docs/fundamentals/services/view-engine) feature for integration to the Sitecore Experience Editor. This article will guide you through the required configuration.

## Step 1: Sitecore configuration

> A default Sitecore configuration file is included with the Next.js app upon creation with `jss create`. You can find this file under `/sitecore/config`.

### JSS app configuration

You must set the following attributes on the JSS `<app />`:

* `serverSideRenderingEngine` - Must be set to `http`
* `serverSideRenderingEngineEndpointUrl` - The absolute URL of your Next.js app's API route which handles POST requests from the Sitecore Experience Editor. By default, this API route is '/api/editing/render'.
* `serverSideRenderingEngineApplicationUrl` - The root URL that will be used when creating absolute links in the rendered HTML. Link replacement is necessary in order for relative links in the rendered HTML to be able to load in the Experience Editor.

> Learn more about JSS app configuration and the available attributes [here](/docs/fundamentals/services/app-configuration).

For example, the default configuration will be:

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <javaScriptServices>
      <apps>
        <app name="exampleApp"
            ...
            serverSideRenderingEngine="http"
            serverSideRenderingEngineEndpointUrl="http://localhost:3000/api/editing/render"
            serverSideRenderingEngineApplicationUrl="http://localhost:3000"
            ...
        />
      </apps>
    </javaScriptServices>
  </sitecore>
</configuration>
```

### JSS Editing Secret

To secure the Experience Editor endpoint exposed by your Next.js app (`serverSideRenderingEngineEndpointUrl` above), a secret token is used. This secret must be set on both server-side and client-side, and the values must match.

> We recommend an alphanumeric value of at least 16 characters.

You have 2 options for setting this on the server-side.

**Option 1: Environment variable**

Set the `SITECORE_JSS_EDITING_SECRET` environment variable. This could be preferred for container or hosted production environments (e.g. Vercel).

**Option 2: Sitecore setting**

Set the `JavaScriptServices.ViewEngine.Http.JssEditingSecret` Sitecore setting.
```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="MySuperSecret" />
```
The default configuration includes a disabled config patch which you can use. Simply uncomment and fill in your secret.

## Step 2: Next.js app configuration

### JSS Editing Secret

The same secret value used above must be set on the client-side. In the Next.js application, this is configured as an environment variable: `JSS_EDITING_SECRET`.

> A default `.env` file is included with the Next.js app upon creation with `jss create`. You can find this file at the project root.

Open the `.env` file and set your secret value.
```env
JSS_EDITING_SECRET=MySuperSecret
```

### Next.js Fast Refresh support

The Next.js Fast Refresh feature requires special handling when used within the Sitecore Experience Editor; specifically, to preserve the edit "chromes".

> See [Next.js documentation](https://nextjs.org/docs/basic-features/fast-refresh) to learn more about Fast Refresh.
 
The JSS Next.js SDK provides a `handleExperienceEditorFastRefresh` utility function to solve this problem. This should be called within a React `useEffect` hook on any Next.js page that will be editable.

```javascript
import { handleExperienceEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs';

const MyPage = ({ notFound, layoutData, componentProps }: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Experience Editor does not support Fast Refresh need to refresh EE chromes after Fast Refresh finished
    handleExperienceEditorFastRefresh();
  }, []);
  ...
};

export default MyPage;
```

> Note the Next.js sample app already includes this code in the default catch-all routes `[[...path]].tsx` and `[[...path]].SSR.tsx`.

By default, only the edit chromes are refreshed (fine for most cases). However, you may also force an entire page reload instead using the optional `forceReload` parameter.

```javascript
handleExperienceEditorFastRefresh(true);
```

## Step 3: Run the Next.js application

Finally, make sure the Next.js application is running (by default, on `http://localhost:3000`). 

Note you may use any of the start commands. Development mode with Fast Refresh will be particularly useful during active development.