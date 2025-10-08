[**@sitecore-jss/sitecore-jss-nextjs**](../../README.md)

***

[@sitecore-jss/sitecore-jss-nextjs](../../README.md) / [index](../README.md) / Module

# Type Alias: Module

> **Module** = `object` & `object`

Defined in: [sitecore-jss-nextjs/src/sharedTypes/module-factory.ts:7](https://github.com/Sitecore/jss/blob/6e51d9f4b744012d123d4e7ed0b9b0dd9f909875/packages/sitecore-jss-nextjs/src/sharedTypes/module-factory.ts#L7)

Represents a module (file)

## Type declaration

### default?

> `optional` **default**: `ComponentType`

Default Next.js export

### Default?

> `optional` **Default**: `ComponentType`

Default SXA export

### getServerSideProps?

> `optional` **getServerSideProps**: [`GetServerSideComponentProps`](GetServerSideComponentProps.md)

function for component level data fetching in SSR mode

### getStaticProps?

> `optional` **getStaticProps**: [`GetStaticComponentProps`](GetStaticComponentProps.md)

function for component level data fetching in SSG mode
