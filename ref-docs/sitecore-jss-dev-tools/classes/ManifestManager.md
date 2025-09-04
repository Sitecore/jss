[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md)

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ManifestManager

# Class: ManifestManager

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:22](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L22)

## Constructors

### Constructor

> **new ManifestManager**(`__namedParameters`): `ManifestManager`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:30](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`ManifestManagerOptions`](../interfaces/ManifestManagerOptions.md) |

#### Returns

`ManifestManager`

## Properties

### initialManifest

> **initialManifest**: `boolean` = `true`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:23](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L23)

***

### manifestArgs

> **manifestArgs**: `any`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:28](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L28)

***

### rootPath

> **rootPath**: `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:24](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L24)

***

### watcher?

> `optional` **watcher**: `FSWatcher`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:25](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L25)

***

### watcherSourcePaths

> **watcherSourcePaths**: `string`[]

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:26](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L26)

## Methods

### getManifest()

> **getManifest**(`language`): `Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:113](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L113)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

***

### getManifestPath()

> **getManifestPath**(): `string`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:109](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L109)

#### Returns

`string`

***

### setManifestUpdatedCallback()

> **setManifestUpdatedCallback**(`callback`): `void`

Defined in: [sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:81](https://github.com/Sitecore/jss/blob/bdc8f76064287c910d10b001499db419045ec6ef/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L81)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`newManifest`) => `void` |

#### Returns

`void`
