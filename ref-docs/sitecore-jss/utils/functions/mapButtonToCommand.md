[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [utils](../README.md) / mapButtonToCommand

# Function: mapButtonToCommand()

> **mapButtonToCommand**(`button`, `itemId?`, `frameParameters?`): [`ChromeCommand`](../type-aliases/ChromeCommand.md)

Defined in: [packages/sitecore-jss/src/editing/edit-frame.ts:81](https://github.com/Sitecore/jss/blob/217ee09e2bb877a0daa2bea2caf7b49d38f600a5/packages/sitecore-jss/src/editing/edit-frame.ts#L81)

Map the edit button types to chrome data

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `button` | [`EditButtonTypes`](../type-aliases/EditButtonTypes.md) | the edit button to build a ChromeCommand for |
| `itemId?` | `string` | the ID of the item the EditFrame is associated with |
| `frameParameters?` | `Record`\<`string`, `string` \| `number` \| `boolean` \| `null` \| `undefined`\> | additional parameters passed to the EditFrame |

## Returns

[`ChromeCommand`](../type-aliases/ChromeCommand.md)
