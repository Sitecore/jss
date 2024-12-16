[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / Manifest

# Interface: Manifest

Represents a set of disconnected data to run a JSS app from, or import to Sitecore

## Properties

### addComponent()

> **addComponent**: (...`components`) => `void`

Adds a component to the manifest. Components are modules that can be
added to a route dynamically based on layout settings.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`components` | [`ComponentDefinition`](ComponentDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:12](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L12)

***

### addContent()

> **addContent**: (...`contents`) => `void`

Adds a content item to the manifest. Content items are items with non-route and non-component data,
for example global elements or content list target items.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`contents` | [`ItemDefinition`](ItemDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:47](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L47)

***

### addDictionary()

> **addDictionary**: (...`entries`) => `void`

Adds a translation dictionary entry to the manifest.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`entries` | `object`[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:51](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L51)

***

### addPlaceholder()

> **addPlaceholder**: (...`placeholders`) => `void`

Adds a placeholder definition to the manifest.
Explicit placeholder definition is not necessary as it is inferred
from route data usage, however it allows the specification of
additional metadata (i.e. display names), and is recommended.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`placeholders` | [`PlaceholderDefinition`](PlaceholderDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:26](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L26)

***

### addRoute()

> **addRoute**: (...`routes`) => `void`

Adds a route definition to the manifest. A route contains a set of components, and possibly child routes.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`routes` | [`RouteDefinition`](RouteDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:42](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L42)

***

### addRouteType()

> **addRouteType**: (...`routeTypes`) => `void`

Adds a route type (a template containing a route-level fields definition).
Route types are useful for data that is always present on a route - for example
an article route type might contain a headline, category, and author. Favor
component-level fields when possible, as they are personalizable. However
route level fields are much more easily queryable and filterable for listings.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`routeTypes` | [`TemplateDefinition`](TemplateDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:34](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L34)

***

### addTemplate()

> **addTemplate**: (...`templates`) => `void`

Adds a template (a content data type) to the manifest. Templates
define a schema of data fields. Explicitly adding templates is generally
reserved for defining base templates to inherit from. In most cases,
addComponent() or addRouteType() should be used instead.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`templates` | [`TemplateDefinition`](TemplateDefinition.md)[] |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:19](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L19)

***

### getManifest()

> **getManifest**: () => `Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

Processes all the existing manifest input data and transforms it to a manifest JSON format

#### Returns

`Promise`\<[`ManifestInstance`](ManifestInstance.md)\>

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:7](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L7)

***

### language

> **language**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:52](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L52)

***

### setDefaultRouteType()

> **setDefaultRouteType**: (`defaultRouteType`) => `void`

Sets default route type (a template containing a route-level fields definition).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `defaultRouteType` | [`TemplateDefinition`](TemplateDefinition.md) |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:38](https://github.com/Sitecore/jss/blob/20c393219fcc37eebfc5f9ac86576745ab661982/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L38)
