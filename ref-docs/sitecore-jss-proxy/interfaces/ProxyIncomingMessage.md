[@sitecore-jss/sitecore-jss-proxy](../README.md) / ProxyIncomingMessage

# Interface: ProxyIncomingMessage

Extends IncomingMessage as it should contain these properties but they are not provided in types

## Hierarchy

- `IncomingMessage`

  ↳ **`ProxyIncomingMessage`**

## Table of contents

### Properties

- [complete](ProxyIncomingMessage.md#complete)
- [connection](ProxyIncomingMessage.md#connection)
- [destroyed](ProxyIncomingMessage.md#destroyed)
- [headers](ProxyIncomingMessage.md#headers)
- [httpVersion](ProxyIncomingMessage.md#httpversion)
- [httpVersionMajor](ProxyIncomingMessage.md#httpversionmajor)
- [httpVersionMinor](ProxyIncomingMessage.md#httpversionminor)
- [method](ProxyIncomingMessage.md#method)
- [originalUrl](ProxyIncomingMessage.md#originalurl)
- [query](ProxyIncomingMessage.md#query)
- [rawHeaders](ProxyIncomingMessage.md#rawheaders)
- [rawTrailers](ProxyIncomingMessage.md#rawtrailers)
- [readable](ProxyIncomingMessage.md#readable)
- [readableHighWaterMark](ProxyIncomingMessage.md#readablehighwatermark)
- [readableLength](ProxyIncomingMessage.md#readablelength)
- [readableObjectMode](ProxyIncomingMessage.md#readableobjectmode)
- [socket](ProxyIncomingMessage.md#socket)
- [statusCode](ProxyIncomingMessage.md#statuscode)
- [statusMessage](ProxyIncomingMessage.md#statusmessage)
- [trailers](ProxyIncomingMessage.md#trailers)
- [url](ProxyIncomingMessage.md#url)

### Methods

- [[asyncIterator]](ProxyIncomingMessage.md#[asynciterator])
- [\_destroy](ProxyIncomingMessage.md#_destroy)
- [\_read](ProxyIncomingMessage.md#_read)
- [addListener](ProxyIncomingMessage.md#addlistener)
- [destroy](ProxyIncomingMessage.md#destroy)
- [emit](ProxyIncomingMessage.md#emit)
- [eventNames](ProxyIncomingMessage.md#eventnames)
- [getMaxListeners](ProxyIncomingMessage.md#getmaxlisteners)
- [isPaused](ProxyIncomingMessage.md#ispaused)
- [listenerCount](ProxyIncomingMessage.md#listenercount)
- [listeners](ProxyIncomingMessage.md#listeners)
- [off](ProxyIncomingMessage.md#off)
- [on](ProxyIncomingMessage.md#on)
- [once](ProxyIncomingMessage.md#once)
- [pause](ProxyIncomingMessage.md#pause)
- [pipe](ProxyIncomingMessage.md#pipe)
- [prependListener](ProxyIncomingMessage.md#prependlistener)
- [prependOnceListener](ProxyIncomingMessage.md#prependoncelistener)
- [push](ProxyIncomingMessage.md#push)
- [rawListeners](ProxyIncomingMessage.md#rawlisteners)
- [read](ProxyIncomingMessage.md#read)
- [removeAllListeners](ProxyIncomingMessage.md#removealllisteners)
- [removeListener](ProxyIncomingMessage.md#removelistener)
- [resume](ProxyIncomingMessage.md#resume)
- [setEncoding](ProxyIncomingMessage.md#setencoding)
- [setMaxListeners](ProxyIncomingMessage.md#setmaxlisteners)
- [setTimeout](ProxyIncomingMessage.md#settimeout)
- [unpipe](ProxyIncomingMessage.md#unpipe)
- [unshift](ProxyIncomingMessage.md#unshift)
- [wrap](ProxyIncomingMessage.md#wrap)

## Properties

### complete

• **complete**: `boolean`

#### Inherited from

IncomingMessage.complete

#### Defined in

node_modules/@types/node/http.d.ts:275

___

### connection

• **connection**: `Socket`

#### Inherited from

IncomingMessage.connection

#### Defined in

node_modules/@types/node/http.d.ts:276

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

IncomingMessage.destroyed

#### Defined in

node_modules/@types/node/stream.d.ts:30

___

### headers

• **headers**: `IncomingHttpHeaders`

#### Inherited from

IncomingMessage.headers

#### Defined in

node_modules/@types/node/http.d.ts:277

___

### httpVersion

• **httpVersion**: `string`

#### Inherited from

IncomingMessage.httpVersion

#### Defined in

node_modules/@types/node/http.d.ts:272

___

### httpVersionMajor

• **httpVersionMajor**: `number`

#### Inherited from

IncomingMessage.httpVersionMajor

#### Defined in

node_modules/@types/node/http.d.ts:273

___

### httpVersionMinor

• **httpVersionMinor**: `number`

#### Inherited from

IncomingMessage.httpVersionMinor

#### Defined in

node_modules/@types/node/http.d.ts:274

___

### method

• `Optional` **method**: `string`

Only valid for request obtained from http.Server.

#### Inherited from

IncomingMessage.method

#### Defined in

node_modules/@types/node/http.d.ts:285

___

### originalUrl

• **originalUrl**: `string`

#### Defined in

[src/index.ts:16](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-proxy/src/index.ts#L16)

___

### query

• **query**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`

#### Defined in

[src/index.ts:17](https://github.com/Sitecore/jss/blob/fe629f32/packages/sitecore-jss-proxy/src/index.ts#L17)

___

### rawHeaders

• **rawHeaders**: `string`[]

#### Inherited from

IncomingMessage.rawHeaders

#### Defined in

node_modules/@types/node/http.d.ts:278

___

### rawTrailers

• **rawTrailers**: `string`[]

#### Inherited from

IncomingMessage.rawTrailers

#### Defined in

node_modules/@types/node/http.d.ts:280

___

### readable

• **readable**: `boolean`

#### Inherited from

IncomingMessage.readable

#### Defined in

node_modules/@types/node/stream.d.ts:26

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Inherited from

IncomingMessage.readableHighWaterMark

#### Defined in

node_modules/@types/node/stream.d.ts:27

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Inherited from

IncomingMessage.readableLength

#### Defined in

node_modules/@types/node/stream.d.ts:28

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Inherited from

IncomingMessage.readableObjectMode

#### Defined in

node_modules/@types/node/stream.d.ts:29

___

### socket

• **socket**: `Socket`

#### Inherited from

IncomingMessage.socket

#### Defined in

node_modules/@types/node/http.d.ts:298

___

### statusCode

• `Optional` **statusCode**: `number`

Only valid for response obtained from http.ClientRequest.

#### Inherited from

IncomingMessage.statusCode

#### Defined in

node_modules/@types/node/http.d.ts:293

___

### statusMessage

• `Optional` **statusMessage**: `string`

Only valid for response obtained from http.ClientRequest.

#### Inherited from

IncomingMessage.statusMessage

#### Defined in

node_modules/@types/node/http.d.ts:297

___

### trailers

• **trailers**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `undefined`

#### Inherited from

IncomingMessage.trailers

#### Defined in

node_modules/@types/node/http.d.ts:279

___

### url

• `Optional` **url**: `string`

Only valid for request obtained from http.Server.

#### Inherited from

IncomingMessage.url

#### Defined in

node_modules/@types/node/http.d.ts:289

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterableIterator`<`any`\>

#### Returns

`AsyncIterableIterator`<`any`\>

#### Inherited from

IncomingMessage.\_\_@asyncIterator@21781

#### Defined in

node_modules/@types/node/stream.d.ts:103

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| `Error` |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

IncomingMessage.\_destroy

#### Defined in

node_modules/@types/node/stream.d.ts:42

___

### \_read

▸ **_read**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Inherited from

IncomingMessage.\_read

#### Defined in

node_modules/@types/node/stream.d.ts:32

___

### addListener

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. readable
5. error

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:54

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:55

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:56

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:57

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:58

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:59

___

### destroy

▸ **destroy**(`error?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |

#### Returns

`void`

#### Inherited from

IncomingMessage.destroy

#### Defined in

node_modules/@types/node/http.d.ts:299

___

### emit

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:61

▸ **emit**(`event`, `chunk`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `chunk` | `any` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:62

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:63

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:64

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | `Error` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:65

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/stream.d.ts:66

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

IncomingMessage.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:33

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

IncomingMessage.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:29

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

IncomingMessage.isPaused

#### Defined in

node_modules/@types/node/stream.d.ts:37

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

IncomingMessage.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:34

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

IncomingMessage.listeners

#### Defined in

node_modules/@types/node/events.d.ts:30

___

### off

▸ **off**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.off

#### Defined in

node_modules/@types/node/events.d.ts:26

___

### on

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:68

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:69

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:70

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:71

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:72

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/stream.d.ts:73

___

### once

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:75

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:76

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:77

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:78

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:79

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/stream.d.ts:80

___

### pause

▸ **pause**(): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.pause

#### Defined in

node_modules/@types/node/stream.d.ts:35

___

### pipe

▸ **pipe**<`T`\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `WritableStream`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

IncomingMessage.pipe

#### Defined in

node_modules/@types/node/stream.d.ts:5

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:82

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:83

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:84

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:85

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:86

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:87

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:89

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:90

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:91

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:92

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:93

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:94

___

### push

▸ **push**(`chunk`, `encoding?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | `string` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.push

#### Defined in

node_modules/@types/node/stream.d.ts:41

___

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

IncomingMessage.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:31

___

### read

▸ **read**(`size?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | `number` |

#### Returns

`any`

#### Inherited from

IncomingMessage.read

#### Defined in

node_modules/@types/node/stream.d.ts:33

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:27

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:96

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:97

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:98

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:99

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:100

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:101

___

### resume

▸ **resume**(): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.resume

#### Defined in

node_modules/@types/node/stream.d.ts:36

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | `string` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.setEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:34

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:28

___

### setTimeout

▸ **setTimeout**(`msecs`, `callback?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msecs` | `number` |
| `callback?` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.setTimeout

#### Defined in

node_modules/@types/node/http.d.ts:281

___

### unpipe

▸ **unpipe**(`destination?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | `WritableStream` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.unpipe

#### Defined in

node_modules/@types/node/stream.d.ts:38

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | `BufferEncoding` |

#### Returns

`void`

#### Inherited from

IncomingMessage.unshift

#### Defined in

node_modules/@types/node/stream.d.ts:39

___

### wrap

▸ **wrap**(`oldStream`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | `ReadableStream` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.wrap

#### Defined in

node_modules/@types/node/stream.d.ts:40
