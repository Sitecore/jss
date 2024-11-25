[**@sitecore-jss/sitecore-jss-react**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-react](../README.md) / useSitecoreContext

# Function: useSitecoreContext()

> **useSitecoreContext**(`options`?): `object`

This hook grants acсess to the current Sitecore page context
by default JSS includes the following properties in this context:
- pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
- pageState - Like pageEditing, but a string: normal, preview or edit.
- site - Provided by Layout Service, an object containing the name of the current Sitecore site context.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options`? | [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md) | hook options |

## Returns

`object`

{ sitecoreContext, updateSitecoreContext }

### sitecoreContext

> **sitecoreContext**: [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md) = `reactContext.context`

### updateSitecoreContext()

> **updateSitecoreContext**: (`value`) => `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`LayoutServiceData`](../interfaces/LayoutServiceData.md) \| [`SitecoreContextValue`](../type-aliases/SitecoreContextValue.md) |

#### Returns

`void`

## See

https://jss.sitecore.com/docs/techniques/extending-layout-service/layoutservice-extending-context

## Examples

```ts
const EditMode = () => {
   const { sitecoreContext } = useSitecoreContext();
   return <span>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}
```

```ts
const EditMode = () => {
   const { sitecoreContext, updateSitecoreContext } = useSitecoreContext({ updatable: true });
   const onClick = () => updateSitecoreContext({ pageEditing: true });
   return <span onClick={onClick}>Edit Mode is {sitecoreContext.pageEditing ? 'active' : 'inactive'}</span>
}
```

## Defined in

[packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:65](https://github.com/Sitecore/jss/blob/e507e97cfa27e316b3c99ba5c513dce49973a5f1/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L65)
