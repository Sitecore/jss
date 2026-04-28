[**@sitecore-jss/sitecore-jss-react**](../README.md)

***

[@sitecore-jss/sitecore-jss-react](../README.md) / useSitecoreContext

# Function: useSitecoreContext()

> **useSitecoreContext**(`options?`): [`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)

<<<<<<< HEAD
Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:71](https://github.com/Sitecore/jss/blob/43b3ff4d11bac85ec373d8926a5e5389166959a7/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L71)
=======
Defined in: [packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx:71](https://github.com/Sitecore/jss/blob/0c2f41e137a292e04b70d8e572725c5b055f64d5/packages/sitecore-jss-react/src/enhancers/withSitecoreContext.tsx#L71)
>>>>>>> be76f7acd81394289154e0dcda92acb4232a6028

This hook grants acсess to the current Sitecore page context
by default JSS includes the following properties in this context:
- pageEditing - Provided by Layout Service, a boolean indicating whether the route is being accessed via the Experience Editor.
- pageState - Like pageEditing, but a string: normal, preview or edit.
- site - Provided by Layout Service, an object containing the name of the current Sitecore site context.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`WithSitecoreContextOptions`](../interfaces/WithSitecoreContextOptions.md) | hook options |

## Returns

[`WithSitecoreContextProps`](../interfaces/WithSitecoreContextProps.md)

{ sitecoreContext, updateSitecoreContext }

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
