---
name: reference
routeTemplate: ./data/component-templates/article.yml
title: Vue Package Reference
---

# JSS Vue Package

The `sitecore-jss-vue` package is a library that delivers UI helper components and helper utilities for rendering data from the Sitecore [Layout Service](/docs/fundamentals/services/layout-service) (provided via JSS server package).

# Getting started

> Note: Most users should use this library as part of the [Vue sample app](/docs/client-frameworks/vue/sample-app); these instructions are general and do not cover many aspects of configuration.

## Step 1: Install sitecore-jss-vue

You can use the `npm` command-line tool to install packages. Use whichever is appropriate for your project in the examples below.

```sh
npm install @sitecore-jss/sitecore-jss-vue
```

## Step 2: All setup and ready

The `sitecore-jss-vue` library is all setup and all the helper components for Sitecore field types as well as the placeholder component can now be used in your Vue app.

Check out the [Vue app walkthrough](/docs/client-frameworks/vue/sample-app) to see usage of the library.

# Field Helper Components

The library provides helper components to help output Sitecore field values.

> The helper components that are exposed from `sitecore-jss-vue` are all stateless functional components with the exception of `Placeholder`, which is a typical stateful component.

> In accordance with Vue's [attribute inheritance](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance), any non-prop attributes passed to the component will be rendered as html attributes on the enclosing tag. Events that are passed will be propagated as well.

> It is also important to note that _none_ of the helper components exposed from `sitecore-jss-vue` are registered globally, e.g. via `app.component()`. This is intentional so as not to pollute the global component space and also to align with the tree-shaking capabilities of bundling tools like Webpack or Rollup. Therefore you will need to locally require/import any of the helper components you wish to use in your own components.

Below is a list of all supported field helper components, and how they are used (where `field` is data coming from a placeholder component):

## Text

### Example

```js
<template>
  <sc-text tag="h1" :field="fields.title" />
</template>
<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScText: Text
  }
};
</script>
```

### Props

| name       | description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `field`    | The field you wish to render. Usually of Sitecore type `Single-Line Text` or `Multi-Line Text` but can be used with numeric types as well. |
| `tag`      | The HTML element name that will be rendered around the text value. (Default: `span`)                                                       |
| `editable` | Indicates whether the experience editor / Sitecore-formatted HTML output should be used. (Default: `true`)                                 |
| `encode`   | Enables or disables HTML encoding of output value. A `false` value also implies `editable: false`. (Default: `true`)                       |

> For `Multi-line Text`, the provided `editable` value will have any line breaks replaced by `<br />` already. If using the non-editable value, you can process `field.value` yourself to replace JSON newlines with the desired markup, or use a [CSS `white-space`](https://www.w3schools.com/cssref/pr_text_white-space.asp) value such as `pre-wrap`.

## RichText

### Example

```js
<template>
  <sc-rich-text tag="div" :field="fields.text" />
</template>
<script>
import { RichText } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScRichText: RichText
  }
};
</script>
```

### Input Properties

| name       | description                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| `field`    | The field you wish to render. Should be Sitecore type `Rich Text`.                                         |
| `tag`      | The HTML element name that will be rendered around the rich text value. (Default: `div`)                   |
| `editable` | Indicates whether the experience editor / Sitecore-formatted HTML output should be used. (Default: `true`) |

## Image

### Example

```js
<template>
  <sc-image :media="fields.image" />
</template>
<script>
import { Image } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScImage: Image
  }
};
</script>
```

### Input Properties

| name          | description                                                                                                                                                                                                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `media`       | The route field you wish to render. Should be Sitecore type `Image`.                                                                                                                                                                                                                                                                                         |
| `editable`    | Indicates whether the experience editor / Sitecore-formatted HTML output should be used. (Default: `true`)                                                                                                                                                                                                                                                   |
| `imageParams` | The [query string parameters](https://community.sitecore.net/technical_blogs/b/sitecorejohn_blog/posts/media-options-and-query-string-parameters-in-the-sitecore-asp-net-cms) that should be added to the image URL. Note that because JSS does not support security hashing of media URLs, these parameter sets will need to be white-listed on the server. |

> The `Image` component gives special treatment to the `srcSet` attribute if provided as an attribute on the component. You can provide an array of objects which represent query string parameters for each element of a `srcSet`. This enables responsive images with server-side rendering when combined with a `sizes` attribute.

## Link

### Example

```js
<template>
  <sc-link :field="fields.link" />
</template>
<script>
import { Link } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScLink: Link
  }
};
</script>
```

| name       | description                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| `field`    | The route field you wish to render. Should be Sitecore type `General Link`.                                |
| `editable` | Indicates whether the experience editor / Sitecore-formatted HTML output should be used. (Default: `true`) |

> If using `editable` output from Sitecore, `Link` will create a wrapper `span` around the Sitecore-provided markup, and apply host element attributes and to this `span`.

## File

### Example

```js
<template>
  <sc-file :field="fields.file" />
</template>
<script>
import { File } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScFile: File
  }
};
</script>
```

### Input Properties

| name    | description                                                         |
| ------- | ------------------------------------------------------------------- |
| `field` | The route field you wish to render. Should be Sitecore type `File`. |

> The `File` field does not support inline editing via the Experience Editor in Sitecore, but can be edited via the default field editor on components.

## Date

### Example

```js
<template>
  <sc-date :field="fields.date" :formatter="formatDate" />
</template>
<script>
import { Date } from '@sitecore-jss/sitecore-jss-vue';
export default {
  props: {
    fields: Object
  }
  components: {
    ScDate: Date
  },
  methods: {
    formatDate(date) {
      return date && date.toISOString();
    }
  }
};
</script>
```

### Input Properties

| name        | description                                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `field`     | The field you wish to render. Should be Sitecore type `Date`.                                                                                             |
| `tag`       | The HTML element name that will be rendered around the date value. (Default: `span`)                                                                      |
| `editable`  | Indicates whether the experience editor / Sitecore-formatted HTML output should be used. (Default: `true`)                                                |
| `formatter` | A function that receives the field value as a parsed JavaScript `Date` object. The return value will be rendered within the wrapping tag of the component |
