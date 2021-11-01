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
| `__namedParameters` | `ManifestManagerOptions` |

#### Defined in

[manifest-manager.ts:29](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L29)

## Properties

### initialManifest

• **initialManifest**: `boolean` = `true`

#### Defined in

[manifest-manager.ts:22](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L22)

___

### manifestArgs

• **manifestArgs**: `any`

#### Defined in

[manifest-manager.ts:27](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L27)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[manifest-manager.ts:23](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L23)

___

### watcher

• `Optional` **watcher**: `FSWatcher`

#### Defined in

[manifest-manager.ts:24](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L24)

___

### watcherSourcePaths

• **watcherSourcePaths**: `string`[]

#### Defined in

[manifest-manager.ts:25](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L25)

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

[manifest-manager.ts:112](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L112)

___

### getManifestPath

▸ **getManifestPath**(): `string`

#### Returns

`string`

#### Defined in

[manifest-manager.ts:108](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L108)

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

[manifest-manager.ts:80](https://github.com/Sitecore/jss/blob/08de6c61/packages/sitecore-jss-dev-tools/src/manifest-manager.ts#L80)
