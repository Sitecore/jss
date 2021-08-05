[Sitecore JavaScript Rendering SDK for Next.js](../README.md) / [Exports](../modules.md) / services/component-props-service

# Module: services/component-props-service

## Table of contents

### Classes

- [ComponentPropsService](../classes/services_component_props_service.ComponentPropsService.md)

### Type aliases

- [ComponentPropsRequest](services_component_props_service.md#componentpropsrequest)
- [FetchComponentPropsArguments](services_component_props_service.md#fetchcomponentpropsarguments)

## Type aliases

### ComponentPropsRequest

Ƭ **ComponentPropsRequest**<`NextContext`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `context` | `NextContext` |
| `fetch` | [`ComponentPropsFetchFunction`](sharedTypes_component_props.md#componentpropsfetchfunction)<`NextContext`\> |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |
| `rendering` | [`ComponentRendering`](../interfaces/index.ComponentRendering.md) |

#### Defined in

[src/services/component-props-service.ts:20](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L20)

___

### FetchComponentPropsArguments

Ƭ **FetchComponentPropsArguments**<`NextContext`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `NextContext` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `componentModule` | [`ComponentModule`](sharedTypes_component_module.md#componentmodule) |
| `context` | `NextContext` |
| `layoutData` | [`LayoutServiceData`](../interfaces/index.LayoutServiceData.md) |

#### Defined in

[src/services/component-props-service.ts:14](https://github.com/Sitecore/jss/blob/bd756fd2/packages/sitecore-jss-nextjs/src/services/component-props-service.ts#L14)
