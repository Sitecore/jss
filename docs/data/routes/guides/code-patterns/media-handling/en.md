---
name: media-handling
routeTemplate: ./data/component-templates/guide.yml
title: Media Handling
---

## Image Resizing
To enable image resizing in JSS, the size parameters must be whitelisted in Sitecore config. The sample apps show an example of how to achieve this:
1. Customize the `allowMediaParams` portion of the Sitecore config.
    ```xml
    <configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
      <sitecore>
        <javaScriptServices>
          <!--
            You can use configuration patch(es) to add groups of
            media parameters that should be allowed without a
            request protection hash in the URL. Parameter order
            is not important.
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
    Reference: ([`JssReactWeb.config`](https://github.com/Sitecore/jss/blob/dev/samples/react/sitecore/config/JssReactWeb.config#L58))


2. Use JSS's `<Image>` component, passing matching values from step 1 to the `imageParams` prop.
    ```javascript
    <Image
      field={props.fields.sample2}
      editable={false}
      imageParams={{ mw: 100, mh: 50 }}
      height="50"
      width="94"
      data-sample="other-attributes-pass-through"
    />
    ```
    Reference: ([`Styleguide-FieldUsage-Image/index.js`](https://github.com/Sitecore/jss/blob/dev/samples/react/src/components/Styleguide-FieldUsage-Image/index.js#L14))

### Resizing Images in GraphQL Queries

Sample Query:

```graphql
query MyDemoQuery( $contextItem: String!) 
{
  contextItem: item(path: $contextItem) {
    ...on Jsspage {
      image {
        value
        img: editable(fieldRendererParameters: "mw=100")
        img2: editable(fieldRendererParameters: "w=150")
        img3: editable(fieldRendererParameters: "w=100&h=100&bc=AA4422")
        img4: editable(fieldRendererParameters: "w=2000&as=true")
        img5: editable(fieldRendererParameters: "mw=250&mh=250")
        rendered(fieldRendererParameters: "mw=100")
      }
    }
  }
}
```

Reference: [Scaling Sitecore JSS images by Jan BlueMink](http://www.stockpick.nl/english/scaling-sitecore-jss-images/).


### Debugging Media Resizing
1. Verify that JSS image whitelisting configuration exists. This is particularly important for JSS-SXA sites, where config deployments are abstracted away.

2. Make sure that `/media` urls are being changed to `/jssmedia`.
(see `packages/sitecore-jss/src/mediaApi.ts`)

3. Make sure that `web.config` has the `sitecorejss_media.ashx` media handler defined.
    ```xml
    <add name="Sitecore.JavaScriptServices.Media.MediaRequestHandler" verb="*" path="sitecorejss_media.ashx" type="Sitecore.JavaScriptServices.Media.MediaRequestHandler, Sitecore.JavaScriptServices.Media" />
    ```

4. Check the whitelist configuration for spaces.

    Incorrect:
    ```xml
    <allowedMediaParams>
      <!-- space between width and height is not ok -->
      <example>mw=100, mh=50</example>
    </allowedMediaParams>
    ```

    Correct:
    ```xml
    <allowedMediaParams>
      <!-- No spaces 👍 -->
      <example>mw=100,mh=50</example>
    </allowedMediaParams>
    ```

---

## Responsive Images
After enabling image resizing per the guide above, adaptive `srcset`s can be utilized to render responsive images with server-side resizing.
The `srcSet` prop can use Sitecore image resizing parameters (i.e. w, h, mw, mh).
Sample create a srcSet using two sizes (server resizing), 300 and 100px max widths, respecting aspect ratio.

> *Important*: `srcSet` params must be whitelisted within `allowedMediaParams` for adaptive resizing to occur.

```html
<Image
  field={props.fields.sample2}
  srcSet={[{ mw: 300 }, { mw: 100 }]}
  sizes="(min-width: 960px) 300px, 100px"
  className="img-fluid"
/>
```

---

## Using a CDN
The ability to use a CDN for Media Library Assets is part of core Sitecore functionality, so setting this up is not JSS-specific. Refer to the official Sitecore CDN docs for setup instructions. The resulting media urls will automatically work in JSS apps as long as you are rending images using JSS's <Image> component or fetching image data using JSS's mediaApi

- [Manually configure the Sitecore Media Library to use a CDN](https://doc.sitecore.com/developers/100/sitecore-experience-manager/en/manually-configure-the-sitecore-media-library-to-use-a-cdn.html) - the .

- [Sitecore Media Library CDN-related configuration reference](https://doc.sitecore.com/developers/100/sitecore-experience-manager/en/sitecore-media-library-cdn-related-configuration-reference.html)

---

## Image Optimization

If using Media Library for images (rather than Content Hub), 3rd party tools can help with optimization.

Examples:

[Sitecore Dianoga](https://github.com/kamsar/Dianoga) -  an image Optimization module by [Kam Figy](https://twitter.com/kamsar). Dianoga is compatible with JSS and can be used to optimize images on the server side.

[imgIX](https://www.imgix.com/) - an image processing platform with a simple API. imgix transforms, optimizes, and intelligently caches your image library for fast websites and apps using simple and robust URL parameters.