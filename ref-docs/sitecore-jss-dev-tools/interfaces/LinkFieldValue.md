[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / LinkFieldValue

# Interface: LinkFieldValue

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:303](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L303)

## Properties

### anchor?

> `optional` **anchor**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:317](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L317)

The anchor (ie #foo) the link points to
Used for internal links.

***

### class?

> `optional` **class**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:321](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L321)

The CSS class of the link tag

***

### href

> **href**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:308](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L308)

The href of the link. If this is a valid route, an internal link is created on import.
Otherwise, the value is used literally.

***

### querystring?

> `optional` **querystring**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:326](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L326)

The query string added to the link URL
Used for internal links.

***

### target?

> `optional` **target**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:330](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L330)

The target attribute of the link tag

***

### text?

> `optional` **text**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:312](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L312)

The text shown as the body of the link

***

### title?

> `optional` **title**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:334](https://github.com/Sitecore/jss/blob/2dc309bb1fbf301036698606d773ead69d7c1413/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L334)

The title attribute of the link tag
