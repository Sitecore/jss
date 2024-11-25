[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / getComponentList

# Function: getComponentList()

> **getComponentList**(`path`): [`ComponentFile`](../interfaces/ComponentFile.md)[]

Get list of components from

## Parameters

• **path**: `string`

path to search

## Returns

[`ComponentFile`](../interfaces/ComponentFile.md)[]

## Var

path
Returns a list of components in the following format:
{
 path: 'path/to/component',
 componentName: 'ComponentName',
 moduleName: 'ComponentName'
}

## Defined in

[sitecore-jss-dev-tools/src/templating/components.ts:33](https://github.com/Sitecore/jss/blob/afae5c8a8729af8f6d283032473cffb7fb5b43e6/packages/sitecore-jss-dev-tools/src/templating/components.ts#L33)
