[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / EditingScripts

# Function: EditingScripts()

> **EditingScripts**(): `Element`

Defined in: [packages/sitecore-jss-react/src/components/EditingScripts.tsx:13](https://github.com/Sitecore/jss/blob/61befa467bc44e7bd59eff68223718fd84afc854/packages/sitecore-jss-react/src/components/EditingScripts.tsx#L13)

- Renders client scripts and data for editing/preview mode for Pages
- Renders script required for the Design Library (when RenderingType is `component`).
This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.

## Returns

`Element`

A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
