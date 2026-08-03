[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / DateFieldProps

# Interface: DateFieldProps

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:5](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Date.tsx#L5)

## Extends

- `EditableFieldProps`

## Indexable

> \[`htmlAttributes`: `string`\]: `unknown`

The date field data.

## Properties

### editable?

> `optional` **editable?**: `boolean`

Defined in: [packages/sitecore-jss-react/src/components/sharedTypes.ts:30](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/sharedTypes.ts#L30)

Can be used to explicitly disable inline editing.
If true and `field.editable` has a value, then `field.editable` will be processed and rendered as component output. If false, `field.editable` value will be ignored and not rendered.

#### Default

```ts
true
```

#### Inherited from

`EditableFieldProps.editable`

***

### field

> **field**: `object`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:8](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Date.tsx#L8)

#### editable?

> `optional` **editable?**: `string`

#### value?

> `optional` **value?**: `string`

***

### render?

> `optional` **render?**: (`date`) => `ReactNode`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:17](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Date.tsx#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`ReactNode`

***

### tag?

> `optional` **tag?**: `string`

Defined in: [packages/sitecore-jss-react/src/components/Date.tsx:15](https://github.com/Sitecore/jss/blob/548a0b4c75ca6c8e4efd93e9a3ccf5685ae96ac6/packages/sitecore-jss-react/src/components/Date.tsx#L15)

The HTML element that will wrap the contents of the field.
