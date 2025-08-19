[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / EditingScripts

# Function: EditingScripts()

> **EditingScripts**(): `Element`

Defined in: [packages/sitecore-jss-react/src/components/EditingScripts.tsx:13](https://github.com/Sitecore/jss/blob/2c8c4ecb6fb49c8493faefc7d78f09bcde91e0f8/packages/sitecore-jss-react/src/components/EditingScripts.tsx#L13)

- Renders client scripts and data for editing/preview mode for Pages
- Renders script required for the Design Library (when RenderingType is `component`).
This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.

## Returns

`Element`

A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
