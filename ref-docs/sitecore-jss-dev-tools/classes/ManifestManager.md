[**@sitecore-jss/sitecore-jss-dev-tools**](../README.md) • **Docs**

***

[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ManifestManager

# Class: ManifestManager

## Constructors

### new ManifestManager()

> **new ManifestManager**(`__namedParameters`): [`ManifestManager`](ManifestManager.md)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `__namedParameters` | [`ManifestManagerOptions`](../interfaces/ManifestManagerOptions.md) |

#### Returns

[`ManifestManager`](ManifestManager.md)

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:30](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L30)

## Properties

### initialManifest

> **initialManifest**: `boolean` = `true`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:23](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L23)

***

### manifestArgs

> **manifestArgs**: `any`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:28](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L28)

***

### rootPath

> **rootPath**: `string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:24](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L24)

***

### watcher?

> `optional` **watcher**: `FSWatcher`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:25](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L25)

***

### watcherSourcePaths

> **watcherSourcePaths**: `string`[]

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:26](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L26)

## Methods

### getManifest()

> **getManifest**(`language`): `Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `language` | `string` |

#### Returns

`Promise`\<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:113](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L113)

***

### getManifestPath()

> **getManifestPath**(): `string`

#### Returns

`string`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:109](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L109)

***

### setManifestUpdatedCallback()

> **setManifestUpdatedCallback**(`callback`): `void`

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | (`newManifest`) => `void` |

#### Returns

`void`

#### Defined in

[sitecore-jss-dev-tools/src/manifest/manifest-manager.ts:81](https://github.com/Sitecore/jss/blob/50bf04579b0cca04c7059f30ccf34e73b26a07bf/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L81)
