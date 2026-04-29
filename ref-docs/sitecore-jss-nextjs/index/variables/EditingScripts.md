[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / EditingScripts

# Variable: EditingScripts()

> `const` **EditingScripts**: () => `JSX.Element`

Defined in: sitecore-jss-react/types/components/EditingScripts.d.ts:8

- Renders client scripts and data for editing/preview mode for Pages
- Renders script required for the Design Library (when RenderingType is `component`).
This script is only rendered when EditMode is Metadata or RenderingType is `component`, otherwise it renders nothing.

## Returns

`JSX.Element`

A JSX element containing the editing scripts or an empty fragment if not in editing/preview mode.
