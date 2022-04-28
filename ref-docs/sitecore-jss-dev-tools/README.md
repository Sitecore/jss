@sitecore-jss/sitecore-jss-dev-tools

# @sitecore-jss/sitecore-jss-dev-tools

## Table of contents

### Enumerations

- [CommonFieldTypes](enums/CommonFieldTypes.md)
- [FieldStorage](enums/FieldStorage.md)
- [SitecoreIcon](enums/SitecoreIcon.md)

### Classes

- [ManifestManager](classes/ManifestManager.md)

### Interfaces

- [ComponentDefinition](interfaces/ComponentDefinition.md)
- [ComponentInstanceDefinition](interfaces/ComponentInstanceDefinition.md)
- [ContentFieldValue](interfaces/ContentFieldValue.md)
- [CreateManifestInstanceArgs](interfaces/CreateManifestInstanceArgs.md)
- [DefaultDocumentMiddlewareOptions](interfaces/DefaultDocumentMiddlewareOptions.md)
- [DictionaryDefinition](interfaces/DictionaryDefinition.md)
- [DisconnectedAssetMiddlewareOptions](interfaces/DisconnectedAssetMiddlewareOptions.md)
- [DisconnectedDictionaryServiceOptions](interfaces/DisconnectedDictionaryServiceOptions.md)
- [DisconnectedLayoutServiceOptions](interfaces/DisconnectedLayoutServiceOptions.md)
- [DisconnectedServerOptions](interfaces/DisconnectedServerOptions.md)
- [ExecutablePipeline](interfaces/ExecutablePipeline.md)
- [FieldDefinition](interfaces/FieldDefinition.md)
- [GenerateContentItemArgs](interfaces/GenerateContentItemArgs.md)
- [GeneratePipelineArgs](interfaces/GeneratePipelineArgs.md)
- [GeneratePlaceholdersPipelineArgs](interfaces/GeneratePlaceholdersPipelineArgs.md)
- [GenerateRouteItemPipelineArgs](interfaces/GenerateRouteItemPipelineArgs.md)
- [ImageFieldValue](interfaces/ImageFieldValue.md)
- [ItemDefinition](interfaces/ItemDefinition.md)
- [ItemReference](interfaces/ItemReference.md)
- [JssConfiguration](interfaces/JssConfiguration.md)
- [LinkFieldValue](interfaces/LinkFieldValue.md)
- [Manifest](interfaces/Manifest.md)
- [ManifestInstance](interfaces/ManifestInstance.md)
- [ManifestManagerOptions](interfaces/ManifestManagerOptions.md)
- [MergeFsResult](interfaces/MergeFsResult.md)
- [PackageDeployOptions](interfaces/PackageDeployOptions.md)
- [Pipeline](interfaces/Pipeline.md)
- [PipelineRegistry](interfaces/PipelineRegistry.md)
- [PlaceholderDefinition](interfaces/PlaceholderDefinition.md)
- [Processor](interfaces/Processor.md)
- [RouteDefinition](interfaces/RouteDefinition.md)
- [ScJssConfig](interfaces/ScJssConfig.md)
- [TemplateDefinition](interfaces/TemplateDefinition.md)

### Type aliases

