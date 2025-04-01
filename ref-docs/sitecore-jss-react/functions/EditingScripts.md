[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / EditingScripts

# Function: EditingScripts()

> **EditingScripts**(`props`): `Element`

- Renders client scripts and data for editing/preview mode for Pages
- Renders script required for the Design Library (when RenderingType is `component`).
This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | `EditingScriptsProps` | The props for the EditingScripts component. |

## Returns

`Element`

A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.

## Defined in

[packages/sitecore-jss-react/src/components/EditingScripts.tsx:25](https://github.com/Sitecore/jss/blob/9ab3ece4faaed005b0df56fed7a6f9f87cf75ebc/packages/sitecore-jss-react/src/components/EditingScripts.tsx#L25)
