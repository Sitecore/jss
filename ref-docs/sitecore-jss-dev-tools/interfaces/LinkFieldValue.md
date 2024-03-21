[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / LinkFieldValue

# Interface: LinkFieldValue

## Table of contents

### Properties

- [anchor](LinkFieldValue.md#anchor)
- [class](LinkFieldValue.md#class)
- [href](LinkFieldValue.md#href)
- [querystring](LinkFieldValue.md#querystring)
- [target](LinkFieldValue.md#target)
- [text](LinkFieldValue.md#text)
- [title](LinkFieldValue.md#title)

## Properties

### anchor

• `Optional` **anchor**: `string`

The anchor (ie #foo) the link points to
Used for internal links.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:317](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L317)

---

### class

• `Optional` **class**: `string`

The CSS class of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:321](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L321)

---

### href

• **href**: `string`

The href of the link. If this is a valid route, an internal link is created on import.
Otherwise, the value is used literally.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:308](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L308)

---

### querystring

• `Optional` **querystring**: `string`

The query string added to the link URL
Used for internal links.

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:326](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L326)

---

### target

• `Optional` **target**: `string`

The target attribute of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:330](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L330)

---

### text

• `Optional` **text**: `string`

The text shown as the body of the link

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:312](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L312)

---

### title

• `Optional` **title**: `string`

The title attribute of the link tag

#### Defined in

[sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts:334](https://github.com/Sitecore/jss/blob/1e6cbdd9f/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L334)
