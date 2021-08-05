[Sitecore JavaScript Rendering SDK](../README.md) / layout/models

# Module: layout/models

## Table of contents

### Enumerations

- [LayoutServicePageState](../enums/layout_models.LayoutServicePageState.md)

### Interfaces

- [ComponentFields](../interfaces/layout_models.ComponentFields.md)
- [ComponentParams](../interfaces/layout_models.ComponentParams.md)
- [ComponentRendering](../interfaces/layout_models.ComponentRendering.md)
- [Field](../interfaces/layout_models.Field.md)
- [HtmlElementRendering](../interfaces/layout_models.HtmlElementRendering.md)
- [Item](../interfaces/layout_models.Item.md)
- [LayoutServiceContext](../interfaces/layout_models.LayoutServiceContext.md)
- [LayoutServiceContextData](../interfaces/layout_models.LayoutServiceContextData.md)
- [LayoutServiceData](../interfaces/layout_models.LayoutServiceData.md)
- [PlaceholderData](../interfaces/layout_models.PlaceholderData.md)
- [RouteData](../interfaces/layout_models.RouteData.md)

### Type aliases

- [GenericFieldValue](layout_models.md#genericfieldvalue)
- [PlaceholdersData](layout_models.md#placeholdersdata)

## Type aliases

### GenericFieldValue

Ƭ **GenericFieldValue**: `string` \| `boolean` \| `number` \| { [key: string]: `unknown`;  } \| { [key: string]: `unknown`;  }[]

Field value data on a component

#### Defined in

[layout/models.ts:109](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/layout/models.ts#L109)

___

### PlaceholdersData

Ƭ **PlaceholdersData**<`TYPEDNAME`\>: { [P in TYPEDNAME]: (ComponentRendering \| HtmlElementRendering)[]}

Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
Note: HtmlElementRendering is used by Sitecore Experience Editor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TYPEDNAME` | extends `string``string` |

#### Defined in

[layout/models.ts:64](https://github.com/Sitecore/jss/blob/c1078945/packages/sitecore-jss/src/layout/models.ts#L64)
