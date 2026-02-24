[**@sitecore-jss/sitecore-jss**](../../README.md)

***

[@sitecore-jss/sitecore-jss](../../README.md) / [editing](../README.md) / getDesignLibraryStatusEvent

# Function: getDesignLibraryStatusEvent()

> **getDesignLibraryStatusEvent**(`status`, `uid`): [`DesignLibraryStatusEvent`](../interfaces/DesignLibraryStatusEvent.md)

Defined in: [packages/sitecore-jss/src/editing/design-library.ts:136](https://github.com/Sitecore/jss/blob/d8e3ff7eb92a65beab0a11f406aedbebd5d8298a/packages/sitecore-jss/src/editing/design-library.ts#L136)

Generates a DesignLibraryStatusEvent with the given status and uid.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | [`DesignLibraryStatus`](../enumerations/DesignLibraryStatus.md) | The status of rendering. |
| `uid` | `string` | The unique identifier for the event. |

## Returns

[`DesignLibraryStatusEvent`](../interfaces/DesignLibraryStatusEvent.md)

An object representing the DesignLibraryStatusEvent.
