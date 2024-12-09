[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / LinkFieldValue

# Interface: LinkFieldValue

## Properties

### anchor?

> `optional` **anchor**: `string`

The anchor (ie #foo) the link points to
Used for internal links.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:317](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L317)

***

### class?

> `optional` **class**: `string`

The CSS class of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:321](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L321)

***

### href

> **href**: `string`

The href of the link. If this is a valid route, an internal link is created on import.
Otherwise, the value is used literally.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:308](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L308)

***

### querystring?

> `optional` **querystring**: `string`

The query string added to the link URL
Used for internal links.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:326](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L326)

***

### target?

> `optional` **target**: `string`

The target attribute of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:330](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L330)

***

### text?

> `optional` **text**: `string`

The text shown as the body of the link

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:312](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L312)

***

### title?

> `optional` **title**: `string`

The title attribute of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:334](https://github.com/Sitecore/jss/blob/5e7d04b70672d6680b558327616d47fb0250e0f1/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L334)
