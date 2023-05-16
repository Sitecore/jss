[@sitecore-jss/sitecore-jss-proxy](../README.md) / ProxyIncomingMessage

# Interface: ProxyIncomingMessage

Extends IncomingMessage as it should contain these properties but they are not provided in types

## Hierarchy

- `IncomingMessage`

  ↳ **`ProxyIncomingMessage`**

## Table of contents

### Properties

- [aborted](ProxyIncomingMessage.md#aborted)
- [closed](ProxyIncomingMessage.md#closed)
- [complete](ProxyIncomingMessage.md#complete)
- [connection](ProxyIncomingMessage.md#connection)
- [destroyed](ProxyIncomingMessage.md#destroyed)
- [errored](ProxyIncomingMessage.md#errored)
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
- [readableAborted](ProxyIncomingMessage.md#readableaborted)
- [readableDidRead](ProxyIncomingMessage.md#readabledidread)
- [readableEncoding](ProxyIncomingMessage.md#readableencoding)
- [readableEnded](ProxyIncomingMessage.md#readableended)
- [readableFlowing](ProxyIncomingMessage.md#readableflowing)
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
- [\_construct](ProxyIncomingMessage.md#_construct)
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

### aborted

• **aborted**: `boolean`

The `message.aborted` property will be `true` if the request has
been aborted.

**`Since`**

v10.1.0

**`Deprecated`**

Since v17.0.0,v16.12.0 - Check `message.destroyed` from <a href="stream.html#class-streamreadable" class="type">stream.Readable</a>.

#### Inherited from

IncomingMessage.aborted

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1007

___

### closed

• `Readonly` **closed**: `boolean`

Is true after 'close' has been emitted.

**`Since`**

v8.0.0

#### Inherited from

IncomingMessage.closed

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:134

___

### complete

• **complete**: `boolean`

The `message.complete` property will be `true` if a complete HTTP message has
been received and successfully parsed.

This property is particularly useful as a means of determining if a client or
server fully transmitted a message before a connection was terminated:

```js
const req = http.request({
  host: '127.0.0.1',
  port: 8080,
  method: 'POST'
}, (res) => {
  res.resume();
  res.on('end', () => {
    if (!res.complete)
      console.error(
        'The connection was terminated while the message was still being sent');
  });
});
```

**`Since`**

v0.3.0

#### Inherited from

IncomingMessage.complete

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1042

___

### connection

• **connection**: `Socket`

Alias for `message.socket`.

**`Since`**

v0.1.90

**`Deprecated`**

Since v16.0.0 - Use `socket`.

#### Inherited from

IncomingMessage.connection

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1048

___

### destroyed

• **destroyed**: `boolean`

Is `true` after `readable.destroy()` has been called.

**`Since`**

v18.0.0

#### Inherited from

IncomingMessage.destroyed

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:129

___

### errored

• `Readonly` **errored**: ``null`` \| `Error`

Returns error if the stream has been destroyed with an error.

**`Since`**

v18.0.0

#### Inherited from

IncomingMessage.errored

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:139

___

### headers

• **headers**: `IncomingHttpHeaders`

The request/response headers object.

Key-value pairs of header names and values. Header names are lower-cased.

```js
// Prints something like:
//
// { 'user-agent': 'curl/7.22.0',
//   host: '127.0.0.1:8000',
//   accept: '*' }
console.log(request.getHeaders());
```

Duplicates in raw headers are handled in the following ways, depending on the
header name:

* Duplicates of `age`, `authorization`, `content-length`, `content-type`,`etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`,`last-modified`, `location`,
`max-forwards`, `proxy-authorization`, `referer`,`retry-after`, `server`, or `user-agent` are discarded.
* `set-cookie` is always an array. Duplicates are added to the array.
* For duplicate `cookie` headers, the values are joined together with '; '.
* For all other headers, the values are joined together with ', '.

**`Since`**

v0.1.5

#### Inherited from

IncomingMessage.headers

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1085

___

### httpVersion

• **httpVersion**: `string`

In case of server request, the HTTP version sent by the client. In the case of
client response, the HTTP version of the connected-to server.
Probably either `'1.1'` or `'1.0'`.

Also `message.httpVersionMajor` is the first integer and`message.httpVersionMinor` is the second.

**`Since`**

v0.1.1

#### Inherited from

IncomingMessage.httpVersion

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1016

___

### httpVersionMajor

• **httpVersionMajor**: `number`

#### Inherited from

IncomingMessage.httpVersionMajor

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1017

___

### httpVersionMinor

• **httpVersionMinor**: `number`

#### Inherited from

IncomingMessage.httpVersionMinor

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1018

___

### method

• `Optional` **method**: `string`

**Only valid for request obtained from Server.**

The request method as a string. Read only. Examples: `'GET'`, `'DELETE'`.

**`Since`**

v0.1.1

#### Inherited from

IncomingMessage.method

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1133

___

### originalUrl

• **originalUrl**: `string`

#### Defined in

[src/index.ts:18](https://github.com/Sitecore/jss/blob/64c81a0b8/packages/sitecore-jss-proxy/src/index.ts#L18)

___

### query

• **query**: `Object`

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `boolean`

#### Defined in

[src/index.ts:19](https://github.com/Sitecore/jss/blob/64c81a0b8/packages/sitecore-jss-proxy/src/index.ts#L19)

___

### rawHeaders

• **rawHeaders**: `string`[]

The raw request/response headers list exactly as they were received.

The keys and values are in the same list. It is _not_ a
list of tuples. So, the even-numbered offsets are key values, and the
odd-numbered offsets are the associated values.

Header names are not lowercased, and duplicates are not merged.

```js
// Prints something like:
//
// [ 'user-agent',
//   'this is invalid because there can be only one',
//   'User-Agent',
//   'curl/7.22.0',
//   'Host',
//   '127.0.0.1:8000',
//   'ACCEPT',
//   '*' ]
console.log(request.rawHeaders);
```

**`Since`**

v0.11.6

#### Inherited from

IncomingMessage.rawHeaders

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1110

___

### rawTrailers

• **rawTrailers**: `string`[]

The raw request/response trailer keys and values exactly as they were
received. Only populated at the `'end'` event.

**`Since`**

v0.11.6

#### Inherited from

IncomingMessage.rawTrailers

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1121

___

### readable

• **readable**: `boolean`

Is `true` if it is safe to call `readable.read()`, which means
the stream has not been destroyed or emitted `'error'` or `'end'`.

**`Since`**

v11.4.0

#### Inherited from

IncomingMessage.readable

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:85

___

### readableAborted

• `Readonly` **readableAborted**: `boolean`

Returns whether the stream was destroyed or errored before emitting `'end'`.

**`Since`**

v16.8.0

#### Inherited from

IncomingMessage.readableAborted

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:79

___

### readableDidRead

• `Readonly` **readableDidRead**: `boolean`

Returns whether `'data'` has been emitted.

**`Since`**

v16.7.0, v14.18.0

#### Inherited from

IncomingMessage.readableDidRead

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:91

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| `BufferEncoding`

Getter for the property `encoding` of a given `Readable` stream. The `encoding`property can be set using the `readable.setEncoding()` method.

**`Since`**

v12.7.0

#### Inherited from

IncomingMessage.readableEncoding

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:96

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

Becomes `true` when `'end'` event is emitted.

**`Since`**

v12.9.0

#### Inherited from

IncomingMessage.readableEnded

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:101

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| `boolean`

This property reflects the current state of a `Readable` stream as described
in the `Three states` section.

**`Since`**

v9.4.0

#### Inherited from

IncomingMessage.readableFlowing

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:107

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

Returns the value of `highWaterMark` passed when creating this `Readable`.

**`Since`**

v9.3.0

#### Inherited from

IncomingMessage.readableHighWaterMark

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:112

___

### readableLength

• `Readonly` **readableLength**: `number`

This property contains the number of bytes (or objects) in the queue
ready to be read. The value provides introspection data regarding
the status of the `highWaterMark`.

**`Since`**

v9.4.0

#### Inherited from

IncomingMessage.readableLength

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:119

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

Getter for the property `objectMode` of a given `Readable` stream.

**`Since`**

v12.3.0

#### Inherited from

IncomingMessage.readableObjectMode

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:124

___

### socket

• **socket**: `Socket`

The `net.Socket` object associated with the connection.

With HTTPS support, use `request.socket.getPeerCertificate()` to obtain the
client's authentication details.

This property is guaranteed to be an instance of the `net.Socket` class,
a subclass of `stream.Duplex`, unless the user specified a socket
type other than `net.Socket` or internally nulled.

**`Since`**

v0.3.0

#### Inherited from

IncomingMessage.socket

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1060

___

### statusCode

• `Optional` **statusCode**: `number`

**Only valid for response obtained from ClientRequest.**

The 3-digit HTTP response status code. E.G. `404`.

**`Since`**

v0.1.1

#### Inherited from

IncomingMessage.statusCode

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1180

___

### statusMessage

• `Optional` **statusMessage**: `string`

**Only valid for response obtained from ClientRequest.**

The HTTP response status message (reason phrase). E.G. `OK` or `Internal Server Error`.

**`Since`**

v0.11.10

#### Inherited from

IncomingMessage.statusMessage

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1187

___

### trailers

• **trailers**: `Dict`<`string`\>

The request/response trailers object. Only populated at the `'end'` event.

**`Since`**

v0.3.0

#### Inherited from

IncomingMessage.trailers

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1115

___

### url

• `Optional` **url**: `string`

**Only valid for request obtained from Server.**

Request URL string. This contains only the URL that is present in the actual
HTTP request. Take the following request:

```http
GET /status?name=ryan HTTP/1.1
Accept: text/plain
```

To parse the URL into its parts:

```js
new URL(request.url, `http://${request.getHeaders().host}`);
```

When `request.url` is `'/status?name=ryan'` and`request.getHeaders().host` is `'localhost:3000'`:

```console
$ node
> new URL(request.url, `http://${request.getHeaders().host}`)
URL {
  href: 'http://localhost:3000/status?name=ryan',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/status',
  search: '?name=ryan',
  searchParams: URLSearchParams { 'name' => 'ryan' },
  hash: ''
}
```

**`Since`**

v0.1.90

#### Inherited from

IncomingMessage.url

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1173

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): `AsyncIterableIterator`<`any`\>

#### Returns

`AsyncIterableIterator`<`any`\>

#### Inherited from

IncomingMessage.\_\_@asyncIterator@21531

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:503

___

### \_construct

▸ `Optional` **_construct**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

IncomingMessage.\_construct

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:141

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

node_modules/@types/node/ts4.8/stream.d.ts:423

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

node_modules/@types/node/ts4.8/stream.d.ts:142

___

### addListener

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

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

node_modules/@types/node/ts4.8/stream.d.ts:447

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

node_modules/@types/node/ts4.8/stream.d.ts:448

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

node_modules/@types/node/ts4.8/stream.d.ts:449

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

node_modules/@types/node/ts4.8/stream.d.ts:450

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:451

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

node_modules/@types/node/ts4.8/stream.d.ts:452

▸ **addListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.addListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:453

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

node_modules/@types/node/ts4.8/stream.d.ts:454

___

### destroy

▸ **destroy**(`error?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Calls `destroy()` on the socket that received the `IncomingMessage`. If `error`is provided, an `'error'` event is emitted on the socket and `error` is passed
as an argument to any listeners on the event.

**`Since`**

v0.3.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.destroy

#### Defined in

node_modules/@types/node/ts4.8/http.d.ts:1193

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

node_modules/@types/node/ts4.8/stream.d.ts:455

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

node_modules/@types/node/ts4.8/stream.d.ts:456

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

node_modules/@types/node/ts4.8/stream.d.ts:457

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

node_modules/@types/node/ts4.8/stream.d.ts:458

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:459

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

node_modules/@types/node/ts4.8/stream.d.ts:460

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.emit

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:461

▸ **emit**(`event`, `...args`): `boolean`

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

node_modules/@types/node/ts4.8/stream.d.ts:462

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

IncomingMessage.eventNames

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:669

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to defaultMaxListeners.

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

IncomingMessage.getMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:526

___

### isPaused

▸ **isPaused**(): `boolean`

The `readable.isPaused()` method returns the current operating state of the`Readable`. This is used primarily by the mechanism that underlies the`readable.pipe()` method. In most
typical cases, there will be no reason to
use this method directly.

```js
const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

**`Since`**

v0.11.14

#### Returns

`boolean`

#### Inherited from

IncomingMessage.isPaused

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:302

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

IncomingMessage.listenerCount

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:616

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

IncomingMessage.listeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:539

___

### off

▸ **off**(`eventName`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.off

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:499

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

node_modules/@types/node/ts4.8/stream.d.ts:463

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

node_modules/@types/node/ts4.8/stream.d.ts:464

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

node_modules/@types/node/ts4.8/stream.d.ts:465

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

node_modules/@types/node/ts4.8/stream.d.ts:466

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:467

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

node_modules/@types/node/ts4.8/stream.d.ts:468

▸ **on**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.on

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:469

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

node_modules/@types/node/ts4.8/stream.d.ts:470

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

node_modules/@types/node/ts4.8/stream.d.ts:471

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

node_modules/@types/node/ts4.8/stream.d.ts:472

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

node_modules/@types/node/ts4.8/stream.d.ts:473

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

node_modules/@types/node/ts4.8/stream.d.ts:474

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:475

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

node_modules/@types/node/ts4.8/stream.d.ts:476

▸ **once**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.once

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:477

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

node_modules/@types/node/ts4.8/stream.d.ts:478

___

### pause

▸ **pause**(): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

The `readable.pause()` method will cause a stream in flowing mode to stop
emitting `'data'` events, switching out of flowing mode. Any data that
becomes available will remain in the internal buffer.

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});
```

The `readable.pause()` method has no effect if there is a `'readable'`event listener.

**`Since`**

v0.9.4

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.pause

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:266

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

node_modules/@types/node/ts4.8/stream.d.ts:26

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

node_modules/@types/node/ts4.8/stream.d.ts:479

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

node_modules/@types/node/ts4.8/stream.d.ts:480

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

node_modules/@types/node/ts4.8/stream.d.ts:481

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

node_modules/@types/node/ts4.8/stream.d.ts:482

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:483

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

node_modules/@types/node/ts4.8/stream.d.ts:484

▸ **prependListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:485

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

node_modules/@types/node/ts4.8/stream.d.ts:486

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

node_modules/@types/node/ts4.8/stream.d.ts:487

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

node_modules/@types/node/ts4.8/stream.d.ts:488

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

node_modules/@types/node/ts4.8/stream.d.ts:489

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

node_modules/@types/node/ts4.8/stream.d.ts:490

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:491

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

node_modules/@types/node/ts4.8/stream.d.ts:492

▸ **prependOnceListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.prependOnceListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:493

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

node_modules/@types/node/ts4.8/stream.d.ts:494

___

### push

▸ **push**(`chunk`, `encoding?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | `BufferEncoding` |

#### Returns

`boolean`

#### Inherited from

IncomingMessage.push

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:422

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

IncomingMessage.rawListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:569

___

### read

▸ **read**(`size?`): `any`

The `readable.read()` method reads data out of the internal buffer and
returns it. If no data is available to be read, `null` is returned. By default,
the data is returned as a `Buffer` object unless an encoding has been
specified using the `readable.setEncoding()` method or the stream is operating
in object mode.

The optional `size` argument specifies a specific number of bytes to read. If`size` bytes are not available to be read, `null` will be returned _unless_the stream has ended, in which
case all of the data remaining in the internal
buffer will be returned.

If the `size` argument is not specified, all of the data contained in the
internal buffer will be returned.

The `size` argument must be less than or equal to 1 GiB.

The `readable.read()` method should only be called on `Readable` streams
operating in paused mode. In flowing mode, `readable.read()` is called
automatically until the internal buffer is fully drained.

```js
const readable = getReadableStreamSomehow();

// 'readable' may be triggered multiple times as data is buffered in
readable.on('readable', () => {
  let chunk;
  console.log('Stream is readable (new data received in buffer)');
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});

// 'end' will be triggered once when there is no more data available
readable.on('end', () => {
  console.log('Reached end of stream.');
});
```

Each call to `readable.read()` returns a chunk of data, or `null`. The chunks
are not concatenated. A `while` loop is necessary to consume all data
currently in the buffer. When reading a large file `.read()` may return `null`,
having consumed all buffered content so far, but there is still more data to
come not yet buffered. In this case a new `'readable'` event will be emitted
when there is more data in the buffer. Finally the `'end'` event will be
emitted when there is no more data to come.

Therefore to read a file's whole contents from a `readable`, it is necessary
to collect chunks across multiple `'readable'` events:

```js
const chunks = [];

readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on('end', () => {
  const content = chunks.join('');
});
```

A `Readable` stream in object mode will always return a single item from
a call to `readable.read(size)`, regardless of the value of the`size` argument.

If the `readable.read()` method returns a chunk of data, a `'data'` event will
also be emitted.

Calling [read](ProxyIncomingMessage.md#read) after the `'end'` event has
been emitted will return `null`. No runtime error will be raised.

**`Since`**

v0.9.4

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size?` | `number` | Optional argument to specify how much data to read. |

#### Returns

`any`

#### Inherited from

IncomingMessage.read

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:219

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeAllListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:510

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

node_modules/@types/node/ts4.8/stream.d.ts:495

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

node_modules/@types/node/ts4.8/stream.d.ts:496

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

node_modules/@types/node/ts4.8/stream.d.ts:497

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

node_modules/@types/node/ts4.8/stream.d.ts:498

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:499

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

node_modules/@types/node/ts4.8/stream.d.ts:500

▸ **removeListener**(`event`, `listener`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.removeListener

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:501

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

node_modules/@types/node/ts4.8/stream.d.ts:502

___

### resume

▸ **resume**(): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

The `readable.resume()` method causes an explicitly paused `Readable` stream to
resume emitting `'data'` events, switching the stream into flowing mode.

The `readable.resume()` method can be used to fully consume the data from a
stream without actually processing any of that data:

```js
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('Reached the end, but did not read anything.');
  });
```

The `readable.resume()` method has no effect if there is a `'readable'`event listener.

**`Since`**

v0.9.4

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.resume

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:285

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

The `readable.setEncoding()` method sets the character encoding for
data read from the `Readable` stream.

By default, no encoding is assigned and stream data will be returned as`Buffer` objects. Setting an encoding causes the stream data
to be returned as strings of the specified encoding rather than as `Buffer`objects. For instance, calling `readable.setEncoding('utf8')` will cause the
output data to be interpreted as UTF-8 data, and passed as strings. Calling`readable.setEncoding('hex')` will cause the data to be encoded in hexadecimal
string format.

The `Readable` stream will properly handle multi-byte characters delivered
through the stream that would otherwise become improperly decoded if simply
pulled from the stream as `Buffer` objects.

```js
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('Got %d characters of string data:', chunk.length);
});
```

**`Since`**

v0.9.4

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | `BufferEncoding` | The encoding to use. |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.setEncoding

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:244

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.setMaxListeners

#### Defined in

node_modules/@types/node/ts4.8/events.d.ts:520

___

### setTimeout

▸ **setTimeout**(`msecs`, `callback?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Calls `message.socket.setTimeout(msecs, callback)`.

**`Since`**

v0.5.9

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

node_modules/@types/node/ts4.8/http.d.ts:1126

___

### unpipe

▸ **unpipe**(`destination?`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

The `readable.unpipe()` method detaches a `Writable` stream previously attached
using the [pipe](ProxyIncomingMessage.md#pipe) method.

If the `destination` is not specified, then _all_ pipes are detached.

If the `destination` is specified, but no pipe is set up for it, then
the method does nothing.

```js
const fs = require('fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log('Stop writing to file.txt.');
  readable.unpipe(writable);
  console.log('Manually close the file stream.');
  writable.end();
}, 1000);
```

**`Since`**

v0.9.4

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination?` | `WritableStream` | Optional specific stream to unpipe |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.unpipe

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:329

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

Passing `chunk` as `null` signals the end of the stream (EOF) and behaves the
same as `readable.push(null)`, after which no more data can be written. The EOF
signal is put at the end of the buffer and any buffered data will still be
flushed.

The `readable.unshift()` method pushes a chunk of data back into the internal
buffer. This is useful in certain situations where a stream is being consumed by
code that needs to "un-consume" some amount of data that it has optimistically
pulled out of the source, so that the data can be passed on to some other party.

The `stream.unshift(chunk)` method cannot be called after the `'end'` event
has been emitted or a runtime error will be thrown.

Developers using `stream.unshift()` often should consider switching to
use of a `Transform` stream instead. See the `API for stream implementers` section for more information.

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
const { StringDecoder } = require('string_decoder');
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.includes('\n\n')) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
        return;
      }
      // Still reading the header.
      header += str;
    }
  }
}
```

Unlike [push](ProxyIncomingMessage.md#push), `stream.unshift(chunk)` will not
end the reading process by resetting the internal reading state of the stream.
This can cause unexpected results if `readable.unshift()` is called during a
read (i.e. from within a [_read](ProxyIncomingMessage.md#_read) implementation on a
custom stream). Following the call to `readable.unshift()` with an immediate [push](ProxyIncomingMessage.md#push) will reset the reading state appropriately,
however it is best to simply avoid calling `readable.unshift()` while in the
process of performing a read.

**`Since`**

v0.9.11

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chunk` | `any` | Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must be a string, `Buffer`, `Uint8Array` or `null`. For object mode streams, `chunk` may be any JavaScript value. |
| `encoding?` | `BufferEncoding` | Encoding of string chunks. Must be a valid `Buffer` encoding, such as `'utf8'` or `'ascii'`. |

#### Returns

`void`

#### Inherited from

IncomingMessage.unshift

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:395

___

### wrap

▸ **wrap**(`stream`): [`ProxyIncomingMessage`](ProxyIncomingMessage.md)

Prior to Node.js 0.10, streams did not implement the entire `stream` module API
as it is currently defined. (See `Compatibility` for more information.)

When using an older Node.js library that emits `'data'` events and has a [pause](ProxyIncomingMessage.md#pause) method that is advisory only, the`readable.wrap()` method can be used to create a `Readable`
stream that uses
the old stream as its data source.

It will rarely be necessary to use `readable.wrap()` but the method has been
provided as a convenience for interacting with older Node.js applications and
libraries.

```js
const { OldReader } = require('./old-api-module.js');
const { Readable } = require('stream');
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on('readable', () => {
  myReader.read(); // etc.
});
```

**`Since`**

v0.9.4

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `ReadableStream` | An "old style" readable stream |

#### Returns

[`ProxyIncomingMessage`](ProxyIncomingMessage.md)

#### Inherited from

IncomingMessage.wrap

#### Defined in

node_modules/@types/node/ts4.8/stream.d.ts:421