- [CustomizeContextFunction](README.md#customizecontextfunction)
- [CustomizeRenderFunction](README.md#customizerenderfunction)
- [CustomizeRouteFunction](README.md#customizeroutefunction)
- [RenderingParameterDefinition](README.md#renderingparameterdefinition)

### Variables

- [pipelineFactory](README.md#pipelinefactory)
- [processorFactory](README.md#processorfactory)
- [userConfigPath](README.md#userconfigpath)

### Functions

- [addComponent](README.md#addcomponent)
- [addContent](README.md#addcontent)
- [addDictionary](README.md#adddictionary)
- [addPlaceholder](README.md#addplaceholder)
- [addRoute](README.md#addroute)
- [addRouteType](README.md#addroutetype)
- [addTemplate](README.md#addtemplate)
- [clean](README.md#clean)
- [configLoader](README.md#configloader)
- [createDefaultDisconnectedServer](README.md#createdefaultdisconnectedserver)
- [createDefaultDocumentMiddleware](README.md#createdefaultdocumentmiddleware)
- [createDisconnectedAssetMiddleware](README.md#createdisconnectedassetmiddleware)
- [createDisconnectedDictionaryService](README.md#createdisconnecteddictionaryservice)
- [createDisconnectedLayoutService](README.md#createdisconnectedlayoutservice)
- [createPackage](README.md#createpackage)
- [deploy](README.md#deploy)
- [generateToFile](README.md#generatetofile)
- [generateToVariable](README.md#generatetovariable)
- [isItemDefinition](README.md#isitemdefinition)
- [mergeFs](README.md#mergefs)
- [packageDeploy](README.md#packagedeploy)
- [packageGenerate](README.md#packagegenerate)
- [replaceConfigTokens](README.md#replaceconfigtokens)
- [resolveScJssConfig](README.md#resolvescjssconfig)
- [runPipeline](README.md#runpipeline)
- [runPipelineWithCompilers](README.md#runpipelinewithcompilers)
- [setup](README.md#setup)
- [strip](README.md#strip)
- [verifySetup](README.md#verifysetup)

## Type aliases

### CustomizeContextFunction

Ƭ **CustomizeContextFunction**: (`context`: `any`, `route`: `any`, `currentManifest`: [`ManifestInstance`](interfaces/ManifestInstance.md), `request`: `any`, `response`: `any`) => `any`

#### Type declaration

▸ (`context`, `route`, `currentManifest`, `request`, `response`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |
| `route` | `any` |
| `currentManifest` | [`ManifestInstance`](interfaces/ManifestInstance.md) |
| `request` | `any` |
| `response` | `any` |

##### Returns

`any`

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:13](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L13)

___

### CustomizeRenderFunction

Ƭ **CustomizeRenderFunction**: (`transformedRendering`: `any`, `rawRendering`: `any`, `currentManifest`: [`ManifestInstance`](interfaces/ManifestInstance.md), `request?`: `any`, `response?`: `any`) => `any`

#### Type declaration

▸ (`transformedRendering`, `rawRendering`, `currentManifest`, `request?`, `response?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `transformedRendering` | `any` |
| `rawRendering` | `any` |
| `currentManifest` | [`ManifestInstance`](interfaces/ManifestInstance.md) |
| `request?` | `any` |
| `response?` | `any` |

##### Returns

`any`

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:5](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L5)

___

### CustomizeRouteFunction

Ƭ **CustomizeRouteFunction**: (`route`: `any`, `rawRoute`: `any`, `currentManifest`: [`ManifestInstance`](interfaces/ManifestInstance.md), `request?`: `any`, `response?`: `any`) => `any`

#### Type declaration

▸ (`route`, `rawRoute`, `currentManifest`, `request?`, `response?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `route` | `any` |
| `rawRoute` | `any` |
| `currentManifest` | [`ManifestInstance`](interfaces/ManifestInstance.md) |
| `request?` | `any` |
| `response?` | `any` |

##### Returns

`any`

#### Defined in

[disconnected-server/DisconnectedLayoutServiceOptions.ts:21](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/DisconnectedLayoutServiceOptions.ts#L21)

___

### RenderingParameterDefinition

Ƭ **RenderingParameterDefinition**: [`FieldDefinition`](interfaces/FieldDefinition.md)

Defines a non-content parameter that can be set on a component.
Parameters are more developer-focused options than fields, such as configurable CSS classes.

#### Defined in

[manifest/generator/manifest.types.ts:159](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L159)

## Variables

### pipelineFactory

• **pipelineFactory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `create` | (`name`: `string`) => [`Pipeline`](interfaces/Pipeline.md) |

#### Defined in

[pipelines/pipelineFactory.ts:74](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L74)

___

### processorFactory

• **processorFactory**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `create` | (`name`: `string`) => [`Processor`](interfaces/Processor.md) |

#### Defined in

[pipelines/pipelineFactory.ts:23](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipelineFactory.ts#L23)

___

### userConfigPath

• **userConfigPath**: `string`

#### Defined in

[setup/setup.ts:13](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/setup/setup.ts#L13)

## Functions

### addComponent

▸ **addComponent**(`manifest`, ...`components`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...components` | [`ComponentDefinition`](interfaces/ComponentDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:16](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L16)

___

### addContent

▸ **addContent**(`manifest`, ...`contents`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...contents` | [`ItemDefinition`](interfaces/ItemDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:64](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L64)

___

### addDictionary

▸ **addDictionary**(`manifest`, ...`entries`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...entries` | { `key`: `string` ; `value`: `string`  }[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:72](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L72)

___

### addPlaceholder

▸ **addPlaceholder**(`manifest`, ...`placeholders`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...placeholders` | [`PlaceholderDefinition`](interfaces/PlaceholderDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:35](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L35)

___

### addRoute

▸ **addRoute**(`manifest`, ...`routes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...routes` | [`RouteDefinition`](interfaces/RouteDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:56](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L56)

___

### addRouteType

▸ **addRouteType**(`manifest`, ...`routeTypes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...routeTypes` | [`TemplateDefinition`](interfaces/TemplateDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:45](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L45)

___

### addTemplate

▸ **addTemplate**(`manifest`, ...`templates`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `manifest` | [`Manifest`](interfaces/Manifest.md) |
| `...templates` | [`TemplateDefinition`](interfaces/TemplateDefinition.md)[] |

#### Returns

`void`

#### Defined in

[manifest/generator/manifest.babel-shim.ts:27](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.babel-shim.ts#L27)

___

### clean

▸ **clean**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `CleanOptions` |

#### Returns

`void`

#### Defined in

[clean.ts:12](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/clean.ts#L12)

___

### configLoader

▸ `Const` **configLoader**(`__namedParameters`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.allowEmptyGlobs?` | `boolean` |
| `__namedParameters.existingConfig?` | `any` |
| `__namedParameters.fileGlobs` | `string`[] |
| `__namedParameters.workingDirectory?` | `string` |
| `__namedParameters.createPipelinesRegistryImplementation?` | (`existingConfig`: `any`) => `any` |
| `__namedParameters.importModulesImplementation?` | (`options`: { `allowEmptyGlobs`: `boolean` ; `fileGlobs`: `string`[] ; `workingDirectory`: `string`  }) => `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[pipelines/configLoader.ts:51](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/configLoader.ts#L51)

___

### createDefaultDisconnectedServer

▸ **createDefaultDisconnectedServer**(`options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DisconnectedServerOptions`](interfaces/DisconnectedServerOptions.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[disconnected-server/create-default-disconnected-server.ts:99](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/create-default-disconnected-server.ts#L99)

___

### createDefaultDocumentMiddleware

▸ **createDefaultDocumentMiddleware**(`config`): (`req`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `res`: `Response`<`any`, `Record`<`string`, `any`\>\>, `next`: `NextFunction`) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`DefaultDocumentMiddlewareOptions`](interfaces/DefaultDocumentMiddlewareOptions.md) |

#### Returns

`fn`

▸ (`req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[disconnected-server/default-document.ts:14](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/default-document.ts#L14)

___

### createDisconnectedAssetMiddleware

▸ **createDisconnectedAssetMiddleware**(`config`): (`request`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `response`: `Response`<`any`, `Record`<`string`, `any`\>\>) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`DisconnectedAssetMiddlewareOptions`](interfaces/DisconnectedAssetMiddlewareOptions.md) |

#### Returns

`fn`

▸ (`request`, `response`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `response` | `Response`<`any`, `Record`<`string`, `any`\>\> |

##### Returns

`void`

#### Defined in

[disconnected-server/media-service.ts:17](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/media-service.ts#L17)

___

### createDisconnectedDictionaryService

▸ **createDisconnectedDictionaryService**(`__namedParameters`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`DisconnectedDictionaryServiceOptions`](interfaces/DisconnectedDictionaryServiceOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `middleware` | (`request`: `any`, `response`: `any`) => `Promise`<`void`\> |
| `updateManifest` | (`newManifest`: [`ManifestInstance`](interfaces/ManifestInstance.md)) => `void` |

#### Defined in

[disconnected-server/dictionary-service.ts:42](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/dictionary-service.ts#L42)

___

### createDisconnectedLayoutService

▸ **createDisconnectedLayoutService**(`config`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`DisconnectedLayoutServiceOptions`](interfaces/DisconnectedLayoutServiceOptions.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `middleware` | (`request`: `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\>, `response`: `Response`<`any`, `Record`<`string`, `any`\>\>) => `Promise`<`void`\> |
| `updateManifest` | (`newManifest`: [`ManifestInstance`](interfaces/ManifestInstance.md)) => `void` |

#### Defined in

[disconnected-server/layout-service.ts:362](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/disconnected-server/layout-service.ts#L362)

___

### createPackage

▸ `Const` **createPackage**(`contentsPath`, `outputPath`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contentsPath` | `string` |
| `outputPath` | `string` |
| `callback` | () => `void` |

#### Returns

`void`

#### Defined in

[update/index.ts:39](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/update/index.ts#L39)

___

### deploy

▸ **deploy**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `DeployOptions` |

#### Returns

`void`

#### Defined in

[deploy.ts:18](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/deploy.ts#L18)

___

### generateToFile

▸ **generateToFile**(`config`): `Promise`<[`ManifestInstance`](interfaces/ManifestInstance.md)\>

generates a JSON manifest and writes its contents to a directory. Media referenced in the manifest
is also copied to the directory.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `GenerateToFileOptions` |

#### Returns

`Promise`<[`ManifestInstance`](interfaces/ManifestInstance.md)\>

#### Defined in

[manifest/generator/generate.ts:217](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/generate.ts#L217)

___

### generateToVariable

▸ **generateToVariable**(`config`): `Promise`<[`ManifestInstance`](interfaces/ManifestInstance.md)\>

generates the JSON manifest and returns it as a variable
NOTE: media is not copied into the manifest when using this method,
and no files are written to disk. Use generateToFile() to make a manifest
that is designed to get packaged/imported.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `GenerateOptions` |

#### Returns

`Promise`<[`ManifestInstance`](interfaces/ManifestInstance.md)\>

#### Defined in

[manifest/generator/generate.ts:174](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/generate.ts#L174)

___

### isItemDefinition

▸ **isItemDefinition**(`obj`): obj is ItemDefinition

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`ItemDefinition`](interfaces/ItemDefinition.md) \| [`ItemReference`](interfaces/ItemReference.md) |

#### Returns

obj is ItemDefinition

#### Defined in

[manifest/generator/manifest.types.ts:369](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/manifest/generator/manifest.types.ts#L369)

___

### mergeFs

▸ `Const` **mergeFs**(`rootPath`, `parseFileContents?`): `Promise`<[`MergeFsResult`](interfaces/MergeFsResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootPath` | `string` |
| `parseFileContents?` | `CustomFileParser` |

#### Returns

`Promise`<[`MergeFsResult`](interfaces/MergeFsResult.md)\>

#### Defined in

[mergeFs.ts:125](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/mergeFs.ts#L125)

___

### packageDeploy

▸ **packageDeploy**(`options`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PackageDeployOptions`](interfaces/PackageDeployOptions.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[package-deploy.ts:270](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/package-deploy.ts#L270)

___

### packageGenerate

▸ **packageGenerate**(`options`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `PackageGenerateOptions` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[package-generate.ts:14](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/package-generate.ts#L14)

___

### replaceConfigTokens

▸ `Const` **replaceConfigTokens**(`val`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`string`

#### Defined in

[setup/jss-config.ts:4](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/setup/jss-config.ts#L4)

___

### resolveScJssConfig

▸ **resolveScJssConfig**(`config?`): `Promise`<[`ScJssConfig`](interfaces/ScJssConfig.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.assert` | `undefined` \| `boolean` |
| `config.configName` | `undefined` \| `string` |
| `config.configPath` | `undefined` \| `string` |

#### Returns

`Promise`<[`ScJssConfig`](interfaces/ScJssConfig.md)\>

#### Defined in

[resolve-scjssconfig.ts:20](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/resolve-scjssconfig.ts#L20)

___

### runPipeline

▸ `Const` **runPipeline**(`pipeline`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pipeline` | [`ExecutablePipeline`](interfaces/ExecutablePipeline.md) | the pipeline to run (optional but must be specified if processors is not specified) |

#### Returns

`Promise`<`any`\>

#### Defined in

[pipelines/pipeline.ts:90](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipeline.ts#L90)

___

### runPipelineWithCompilers

▸ `Const` **runPipelineWithCompilers**(`compilers`): (`pipeline`: `any`) => `Promise`<`any`\>

Run a pipeline, loading specified compilers first

#### Parameters

| Name | Type |
| :------ | :------ |
| `compilers` | `any` |

#### Returns

`fn`

pipeline result

▸ (`pipeline`): `Promise`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `pipeline` | `any` |

##### Returns

`Promise`<`any`\>

#### Defined in

[pipelines/pipeline.ts:118](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/pipelines/pipeline.ts#L118)

___

### setup

▸ **setup**(`interactive`, `outputFile?`, `initialData?`, `configName?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `interactive` | `boolean` | `undefined` |
| `outputFile?` | `string` | `undefined` |
| `initialData?` | [`JssConfiguration`](interfaces/JssConfiguration.md) | `undefined` |
| `configName` | `string` | `'sitecore'` |

#### Returns

`void`

#### Defined in

[setup/setup.ts:69](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/setup/setup.ts#L69)

___

### strip

▸ `Const` **strip**(`settings?`): `void`

Removes part of code which inside the special comments block.
Compiles each not excluded file starting from current directory (or `settings.sourcePath`).

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings` | `StripSettings` |

#### Returns

`void`

#### Defined in

[templating/strip.ts:87](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/templating/strip.ts#L87)

___

### verifySetup

▸ `Const` **verifySetup**(): `void`

#### Returns

`void`

#### Defined in

[setup/verify-setup.ts:6](https://github.com/Sitecore/jss/blob/695577da/packages/sitecore-jss-dev-tools/src/setup/verify-setup.ts#L6)
