---
name: media-handling
routeTemplate: ./data/component-templates/guide.yml
title: Media Handling
---

# Media Handling

## Responsive Images
Adaptive `srcset`s are supported using Sitecore server-side resizing.
The `srcSet` prop can use Sitecore image resizing parameters (i.e. w, h, mw, mh).
Sample create a srcSet using two sizes (server resizing), 300 and 100px max widths, respecting aspect ratio.

> *Important*: `srcSet` params must be whitelisted for adaptive resizing to occur. See `/sitecore/config/*.config` (search for `allowedMediaParams`)
http://www.stockpick.nl/english/scaling-sitecore-jss-images/

```html
<Image
  field={props.fields.sample2}
  srcSet={[{ mw: 300 }, { mw: 100 }]}
  sizes="(min-width: 960px) 300px, 100px"
  className="img-fluid"
/>
```

## Image Optimization
[Sitecore Dianoga](https://github.com/kamsar/Dianoga) (a module by Kam Figy) works with JSS and can be used to optimize images on the server side.

## Debugging Media Resizing
1. Verify that JSS image whitelisting configuration exists. This is particularly important for JSS-SXA sites, where config deployments are abstracted away.

2. Make sure that `/media` urls are being changed to `/jssmedia`.
(see `packages/sitecore-jss/src/mediaApi.ts`)

3. Make sure that web.config has the `sitecorejss_media.ashx` media handler defined

4. Check whitelist config for spaces. Ex. "mw=100, mh=50" with a space in the middle will not work. 

Sample config for image size whitelist to work without a hash: 

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <javaScriptServices>
      <!--
        You can use configuration patch(es) to add groups of
        media parameters that should be allowed without a
        request protection hash in the URL. Parameter order
        is not important.
      -->
      <allowedMediaParams>
        <example>mw=100,mh=50</example>
        <example2>mw=100</example2>
        <example3>mw=101,mh=51</example3>
      </allowedMediaParams>
    </javaScriptServices>
  </sitecore>
</configuration>
```