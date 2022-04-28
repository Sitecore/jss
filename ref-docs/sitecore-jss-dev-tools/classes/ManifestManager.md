[@sitecore-jss/sitecore-jss-dev-tools](../README.md) / ManifestManager

# Class: ManifestManager

## Table of contents

### Constructors

- [constructor](ManifestManager.md#constructor)

### Properties

- [initialManifest](ManifestManager.md#initialmanifest)
- [manifestArgs](ManifestManager.md#manifestargs)
- [rootPath](ManifestManager.md#rootpath)
- [watcher](ManifestManager.md#watcher)
- [watcherSourcePaths](ManifestManager.md#watchersourcepaths)

### Methods

- [getManifest](ManifestManager.md#getmanifest)
- [getManifestPath](ManifestManager.md#getmanifestpath)
- [setManifestUpdatedCallback](ManifestManager.md#setmanifestupdatedcallback)

## Constructors

### constructor

• **new ManifestManager**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`ManifestManagerOptions`](../interfaces/ManifestManagerOptions.md) |

#### Defined in

[manifest/manifest-manager.ts:30](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L30)

## Properties

### initialManifest

• **initialManifest**: `boolean` = `true`

#### Defined in

[manifest/manifest-manager.ts:23](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L23)

___

### manifestArgs

• **manifestArgs**: `any`

#### Defined in

[manifest/manifest-manager.ts:28](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L28)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[manifest/manifest-manager.ts:24](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L24)

___

### watcher

• `Optional` **watcher**: `FSWatcher`

#### Defined in

[manifest/manifest-manager.ts:25](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L25)

___

### watcherSourcePaths

• **watcherSourcePaths**: `string`[]

#### Defined in

[manifest/manifest-manager.ts:26](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L26)

## Methods

### getManifest

▸ **getManifest**(`language`): `Promise`<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `language` | `string` |

#### Returns

`Promise`<[`ManifestInstance`](../interfaces/ManifestInstance.md)\>

#### Defined in

[manifest/manifest-manager.ts:113](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L113)

___

### getManifestPath

▸ **getManifestPath**(): `string`

#### Returns

`string`

#### Defined in

[manifest/manifest-manager.ts:109](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L109)

___

### setManifestUpdatedCallback

▸ **setManifestUpdatedCallback**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`newManifest`: [`ManifestInstance`](../interfaces/ManifestInstance.md)) => `void` |

#### Returns

`void`

#### Defined in

[manifest/manifest-manager.ts:81](https://github.com/Sitecore/jss/blob/4cefcb5a/packages/sitecore-jss-dev-tools/src/manifest/manifest-manager.ts#L81)
