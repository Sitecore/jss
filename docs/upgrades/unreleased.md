## Unreleased

* If you are importing any _editing_ utils from `@sitecore-jss/sitecore-jss/utils` in your code, please update the import path to `@sitecore-jss/sitecore-jss/editing`. For now these exports are still available in the old path and marked as deprecated. They will be removed in the next major version release. Specifically for the following utils:
  * ExperienceEditor
  * HorizonEditor
  * isEditorActive
  * resetEditorChromes
  * handleEditorAnchors
  * Metadata
  * DefaultEditFrameButton
  * DefaultEditFrameButtons
  * DefaultEditFrameButtonIds
  * EditFrameDataSource
  * ChromeCommand
  * FieldEditButton
  * WebEditButton
  * EditButtonTypes
  * mapButtonToCommand

# react

* With the simplification of Editing Support work we have added the following breaking changes to the `sitecore-jss-react` package. Please make the necessary updates.
  - `ComponentConsumerProps` is removed. You might need to reuse _WithSitecoreContextProps_ type.

### headless-ssr-experience-edge
* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:

        ```ts
            configText += `config.${prop} = process.env.REACT_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# angular

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` (use toString() to avoid type conflicts) and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:

        ```ts
            configText += `config.${prop} = process.env.${constantCase(prop)} || "${config[prop]?.toString().trim()}";\n`;
        ```


# vue

* Replace `scripts/generate-config.js` if you have not modified it. Otherwise:
    *  Add a `trim()` call to `config[prop]` and replace commas before a newline (`,`) with semicolon (`;`) in configText prop assignments so it would look like this:

        ```ts
            configText += `config.${prop} = process.env.VUE_APP_${constantCase(prop)} || "${
                config[prop]?.trim()
            }";\n`;
        ```

# nextjs

* Replace `scripts/generate-config.ts` if you have not modified it. Otherwise:
    * Add a `trim()` call to `config[prop]` and replace comma before a newline (`,`) with semicolon (`;`) in configText prop assignment so it would look like this:

        ```ts
            configText += `config.${prop} = process.env.${constantCase(prop)} || '${config[prop]?.trim()}';\n`;
        ```

* Remove cors header for API endpoints from _lib/next-config/plugins/cors-header_ plugin since cors is handled by API handlers / middlewares:

    ```ts
        {
            source: '/api/:path*',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: config.sitecoreApiHost.replace(/\/$/, ''),
                },
            ],
        },
    ```

* Update _pages/api/editing/render.ts_ API handler initialization signature, since _resolvePageUrl_ function now accepts an object and _serverUrl_ now is optional, it's ommited when Pages Metadata Edit Mode is used. Update the handler initialization as follows:

    ```ts
    const handler = new EditingRenderMiddleware({
        resolvePageUrl: ({ serverUrl, itemPath }) => `${serverUrl}${itemPath}`,
    }).getHandler();
    ```

# nextjs-xmcloud

* Render a new `EditingScripts` component in your `Scripts.ts` file to support a new Editing Integration feature.

    ```ts
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

    ```ts
        import { EditMode } from '@sitecore-jss/sitecore-jss-nextjs';

        const handler = new EditingConfigMiddleware({
        ...
        pagesEditMode: EditMode.Chromes,
        }).getHandler();
    ```

* Introduce a new _lib/graphql-editing-service.ts_ file to initialize a _graphQLEditingService_ to support a new Editing Metadata Mode. Can be done by adding this file from the latest version introduced in _nextjs-xmcloud_ base template.

* Update _lib/page-props-factory/plugins/preview-mode_ plugin to support a new Editing Metadata Mode. Can be done by replacing this file with the latest version introduced in _nextjs-xmcloud_ base template.

* To support editing for fields in Pages, the new editing metadata architecture relies on the new metadata property 'field.metadata' (instead of on 'field.editable', which won't be used in this scenario). If you are using the new editing arhitecture in Pages (EditMode.Metadata) and have custom field component that manipulates or relies on 'field.editable' in some way, it may need to be reworked. Experience Editor still relies on 'field.editable', so it needs to be supported. See example below from SXA's Banner component:

    ```ts
        import { useSitecoreContext, EditMode } from '@sitecore-jss/sitecore-jss-nextjs';
        ...
        export const Banner = (props: ImageProps): JSX.Element => {
            const { sitecoreContext } = useSitecoreContext();
            const isMetadataMode = sitecoreContext?.editMode === EditMode.Metadata;
            ...
            const modifyImageProps = !isMetadataMode
            ? {
                ...props.fields.Image,
                editable: props?.fields?.Image?.editable
                ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="100%"')
                .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="100%"'),
            }
            : { ...props.fields.Image };
            ...
        }
        ...
    ```