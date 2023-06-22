[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Manifest

# Interface: Manifest

Represents a set of disconnected data to run a JSS app from, or import to Sitecore

## Table of contents

### Properties

- [addComponent](Manifest.md#addcomponent)
- [addContent](Manifest.md#addcontent)
- [addDictionary](Manifest.md#adddictionary)
- [addPlaceholder](Manifest.md#addplaceholder)
- [addRoute](Manifest.md#addroute)
- [addRouteType](Manifest.md#addroutetype)
- [addTemplate](Manifest.md#addtemplate)
- [getManifest](Manifest.md#getmanifest)
- [language](Manifest.md#language)
- [setDefaultRouteType](Manifest.md#setdefaultroutetype)

## Properties

### addComponent

• **addComponent**: (...`components`: [`ComponentDefinition`](ComponentDefinition.md)[]) => `void`

#### Type declaration

▸ (`...components`): `void`

Adds a component to the manifest. Components are modules that can be
added to a route dynamically based on layout settings.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...components` | [`ComponentDefinition`](ComponentDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:12](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L12)

___

### addContent

• **addContent**: (...`contents`: [`ItemDefinition`](ItemDefinition.md)[]) => `void`

#### Type declaration

▸ (`...contents`): `void`

Adds a content item to the manifest. Content items are items with non-route and non-component data,
for example global elements or content list target items.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...contents` | [`ItemDefinition`](ItemDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:47](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L47)

___

### addDictionary

• **addDictionary**: (...`entries`: { `key`: `string` ; `value`: `string`  }[]) => `void`

#### Type declaration

▸ (`...entries`): `void`

Adds a translation dictionary entry to the manifest.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...entries` | { `key`: `string` ; `value`: `string`  }[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:51](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L51)

___

### addPlaceholder

• **addPlaceholder**: (...`placeholders`: [`PlaceholderDefinition`](PlaceholderDefinition.md)[]) => `void`

#### Type declaration

▸ (`...placeholders`): `void`

Adds a placeholder definition to the manifest.
Explicit placeholder definition is not necessary as it is inferred
from route data usage, however it allows the specification of
additional metadata (i.e. display names), and is recommended.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...placeholders` | [`PlaceholderDefinition`](PlaceholderDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:26](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L26)

___

### addRoute

• **addRoute**: (...`routes`: [`RouteDefinition`](RouteDefinition.md)[]) => `void`

#### Type declaration

▸ (`...routes`): `void`

Adds a route definition to the manifest. A route contains a set of components, and possibly child routes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...routes` | [`RouteDefinition`](RouteDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:42](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L42)

___

### addRouteType

• **addRouteType**: (...`routeTypes`: [`TemplateDefinition`](TemplateDefinition.md)[]) => `void`

#### Type declaration

▸ (`...routeTypes`): `void`

Adds a route type (a template containing a route-level fields definition).
Route types are useful for data that is always present on a route - for example
an article route type might contain a headline, category, and author. Favor
component-level fields when possible, as they are personalizable. However
route level fields are much more easily queryable and filterable for listings.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...routeTypes` | [`TemplateDefinition`](TemplateDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:34](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L34)

___

### addTemplate

• **addTemplate**: (...`templates`: [`TemplateDefinition`](TemplateDefinition.md)[]) => `void`

#### Type declaration

▸ (`...templates`): `void`

Adds a template (a content data type) to the manifest. Templates
define a schema of data fields. Explicitly adding templates is generally
reserved for defining base templates to inherit from. In most cases,
addComponent() or addRouteType() should be used instead.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...templates` | [`TemplateDefinition`](TemplateDefinition.md)[] |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:19](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L19)

___

### getManifest

• **getManifest**: () => `Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Type declaration

▸ (): `Promise`<[`ManifestInstance`](ManifestInstance.md)\>

Processes all the existing manifest input data and transforms it to a manifest JSON format

##### Returns

`Promise`<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[manifest/generator/manifest.types.ts:7](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L7)

___

### language

• **language**: `string`

#### Defined in

[manifest/generator/manifest.types.ts:52](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L52)

___

### setDefaultRouteType

• **setDefaultRouteType**: (`defaultRouteType`: [`TemplateDefinition`](TemplateDefinition.md)) => `void`

#### Type declaration

▸ (`defaultRouteType`): `void`

Sets default route type (a template containing a route-level fields definition).

##### Parameters

| Name | Type |
| :------ | :------ |
| `defaultRouteType` | [`TemplateDefinition`](TemplateDefinition.md) |

##### Returns

`void`

#### Defined in

[manifest/generator/manifest.types.ts:38](https://github.com/Sitecore/jss/blob/fc2e9b60c/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L38)
