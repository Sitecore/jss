---
name: walkthrough
routeTemplate: ./data/component-templates/article.yml
title: Connect to the Experience Editor
---
# Walkthrough: Connect your Next.js App to the Experience Editor

A Next.js application utilizes the [JSS Http rendering engine](/docs/fundamentals/services/view-engine#http-rendering-engine) feature for integration to the Sitecore Experience Editor. This article will guide you through the required configuration.

> The Sitecore Containers template for Next.js includes pre-configured integration with the Experience Editor.

## Step 1: Sitecore configuration

> A default Sitecore configuration file is included with the Next.js app upon creation with `jss create`. You can find this file under `/sitecore/config`.

### JSS app configuration

You must set the following attributes on the JSS `<app />`:

- `serverSideRenderingEngine` - Must be set to `http`.
- `serverSideRenderingEngineEndpointUrl` - The absolute URL of your Next.js app's API route handles POST requests from the Sitecore Experience Editor. By default, this API route is `/api/editing/render`.
- `serverSideRenderingEngineApplicationUrl` - This is the root URL used when creating absolute links in the rendered HTML. Link replacement is necessary for relative links in the rendered HTML to load in the Experience Editor.

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

You must use a secret token to secure the Experience Editor endpoint `serverSideRenderingEngineEndpointUrl` exposed by your Next.js app. You must set this secret both server-side and client-side, and the values must match.

We recommend an alphanumeric value of at least 16 characters.

You have two options for setting this on the server-side.

**Option 1: Environment variable**

Set the `SITECORE_JSS_EDITING_SECRET` environment variable. 

> This approach is preferable for container or hosted production environments.

**Option 2: Sitecore setting**

Set the `JavaScriptServices.ViewEngine.Http.JssEditingSecret` Sitecore setting.

```xml
<setting name="JavaScriptServices.ViewEngine.Http.JssEditingSecret" value="MySuperSecret" />
```

The default configuration includes a disabled configuration patch that you can use. Uncomment and fill in your secret.

## Step 2: Next.js app configuration

### JSS Editing Secret

In the Next.js application, you must set the environment variable `JSS_EDITING_SECRET` to the same secret value as on the server-side. 

A default `.env` file is included with the Next.js app upon creation with `jss create`. You can find this file at the project root.

Open the `.env` file and set your secret value.

```
JSS_EDITING_SECRET=MySuperSecret
```

### Next.js Fast Refresh support

The Next.js Fast Refresh feature requires special handling when used within the Sitecore Experience Editor to preserve the edit "chromes" (additional markup and JavaScript injected by the Experience Editor for each rendering).

>  See the [Next.js documentation](https://nextjs.org/docs/basic-features/fast-refresh) to learn more about Fast Refresh.

The JSS Next.js SDK provides a `handleExperienceEditorFastRefresh` utility function to solve this problem. You should call the function within a React `useEffect` hook on any Next.js page that will be editable.

```typescript
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



>  Note the Next.js sample application already includes this code in the default catch-all routes `[[...path]].tsx` and `[[...path]].SSR.tsx`.

By default, only the edit chromes are refreshed (fine for most cases). However, you may also force an entire page to reload instead, using the optional `forceReload` parameter.

```typescript
handleExperienceEditorFastRefresh(true);
```

## Step 3: Run the Next.js application

Finally, make sure the Next.js application is running (by default, on `http://localhost:3000`).

Note you may technically use any of the JSS and Next.js application modes, though more than likely, you'll use JSS connected to a Sitecore instance with either Next.js development or production mode. Next.js development mode with Fast Refresh is beneficial during active development.

You should now be able to use the Experience Editor in Sitecore to edit pages.

## Troubleshooting

When running Next.js in development mode, you may see a timeout upon the first page edit due to dynamic compilation. However, this should resolve itself on subsequent requests.

If you experience any other issues, please be sure to check the following:

- Verify the JSS Editing Secret matches on both server and client-side
- Check for any errors in the Next.js logs
- Check for any errors in the Sitecore logs