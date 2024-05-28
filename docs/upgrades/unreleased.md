## Unreleased

# react

* With the simplification of Editing Support work we have added the following breaking changes to the `sitecore-jss-react` package. Please make the necessary updates.
  - `ComponentConsumerProps` is removed. You might need to reuse _WithSitecoreContextProps_ type.

### headless-ssr-experience-edge
* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.REACT_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# angular

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` (use toString() to avoid type conflicts) and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || "${config[prop]?.toString().trim()}";\n`;
        ```


# vue

* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    *  Add a `trim()` call to `config[prop]` and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# nextjs

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:
        
        ```
            configText += `config.${prop} = process.env.${constantCase(prop)} || '${config[prop]?.trim()}';\n`;
        ```

# nextjs-xmcloud

* Render a new `EditingScripts` component in your `Scripts.ts` file to support a new Editing Integration feature.
    ```
    import { EditingScripts } from '@sitecore-jss/sitecore-jss-nextjs';
    ...
    const Scripts = (): JSX.Element | null => (
        <>
        <EditingScripts />
        ...
        </>
    );
    ```

* We have introduced a new configuration option, `pagesEditMode`, in the `\src\pages\api\editing\config.ts` file to support the new editing metadata architecture for Pages (XMCloud). This option allows you to specify the editing mode used by Pages. It is set to `metadata` by default. However, if you are not ready to use a new integration and continue using the existing architecture, you can explicitly set the `pagesEditMode` to `chromes`.

    ```
        import { EditMode } from '@sitecore-jss/sitecore-jss-nextjs';

        const handler = new EditingConfigMiddleware({
        ...
        pagesEditMode: EditMode.Chromes,
        }).getHandler();
    ```
